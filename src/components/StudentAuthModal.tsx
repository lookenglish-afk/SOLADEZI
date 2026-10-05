import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Sparkles, 
  AlertCircle, 
  UserPlus, 
  ShieldCheck, 
  Lock, 
  GraduationCap, 
  KeyRound, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { StudentProfile } from '../types/index.ts';
import { StudentStorageService, DEFAULT_TEACHER_CREDENTIALS } from '../utils/studentStorage.ts';
import { audioService } from '../utils/audio.ts';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: StudentProfile, isNew: boolean) => void;
  currentStudent: StudentProfile | null;
  soundEnabled: boolean;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentStudent,
  soundEnabled
}) => {
  const [authRole, setAuthRole] = useState<'student' | 'teacher'>(
    currentStudent?.role === 'teacher' ? 'teacher' : 'student'
  );

  // Student Form Fields
  const [fullName, setFullName] = useState(
    currentStudent?.role !== 'teacher' ? currentStudent?.fullName || '' : ''
  );
  const [className, setClassName] = useState(
    currentStudent?.role !== 'teacher' ? currentStudent?.className || 'CD-CNTT24A' : 'CD-CNTT24A'
  );
  const [studentNumber, setStudentNumber] = useState(
    currentStudent?.role !== 'teacher' ? currentStudent?.studentNumber || '' : ''
  );

  // Teacher Form Fields
  const [teacherId, setTeacherId] = useState(DEFAULT_TEACHER_CREDENTIALS.id);
  const [teacherPass, setTeacherPass] = useState(DEFAULT_TEACHER_CREDENTIALS.password);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Student Submit
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (studentNumber.trim().toLowerCase() === DEFAULT_TEACHER_CREDENTIALS.id.toLowerCase()) {
      setAuthRole('teacher');
      setErrorMsg('Đây là tài khoản Giảng viên. Vui lòng nhập mật khẩu giảng viên.');
      return;
    }

    if (!studentNumber.trim()) {
      setErrorMsg('Vui lòng nhập Mã sinh viên (MSSV).');
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập Họ và tên sinh viên.');
      return;
    }
    if (!className.trim()) {
      setErrorMsg('Vui lòng nhập Tên lớp học.');
      return;
    }

    try {
      const { student, isNew } = StudentStorageService.registerOrLogin(
        fullName,
        className,
        studentNumber
      );
      if (soundEnabled) audioService.playCorrect();
      onLoginSuccess(student, isNew);
      onClose();
    } catch {
      setErrorMsg('Không thể lưu thông tin. Vui lòng thử lại.');
    }
  };

  // Handle Teacher Submit
  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const result = StudentStorageService.loginTeacher(teacherId, teacherPass);
    if (!result.success || !result.teacher) {
      if (soundEnabled) audioService.playIncorrect();
      setErrorMsg(result.error || 'Đăng nhập Giảng viên thất bại.');
      return;
    }

    if (soundEnabled) audioService.playCorrect();
    onLoginSuccess(result.teacher, false);
    onClose();
  };

  const handleFillDefaultTeacher = () => {
    setTeacherId(DEFAULT_TEACHER_CREDENTIALS.id);
    setTeacherPass(DEFAULT_TEACHER_CREDENTIALS.password);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850/80">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              authRole === 'teacher'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
            }`}>
              {authRole === 'teacher' ? <ShieldCheck className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {authRole === 'teacher' ? 'Đăng Nhập Giảng Viên' : 'Đăng Nhập Học Viên'}
              </h3>
              <p className="text-xs text-slate-400">
                {authRole === 'teacher' ? 'Quyền quản trị bài tập & ngân hàng đề' : 'Làm bài tập & lưu trữ thành tích học tập'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-950 border-b border-slate-800 gap-1">
          <button
            type="button"
            onClick={() => {
              setAuthRole('student');
              setErrorMsg(null);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authRole === 'student'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Học Viên (Student)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthRole('teacher');
              setErrorMsg(null);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authRole === 'teacher'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                : 'text-amber-400 hover:text-amber-300 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Giảng Viên (Teacher)</span>
          </button>
        </div>

        {/* Error Display */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* TAB 1: STUDENT FORM */}
        {authRole === 'student' && (
          <form onSubmit={handleStudentSubmit} className="p-6 space-y-4">
            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Học viên đăng nhập để làm bài tập, luyện thi và chơi game. Điểm số và huy hiệu được lưu tự động vĩnh viễn theo MSSV.
              </span>
            </div>

            {/* Student Number (MSSV) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Mã Sinh Viên (MSSV) *</span>
                <span className="text-[11px] text-indigo-400 font-normal">Dùng để định danh</span>
              </label>
              <input
                type="text"
                required
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                placeholder="VD: 24010582 hoặc SV001"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Họ và Tên Sinh Viên *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="VD: Nguyễn Minh Tuấn"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Class Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Lớp Học *
              </label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="VD: CD-CNTT24A hoặc IT-K20"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Đăng Nhập Học Viên & Vào Học</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: TEACHER FORM */}
        {authRole === 'teacher' && (
          <form onSubmit={handleTeacherSubmit} className="p-6 space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Quyền Hạn Dành Cho Giảng Viên</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-200/90">
                Toàn quyền: Thêm, Xoá, Điều chỉnh bài tập, bài kiểm tra trong Folder Test Unit, chèn quiz vào Video và soạn thảo giáo án bài ôn.
              </p>
            </div>

            {/* Teacher ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Tài Khoản Giảng Viên (ID) *</span>
                <span className="text-[11px] text-amber-400 font-mono">ngominhtri99@</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  placeholder="ngominhtri99@"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Mật Khẩu *</span>
                <span className="text-[11px] text-slate-400">Ngominhtrihsu</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={teacherPass}
                  onChange={(e) => setTeacherPass(e.target.value)}
                  placeholder="Nhập mật khẩu giảng viên..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Quick Fill Button */}
            <button
              type="button"
              onClick={handleFillDefaultTeacher}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-amber-300 border border-slate-700 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Điền tài khoản mặc định (ID: ngominhtri99@ / Pass: Ngominhtrihsu)</span>
            </button>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Đăng Nhập Quyền Giảng Viên</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
