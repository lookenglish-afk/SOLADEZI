import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  Trophy, 
  Timer, 
  Flame, 
  Sparkles,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MatchingPair, StudentProfile, AchievementBadge } from '../types/index.ts';
import { audioService } from '../utils/audio.ts';
import { StudentStorageService } from '../utils/studentStorage.ts';

interface MatchingGameProps {
  unitId?: string;
  matchingPairs: MatchingPair[];
  soundEnabled: boolean;
  projectionMode: boolean;
  student?: StudentProfile | null;
  onStudentUpdated?: (student: StudentProfile) => void;
  onBadgeUnlocked?: (badge: AchievementBadge) => void;
}

interface TileItem {
  id: string;
  pairId: string;
  type: 'english' | 'vietnamese';
  text: string;
  matched: boolean;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({
  unitId,
  matchingPairs,
  soundEnabled,
  projectionMode,
  student,
  onStudentUpdated,
  onBadgeUnlocked
}) => {
  const [tiles, setTiles] = useState<TileItem[]>([]);
  const [selectedEnglish, setSelectedEnglish] = useState<TileItem | null>(null);
  const [selectedVietnamese, setSelectedVietnamese] = useState<TileItem | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wrongPair, setWrongPair] = useState<{ enId: string; viId: string } | null>(null);

  // Initialize and shuffle board
  const initializeGame = () => {
    const englishTiles: TileItem[] = matchingPairs.map((p) => ({
      id: `en-${p.id}`,
      pairId: p.id,
      type: 'english' as const,
      text: p.english,
      matched: false
    })).sort(() => Math.random() - 0.5);

    const vietnameseTiles: TileItem[] = matchingPairs.map((p) => ({
      id: `vi-${p.id}`,
      pairId: p.id,
      type: 'vietnamese' as const,
      text: p.vietnamese,
      matched: false
    })).sort(() => Math.random() - 0.5);

    setTiles([...englishTiles, ...vietnameseTiles]);
    setSelectedEnglish(null);
    setSelectedVietnamese(null);
    setMatchedPairIds(new Set());
    setScore(0);
    setStreak(0);
    setSeconds(0);
    setIsPlaying(true);
    setIsCompleted(false);
    setWrongPair(null);
  };

  useEffect(() => {
    initializeGame();
  }, [matchingPairs]);

  // Timer effect
  useEffect(() => {
    if (!isPlaying || isCompleted) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isCompleted]);

  // Check matching logic
  const handleTileClick = (tile: TileItem) => {
    if (tile.matched || isCompleted) return;

    if (soundEnabled) audioService.playClick();

    if (tile.type === 'english') {
      // Speak English word
      if (soundEnabled) audioService.speakEn(tile.text);

      if (selectedEnglish?.id === tile.id) {
        setSelectedEnglish(null);
        return;
      }
      setSelectedEnglish(tile);

      if (selectedVietnamese) {
        checkMatch(tile, selectedVietnamese);
      }
    } else {
      if (selectedVietnamese?.id === tile.id) {
        setSelectedVietnamese(null);
        return;
      }
      setSelectedVietnamese(tile);

      if (selectedEnglish) {
        checkMatch(selectedEnglish, tile);
      }
    }
  };

