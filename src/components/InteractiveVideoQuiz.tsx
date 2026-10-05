import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Video, 
  Upload, 
  Sparkles, 
  Clock, 
  HelpCircle,
  Volume2,
  VolumeX,
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoLesson, VideoQuizCheckpoint, StudentProfile, AchievementBadge } from '../types/index.ts';
import { defaultVideoLessons } from '../data/videoLessons.ts';
import { audioService } from '../utils/audio.ts';
import { StudentStorageService } from '../utils/studentStorage.ts';

interface InteractiveVideoQuizProps {
  currentUnitNumber: number;
  soundEnabled: boolean;
  projectionMode: boolean;
  student?: StudentProfile | null;
  onStudentUpdated?: (student: StudentProfile) => void;
  onBadgeUnlocked?: (badge: AchievementBadge) => void;
}

const CUSTOM_VIDEO_LESSONS_KEY = 'nmt_custom_video_lessons_v2';

export const InteractiveVideoQuiz: React.FC<InteractiveVideoQuizProps> = ({
  currentUnitNumber,
  soundEnabled,
  projectionMode,
  student,
  onStudentUpdated,
  onBadgeUnlocked
}) => {
  const [lessons, setLessons] = useState<VideoLesson[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_VIDEO_LESSONS_KEY);
      const custom: VideoLesson[] = saved ? JSON.parse(saved) : [];
      return [...defaultVideoLessons, ...custom];
    } catch {
      return defaultVideoLessons;
    }
  });

  // Select video matching current unit or first video
  const matchedLesson = lessons.find(l => l.unitNumber === currentUnitNumber) || lessons[0];
  const [currentLesson, setCurrentLesson] = useState<VideoLesson>(matchedLesson);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Active Checkpoint modal triggered
  const [activeCheckpoint, setActiveCheckpoint] = useState<VideoQuizCheckpoint | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [answeredCheckpointIds, setAnsweredCheckpointIds] = useState<Set<string>>(new Set());
  const [checkpointScores, setCheckpointScores] = useState<Record<string, boolean>>({});

  // Teacher Editor state
  const [isTeacherEditorOpen, setIsTeacherEditorOpen] = useState(false);
  const [newCpQuestion, setNewCpQuestion] = useState('');
  const [newCpOptA, setNewCpOptA] = useState('');
  const [newCpOptB, setNewCpOptB] = useState('');
  const [newCpOptC, setNewCpOptC] = useState('');
  const [newCpOptD, setNewCpOptD] = useState('');
  const [newCpCorrect, setNewCpCorrect] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [newCpExplanation, setNewCpExplanation] = useState('');
  const [targetTimestamp, setTargetTimestamp] = useState<number>(0);
  const [customVideoTitle, setCustomVideoTitle] = useState('');
  const [customVideoUrlInput, setCustomVideoUrlInput] = useState('');

  // Switch video when unit changes
  useEffect(() => {
    const found = lessons.find(l => l.unitNumber === currentUnitNumber) || lessons[0];
    if (found) {
      setCurrentLesson(found);
      setAnsweredCheckpointIds(new Set());
      setCheckpointScores({});
      setActiveCheckpoint(null);
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [currentUnitNumber, lessons]);

  // Video timeupdate handler - Auto-pause at checkpoints!
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Check if we hit an unanswered checkpoint within 0.6 seconds window
    if (!activeCheckpoint) {
      const hit = currentLesson.checkpoints.find(cp => {
        const notAnswered = !answeredCheckpointIds.has(cp.id);
        const nearTime = Math.abs(time - cp.timestampSeconds) < 0.6 && time >= cp.timestampSeconds - 0.2;
        return notAnswered && nearTime;
      });

      if (hit) {
        // Auto-pause video and pop up quiz!
        videoRef.current.pause();
        setIsPlaying(false);
        setActiveCheckpoint(hit);
        setSelectedOption(null);
        setIsAnswerConfirmed(false);
        if (soundEnabled) audioService.playClick();
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Checkpoint Answer confirmation
  const handleConfirmAnswer = () => {
    if (!activeCheckpoint || !selectedOption || isAnswerConfirmed) return;

    setIsAnswerConfirmed(true);
    const isCorrect = selectedOption.trim() === activeCheckpoint.correctAnswer.trim();

    if (isCorrect) {
      if (soundEnabled) audioService.playCorrect();
    } else {
      if (soundEnabled) audioService.playIncorrect();
    }

    setCheckpointScores(prev => ({ ...prev, [activeCheckpoint.id]: isCorrect }));
    setAnsweredCheckpointIds(prev => new Set(prev).add(activeCheckpoint.id));
  };

  const handleResumeVideo = () => {
    setActiveCheckpoint(null);
    setSelectedOption(null);
    setIsAnswerConfirmed(false);

    // Check if student completed all checkpoints in this video
    const totalCps = currentLesson.checkpoints.length;
    const answeredCount = answeredCheckpointIds.size;
    if (answeredCount >= totalCps && student) {
      // Award matching/video task completion
      const { updatedStudent, newBadges } = StudentStorageService.markTaskCompleted(
        student.studentNumber,
        `unit-${currentLesson.unitNumber || 1}`,
        'practiceCompleted'
      );
      if (updatedStudent) onStudentUpdated?.(updatedStudent);
      if (newBadges.length > 0) {
        onBadgeUnlocked?.(newBadges[0]);
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch {}
      }
    }

    // Advance time slightly to avoid re-triggering the same checkpoint
    if (videoRef.current) {
      videoRef.current.currentTime += 0.8;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Teacher uploads a local video from laptop/PC
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const newLesson: VideoLesson = {
      id: `custom-vid-${Date.now()}`,
      title: customVideoTitle.trim() || file.name.replace(/\.[^/.]+$/, ""),
      descriptionVi: `Video giáo viên tải lên: ${file.name}`,
      videoUrl: fileUrl,
      unitNumber: currentUnitNumber,
      checkpoints: []
    };

    saveNewVideoLesson(newLesson);
  };

  // Teacher submits online video URL
  const handleAddVideoByUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVideoUrlInput.trim()) return;

    const newLesson: VideoLesson = {
      id: `custom-vid-${Date.now()}`,
      title: customVideoTitle.trim() || 'Video Bài Giảng Tùy Chỉnh',
      descriptionVi: 'Video bài giảng trực tuyến do giáo viên tích hợp câu hỏi.',
      videoUrl: customVideoUrlInput.trim(),
      unitNumber: currentUnitNumber,
      checkpoints: []
    };

    saveNewVideoLesson(newLesson);
    setCustomVideoUrlInput('');
    setCustomVideoTitle('');
  };

  const saveNewVideoLesson = (newLesson: VideoLesson) => {
    const updated = [newLesson, ...lessons];
    setLessons(updated);
    setCurrentLesson(newLesson);
    try {
      const customOnly = updated.filter(l => l.id.startsWith('custom-vid-'));
      localStorage.setItem(CUSTOM_VIDEO_LESSONS_KEY, JSON.stringify(customOnly));
    } catch {}
    if (soundEnabled) audioService.playCorrect();
  };

  // Teacher adds checkpoint at current video timestamp
  const handleAddCheckpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCpQuestion.trim() || !newCpOptA.trim() || !newCpOptB.trim()) return;

    const options = [newCpOptA.trim(), newCpOptB.trim()];
    if (newCpOptC.trim()) options.push(newCpOptC.trim());
    if (newCpOptD.trim()) options.push(newCpOptD.trim());

    let correctText = newCpOptA.trim();
    if (newCpCorrect === 'B') correctText = newCpOptB.trim();
    if (newCpCorrect === 'C') correctText = newCpOptC.trim() || newCpOptA.trim();
    if (newCpCorrect === 'D') correctText = newCpOptD.trim() || newCpOptA.trim();

    const newCp: VideoQuizCheckpoint = {
      id: `cp-${Date.now()}`,
      timestampSeconds: Math.round(targetTimestamp),
      question: newCpQuestion.trim(),
      options,
      correctAnswer: correctText,
      explanationVi: newCpExplanation.trim() || `Đáp án đúng là: ${correctText}`
    };

    const updatedCheckpoints = [...currentLesson.checkpoints, newCp].sort(
      (a, b) => a.timestampSeconds - b.timestampSeconds
    );

    const updatedLesson = {
      ...currentLesson,
      checkpoints: updatedCheckpoints
    };

    setCurrentLesson(updatedLesson);

    // Save in lessons array
    const updatedLessons = lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l);
    setLessons(updatedLessons);
    try {
      const customOnly = updatedLessons.filter(l => l.id.startsWith('custom-vid-'));
      localStorage.setItem(CUSTOM_VIDEO_LESSONS_KEY, JSON.stringify(customOnly));
    } catch {}

    // Reset form
    setNewCpQuestion('');
    setNewCpOptA('');
    setNewCpOptB('');
    setNewCpOptC('');
    setNewCpOptD('');
    setNewCpExplanation('');
    if (soundEnabled) audioService.playCorrect();
  };

  const handleDeleteCheckpoint = (cpId: string) => {
    const updatedCheckpoints = currentLesson.checkpoints.filter(c => c.id !== cpId);
    const updatedLesson = { ...currentLesson, checkpoints: updatedCheckpoints };
    setCurrentLesson(updatedLesson);

    const updatedLessons = lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l);
    setLessons(updatedLessons);
    try {
      const customOnly = updatedLessons.filter(l => l.id.startsWith('custom-vid-'));
      localStorage.setItem(CUSTOM_VIDEO_LESSONS_KEY, JSON.stringify(customOnly));
    } catch {}
  };

  const isTeacher = student?.role === 'teacher';

  return (
    <div className={`space-y-6 max-w-5xl mx-auto ${projectionMode ? 'text-lg' : ''}`}>
      {/* Top Banner */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`font-bold text-white ${projectionMode ? 'text-2xl' : 'text-xl'}`}>
                  Interactive Video Quiz Game (Video Tương Tác Kèm Câu Hỏi)
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
              <p className={`text-slate-300 text-xs sm:text-sm mt-0.5 ${projectionMode ? 'text-base' : ''}`}>
                {isTeacher 
                  ? 'Giảng viên có thể tải lên video bài giảng mới và chọn mốc thời gian để chèn câu hỏi trắc nghiệm tương tác.'
                  : 'Video sẽ tự động dừng tại các mốc kiểm tra để sinh viên trả lời câu hỏi tương tác do giảng viên thiết lập.'}
              </p>
            </div>
          </div>
        </div>

        {/* Video Selector & Teacher Add Tool Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Select Video Lesson */}
          <select
            value={currentLesson.id}
            onChange={(e) => {
              const selected = lessons.find(l => l.id === e.target.value);
              if (selected) {
                setCurrentLesson(selected);
                setAnsweredCheckpointIds(new Set());
                setCheckpointScores({});
                setActiveCheckpoint(null);
                setIsPlaying(false);
                if (videoRef.current) videoRef.current.currentTime = 0;
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-rose-500"
          >
            {lessons.map(l => (
              <option key={l.id} value={l.id}>
                {l.title} ({l.checkpoints.length} câu hỏi)
              </option>
            ))}
          </select>

          {/* Teacher Only: Button to open Checkpoint & Video Upload Editor */}
          {isTeacher && (
            <button
              onClick={() => {
                setIsTeacherEditorOpen(!isTeacherEditorOpen);
                setTargetTimestamp(Math.round(currentTime));
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isTeacherEditorOpen
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Quiz / Upload Video</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Video & Overlay Section */}
      <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-slate-700 shadow-2xl">
        <video
          ref={videoRef}
          src={currentLesson.videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="w-full aspect-video object-contain bg-black"
          playsInline
        />

        {/* INTERACTIVE QUIZ OVERLAY: Appears when video reaches a checkpoint! */}
        {activeCheckpoint && (
          <div className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 border-2 border-rose-500/80 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 text-left">
              {/* Overlay Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-xs">
                    Mốc {formatSeconds(activeCheckpoint.timestampSeconds)}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
                    Thử Thách Video Quiz
                  </span>
                </div>
                <span className="text-xs text-amber-400 font-mono">
                  {student ? `Học viên: ${student.fullName}` : 'Trả lời để tiếp tục video'}
                </span>
              </div>

              {/* Question */}
              <h3 className={`font-bold text-white leading-relaxed ${projectionMode ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
                {activeCheckpoint.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {activeCheckpoint.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt.trim() === activeCheckpoint.correctAnswer.trim();

                  return (
                    <button
                      key={opt}
                      disabled={isAnswerConfirmed}
                      onClick={() => {
                        if (soundEnabled) audioService.playClick();
                        setSelectedOption(opt);
                      }}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        !isAnswerConfirmed
                          ? isSelected
                            ? 'bg-rose-600/30 border-rose-400 text-white ring-2 ring-rose-400/40 shadow-lg'
                            : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                          : isCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                          : isSelected
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                          : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isSelected && !isAnswerConfirmed ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className={`font-semibold ${projectionMode ? 'text-lg' : 'text-sm sm:text-base'}`}>
                          {opt}
                        </span>
                      </div>

                      {isAnswerConfirmed && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isAnswerConfirmed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {isAnswerConfirmed && (
                <div className={`p-3.5 rounded-2xl border text-xs sm:text-sm animate-in fade-in ${
                  selectedOption === activeCheckpoint.correctAnswer
                    ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                    : 'bg-rose-950/70 border-rose-500/60 text-rose-200'
                }`}>
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {selectedOption === activeCheckpoint.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Chính xác! Bạn nắm kiến thức video rất tốt.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Chưa chính xác! Đáp án đúng: <strong className="text-white underline">{activeCheckpoint.correctAnswer}</strong></span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs">
                    {activeCheckpoint.explanationVi}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                {!isAnswerConfirmed ? (
                  <button
                    disabled={!selectedOption}
                    onClick={handleConfirmAnswer}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                      selectedOption
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Xác nhận đáp án
                  </button>
                ) : (
                  <button
                    onClick={handleResumeVideo}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Tiếp tục xem video</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Custom Video Controls Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
          {/* Progress Timeline with Checkpoint Pins */}
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500 z-10"
            />

            {/* Checkpoint Pins on Timeline */}
            {currentLesson.checkpoints.map(cp => {
              const posPercent = duration > 0 ? (cp.timestampSeconds / duration) * 100 : 0;
              const isAnswered = answeredCheckpointIds.has(cp.id);
              const isCorrect = checkpointScores[cp.id];

              return (
                <div
                  key={cp.id}
                  style={{ left: `${posPercent}%` }}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = cp.timestampSeconds;
                      setCurrentTime(cp.timestampSeconds);
                    }
                  }}
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 cursor-pointer z-20 transition-transform hover:scale-125 shadow-md ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-500 border-white'
                        : 'bg-rose-500 border-white'
                      : 'bg-amber-400 border-slate-900 animate-pulse'
                  }`}
                  title={`Quiz tại ${formatSeconds(cp.timestampSeconds)}: ${cp.question}`}
                />
              );
            })}
          </div>

          {/* Bottom Bar: Play/Pause, Time, Checkpoints count */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Tạm dừng' : 'Phát video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    setCurrentTime(0);
                  }
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Xem lại từ đầu"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title={isMuted ? 'Bật âm thanh video' : 'Tắt tiếng video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-mono text-xs text-slate-400">
                {formatSeconds(currentTime)} / {formatSeconds(duration)}
              </span>
            </div>

            {/* Checkpoints summary */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">
                Mốc Quiz: <strong className="text-amber-400 font-bold">{answeredCheckpointIds.size} / {currentLesson.checkpoints.length}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TEACHER BUILDER & UPLOADER DRAWER */}
      {isTeacher && isTeacherEditorOpen && (
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-lg">
                Công Cụ Giảng Viên: Thêm Quiz Tại Giây Hiện Tại & Upload Video
              </h3>
            </div>
            <button
              onClick={() => setIsTeacherEditorOpen(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Đóng công cụ
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Upload new video */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-700/80 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Upload className="w-4 h-4" />
                <span>1. Tải lên Video Mới (Từ Máy Tính hoặc URL)</span>
              </h4>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">Tên bài giảng video:</label>
                <input
                  type="text"
                  value={customVideoTitle}
                  onChange={(e) => setCustomVideoTitle(e.target.value)}
                  placeholder="VD: Bài giảng IT Help Desk Unit 7"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* File upload input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Chọn file video từ máy (.mp4, .webm):</label>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/ogg"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white hover:file:bg-rose-500 cursor-pointer"
                />
              </div>

              {/* Or paste link */}
              <form onSubmit={handleAddVideoByUrl} className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 block">Hoặc dán URL video trực tiếp:</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customVideoUrlInput}
                    onChange={(e) => setCustomVideoUrlInput(e.target.value)}
                    placeholder="https://.../video.mp4"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold"
                  >
                    Dán URL
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Add checkpoint at timestamp */}
            <form onSubmit={handleAddCheckpoint} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-700/80 space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>2. Chèn Quiz Vào Video</span>
                </h4>
                <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-lg text-xs font-mono text-sky-300 border border-slate-700">
                  <span>Thời điểm:</span>
                  <input
                    type="number"
                    min={0}
                    max={Math.floor(duration)}
                    value={Math.round(targetTimestamp)}
                    onChange={(e) => setTargetTimestamp(Number(e.target.value))}
                    className="w-12 bg-transparent text-amber-300 font-bold focus:outline-none"
                  />
                  <span>giây ({formatSeconds(targetTimestamp)})</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Câu hỏi trắc nghiệm:</label>
                <input
                  type="text"
                  required
                  value={newCpQuestion}
                  onChange={(e) => setNewCpQuestion(e.target.value)}
                  placeholder="VD: What hardware device connects the CPU and RAM?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 4 options */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400">Lựa chọn A:</span>
                  <input
                    type="text"
                    required
                    value={newCpOptA}
                    onChange={(e) => setNewCpOptA(e.target.value)}
                    placeholder="Motherboard"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400">Lựa chọn B:</span>
                  <input
                    type="text"
                    required
                    value={newCpOptB}
                    onChange={(e) => setNewCpOptB(e.target.value)}
                    placeholder="Power supply"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400">Lựa chọn C:</span>
                  <input
                    type="text"
                    value={newCpOptC}
                    onChange={(e) => setNewCpOptC(e.target.value)}
                    placeholder="Mouse"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400">Lựa chọn D:</span>
                  <input
                    type="text"
                    value={newCpOptD}
                    onChange={(e) => setNewCpOptD(e.target.value)}
                    placeholder="Monitor"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* Correct option selector */}
              <div className="flex items-center gap-3 text-xs pt-1">
                <span className="font-semibold text-slate-300">Đáp án đúng:</span>
                {(['A', 'B', 'C', 'D'] as const).map(letter => (
                  <label key={letter} className="flex items-center gap-1 cursor-pointer text-slate-200">
                    <input
                      type="radio"
                      name="correctLetter"
                      value={letter}
                      checked={newCpCorrect === letter}
                      onChange={() => setNewCpCorrect(letter)}
                      className="accent-amber-400"
                    />
                    <span>{letter}</span>
                  </label>
                ))}
              </div>

              <div>
                <input
                  type="text"
                  value={newCpExplanation}
                  onChange={(e) => setNewCpExplanation(e.target.value)}
                  placeholder="Giải thích ngắn gọn cho sinh viên..."
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Lưu Điểm Quiz Vào Video</span>
              </button>
            </form>
          </div>

          {/* Current checkpoints in video list */}
          <div className="space-y-2 pt-2 border-t border-slate-700/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Danh sách các mốc câu hỏi trong video này ({currentLesson.checkpoints.length}):
            </h4>
            <div className="space-y-2">
              {currentLesson.checkpoints.map(cp => (
                <div key={cp.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold">
                      {formatSeconds(cp.timestampSeconds)}
                    </span>
                    <span className="font-semibold text-white">{cp.question}</span>
                    <span className="text-slate-400">({cp.options.length} lựa chọn)</span>
                  </div>

                  <button
                    onClick={() => handleDeleteCheckpoint(cp.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Xóa mốc này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
