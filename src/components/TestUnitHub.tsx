import React, { useState, useEffect } from 'react';
import { 
  FolderCheck, 
  Clock, 
  Sparkles, 
  Plus, 
  Play, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  FileText, 
  Upload, 
  Users, 
  Printer, 
  Award, 
  Flag,
  ArrowRight,
  BookOpen,
  AlertCircle,
  Trash2,
  Edit3,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TestUnit, TestQuestion, TestSubmission, StudentProfile, AchievementBadge, HomeworkRecord } from '../types/index.ts';
import { TestStorageService } from '../data/testUnits.ts';
import { audioService } from '../utils/audio.ts';
import { StudentStorageService } from '../utils/studentStorage.ts';

interface TestUnitHubProps {
  soundEnabled: boolean;
  projectionMode: boolean;
  student: StudentProfile | null;
  onStudentUpdated?: (student: StudentProfile) => void;
  onBadgeUnlocked?: (badge: AchievementBadge) => void;
  onOpenAuthModal?: () => void;
}

export const TestUnitHub: React.FC<TestUnitHubProps> = ({
  soundEnabled,
  projectionMode,
  student,
  onStudentUpdated,
  onBadgeUnlocked,
  onOpenAuthModal
}) => {
  const isTeacher = student?.role === 'teacher';
  const [activeView, setActiveView] = useState<'folder' | 'exam' | 'result' | 'upload' | 'gradebook'>('folder');
  const [tests, setTests] = useState<TestUnit[]>([]);
  const [selectedTest, setSelectedTest] = useState<TestUnit | null>(null);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);

  // Exam state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQIds, setFlaggedQIds] = useState<Set<string>>(new Set());
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [examStartTime, setExamStartTime] = useState<number>(0);
  const [examResult, setExamResult] = useState<TestSubmission | null>(null);

  // Upload/Create Test form state
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestCode, setNewTestCode] = useState('');
  const [newTestTimeLimit, setNewTestTimeLimit] = useState(15);
  const [newTestDesc, setNewTestDesc] = useState('');
  const [bulkQuestionsText, setBulkQuestionsText] = useState(`
Câu 1: What is the main printed circuit board connecting CPU and RAM?
A. Motherboard
B. Power supply
C. Mouse
D. Expansion card
Đáp án: A
Giải thích: Motherboard (bo mạch chủ) là linh kiện kết nối chính.

Câu 2: Which tool is used to prevent electrostatic discharge when repairing computers?
A. Anti-static wrist strap
B. Tweezers
C. Hex key set
D. Flathead screwdriver
Đáp án: A
Giải thích: Vòng đeo tay chống tĩnh điện bảo vệ vi mạch.

Câu 3: What does VPN stand for?
A. Virtual Private Network
B. Very Powerful Node
C. Visual Protocol Number
D. Variable Packet Network
Đáp án: A
Giải thích: VPN là mạng riêng ảo kết nối bảo mật qua Internet.
`.trim());

  // Gradebook state
  const [submissions, setSubmissions] = useState<TestSubmission[]>([]);

  // Load tests on mount
  useEffect(() => {
    setTests(TestStorageService.getAllTests());
    setSubmissions(TestStorageService.getSubmissions());
  }, []);

  // Safeguard: non-teachers cannot access upload or gradebook view
  useEffect(() => {
    if (!isTeacher && (activeView === 'upload' || activeView === 'gradebook')) {
      setActiveView('folder');
    }
  }, [isTeacher, activeView]);

  // Exam Countdown Timer
  useEffect(() => {
    if (activeView !== 'exam' || !selectedTest) return;

    if (timeLeftSeconds <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeView, timeLeftSeconds]);

  // Start Taking Test
  const handleStartTest = (test: TestUnit) => {
    setSelectedTest(test);
    setAnswers({});
    setFlaggedQIds(new Set());
    setCurrentQIndex(0);
    setTimeLeftSeconds(test.timeLimitMinutes * 60);
    setExamStartTime(Date.now());
    setActiveView('exam');
    if (soundEnabled) audioService.playClick();
  };

  const handleSelectAnswer = (qId: string, opt: string) => {
    if (soundEnabled) audioService.playClick();
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQIds(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleAutoSubmit = () => {
    handleSubmitExam(true);
  };

  const handleSubmitExam = (isAuto = false) => {
    if (!selectedTest) return;

    let score = 0;
    const maxScore = selectedTest.questions.reduce((sum, q) => sum + (q.points || 10), 0);

    selectedTest.questions.forEach(q => {
      const studentAns = answers[q.id];
      if (studentAns && studentAns.trim() === q.correctAnswer.trim()) {
        score += (q.points || 10);
      }
    });

    const percentage = Math.round((score / maxScore) * 100);
    const timeSpent = Math.round((Date.now() - examStartTime) / 1000);
    const now = new Date();
    const submittedAt = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}`;

    const submission: TestSubmission = {
      id: `sub-${Date.now()}`,
      testId: selectedTest.id,
      testTitle: selectedTest.title,
      studentNumber: student?.studentNumber || 'ANONYMOUS',
      studentName: student?.fullName || 'Học viên ẩn danh',
      className: student?.className || 'Lớp học chung',
      score,
      maxScore,
      percentage,
      timeSpentSeconds: timeSpent,
      submittedAt,
      answers
    };

    TestStorageService.saveSubmission(submission);
    setSubmissions(TestStorageService.getSubmissions());
    setExamResult(submission);
    setActiveView('result');

    if (percentage >= 70) {
      if (soundEnabled) audioService.playCorrect();
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch {}
    } else {
      if (soundEnabled) audioService.playIncorrect();
    }

    // Save to student profile homework
    if (student) {
      const hwRecord: HomeworkRecord = {
        id: `hw-test-${selectedTest.id}-${Date.now()}`,
        unitId: selectedTest.id,
        unitNumber: 99,
        unitNameEn: selectedTest.title,
        quizScore: score,
        totalQuestions: maxScore,
        percentage,
        dateCompleted: submittedAt,
        tasksCompleted: {
          flashcards: true,
          matching: true,
          practice: true,
          roleplay: true,
          quiz: true
        }
      };
      const { updatedStudent, newBadges } = StudentStorageService.saveHomework(student.studentNumber, hwRecord);
      if (updatedStudent) onStudentUpdated?.(updatedStudent);
      if (newBadges.length > 0) {
        onBadgeUnlocked?.(newBadges[0]);
      }
    }
  };

  // Upload test file (.txt / .json) directly from teacher's computer
  const handleTestFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!newTestTitle.trim()) {
      setNewTestTitle(file.name.replace(/\.[^/.]+$/, ""));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) || parsed.questions) {
          const qs = Array.isArray(parsed) ? parsed : parsed.questions;
          if (parsed.title) setNewTestTitle(parsed.title);
          if (parsed.unitCode) setNewTestCode(parsed.unitCode);
          if (parsed.timeLimitMinutes) setNewTestTimeLimit(parsed.timeLimitMinutes);
          if (parsed.descriptionVi) setNewTestDesc(parsed.descriptionVi);
          
          const textFormatted = qs.map((q: any, i: number) => {
            const opts = q.options ? q.options.map((o: string, idx: number) => `${String.fromCharCode(65 + idx)}. ${o}`).join('\n') : '';
            return `Câu ${i + 1}: ${q.question}\n${opts}\nĐáp án: ${q.correctAnswer}\nGiải thích: ${q.explanation || ''}`;
          }).join('\n\n');
          setBulkQuestionsText(textFormatted);
          return;
        }
      } catch {
        // Plain text format
      }
      setBulkQuestionsText(content);
    };
    reader.readAsText(file);
  };

  // Parse bulk text into questions
  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle.trim()) return;

    const parsedQuestions: TestQuestion[] = [];
    const blocks = bulkQuestionsText.split(/Câu \d+[:.]/gi).filter(b => b.trim().length > 0);

    blocks.forEach((block, idx) => {
      const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      let question = `Question ${idx + 1}`;
      const options: string[] = [];
      let correctAnswer = '';
      let explanation = 'Dựa theo giáo trình tiếng Anh CNTT.';

      lines.forEach(line => {
        if (/^[A-D]\./i.test(line)) {
          options.push(line.replace(/^[A-D]\.\s*/i, '').trim());
        } else if (/^Đáp án[:.]/i.test(line)) {
          const letter = line.replace(/^Đáp án[:.]\s*/i, '').trim().toUpperCase();
          if (letter === 'A' && options[0]) correctAnswer = options[0];
          else if (letter === 'B' && options[1]) correctAnswer = options[1];
          else if (letter === 'C' && options[2]) correctAnswer = options[2];
          else if (letter === 'D' && options[3]) correctAnswer = options[3];
          else correctAnswer = letter;
        } else if (/^Giải thích[:.]/i.test(line)) {
          explanation = line.replace(/^Giải thích[:.]\s*/i, '').trim();
        } else if (!question || question.startsWith('Question ')) {
          question = line;
        }
      });

      if (options.length >= 2) {
        parsedQuestions.push({
          id: `q-custom-${idx + 1}-${Date.now()}`,
          question,
          options,
          correctAnswer: correctAnswer || options[0],
          explanation,
          points: 10
        });
      }
    });

    if (parsedQuestions.length === 0) {
      alert('Không phân tích được câu hỏi nào. Vui lòng kiểm tra định dạng!');
      return;
    }

    const testId = editingTestId || `custom-test-${Date.now()}`;
    const newTest: TestUnit = {
      id: testId,
      title: newTestTitle.trim(),
      unitCode: newTestCode.trim().toUpperCase() || 'CUSTOM-TEST',
      descriptionVi: newTestDesc.trim() || 'Đề kiểm tra do giảng viên tải lên trực tiếp trên web.',
      timeLimitMinutes: newTestTimeLimit,
      totalQuestions: parsedQuestions.length,
      questions: parsedQuestions,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      isCustom: true
    };

    TestStorageService.saveCustomTest(newTest);
    const updated = TestStorageService.getAllTests();
    setTests(updated);
    setSelectedTest(newTest);
    setEditingTestId(null);
    setActiveView('folder');
    if (soundEnabled) audioService.playCorrect();
  };

  const handleEditTest = (test: TestUnit) => {
    setEditingTestId(test.id);
    setNewTestTitle(test.title);
    setNewTestCode(test.unitCode);
    setNewTestTimeLimit(test.timeLimitMinutes);
    setNewTestDesc(test.descriptionVi);

    const formatted = test.questions.map((q, idx) => {
      const opts = q.options.map((o, optIdx) => `${String.fromCharCode(65 + optIdx)}. ${o}`).join('\n');
      return `Câu ${idx + 1}: ${q.question}\n${opts}\nĐáp án: ${q.correctAnswer}\nGiải thích: ${q.explanation || ''}`;
    }).join('\n\n');

    setBulkQuestionsText(formatted);
    setActiveView('upload');
  };

  const handleDeleteTest = (test: TestUnit) => {
    if (window.confirm(`Thầy/Cô có chắc chắn muốn xoá đề kiểm tra "${test.title}" không?`)) {
      TestStorageService.deleteTest(test.id);
      setTests(TestStorageService.getAllTests());
      if (soundEnabled) audioService.playClick();
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`space-y-6 max-w-5xl mx-auto ${projectionMode ? 'text-lg' : ''}`}>
      {/* Folder Hub Navigation Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <FolderCheck className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`font-black text-white ${projectionMode ? 'text-2xl' : 'text-xl'}`}>
                Folder Test Unit (Ngân Hàng Đề Kiểm Tra & Thi Trực Tuyến)
              </h2>
              {isTeacher ? (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Quyền Giảng Viên
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Chế độ Học Viên
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {isTeacher
                ? 'Giảng viên có quyền tải lên đề kiểm tra, chỉnh sửa câu hỏi, xóa đề và quản lý bảng điểm toàn lớp.'
                : 'Học viên làm bài kiểm tra trực tiếp do giảng viên giao, chấm điểm và lưu kết quả tự động.'}
            </p>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('folder')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeView === 'folder'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            Danh Sách Đề ({tests.length})
          </button>

          {/* Teacher Only Views */}
          {isTeacher && (
            <>
              <button
                onClick={() => {
                  setEditingTestId(null);
                  setActiveView('upload');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'upload'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-800 text-rose-300 hover:text-white border border-rose-500/30'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Đề Mới</span>
              </button>

              <button
                onClick={() => setActiveView('gradebook')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'gradebook'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-800 text-emerald-300 hover:text-white border border-emerald-500/30'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Bảng Điểm Lớp ({submissions.length})</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* VIEW 1: FOLDER LIST OF TESTS */}
      {activeView === 'folder' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/60 rounded-3xl p-5 sm:p-6 transition-all shadow-lg flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {test.unitCode}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {test.timeLimitMinutes} phút
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-indigo-300 transition-colors">
                    {test.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                    {test.descriptionVi}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-400">
                    <strong className="text-amber-300 font-bold">{test.questions.length}</strong> câu hỏi
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Teacher Edit & Delete Buttons */}
                    {isTeacher && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleEditTest(test)}
                          className="px-2.5 py-2 rounded-xl bg-slate-750 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1 border border-slate-600"
                          title="Chỉnh sửa đề thi này"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Sửa</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTest(test)}
                          className="px-2.5 py-2 rounded-xl bg-slate-750 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1 border border-slate-600"
                          title="Xóa đề thi này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Xóa</span>
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => handleStartTest(test)}
                      className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Làm Bài Thi</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: EXAM TAKING MODE (LÀM BÀI TRỰC TIẾP TRÊN WEB) */}
      {activeView === 'exam' && selectedTest && (
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Exam Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {selectedTest.unitCode}
                </span>
                <h3 className="font-black text-white text-base sm:text-lg">
                  {selectedTest.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {student ? `Học viên: ${student.fullName} (MSSV: ${student.studentNumber} - Lớp: ${student.className})` : 'Học viên tự do'}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 font-mono text-base font-bold shadow-md ${
              timeLeftSeconds < 120 
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-900 border-amber-500/40 text-amber-300'
            }`}>
              <Clock className="w-4 h-4" />
              <span>Thời gian còn: {formatTimer(timeLeftSeconds)}</span>
            </div>
          </div>

          {/* Question Palette Grid */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Danh sách câu hỏi:</span>
              <span className="font-mono text-indigo-400">
                Đã làm: {Object.keys(answers).length} / {selectedTest.questions.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedTest.questions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isFlagged = flaggedQIds.has(q.id);
                const isCurrent = idx === currentQIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-9 h-9 rounded-xl font-bold text-xs transition-all relative cursor-pointer ${
                      isCurrent
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 bg-indigo-600 text-white'
                        : isAnswered
                        ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-300'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-1 ring-slate-900"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Display */}
          {selectedTest.questions[currentQIndex] && (
            <div className="space-y-5 bg-slate-900/80 rounded-3xl p-6 sm:p-7 border border-slate-700/80">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Câu hỏi {currentQIndex + 1} / {selectedTest.questions.length} ({selectedTest.questions[currentQIndex].points || 10} điểm)
                </span>

                <button
                  onClick={() => toggleFlag(selectedTest.questions[currentQIndex].id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    flaggedQIds.has(selectedTest.questions[currentQIndex].id)
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQIds.has(selectedTest.questions[currentQIndex].id) ? 'Đã cắm cờ xem lại' : 'Cắm cờ'}</span>
                </button>
              </div>

              {/* Question text */}
              <h4 className={`font-bold text-white leading-relaxed ${projectionMode ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
                {selectedTest.questions[currentQIndex].question}
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {selectedTest.questions[currentQIndex].options.map((opt, optIdx) => {
                  const isSelected = answers[selectedTest.questions[currentQIndex].id] === opt;

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectAnswer(selectedTest.questions[currentQIndex].id, opt)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-400 text-white ring-2 ring-indigo-400/40 shadow-lg'
                          : 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-750 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className={`font-semibold ${projectionMode ? 'text-xl' : 'text-sm sm:text-base'}`}>
                          {opt}
                        </span>
                      </div>

                      {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next & Submit */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => prev - 1)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    currentQIndex > 0 ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 cursor-not-allowed'
                  }`}
                >
                  ← Câu trước
                </button>

                <div className="flex items-center gap-2">
                  {currentQIndex + 1 < selectedTest.questions.length ? (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all"
                    >
                      Câu tiếp theo →
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubmitExam(false)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                    >
                      Nộp Bài Thi Ngay
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Floating Final Submit Button */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-700/80">
            <span className="text-xs text-slate-400">
              Kiểm tra kỹ các câu hỏi trước khi nộp bài thi chính thức.
            </span>

            <button
              onClick={() => handleSubmitExam(false)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Nộp Bài & Chấm Điểm
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: EXAM RESULT & EXPLANATIONS */}
      {activeView === 'result' && examResult && selectedTest && (
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Result Card Header */}
          <div className="text-center space-y-4 p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/40 shadow-xl">
            <div className="inline-flex p-4 rounded-3xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              <Award className="w-12 h-12 text-amber-400" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Kết Quả Bài Thi: {selectedTest.title}
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-6 py-2">
              <div className="bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Điểm thi đạt được</span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-1">
                  {examResult.score} / {examResult.maxScore}
                </div>
                <div className="text-xs text-emerald-400 font-bold mt-0.5">{examResult.percentage}% chính xác</div>
              </div>

              <div className="bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800 text-left">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Thông tin nộp bài</span>
                <div className="text-sm font-bold text-white mt-1">{examResult.studentName}</div>
                <div className="text-xs text-slate-400">MSSV: {examResult.studentNumber} • Lớp: {examResult.className}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">Thời gian: {examResult.timeSpentSeconds}s</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('folder')}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Về Danh Sách Đề Thi
              </button>

              <button
                onClick={() => handleStartTest(selectedTest)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Thi Lại Lượt Mới</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Chi tiết bài làm và đáp án giải thích ({selectedTest.questions.length} câu):
            </h4>

            <div className="space-y-3.5">
              {selectedTest.questions.map((q, idx) => {
                const userAns = examResult.answers[q.id];
                const isCorrect = userAns && userAns.trim() === q.correctAnswer.trim();

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border space-y-2 text-sm ${
                      isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-200'
                        : 'bg-rose-950/30 border-rose-500/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span>Câu {idx + 1}:</span>
                        <span>{q.question}</span>
                      </div>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4" /> +{q.points || 10}đ
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-400 font-bold text-xs flex-shrink-0">
                          <XCircle className="w-4 h-4" /> 0đ
                        </span>
                      )}
                    </div>

                    <div className="text-xs space-y-1">
                      <div>
                        Lựa chọn của bạn: <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>{userAns || 'Chưa chọn'}</strong>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-300">
                          Đáp án đúng: <strong>{q.correctAnswer}</strong>
                        </div>
                      )}
                      <div className="text-slate-400 italic pt-1 border-t border-slate-800">
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: TEACHER UPLOAD / CREATE TEST */}
      {activeView === 'upload' && (
        <form onSubmit={handleCreateTest} className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div>
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-white text-lg">
                Giảng Viên Soạn Thảo & Tải Lên Đề Kiểm Tra Mới
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Nhập tiêu đề, thời gian làm bài và dán danh sách câu hỏi. Đề kiểm tra sẽ được lưu vĩnh viễn trên web để sinh viên làm trực tiếp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Tên đề kiểm tra *</label>
              <input
                type="text"
                required
                value={newTestTitle}
                onChange={(e) => setNewTestTitle(e.target.value)}
                placeholder="VD: Kiểm Tra 15 Phút Unit 6 - Hệ Thống Mạng"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mã đề (Unit Code)</label>
              <input
                type="text"
                value={newTestCode}
                onChange={(e) => setNewTestCode(e.target.value)}
                placeholder="VD: TEST-U6"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Thời gian làm bài (Phút)</label>
              <input
                type="number"
                min={5}
                max={120}
                value={newTestTimeLimit}
                onChange={(e) => setNewTestTimeLimit(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mô tả ngắn</label>
              <input
                type="text"
                value={newTestDesc}
                onChange={(e) => setNewTestDesc(e.target.value)}
                placeholder="VD: Kiểm tra kiến thức Router, Switch, Modem và VPN"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
          </div>

          {/* Bulk Questions Editor */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Nội dung câu hỏi (Dán hoặc tải file .txt / .json):
              </label>

              <label className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm">
                <Upload className="w-3.5 h-3.5" />
                <span>Tải file đề thi (.txt / .json)</span>
                <input
                  type="file"
                  accept=".txt,.json"
                  onChange={handleTestFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              rows={12}
              value={bulkQuestionsText}
              onChange={(e) => setBulkQuestionsText(e.target.value)}
              placeholder="Dán câu hỏi hoặc chọn file đề thi..."
              className="w-full p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 border border-slate-700 focus:outline-none focus:border-rose-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setActiveView('folder')}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:text-white"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Lưu & Phát Hành Đề Kiểm Tra Ngay</span>
            </button>
          </div>
        </form>
      )}

      {/* VIEW 5: TEACHER GRADEBOOK (BẢNG ĐIỂM LỚP HỌC) */}
      {activeView === 'gradebook' && (
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
            <div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>Bảng Điểm Làm Bài Trực Tuyến Của Sinh Viên ({submissions.length})</span>
              </h3>
              <p className="text-xs text-slate-400">
                Lưu trữ tự động khi sinh viên hoàn thành bài thi trên web.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-sky-400" />
                <span>In Bảng Điểm</span>
              </button>

              {submissions.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Bạn có chắc muốn xóa lịch sử điểm thi của lớp?')) {
                      TestStorageService.clearSubmissions();
                      setSubmissions([]);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa</span>
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          {submissions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs sm:text-sm">
              Chưa có sinh viên nào nộp bài thi.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">MSSV</th>
                    <th className="py-2.5 px-3">Họ và Tên</th>
                    <th className="py-2.5 px-3">Lớp</th>
                    <th className="py-2.5 px-3">Đề Kiểm Tra</th>
                    <th className="py-2.5 px-3 text-right">Điểm Số</th>
                    <th className="py-2.5 px-3 text-right">Thời Gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {submissions.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-850/50">
                      <td className="py-3 px-3 font-mono font-bold text-sky-300">{s.studentNumber}</td>
                      <td className="py-3 px-3 font-semibold text-white">{s.studentName}</td>
                      <td className="py-3 px-3 text-slate-300">{s.className}</td>
                      <td className="py-3 px-3 text-slate-200">{s.testTitle}</td>
                      <td className="py-3 px-3 text-right font-black text-amber-300">
                        {s.score} / {s.maxScore} <span className="text-[11px] text-emerald-400 font-semibold">({s.percentage}%)</span>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400 font-mono text-xs">{s.submittedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