  const checkMatch = (enTile: TileItem, viTile: TileItem) => {
    if (enTile.pairId === viTile.pairId) {
      // MATCH SUCCESS
      if (soundEnabled) audioService.playCorrect();

      const newMatched = new Set(matchedPairIds);
      newMatched.add(enTile.pairId);
      setMatchedPairIds(newMatched);

      const addedScore = 100 + streak * 25;
      setScore((s) => s + addedScore);
      setStreak((st) => st + 1);

      setSelectedEnglish(null);
      setSelectedVietnamese(null);

      // Check completion
      if (newMatched.size === matchingPairs.length) {
        setIsCompleted(true);
        setIsPlaying(false);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
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
            'matchingCompleted'
          );
          if (updatedStudent) onStudentUpdated?.(updatedStudent);
          if (newBadges.length > 0) {
            onBadgeUnlocked?.(newBadges[0]);
            if (soundEnabled) audioService.playCorrect();
          }
        }
      }
    } else {
      // MISMATCH
      if (soundEnabled) audioService.playIncorrect();
      setWrongPair({ enId: enTile.id, viId: viTile.id });
      setStreak(0);

      setTimeout(() => {
        setWrongPair(null);
        setSelectedEnglish(null);
        setSelectedVietnamese(null);
      }, 700);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const englishList = tiles.filter((t) => t.type === 'english');
  const vietnameseList = tiles.filter((t) => t.type === 'vietnamese');

  return (
    <div className={`space-y-6 max-w-5xl mx-auto ${projectionMode ? 'text-lg' : ''}`}>
      {/* Game Header Banner */}
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              <Sparkles className="w-5 h-5 text-sky-400" />
            </span>
            <h2 className={`font-bold text-white ${projectionMode ? 'text-2xl' : 'text-xl'}`}>
              Trò Chơi Ghép Từ (Interactive Word-Definition Match)
            </h2>
          </div>
          <p className={`text-slate-300 mt-1 ${projectionMode ? 'text-base' : 'text-sm'}`}>
            Chọn một thuật ngữ tiếng Anh ở cột trái và ghép với định nghĩa tiếng Việt tương ứng ở cột phải.
          </p>
        </div>

        {/* Live Score, Streak & Timer */}
        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{score} điểm</span>
          </div>

          <div className="flex items-center gap-1.5 text-orange-400 font-bold">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Combo: x{streak}</span>
          </div>

          <div className="flex items-center gap-1.5 text-sky-300 font-mono text-sm">
            <Timer className="w-4 h-4 text-sky-400" />
            <span>{formatTime(seconds)}</span>
          </div>

          <button
            onClick={initializeGame}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Chơi lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion Modal / Banner */}
      {isCompleted && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border-2 border-emerald-500/70 rounded-2xl p-6 text-center space-y-4 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Xuất sắc! Bạn đã ghép đúng tất cả các cặp từ!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Thời gian hoàn thành: <strong className="text-emerald-300 font-mono">{formatTime(seconds)}</strong> • Tổng điểm tích lũy: <strong className="text-amber-300">{score} điểm</strong>
          </p>
          <button
            onClick={initializeGame}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi Lượt Mới</span>
          </button>
        </div>
      )}

      {/* Two Column Layout for Classroom Projection / Screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column: English Terms */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Thuật ngữ tiếng Anh (English Terms)</span>
            <span className="text-indigo-400">{matchedPairIds.size} / {matchingPairs.length} đã ghép</span>
          </div>

          <div className="space-y-2.5">
            {englishList.map((tile) => {
              const isMatched = matchedPairIds.has(tile.pairId);
              const isSelected = selectedEnglish?.id === tile.id;
              const isWrong = wrongPair?.enId === tile.id;

              return (
                <button
                  key={tile.id}
                  disabled={isMatched}
                  onClick={() => handleTileClick(tile)}
                  className={`w-full p-4 rounded-xl text-left border transition-all relative flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300 opacity-60 cursor-not-allowed'
                      : isWrong
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200 animate-shake'
                      : isSelected
                      ? 'bg-indigo-600/25 border-indigo-400 text-white ring-2 ring-indigo-400/40 shadow-lg scale-[1.01]'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-100 border-slate-700/80 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${
                      isMatched ? 'bg-emerald-400' : isSelected ? 'bg-indigo-400' : 'bg-slate-600'
                    }`}></span>
                    <span className={`font-bold tracking-tight ${projectionMode ? 'text-xl' : 'text-base'}`}>
                      {tile.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isMatched ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-slate-400 hover:text-indigo-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Vietnamese Meanings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Định nghĩa tiếng Việt (Vietnamese Definitions)</span>
            <span className="text-slate-400">Giáo trình Pearson IT 1</span>
          </div>

          <div className="space-y-2.5">
            {vietnameseList.map((tile) => {
              const isMatched = matchedPairIds.has(tile.pairId);
              const isSelected = selectedVietnamese?.id === tile.id;
              const isWrong = wrongPair?.viId === tile.id;

              return (
                <button
                  key={tile.id}
                  disabled={isMatched}
                  onClick={() => handleTileClick(tile)}
                  className={`w-full p-4 rounded-xl text-left border transition-all relative flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300 opacity-60 cursor-not-allowed'
                      : isWrong
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200 animate-shake'
                      : isSelected
                      ? 'bg-sky-600/25 border-sky-400 text-white ring-2 ring-sky-400/40 shadow-lg scale-[1.01]'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-slate-500'
                  }`}
                >
                  <span className={`font-medium ${projectionMode ? 'text-lg' : 'text-sm'} leading-snug`}>
                    {tile.text}
                  </span>

                  {isMatched && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
