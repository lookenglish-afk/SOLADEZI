import { StudentProfile, HomeworkRecord, AchievementBadge, UnitTaskProgress } from '../types/index.ts';

const ALL_STUDENTS_KEY = 'nmt_all_students_v1';
const CURRENT_STUDENT_KEY = 'nmt_current_student_id_v1';

export const DEFAULT_TEACHER_CREDENTIALS = {
  id: 'ngominhtri99@',
  password: 'Ngominhtrihsu',
  fullName: 'Thầy Ngô Minh Trí',
  className: 'Giảng Viên Bộ Môn Tiếng Anh CNTT',
  role: 'teacher' as const
};

export const ALL_BADGES: AchievementBadge[] = [
  {
    id: 'badge-perfect-quiz',
    code: 'perfect_quiz',
    titleVi: 'Thủ Khoa IT 10/10',
    titleEn: 'Perfect Score Champion',
    descriptionVi: 'Đạt điểm tuyệt đối 10/10 câu trong bài kiểm tra đánh giá của bài học.',
    icon: '👑',
    color: 'from-amber-400 via-yellow-300 to-amber-500',
    criteriaVi: 'Đạt 100% điểm bài Quiz'
  },
  {
    id: 'badge-all-tasks',
    code: 'all_tasks_completed',
    titleVi: 'Toàn Năng EdTech',
    titleEn: 'Master All-Rounder',
    descriptionVi: 'Hoàn thành trọn vẹn cả 5 hoạt động trong 1 bài học (Flashcards, Matching, Luyện tập, Đóng vai & Quiz).',
    icon: '🏆',
    color: 'from-purple-500 via-indigo-400 to-sky-500',
    criteriaVi: 'Hoàn tất đủ 5 hoạt động của Unit'
  },
  {
    id: 'badge-vocab-guru',
    code: 'flashcard_master',
    titleVi: 'Bậc Thầy Thuật Ngữ IT',
    titleEn: 'Vocabulary Guru',
    descriptionVi: 'Lật và nghiên cứu toàn bộ thẻ từ vựng kỹ thuật của bài học.',
    icon: '📚',
    color: 'from-sky-400 to-blue-600',
    criteriaVi: 'Hoàn thành xem hết Flashcards'
  },
  {
    id: 'badge-matching-pro',
    code: 'matching_pro',
    titleVi: 'Siêu Tốc Ghép Đôi',
    titleEn: 'Speed Matching Master',
    descriptionVi: 'Ghép chính xác 100% các cặp từ tiếng Anh và định nghĩa tiếng Việt.',
    icon: '⚡',
    color: 'from-emerald-400 to-teal-600',
    criteriaVi: 'Ghép đúng toàn bộ game Matching'
  },
  {
    id: 'badge-roleplay-star',
    code: 'roleplay_star',
    titleVi: 'Chuyên Viên IT Công Sở',
    titleEn: 'IT Workplace Star',
    descriptionVi: 'Hoàn tất kịch bản đối thoại nghiệp vụ kỹ thuật tại môi trường công sở.',
    icon: '💼',
    color: 'from-pink-500 to-rose-600',
    criteriaVi: 'Hoàn thành kịch bản Đóng vai'
  },
  {
    id: 'badge-first-step',
    code: 'first_step',
    titleVi: 'Khởi Đầu Công Nghệ',
    titleEn: 'First Step in Tech',
    descriptionVi: 'Tạo tài khoản và bắt đầu buổi học tiếng Anh CNTT đầu tiên.',
    icon: '🚀',
    color: 'from-cyan-400 to-blue-500',
    criteriaVi: 'Đăng ký tài khoản thành công'
  }
];

