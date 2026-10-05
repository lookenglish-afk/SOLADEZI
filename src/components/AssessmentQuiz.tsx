import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Check, 
  AlertTriangle, 
  BookOpen,
  Trophy,
  UserCheck,
  UserPlus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion, StudentProfile, AchievementBadge, HomeworkRecord } from '../types/index.ts';
import { audioService } from '../utils/audio.ts';
import { Leaderboard } from './Leaderboard.tsx';
import { StudentStorageService } from '../utils/studentStorage.ts';

interface AssessmentQuizProps {
  unitId: string;
  unitNumber?: number;
  unitTitle: string;
  questions: QuizQuestion[];
  soundEnabled: boolean;
  projectionMode: boolean;
  student: StudentProfile | null;
  onStudentUpdated?: (student: StudentProfile) => void;
  onBadgeUnlocked?: (badge: AchievementBadge) => void;
  onOpenAuthModal?: () => void;
}

interface QuestionAttempt {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  confirmed: boolean;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({
  unitId,
  unitNumber = 1,
  unitTitle,
  questions,
  soundEnabled,
  projectionMode,
  student,
  onStudentUpdated,
  onBadgeUnlocked,
  onOpenAuthModal
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<Record<string, QuestionAttempt>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showInQuizLeaderboard, setShowInQuizLeaderboard] = useState(false);
  const [homeworkSavedStatus, setHomeworkSavedStatus] = useState<boolean>(false);

  const currentQ = questions[currentIndex] || questions[0];
  const currentAttempt = currentQ ? attempts[currentQ.id] : undefined;
  const isCurrentConfirmed = Boolean(currentAttempt?.confirmed);

  // Handle option select before confirm
  const handleSelectOption = (opt: string) => {
    if (isCurrentConfirmed) return; // Locked once confirmed
    if (soundEnabled) audioService.playClick();
    setSelectedOption(opt);
  };

  // Confirm Answer - STRICT SCORING LOCK
  const handleConfirmAnswer = () => {
    if (!selectedOption || isCurrentConfirmed || !currentQ) return;

    // Check correctness strictly
    const isCorrect = selectedOption.trim() === currentQ.correct_answer.trim();

    if (isCorrect) {
      if (soundEnabled) audioService.playCorrect();
    } else {
      if (soundEnabled) audioService.playIncorrect();
    }

    // Save attempt (scored once, permanently locked for this session)
    setAttempts((prev) => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOption,
        isCorrect,
        confirmed: true
      }
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextAttempt = attempts[questions[nextIndex]?.id];
      setSelectedOption(nextAttempt ? nextAttempt.selectedOption : null);
    } else {
      // Complete quiz
      setIsCompleted(true);
      const totalCorrect = Object.values(attempts).filter((a) => a.isCorrect).length;
      const pct = Math.round((totalCorrect / questions.length) * 100);

      if (totalCorrect >= 7) {
        try {
          confetti({
            particleCount: 100,
            spread: 75,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }

      // Automatically save homework to student account if logged in
      if (student) {
        const now = new Date();
        const dateStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}`;
        const record: HomeworkRecord = {
          id: `hw-${unitId}-${Date.now()}`,
          unitId,
          unitNumber,
          unitNameEn: unitTitle,
          quizScore: totalCorrect,
          totalQuestions: questions.length,
          percentage: pct,
          dateCompleted: dateStr,
          tasksCompleted: {
            flashcards: true,
            matching: true,
            practice: true,
            roleplay: true,
            quiz: true
          }
        };

        const { updatedStudent, newBadges } = StudentStorageService.saveHomework(student.studentNumber, record);
        if (updatedStudent) {
          onStudentUpdated?.(updatedStudent);
          setHomeworkSavedStatus(true);
        }
        if (newBadges.length > 0) {
          onBadgeUnlocked?.(newBadges[0]);
          if (soundEnabled) audioService.playCorrect();
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevAttempt = attempts[questions[prevIndex]?.id];
      setSelectedOption(prevAttempt ? prevAttempt.selectedOption : null);
    }
  };

  // Full Reset - Clears all scored flags and answer state
  const handleFullReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAttempts({});
    setIsCompleted(false);
  };

  // Compute final results
  const totalCorrect = questions.filter((q) => attempts[q.id]?.isCorrect).length;
  const percentage = Math.round((totalCorrect / questions.length) * 100);

  const getCefrGrade = (pct: number) => {
    if (pct >= 90) return { grade: 'A2+ (Advanced Elementary)', textVi: 'Xuất sắc! Nắm vững từ vựng và cấu trúc CNTT chuẩn Pearson.' };
    if (pct >= 70) return { grade: 'A2 (Proficient Elementary)', textVi: 'Tốt! Đạt yêu cầu giao tiếp chuyên môn tại môi trường IT.' };
    if (pct >= 50) return { grade: 'A1+ (Developing)', textVi: 'Đạt! Cần ôn luyện thêm các từ vựng kỹ thuật và thì ngữ pháp.' };
    return { grade: 'A1 (Needs Review)', textVi: 'Cần củng cố lại từ vựng bài học trước khi chuyển sang nội dung mới.' };
  };

  // Render Summary Screen
  if (isCompleted) {
    const cefr = getCefrGrade(percentage);
    const correctQuestions = questions.filter((q) => attempts[q.id]?.isCorrect);
    const incorrectQuestions = questions.filter((q) => !attempts[q.id]?.isCorrect);

    return (
      <div className={`space-y-6 max-w-4xl mx-auto ${projectionMode ? 'text-lg' : ''}`}>
        {/* Score Card Header */}
        <div className="bg-slate-800/90 border-2 border-indigo-500/60 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <div className="inline-flex p-4 rounded-3xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
            <Award className="w-12 h-12 text-amber-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Kết Quả Bài Kiểm Tra 10 Câu (Final Assessment Summary)
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6 py-2">
            <div className="bg-slate-900/80 px-6 py-4 rounded-2xl border border-slate-700">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Điểm số đạt được</div>
              <div className="text-3xl sm:text-4xl font-black text-amber-300">
                {totalCorrect} / {questions.length}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{percentage}% chính xác</div>
            </div>

            <div className="bg-slate-900/80 px-6 py-4 rounded-2xl border border-slate-700 text-left max-w-xs">
              <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">Đánh giá chuẩn CEFR</div>
              <div className="font-bold text-white text-base">{cefr.grade}</div>
              <p className="text-xs text-slate-300 mt-1">{cefr.textVi}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleFullReset}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm Lại Bài Kiểm Tra (Retry)</span>
            </button>
          </div>

          {/* Student Account Homework Notice */}
          {student ? (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Đã Ghi Nhận Bài Tập Về Nhà
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200">
                    Sinh viên: <strong className="text-white">{student.fullName}</strong> • MSSV: <strong className="text-sky-300 font-mono">{student.studentNumber}</strong> • Lớp: <strong className="text-indigo-300">{student.className}</strong>
                  </p>
                </div>
              </div>

              {percentage === 100 && (
                <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Đạt Huy Hiệu Thủ Khoa 10/10 👑</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
                    Lưu Kết Quả Bài Tập Về Nhà
                  </span>
                  <p className="text-xs text-slate-300">
                    Đăng ký hoặc đăng nhập tài khoản sinh viên (MSSV, Họ tên, Lớp) để lưu lại toàn bộ tiến độ làm bài vĩnh viễn.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenAuthModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                Đăng Nhập Ngay
              </button>
            </div>
          )}
        </div>

        {/* Breakdown of Strengths and Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-slate-800/60 border border-emerald-500/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Điểm mạnh ({correctQuestions.length} câu đúng)</span>
            </div>
            {correctQuestions.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Chưa có câu trả lời đúng.</p>
            ) : (
              <ul className="space-y-2 text-xs sm:text-sm">
                {correctQuestions.map((q, idx) => (
                  <li key={q.id} className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Câu {questions.indexOf(q) + 1}:</strong> {q.question}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mistakes with Source Explanation */}
          <div className="bg-slate-800/60 border border-rose-500/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Câu cần ôn lại ({incorrectQuestions.length} câu)</span>
            </div>
            {incorrectQuestions.length === 0 ? (
              <p className="text-xs text-emerald-400 italic">Tuyệt vời! Không có câu nào bị sai.</p>
            ) : (
              <ul className="space-y-3 text-xs sm:text-sm">
                {incorrectQuestions.map((q) => (
                  <li key={q.id} className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-200 space-y-1">
                    <div className="font-semibold text-white">Câu {questions.indexOf(q) + 1}: {q.question}</div>
                    <div className="text-xs text-slate-300">
                      Đáp án đúng: <strong className="text-emerald-300 font-bold">{q.correct_answer}</strong>
                    </div>
                    <div className="text-xs text-slate-400 italic border-t border-rose-900/40 pt-1 mt-1">
                      Giải thích từ nguồn: {q.explanation}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Local Class Leaderboard */}
        <Leaderboard
          unitId={unitId}
          unitTitle={unitTitle}
          currentScore={totalCorrect}
          totalQuestions={questions.length}
          soundEnabled={soundEnabled}
          projectionMode={projectionMode}
          canSubmit={true}
        />
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className={`space-y-6 max-w-4xl mx-auto ${projectionMode ? 'text-lg' : ''}`}>
      {/* Quiz Header Bar */}
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </span>
            <h2 className={`font-bold text-white ${projectionMode ? 'text-2xl' : 'text-xl'}`}>
              Bài Kiểm Tra Đánh Giá 10 Câu (Final Review)
            </h2>
          </div>
          <p className={`text-slate-300 mt-1 ${projectionMode ? 'text-base' : 'text-sm'}`}>
            Mỗi câu chỉ tính điểm duy nhất một lần sau khi nhấn Xác nhận. Đáp án hoàn toàn trung lập trước khi nộp.
          </p>
        </div>

        {/* Progress Tracker & Leaderboard Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowInQuizLeaderboard(!showInQuizLeaderboard)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              showInQuizLeaderboard
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-500/30'
            }`}
            title="Xem Bảng Vàng Top 5 điểm cao của lớp"
          >
            <Trophy className="w-4 h-4" />
            <span>Bảng Vàng (Top 5)</span>
          </button>

          <div className="text-right pl-2 border-l border-slate-700">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tiến trình</div>
            <div className="font-bold text-amber-300 text-base">
              Câu {currentIndex + 1} / {questions.length}
            </div>
          </div>

          <button
            onClick={handleFullReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Làm mới toàn bộ bài kiểm tra"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* In-quiz Leaderboard Dropdown Drawer */}
      {showInQuizLeaderboard && (
        <div className="animate-in fade-in duration-200">
          <Leaderboard
            unitId={unitId}
            unitTitle={unitTitle}
            soundEnabled={soundEnabled}
            projectionMode={projectionMode}
            canSubmit={false}
          />
        </div>
      )}

      {/* 10 Dots Progress Indicator */}
      <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
        {questions.map((q, idx) => {
          const att = attempts[q.id];
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={q.id}
              onClick={() => {
                setCurrentIndex(idx);
                const a = attempts[q.id];
                setSelectedOption(a ? a.selectedOption : null);
              }}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                isCurrent
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 bg-amber-400 scale-110'
                  : att?.confirmed
                  ? att.isCorrect
                    ? 'bg-emerald-500'
                    : 'bg-rose-500'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title={`Câu ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Câu hỏi số {currentIndex + 1}
          </span>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            Nguồn: {currentQ.sourceContext}
          </span>
        </div>

        {/* Question Text */}
        <h3 className={`font-bold text-white leading-relaxed ${
          projectionMode ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
        }`}>
          {currentQ.question}
        </h3>

        {/* Options Grid (Visually neutral before confirm) */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedOption === opt;
            const isCorrectOption = opt.trim() === currentQ.correct_answer.trim();

            return (
              <button
                key={opt}
                disabled={isCurrentConfirmed}
                onClick={() => handleSelectOption(opt)}
                className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer relative flex items-center justify-between ${
                  /* Visually NEUTRAL before confirmation */
                  !isCurrentConfirmed
                    ? isSelected
                      ? 'bg-indigo-600/30 border-indigo-400 text-white ring-2 ring-indigo-400/40 shadow-lg'
                      : 'bg-slate-900/70 hover:bg-slate-900 text-slate-200 border-slate-700/80 hover:border-slate-500'
                    : /* AFTER CONFIRMATION: Show feedback and lock */
                    isCorrectOption
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                    : isSelected
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                    isSelected && !isCurrentConfirmed
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className={`font-semibold ${projectionMode ? 'text-xl' : 'text-sm sm:text-base'}`}>
                    {opt}
                  </span>
                </div>

                {isCurrentConfirmed && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                )}
                {isCurrentConfirmed && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Banner (Shown ONLY after confirmation) */}
        {isCurrentConfirmed && currentAttempt && (
          <div className={`p-4 rounded-2xl border text-sm animate-in fade-in duration-300 ${
            currentAttempt.isCorrect
              ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
              : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
          }`}>
            <div className="font-bold flex items-center gap-2 mb-1">
              {currentAttempt.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Chính xác! (+1 điểm)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span>Chưa chính xác! Đáp án đúng: <strong className="text-white underline">{currentQ.correct_answer}</strong></span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              <strong>Giải thích giáo khoa:</strong> {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
          <button
            disabled={currentIndex === 0}
            onClick={handlePrevious}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              currentIndex > 0
                ? 'text-slate-300 hover:text-white hover:bg-slate-700'
                : 'text-slate-400 cursor-not-allowed'
            }`}
          >
            ← Câu trước
          </button>

          {!isCurrentConfirmed ? (
            <button
              disabled={!selectedOption}
              onClick={handleConfirmAnswer}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                selectedOption
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              Xác nhận câu trả lời
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md shadow-amber-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem tổng kết điểm'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
