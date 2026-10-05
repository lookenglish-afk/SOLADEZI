import React from 'react';
import { 
  BookOpen, 
  Tv, 
  Volume2, 
  VolumeX, 
  Sparkles,
  ChevronDown,
  Trophy,
  User,
  UserCheck,
  Video,
  FolderCheck,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { UnitData, StudentProfile } from '../types/index.ts';

interface HeaderProps {
  currentUnit: UnitData;
  activeTab: 'learn' | 'matching' | 'practice' | 'roleplay' | 'quiz' | 'video' | 'testunit';
  setActiveTab: (tab: 'learn' | 'matching' | 'practice' | 'roleplay' | 'quiz' | 'video' | 'testunit') => void;
  projectionMode: boolean;
  setProjectionMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenUnitModal: () => void;
  student: StudentProfile | null;
  onOpenAuthModal: () => void;
  onOpenProfileDrawer: () => void;
  onOpenAchievements: () => void;
  onOpenTeacherManager?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUnit,
  activeTab,
  setActiveTab,
  projectionMode,
  setProjectionMode,
  soundEnabled,
  setSoundEnabled,
  onOpenUnitModal,
  student,
  onOpenAuthModal,
  onOpenProfileDrawer,
  onOpenAchievements,
  onOpenTeacherManager
}) => {
  const isTeacher = student?.role === 'teacher';
  return (
    <header className={`sticky top-0 z-40 border-b border-slate-700/80 backdrop-blur-md transition-all ${
      projectionMode ? 'bg-slate-950/95 py-3' : 'bg-slate-900/90 py-2.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Unit Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/30">
              <span className="font-extrabold text-white text-base tracking-tight">NMT</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-100 tracking-tight text-lg">NMT - ENGLISH</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  College IT
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Pearson Vocational English for IT 1 • Interactive Learning
              </p>
            </div>
          </div>

          {/* Current Unit Badge / Dropdown Button */}
          <button
            onClick={onOpenUnitModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/90 text-slate-200 border border-slate-700 hover:border-indigo-500/50 transition-all text-xs sm:text-sm font-medium shadow-sm ml-1 group cursor-pointer"
            title="Đổi bài học hoặc Nhập tài liệu PPTX"
          >
            <BookOpen className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sky-300">Unit {currentUnit.unitNumber}:</span>
            <span className="truncate max-w-[140px] md:max-w-[200px] text-slate-200">
              {currentUnit.unitNameEn}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 order-3 lg:order-2 w-full lg:w-auto">
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'learn'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Game 1: Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('matching')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'matching'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Ghép từ (Matching)</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Game 2: Luyện tập</span>
          </button>

          <button
            onClick={() => setActiveTab('roleplay')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'roleplay'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Game 3: Đóng vai</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Kiểm tra 10 câu</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'video'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-rose-400" />
            <span>Video Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('testunit')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'testunit'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/30'
            }`}
          >
            <FolderCheck className="w-3.5 h-3.5" />
            <span>Folder Test Unit</span>
          </button>
        </nav>

        {/* Student/Teacher Account & Utility Controls */}
        <div className="flex items-center gap-2 order-2 lg:order-3">
          {/* Teacher Only: Quick Access to Unit Manager */}
          {isTeacher && onOpenTeacherManager && (
            <button
              onClick={onOpenTeacherManager}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 text-xs font-bold transition-all cursor-pointer shadow-sm animate-pulse"
              title="Thêm, xóa, điều chỉnh bài tập, từ vựng và giáo án cho Unit này"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Quản Trị Unit</span>
              <span className="sm:hidden">Sửa</span>
            </button>
          )}

          {/* Achievements Badge Trigger */}
          <button
            onClick={onOpenAchievements}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer shadow-sm"
            title="Xem bảng thành tích & huy hiệu"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{student ? student.badges.length : 0}</span>
          </button>

          {/* User Account Button (Teacher vs Student) */}
          {student ? (
            <button
              onClick={onOpenProfileDrawer}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm ${
                isTeacher
                  ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-500/50'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border-indigo-500/40'
              }`}
              title={isTeacher ? 'Tài khoản Giảng viên (Toàn quyền quản trị)' : `MSSV: ${student.studentNumber} • Lớp: ${student.className}`}
            >
              {isTeacher ? (
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span className="truncate max-w-[95px] sm:max-w-[130px]">
                {isTeacher ? 'Thầy Trí (GV)' : student.fullName}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
              title="Đăng nhập tài khoản Học viên hoặc Giảng viên"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng Nhập</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-slate-800 text-indigo-400 border-indigo-500/40 hover:bg-slate-700'
                : 'bg-slate-800/60 text-slate-500 border-slate-700 hover:bg-slate-800'
            }`}
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng & giọng đọc' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* 16:9 Classroom Projection Mode */}
          <button
            onClick={() => setProjectionMode(!projectionMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              projectionMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
            title="Chế độ chiếu máy chiếu 16:9 (Chữ to, tương phản cao, tối ưu lớp học)"
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">16:9</span>
          </button>
        </div>
      </div>
    </header>
  );
};