export class StudentStorageService {
  // Retrieve all registered student accounts
  static getAllStudents(): StudentProfile[] {
    try {
      const data = localStorage.getItem(ALL_STUDENTS_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  // Retrieve currently active student
  static getCurrentStudent(): StudentProfile | null {
    try {
      const currentId = localStorage.getItem(CURRENT_STUDENT_KEY);
      if (!currentId) return null;
      const students = this.getAllStudents();
      return students.find((s) => s.studentNumber === currentId) || null;
    } catch {
      return null;
    }
  }

  // Set current active student ID
  static setCurrentStudentId(studentNumber: string): void {
    try {
      localStorage.setItem(CURRENT_STUDENT_KEY, studentNumber);
    } catch {
      // ignore
    }
  }

  // Logout
  static logout(): void {
    try {
      localStorage.removeItem(CURRENT_STUDENT_KEY);
    } catch {
      // ignore
    }
  }

  // Teacher Login Authentication
  static loginTeacher(id: string, pass: string): { success: boolean; teacher?: StudentProfile; error?: string } {
    const cleanId = id.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (
      cleanId !== DEFAULT_TEACHER_CREDENTIALS.id.toLowerCase() ||
      cleanPass !== DEFAULT_TEACHER_CREDENTIALS.password
    ) {
      return {
        success: false,
        error: 'Tài khoản hoặc mật khẩu Giảng viên không đúng! (Mặc định: ngominhtri99@ / Ngominhtrihsu)'
      };
    }

    const students = this.getAllStudents();
    const existingIndex = students.findIndex((s) => s.studentNumber === DEFAULT_TEACHER_CREDENTIALS.id);
    const now = new Date();
    const dateStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    let teacherProfile: StudentProfile;
    if (existingIndex >= 0) {
      teacherProfile = {
        ...students[existingIndex],
        role: 'teacher',
        fullName: DEFAULT_TEACHER_CREDENTIALS.fullName,
        className: DEFAULT_TEACHER_CREDENTIALS.className
      };
      students[existingIndex] = teacherProfile;
    } else {
      teacherProfile = {
        studentNumber: DEFAULT_TEACHER_CREDENTIALS.id,
        fullName: DEFAULT_TEACHER_CREDENTIALS.fullName,
        className: DEFAULT_TEACHER_CREDENTIALS.className,
        role: 'teacher',
        registeredAt: dateStr,
        totalScore: 999,
        badges: ['badge-perfect-quiz', 'badge-all-tasks', 'badge-vocab-guru', 'badge-matching-pro', 'badge-roleplay-star', 'badge-first-step'],
        homeworkHistory: [],
        unitProgress: {}
      };
      students.push(teacherProfile);
    }

    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));
    this.setCurrentStudentId(DEFAULT_TEACHER_CREDENTIALS.id);
    return { success: true, teacher: teacherProfile };
  }

  // Register or login student
  static registerOrLogin(fullName: string, className: string, studentNumber: string): { student: StudentProfile; isNew: boolean } {
    const cleanMSSV = studentNumber.trim().toUpperCase();
    const cleanName = fullName.trim();
    const cleanClass = className.trim().toUpperCase();

    const students = this.getAllStudents();
    const existingIndex = students.findIndex((s) => s.studentNumber === cleanMSSV);

    const now = new Date();
    const dateStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    if (existingIndex >= 0) {
      // Update existing student with updated name/class if provided
      const existing = students[existingIndex];
      const updated: StudentProfile = {
        ...existing,
        role: existing.role || 'student',
        fullName: cleanName || existing.fullName,
        className: cleanClass || existing.className,
      };
      students[existingIndex] = updated;
      localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));
      this.setCurrentStudentId(cleanMSSV);
      return { student: updated, isNew: false };
    }

    // New student profile with 'first_step' badge and 'student' role
    const newStudent: StudentProfile = {
      studentNumber: cleanMSSV,
      fullName: cleanName,
      className: cleanClass,
      role: 'student',
      registeredAt: dateStr,
      totalScore: 0,
      badges: ['badge-first-step'],
      homeworkHistory: [],
      unitProgress: {}
    };

