import React from 'react';
import { 
  X, 
  User, 
  Printer, 
  Award, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  LogOut, 
  FileText,
  Clock,
  Sparkles,
  Trophy,
  ShieldCheck
} from 'lucide-react';
import { StudentProfile } from '../types/index.ts';
import { ALL_BADGES } from '../utils/studentStorage.ts';

interface StudentProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
  onLogout: () => void;
  onOpenAchievements: () => void;
  onSwitchAccount: () => void;
}

export const StudentProfileDrawer: React.FC<StudentProfileDrawerProps> = ({
  isOpen,
  onClose,
  student,
  onLogout,
  onOpenAchievements,
  onSwitchAccount
}) => {
  if (!isOpen || !student) return null;

  const isTeacher = student.role === 'teacher';

  const handlePrintHomework = () => {
    window.print();
  };

  const unlockedBadgesCount = student.badges.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border-l border-slate-700 w-full max-w-xl h-full shadow-2xl overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300 print:max-w-full print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Top Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-850/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg ${
              isTeacher
                ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/30'
                : 'bg-gradient-to-tr from-indigo-600 to-sky-400 text-white shadow-indigo-600/30'
            }`}>
              {isTeacher ? 'GV' : student.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-lg leading-tight">
                  {student.fullName}
                </h3>
                {isTeacher && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Giảng Viên
                  </span>
                )}
              </div>
              <p className="text-xs text-sky-400 font-medium">
                {isTeacher ? 'Tài khoản:' : 'MSSV:'} <span className="font-mono font-bold text-slate-200">{student.studentNumber}</span> • {student.className}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {isTeacher && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 text-sm mb-0.5">Tài Khoản Giảng Viên Quản Trị</strong>
                Thầy/Cô có toàn quyền thêm, sửa, xóa các bài tập, video quiz, bài kiểm tra trong Folder Test Unit cũng như điều chỉnh nội dung giáo án.
              </div>
            </div>
          )}
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Tổng Điểm Tích Lũy</span>
              <div className="text-2xl font-black text-amber-300 mt-1">{student.totalScore}</div>
            </div>

            <div 
              onClick={onOpenAchievements}
              className="p-3.5 rounded-2xl bg-slate-800/60 border border-amber-500/40 cursor-pointer hover:border-amber-400 transition-colors"
            >
              <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" /> Huy Hiệu
              </span>
              <div className="text-2xl font-black text-white mt-1">
                {unlockedBadgesCount} <span className="text-xs text-slate-400 font-normal">/ {ALL_BADGES.length}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 col-span-2 sm:col-span-1">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Đã Nộp Bài Tập</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {student.homeworkHistory.length} <span className="text-xs text-slate-400 font-normal">lượt</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Nhật Ký & Báo Cáo Bài Tập Về Nhà (Homework Log)
            </h4>

            <button
              onClick={handlePrintHomework}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="In phiếu bài tập nộp cho giáo viên"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span>In Phiếu Nộp Bài</span>
            </button>
          </div>

          {/* Homework Submission History Table */}
          <div className="space-y-3">
            {student.homeworkHistory.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-800/40 border border-dashed border-slate-700 space-y-2">
                <FileText className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-sm text-slate-400 font-medium">Chưa có bản nộp bài tập nào.</p>
                <p className="text-xs text-slate-500">
                  Hãy hoàn thành bài kiểm tra 10 câu ở mục "Kiểm tra 10 câu" để ghi nhận bài tập về nhà!
                </p>
              </div>
            ) : (
              student.homeworkHistory.map((rec) => {
                const isPerfect = rec.percentage === 100;

                return (
                  <div
                    key={rec.id}
                    className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                      isPerfect
                        ? 'bg-gradient-to-r from-amber-950/30 via-slate-850 to-slate-900 border-amber-500/40'
                        : 'bg-slate-850 border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-900/60 text-sky-300 border border-sky-600/30">
                            Unit {rec.unitNumber}
                          </span>
                          <span className="font-bold text-white text-sm">
                            {rec.unitNameEn}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{rec.dateCompleted}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-black text-amber-300 text-base">
                          {rec.quizScore} / {rec.totalQuestions}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isPerfect 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {rec.percentage}% chuẩn xác
                        </span>
                      </div>
                    </div>

                    {/* Task checklist completed in this session */}
                    <div className="pt-2 border-t border-slate-800 text-[11px] flex flex-wrap items-center gap-3 text-slate-400">
                      <span className="font-semibold text-slate-300">Đã hoàn thành:</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" /> Bài Quiz ({rec.quizScore}đ)
                      </span>
                      {rec.tasksCompleted.flashcards && (
                        <span className="flex items-center gap-1 text-sky-400">
                          <CheckCircle2 className="w-3 h-3" /> Flashcards
                        </span>
                      )}
                      {rec.tasksCompleted.matching && (
                        <span className="flex items-center gap-1 text-indigo-400">
                          <CheckCircle2 className="w-3 h-3" /> Ghép từ
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Drawer Bottom Bar */}
        <div className="p-6 border-t border-slate-800 bg-slate-850/60 flex items-center justify-between gap-3">
          <button
            onClick={onSwitchAccount}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Đổi tài khoản khác</span>
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
};
