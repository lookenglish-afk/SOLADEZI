import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Medal, 
  Trash2, 
  UserPlus, 
  Check, 
  Sparkles, 
  Crown,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioService } from '../utils/audio.ts';

export interface LeaderboardEntry {
  id: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

interface LeaderboardProps {
  unitId: string;
  unitTitle: string;
  currentScore?: number;
  totalQuestions?: number;
  soundEnabled: boolean;
  projectionMode: boolean;
  canSubmit?: boolean;
  onSubmitted?: () => void;
}

const STORAGE_PREFIX = 'nmt_leaderboard_';

export const Leaderboard: React.FC<LeaderboardProps> = ({
  unitId,
  unitTitle,
  currentScore,
  totalQuestions = 10,
  soundEnabled,
  projectionMode,
  canSubmit = false,
  onSubmitted
}) => {
  const storageKey = `${STORAGE_PREFIX}${unitId}`;
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [studentName, setStudentName] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load from LocalStorage
  const loadLeaderboard = () => {
    try {
      const data = localStorage.getItem(storageKey);
      if (data) {
        const parsed: LeaderboardEntry[] = JSON.parse(data);
        setEntries(parsed.slice(0, 5));
      } else {
        // Sample default placeholder students for live class atmosphere if empty
        setEntries([]);
      }
    } catch {
      setEntries([]);
    }
  };

  useEffect(() => {
    loadLeaderboard();
    setHasSubmitted(false);
    setStudentName('');
  }, [unitId, storageKey]);

  // Handle saving new score
  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || currentScore === undefined || hasSubmitted) return;

    const percentage = Math.round((currentScore / totalQuestions) * 100);
    const now = new Date();
    const formattedDate = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}`;

    const newEntry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random()}`,
      studentName: studentName.trim(),
      score: currentScore,
      totalQuestions,
      percentage,
      date: formattedDate
    };

    // Append, sort descending by score then percentage, keep top 5
    const updated = [...entries, newEntry]
      .sort((a, b) => b.score - a.score || b.percentage - a.percentage)
      .slice(0, 5);

    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // storage error
    }

    setEntries(updated);
    setHasSubmitted(true);
    if (soundEnabled) audioService.playCorrect();

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    if (onSubmitted) {
      onSubmitted();
    }
  };

  // Clear leaderboard for a new class
  const handleClear = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setEntries([]);
    setShowClearConfirm(false);
    if (soundEnabled) audioService.playClick();
  };

  const getRankBadge = (rankIndex: number) => {
    switch (rankIndex) {
      case 0:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/30 ring-2 ring-yellow-200">
            <Crown className="w-4 h-4" />
          </div>
        );
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-900 font-bold flex items-center justify-center shadow-md ring-2 ring-slate-300">
            <Medal className="w-4 h-4 text-slate-700" />
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700 to-amber-600 text-white font-bold flex items-center justify-center shadow-md ring-2 ring-amber-500/50">
            <Medal className="w-4 h-4 text-amber-200" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs">
            #{rankIndex + 1}
          </div>
        );
    }
  };

  return (
    <div className={`bg-slate-800/90 border border-slate-700/80 rounded-3xl p-5 sm:p-7 space-y-5 shadow-2xl ${
      projectionMode ? 'text-lg' : ''
    }`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/30">
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-black text-white tracking-tight ${projectionMode ? 'text-2xl' : 'text-xl'}`}>
                Bảng Vàng Thi Đua Lớp Học (Top 5 Leaderboard)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                High Scores
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Lưu điểm tự động tại lớp • {unitTitle}
            </p>
          </div>
        </div>

        {/* Clear/Reset button for Teacher */}
        {entries.length > 0 && (
          <div className="flex items-center gap-2">
            {!showClearConfirm ? (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="text-xs text-slate-400 hover:text-rose-400 p-2 rounded-xl hover:bg-slate-700/60 transition-colors flex items-center gap-1 cursor-pointer"
                title="Xóa danh sách để bắt đầu tiết học mới"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Xóa bảng điểm</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-rose-950/70 border border-rose-500/40 p-1.5 rounded-xl animate-in fade-in">
                <span className="text-[11px] text-rose-200 px-1 font-semibold">Xóa sạch?</span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2 py-0.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                >
                  Xác nhận
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submission Form (Shown when student completed quiz and hasn't submitted yet) */}
      {canSubmit && currentScore !== undefined && !hasSubmitted && (
        <form 
          onSubmit={handleSaveScore}
          className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-amber-950/40 border border-amber-500/40 space-y-3 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ghi danh vào Bảng Vàng lớp học</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-300">
              Điểm của bạn: {currentScore} / {totalQuestions}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                maxLength={25}
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Nhập họ tên hoặc nickname học viên..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-semibold placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              disabled={!studentName.trim()}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                studentName.trim()
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Lưu Điểm</span>
            </button>
          </div>
        </form>
      )}

      {hasSubmitted && (
        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Điểm số của bạn đã được ghi nhận vào Bảng Vàng lớp học!</span>
        </div>
      )}

      {/* Top 5 High Scores List */}
      <div className="space-y-2.5">
        {entries.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-700/80 space-y-2">
            <Users className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-slate-400 text-xs sm:text-sm font-medium">
              Chưa có học viên nào ghi danh điểm số cho bài học này.
            </p>
            <p className="text-slate-500 text-[11px]">
              Hãy hoàn thành 10 câu hỏi kiểm tra và nhập tên để trở thành người dẫn đầu!
            </p>
          </div>
        ) : (
          entries.map((entry, index) => {
            const isTop1 = index === 0;

            return (
              <div
                key={entry.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isTop1
                    ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/50 ring-1 ring-amber-500/30 shadow-lg'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-700/80'
                }`}
              >
                {/* Rank & Student Name */}
                <div className="flex items-center gap-3">
                  {getRankBadge(index)}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-white tracking-tight ${
                        isTop1 ? 'text-amber-200' : 'text-slate-100'
                      } ${projectionMode ? 'text-xl' : 'text-sm sm:text-base'}`}>
                        {entry.studentName}
                      </span>
                      {isTop1 && (
                        <span className="text-[10px] uppercase font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                          Quán quân
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {entry.date}
                    </span>
                  </div>
                </div>

                {/* Score & Percentage */}
                <div className="text-right">
                  <div className={`font-black tracking-tight ${
                    isTop1 ? 'text-amber-300 text-lg sm:text-xl' : 'text-white text-base sm:text-lg'
                  }`}>
                    {entry.score} <span className="text-xs text-slate-400 font-normal">/ {entry.totalQuestions}</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400">
                    {entry.percentage}% chuẩn xác
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
