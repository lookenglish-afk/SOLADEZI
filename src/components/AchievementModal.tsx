import React from 'react';
import { X, Trophy, Award, Lock, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { ALL_BADGES } from '../utils/studentStorage.ts';
import { StudentProfile, AchievementBadge } from '../types/index.ts';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
  newlyUnlockedBadge?: AchievementBadge | null;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({
  isOpen,
  onClose,
  student,
  newlyUnlockedBadge
}) => {
  if (!isOpen) return null;

  const unlockedBadgeIds = new Set(student?.badges || []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-lg">
                  Hệ Thống Huy Hiệu & Thành Tích (IT Achievements)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {unlockedBadgeIds.size} / {ALL_BADGES.length} Đã Mở Khóa
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {student ? `${student.fullName} • Lớp: ${student.className}` : 'Đăng nhập tài khoản để nhận huy hiệu'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Newly Unlocked Celebration Notice */}
        {newlyUnlockedBadge && (
          <div className="p-4 bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-slate-900 border-b border-amber-500/40 flex items-center gap-3 animate-in fade-in">
            <span className="text-3xl animate-bounce">{newlyUnlockedBadge.icon}</span>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Chúc Mừng Bạn Vừa Mở Khóa Huy Hiệu Mới!
              </span>
              <div className="font-bold text-white text-sm">
                {newlyUnlockedBadge.titleVi} ({newlyUnlockedBadge.titleEn})
              </div>
            </div>
          </div>
        )}

        {/* Badges Grid */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ALL_BADGES.map((badge) => {
              const isUnlocked = unlockedBadgeIds.has(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 relative overflow-hidden ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-slate-850 to-slate-900 border-amber-500/50 shadow-lg ring-1 ring-amber-500/20'
                      : 'bg-slate-900/60 border-slate-800 opacity-60'
                  }`}
                >
                  {/* Badge Icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md ${
                    isUnlocked
                      ? `bg-gradient-to-tr ${badge.color} text-white`
                      : 'bg-slate-800 border border-slate-700 text-slate-500'
                  }`}>
                    {badge.icon}
                  </div>

                  {/* Badge Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-bold text-sm ${isUnlocked ? 'text-amber-200' : 'text-slate-300'}`}>
                        {badge.titleVi}
                      </h4>
                      {isUnlocked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400 font-medium">
                      {badge.titleEn}
                    </div>

                    <p className="text-xs text-slate-300 leading-snug">
                      {badge.descriptionVi}
                    </p>

                    <div className="pt-1.5 flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 border-t border-slate-800/80">
                      <Star className="w-3 h-3 text-amber-400" />
                      <span>Điều kiện: {badge.criteriaVi}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-850/40 flex justify-between items-center text-xs text-slate-400">
          <span>Huy hiệu được cấp và lưu trữ vĩnh viễn trong hồ sơ của bạn.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