    students.push(newStudent);
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));
    this.setCurrentStudentId(cleanMSSV);
    return { student: newStudent, isNew: true };
  }

  // Save student homework attempt & check badges
  static saveHomework(
    studentNumber: string,
    record: HomeworkRecord
  ): { updatedStudent: StudentProfile | null; newBadges: AchievementBadge[] } {
    const students = this.getAllStudents();
    const student = students.find((s) => s.studentNumber === studentNumber);
    if (!student) return { updatedStudent: null, newBadges: [] };

    // Update or append homework
    const updatedHistory = [record, ...student.homeworkHistory.filter(h => h.id !== record.id)];

    // Update unit progress
    const currentProgress: UnitTaskProgress = student.unitProgress[record.unitId] || {
      flashcardsCompleted: false,
      matchingCompleted: false,
      practiceCompleted: false,
      roleplayCompleted: false,
      quizCompleted: false,
      highestQuizScore: 0,
      lastUpdated: record.dateCompleted
    };

    const newHighest = Math.max(currentProgress.highestQuizScore, record.quizScore);
    const updatedUnitProgress = {
      ...student.unitProgress,
      [record.unitId]: {
        ...currentProgress,
        quizCompleted: true,
        highestQuizScore: newHighest,
        lastUpdated: record.dateCompleted,
        flashcardsCompleted: record.tasksCompleted.flashcards || currentProgress.flashcardsCompleted,
        matchingCompleted: record.tasksCompleted.matching || currentProgress.matchingCompleted,
        practiceCompleted: record.tasksCompleted.practice || currentProgress.practiceCompleted,
        roleplayCompleted: record.tasksCompleted.roleplay || currentProgress.roleplayCompleted,
      }
    };

    // Check newly unlocked badges
    const existingBadges = new Set(student.badges);
    const newBadges: AchievementBadge[] = [];

    // 1. Check Perfect Quiz Badge (100%)
    if (record.percentage === 100 && !existingBadges.has('badge-perfect-quiz')) {
      existingBadges.add('badge-perfect-quiz');
      const b = ALL_BADGES.find(x => x.id === 'badge-perfect-quiz');
      if (b) newBadges.push(b);
    }

    // 2. Check All Tasks Completed Badge
    const uProg = updatedUnitProgress[record.unitId];
    if (
      uProg.flashcardsCompleted &&
      uProg.matchingCompleted &&
      uProg.practiceCompleted &&
      uProg.roleplayCompleted &&
      uProg.quizCompleted &&
      !existingBadges.has('badge-all-tasks')
    ) {
      existingBadges.add('badge-all-tasks');
      const b = ALL_BADGES.find(x => x.id === 'badge-all-tasks');
      if (b) newBadges.push(b);
    }

    const updatedStudent: StudentProfile = {
      ...student,
      homeworkHistory: updatedHistory,
      unitProgress: updatedUnitProgress,
      totalScore: student.totalScore + record.quizScore,
      badges: Array.from(existingBadges)
    };

    const idx = students.findIndex((s) => s.studentNumber === studentNumber);
    students[idx] = updatedStudent;
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));

    return { updatedStudent, newBadges };
  }

  // Update specific task completion (e.g., student finished Flashcards or Matching game)
  static markTaskCompleted(
    studentNumber: string,
    unitId: string,
    task: 'flashcardsCompleted' | 'matchingCompleted' | 'practiceCompleted' | 'roleplayCompleted'
  ): { updatedStudent: StudentProfile | null; newBadges: AchievementBadge[] } {
    const students = this.getAllStudents();
    const student = students.find((s) => s.studentNumber === studentNumber);
    if (!student) return { updatedStudent: null, newBadges: [] };

    const now = new Date();
    const dateStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}`;

    const currentProg: UnitTaskProgress = student.unitProgress[unitId] || {
      flashcardsCompleted: false,
      matchingCompleted: false,
      practiceCompleted: false,
      roleplayCompleted: false,
      quizCompleted: false,
      highestQuizScore: 0,
      lastUpdated: dateStr
    };

    const updatedUnitProgress = {
      ...student.unitProgress,
      [unitId]: {
        ...currentProg,
        [task]: true,
        lastUpdated: dateStr
      }
    };

    const existingBadges = new Set(student.badges);
    const newBadges: AchievementBadge[] = [];

    // Award task-specific badges
    if (task === 'flashcardsCompleted' && !existingBadges.has('badge-vocab-guru')) {
      existingBadges.add('badge-vocab-guru');
      const b = ALL_BADGES.find(x => x.id === 'badge-vocab-guru');
      if (b) newBadges.push(b);
    }

    if (task === 'matchingCompleted' && !existingBadges.has('badge-matching-pro')) {
      existingBadges.add('badge-matching-pro');
      const b = ALL_BADGES.find(x => x.id === 'badge-matching-pro');
      if (b) newBadges.push(b);
    }

    if (task === 'roleplayCompleted' && !existingBadges.has('badge-roleplay-star')) {
      existingBadges.add('badge-roleplay-star');
      const b = ALL_BADGES.find(x => x.id === 'badge-roleplay-star');
      if (b) newBadges.push(b);
    }

    // Check All-tasks badge
    const p = updatedUnitProgress[unitId];
    if (
      p.flashcardsCompleted &&
      p.matchingCompleted &&
      p.practiceCompleted &&
      p.roleplayCompleted &&
      p.quizCompleted &&
      !existingBadges.has('badge-all-tasks')
    ) {
      existingBadges.add('badge-all-tasks');
      const b = ALL_BADGES.find(x => x.id === 'badge-all-tasks');
      if (b) newBadges.push(b);
    }

    const updatedStudent: StudentProfile = {
      ...student,
      unitProgress: updatedUnitProgress,
      badges: Array.from(existingBadges)
    };

    const idx = students.findIndex((s) => s.studentNumber === studentNumber);
    students[idx] = updatedStudent;
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));

    return { updatedStudent, newBadges };
  }
}
