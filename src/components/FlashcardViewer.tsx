import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle2, 
  HelpCircle, 
  Play, 
  Pause, 
  BookOpen, 
  Sparkles
} from 'lucide-react';
import { VocabItem, StudentProfile, AchievementBadge } from '../types/index.ts';
import { audioService } from '../utils/audio.ts';
import { StudentStorageService } from '../utils/studentStorage.ts';

interface FlashcardViewerProps {
  unitId?: string;
  vocabList: VocabItem[];
  soundEnabled: boolean;
  projectionMode: boolean;
  student?: StudentProfile | null;
  onStudentUpdated?: (student: StudentProfile) => void;
  onBadgeUnlocked?: (badge: AchievementBadge) => void;
}

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({
  unitId,
  vocabList,
  soundEnabled,
  projectionMode,
  student,
  onStudentUpdated,
  onBadgeUnlocked
}) => {
  const [cards, setCards] = useState<VocabItem[]>(vocabList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    setCards(vocabList);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds(new Set());
    setAutoPlay(false);
  }, [vocabList]);

  const currentCard = cards[currentIndex] || cards[0];

  const handleSpeak = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (soundEnabled && currentCard) {
      audioService.speakEn(currentCard.word);
    }
  };

  const handleFlip = () => {
    if (soundEnabled) audioService.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (soundEnabled) audioService.playCorrect();

        // If completed all cards in unit
        if (next.size >= cards.length && student && unitId) {
          const { updatedStudent, newBadges } = StudentStorageService.markTaskCompleted(
            student.studentNumber,
            unitId,
            'flashcardsCompleted'
          );
          if (updatedStudent) onStudentUpdated?.(updatedStudent);
          if (newBadges.length > 0) {
            onBadgeUnlocked?.(newBadges[0]);
            if (soundEnabled) audioService.playCorrect();
          }
        }
      }
      return next;
    });
  };

  // Auto-play interval for classroom slide projection
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setIsFlipped((prev) => {
        if (!prev) {
          return true;
        } else {
          setCurrentIndex((idx) => (idx + 1) % cards.length);
          return false;
        }
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [autoPlay, cards.length]);

  if (!currentCard) {
    return (
      <div className="p-8 text-center text-slate-400">
        Không có dữ liệu thẻ từ vựng.
      </div>
    );
  }

  const isMastered = masteredIds.has(currentCard.id);

  return (
    <div className={`space-y-6 max-w-4xl mx-auto transition-all ${
      projectionMode ? 'text-lg' : ''
    }`}>
      {/* Activity Intro Banner */}
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </span>
            <h2 className={`font-bold text-white ${projectionMode ? 'text-2xl' : 'text-xl'}`}>
              Game 1: Warm-up Flashcards Từ Vựng Chuyên Ngành
            </h2>
          </div>
          <p className={`text-slate-300 mt-1 font-medium ${projectionMode ? 'text-base' : 'text-sm'}`}>
            Nhấn vào thẻ để lật xem nghĩa tiếng Việt & câu ví dụ ngữ cảnh chuẩn từ giáo trình Pearson.
          </p>
        </div>

        {/* Progress Counter & Auto Play */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tiến độ bài học</div>
            <div className="font-bold text-indigo-300 text-sm sm:text-base">
              Thẻ {currentIndex + 1} / {cards.length} ({masteredIds.size} đã thuộc)
            </div>
          </div>

          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              autoPlay
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600'
            }`}
            title="Chạy tự động cho máy chiếu lớp học"
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{autoPlay ? 'Tạm dừng' : 'Trình chiếu'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
        <div 
          className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 h-2 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Flashcard Container (3D Flip) */}
      <div 
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleFlip();
          }
        }}
        className="w-full cursor-pointer select-none perspective-1000 group focus:outline-none"
      >
        <div 
          className={`relative min-h-[380px] sm:min-h-[420px] rounded-3xl p-6 sm:p-10 transition-all duration-500 transform-style-3d border shadow-2xl ${
            isFlipped 
              ? 'bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border-indigo-500/60 ring-2 ring-indigo-500/20' 
              : 'bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border-slate-700/80 hover:border-indigo-400/50'
          }`}
        >
          {/* Card Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-700/80 text-sky-300 border border-slate-600">
              {currentCard.category || 'IT Vocabulary'}
            </span>

            <div className="flex items-center gap-2">
              {/* Pronounce Button */}
              <button
                onClick={handleSpeak}
                className="p-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 transition-colors"
                title="Phát âm tiếng Anh chuẩn"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              {/* Mastered Toggle */}
              <button
                onClick={(e) => toggleMastered(currentCard.id, e)}
                className={`p-2 rounded-xl border transition-all ${
                  isMastered
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-700/50 text-slate-400 border-slate-600 hover:text-slate-200'
                }`}
                title={isMastered ? 'Đã đánh dấu thuộc từ này' : 'Đánh dấu đã thuộc'}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Card Content Front/Back */}
          {!isFlipped ? (
            /* FRONT: English Word & Phonetics */
            <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10 space-y-4">
              <span className="text-xs sm:text-sm font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/30">
                {currentCard.partOfSpeech}
              </span>

              <h1 className={`font-extrabold text-white tracking-tight ${
                projectionMode 
                  ? 'text-4xl sm:text-5xl lg:text-6xl text-amber-300' 
                  : 'text-3xl sm:text-4xl lg:text-5xl text-slate-50'
              }`}>
                {currentCard.word}
              </h1>

              {currentCard.phonetics && (
                <p className="font-mono text-slate-400 text-base sm:text-xl">
                  {currentCard.phonetics}
                </p>
              )}

              <div className="mt-8 pt-4 flex items-center gap-2 text-xs sm:text-sm text-slate-400 group-hover:text-indigo-300 transition-colors">
                <RotateCw className="w-4 h-4 animate-spin-slow" />
                <span>Nhấn vào thẻ hoặc phím Space để lật xem nghĩa tiếng Việt & ví dụ</span>
              </div>
            </div>
          ) : (
            /* BACK: Vietnamese Meaning, Definition & Textbook Example */
            <div className="flex flex-col justify-between h-full py-2 space-y-6">
              <div className="text-center space-y-2">
                <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
                  Ý nghĩa tiếng Việt (Vietnamese Meaning)
                </div>
                <h2 className={`font-black text-amber-300 ${
                  projectionMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
                }`}>
                  {currentCard.vietnameseMeaning}
                </h2>
                {currentCard.definitionEn && (
                  <p className="text-slate-300 text-sm sm:text-base italic max-w-xl mx-auto">
                    "{currentCard.definitionEn}"
                  </p>
                )}
              </div>

              {/* Context Example from Textbook */}
              <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ví dụ ngữ cảnh thực tế (Pearson Course Book)</span>
                </div>
                <p className={`font-medium text-slate-100 ${projectionMode ? 'text-xl' : 'text-base'}`}>
                  {currentCard.exampleSentence}
                </p>
                {currentCard.exampleVietnamese && (
                  <p className="text-xs sm:text-sm text-slate-400 font-normal border-t border-slate-800 pt-1.5 mt-1.5">
                    → {currentCard.exampleVietnamese}
                  </p>
                )}
              </div>

              <div className="text-center">
                <span className="text-xs text-slate-400 hover:text-slate-200">
                  Nhấn để lật lại mặt trước
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flashcard Bottom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-all border border-slate-700 cursor-pointer"
          title="Xáo trộn ngẫu nhiên thứ tự thẻ"
        >
          <Shuffle className="w-4 h-4 text-sky-400" />
          <span>Xáo trộn (Shuffle)</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-all border border-slate-700 hover:border-slate-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Thẻ trước</span>
          </button>

          <button
            onClick={handleFlip}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
            <span>Lật thẻ</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-all border border-slate-700 hover:border-slate-600 cursor-pointer"
          >
            <span>Thẻ tiếp theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-slate-400 hidden md:block">
          Phím tắt: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Space</kbd> Lật • <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">→</kbd> Chuyển thẻ
        </div>
      </div>
    </div>
  );
};
