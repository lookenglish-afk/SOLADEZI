import React, { useState } from 'react';
import { 
  Users, 
  Volume2, 
  CheckCircle2, 
  MessageSquare, 
  RotateCcw, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RoleplayScenario, RoleplayOption, StudentProfile, AchievementBadge } from '../types/index.ts';
import { audioService } from '../utils/audio.ts';
import { StudentStorageService } from '../utils/studentStorage.ts';

interface RoleplayGameProps {
  unitId?: string;
  scenario: RoleplayScenario;
  soundEnabled: boolean;
  projectionMode: boolean;
  student?: StudentProfile | null;
  onStudentUpdated?: (student: StudentProfile) => void;
  onBadgeUnlocked?: (badge: AchievementBadge) => void;
}

export const RoleplayGame: React.FC<RoleplayGameProps> = ({
  unitId,
  scenario,
  soundEnabled,
  projectionMode,
  student,
  onStudentUpdated,
  onBadgeUnlocked
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<RoleplayOption | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [accumulatedScore, setAccumulatedScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = scenario.steps[currentStepIndex] || scenario.steps[0];

  const handleSelectOption = (opt: RoleplayOption) => {
    if (isAnswered) return;
    if (soundEnabled) audioService.playClick();
    setSelectedOption(opt);
  };

  const handleConfirmResponse = () => {
    if (!selectedOption || isAnswered) return;

    setIsAnswered(true);
    setAccumulatedScore((prev) => prev + selectedOption.score);

    if (selectedOption.isBest) {
      if (soundEnabled) audioService.playCorrect();
    } else {
      if (soundEnabled) audioService.playIncorrect();
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < scenario.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      // Save progress for logged-in student
      if (student && unitId) {
        const { updatedStudent, newBadges } = StudentStorageService.markTaskCompleted(
          student.studentNumber,
          unitId,
          'roleplayCompleted'
        );
        if (updatedStudent) onStudentUpdated?.(updatedStudent);
        if (newBadges.length > 0) {
          onBadgeUnlocked?.(newBadges[0]);
          if (soundEnabled) audioService.playCorrect();
        }
      }
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAccumulatedScore(0);
    setIsCompleted(false);
  };

  const handleSpeakDialog = (text: string) => {
    if (soundEnabled) {
      audioService.speakEn(text);
    }
  };

  return (
    <div className={`space-y-6 max-w-4xl mx-auto ${projectionMode ? 'text-lg' : ''}`}>
      {/* Roleplay Intro Header */}
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Users className="w-5 h-5 text-purple-400" />
            </span>
            <h2 className={`font-bold text-white ${projectionMode ? 'text-2xl' : 'text-xl'}`}>
              Game 3: Đóng Vai Tình Huống Công Sở IT (Workplace Role-play)
            </h2>
          </div>
          <p className={`text-slate-300 mt-1 ${projectionMode ? 'text-base' : 'text-sm'}`}>
            {scenario.title} • {scenario.context}
          </p>
        </div>

        {/* Score & Step Counter */}
        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700">
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Điểm chuyên môn</span>
            <span className="font-bold text-amber-300 text-sm">{accumulatedScore} điểm</span>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Bắt đầu lại kịch bản"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Role Assignment Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
          <span className="text-2xl">🎓</span>
          <div>
            <span className="text-[11px] uppercase font-bold text-indigo-400 tracking-wider">Vai diễn của bạn</span>
            <div className="font-bold text-white text-sm">{scenario.studentRole}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
          <span className="text-2xl">💼</span>
          <div>
            <span className="text-[11px] uppercase font-bold text-sky-400 tracking-wider">Đối tác giao tiếp</span>
            <div className="font-bold text-white text-sm">{scenario.colleagueRole}</div>
          </div>
        </div>
      </div>

      {/* Simulation Box */}
      {!isCompleted ? (
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* NPC Dialogue Bubble */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
              {currentStep.speakerAvatar}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-sm">{currentStep.speakerName}</span>
                  <span className="text-xs text-indigo-400 ml-2">({currentStep.speakerRole})</span>
                </div>

                <button
                  onClick={() => handleSpeakDialog(currentStep.npcDialogueEn)}
                  className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-sky-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
                  title="Nghe câu thoại tiếng Anh"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe thoại</span>
                </button>
              </div>

              {/* Speech Bubble */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 space-y-1 relative">
                <p className={`font-semibold text-sky-200 ${projectionMode ? 'text-xl' : 'text-base'}`}>
                  "{currentStep.npcDialogueEn}"
                </p>
                <p className="text-xs sm:text-sm text-slate-400">
                  → {currentStep.npcDialogueVi}
                </p>
              </div>
            </div>
          </div>

          {/* Student Task Prompt */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center gap-2 text-xs sm:text-sm text-indigo-200 font-medium">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Nhiệm vụ của bạn: {currentStep.studentTaskVi}</span>
          </div>

          {/* Student Options */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Chọn câu phản hồi phù hợp và chuyên nghiệp nhất:
            </div>

            {currentStep.options.map((opt) => {
              const isSelected = selectedOption?.id === opt.id;

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                    isAnswered
                      ? opt.isBest
                        ? 'bg-emerald-950/60 border-emerald-500 text-white ring-2 ring-emerald-500/30'
                        : isSelected
                        ? 'bg-rose-950/60 border-rose-500 text-white ring-2 ring-rose-500/30'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-50'
                      : isSelected
                      ? 'bg-indigo-600/30 border-indigo-400 text-white ring-2 ring-indigo-400/40 shadow-lg'
                      : 'bg-slate-900/80 hover:bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className={`font-bold text-slate-100 ${projectionMode ? 'text-lg' : 'text-sm sm:text-base'}`}>
                        {opt.dialogEn}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-400">
                        {opt.dialogVi}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeakDialog(opt.dialogEn);
                        }}
                        className="p-1 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Area */}
          {isAnswered && selectedOption && (
            <div className={`p-4 rounded-2xl border text-sm animate-in fade-in duration-300 ${
              selectedOption.isBest
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : 'bg-amber-950/60 border-amber-500/60 text-amber-200'
            }`}>
              <div className="font-bold flex items-center gap-2 mb-1">
                {selectedOption.isBest ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Phương án xuất sắc! (+{selectedOption.score} điểm)</span>
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Chưa tối ưu! (+{selectedOption.score} điểm)</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {selectedOption.feedbackVi}
              </p>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
            <span className="text-xs text-slate-400">
              Bước {currentStepIndex + 1} / {scenario.steps.length}
            </span>

            {!isAnswered ? (
              <button
                disabled={!selectedOption}
                onClick={handleConfirmResponse}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  selectedOption
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                Gửi phản hồi
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{currentStepIndex + 1 < scenario.steps.length ? 'Bước tiếp theo' : 'Xem kết quả'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Completed Screen */
        <div className="bg-slate-800/90 border-2 border-indigo-500/60 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="inline-flex p-4 rounded-3xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
            <Award className="w-12 h-12 text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-white">Hoàn Thành Hoạt Động Đóng Vai!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Bạn đã xuất sắc xử lý tình huống giao tiếp kỹ thuật công sở với tổng điểm chuyên môn: <strong className="text-amber-300 font-bold">{accumulatedScore} điểm</strong>.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thực Hành Lại</span>
          </button>
        </div>
      )}
    </div>
  );
};
