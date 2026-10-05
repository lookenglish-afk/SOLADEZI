import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Play, 
  GraduationCap, 
  Tv, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileText,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { UnitData, StudentProfile, AchievementBadge } from './types/index.ts';
import { allUnits } from './data/index.ts';
import { Header } from './components/Header.tsx';
import { UnitSelectorModal } from './components/UnitSelectorModal.tsx';
import { FlashcardViewer } from './components/FlashcardViewer.tsx';
import { MatchingGame } from './components/MatchingGame.tsx';
import { PracticeChallenge } from './components/PracticeChallenge.tsx';
import { RoleplayGame } from './components/RoleplayGame.tsx';
import { AssessmentQuiz } from './components/AssessmentQuiz.tsx';
import { InteractiveVideoQuiz } from './components/InteractiveVideoQuiz.tsx';
import { TestUnitHub } from './components/TestUnitHub.tsx';
import { StudentAuthModal } from './components/StudentAuthModal.tsx';
import { AchievementModal } from './components/AchievementModal.tsx';
import { StudentProfileDrawer } from './components/StudentProfileDrawer.tsx';
import { TeacherUnitManagerModal } from './components/TeacherUnitManagerModal.tsx';
import { StudentStorageService } from './utils/studentStorage.ts';
import { audioService } from './utils/audio.ts';

const CUSTOMIZED_UNITS_KEY = 'nmt_customized_units_v1';

export default function App() {
  const [unitsList, setUnitsList] = useState<UnitData[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMIZED_UNITS_KEY);
      if (saved) {
        const parsedMap: Record<string, Partial<UnitData>> = JSON.parse(saved);
        return allUnits.map(u => ({ ...u, ...(parsedMap[u.id] || {}) }));
      }
    } catch {}
    return allUnits;
  });
  const [currentUnit, setCurrentUnit] = useState<UnitData>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMIZED_UNITS_KEY);
      if (saved) {
        const parsedMap: Record<string, Partial<UnitData>> = JSON.parse(saved);
        return { ...allUnits[0], ...(parsedMap[allUnits[0].id] || {}) };
      }
    } catch {}
    return allUnits[0];
  });
  const [activeTab, setActiveTab] = useState<'learn' | 'matching' | 'practice' | 'roleplay' | 'quiz' | 'video' | 'testunit'>('learn');
  const [projectionMode, setProjectionMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState<boolean>(false);
  const [isTeacherManagerOpen, setIsTeacherManagerOpen] = useState<boolean>(false);

  // Student Account & Persistence State (Preserved across reload via LocalStorage)
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(() => {
    return StudentStorageService.getCurrentStudent();
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState<boolean>(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState<boolean>(false);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<AchievementBadge | null>(null);

  // Apply custom parsed unit from teacher upload
  const handleApplyCustomUnit = (customUnit: UnitData) => {
    setUnitsList((prev) => [customUnit, ...prev]);
    setCurrentUnit(customUnit);
    setActiveTab('learn');
  };

  // Save modified unit from TeacherUnitManagerModal
  const handleSaveUnit = (updatedUnit: UnitData) => {
    setUnitsList((prev) => prev.map((u) => u.id === updatedUnit.id ? updatedUnit : u));
    setCurrentUnit(updatedUnit);
    try {
      const saved = localStorage.getItem(CUSTOMIZED_UNITS_KEY);
      const existingMap: Record<string, any> = saved ? JSON.parse(saved) : {};
      existingMap[updatedUnit.id] = updatedUnit;
      localStorage.setItem(CUSTOMIZED_UNITS_KEY, JSON.stringify(existingMap));
    } catch {}
  };

  const handleLoginSuccess = (student: StudentProfile, isNew: boolean) => {
    setCurrentStudent(student);
    if (isNew) {
      // Show first step badge celebration
      const firstStepBadge = StudentStorageService.getAllStudents()
        .find(s => s.studentNumber === student.studentNumber);
      if (firstStepBadge) {
        // Trigger subtle celebration
        try {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleLogout = () => {
    StudentStorageService.logout();
    setCurrentStudent(null);
    setIsProfileDrawerOpen(false);
  };

  const handleBadgeUnlocked = (badge: AchievementBadge) => {
    setNewlyUnlockedBadge(badge);
    setIsAchievementModalOpen(true);
    if (soundEnabled) audioService.playCorrect();

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  const handleStudentUpdated = (updated: StudentProfile) => {
    setCurrentStudent(updated);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all selection:bg-indigo-500 selection:text-white ${
      projectionMode ? 'text-[20px] bg-slate-950' : 'bg-slate-900 text-slate-100'
    }`}>
      {/* Top Application Header */}
      <Header
        currentUnit={currentUnit}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projectionMode={projectionMode}
        setProjectionMode={setProjectionMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenUnitModal={() => setIsUnitModalOpen(true)}
        student={currentStudent}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileDrawer={() => setIsProfileDrawerOpen(true)}
        onOpenAchievements={() => {
          setNewlyUnlockedBadge(null);
          setIsAchievementModalOpen(true);
        }}
        onOpenTeacherManager={() => setIsTeacherManagerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Unit Breadcrumb & Objective Banner */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  Unit {currentUnit.unitNumber}
                </span>
                <span className="text-xs text-sky-400 font-semibold">{currentUnit.pageRange}</span>
                <span className="text-xs text-slate-400">• Trình độ: {currentUnit.level}</span>
                {currentStudent && (
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    currentStudent.role === 'teacher'
                      ? 'text-amber-300 bg-amber-950/50 border-amber-500/40'
                      : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30'
                  }`}>
                    {currentStudent.role === 'teacher' ? '👨‍🏫 Giảng Viên: ' : '🎓 Học viên: '}
                    {currentStudent.fullName} ({currentStudent.className})
                  </span>
                )}
              </div>

              <h1 className={`font-black text-white tracking-tight ${
                projectionMode ? 'text-2xl sm:text-3xl lg:text-4xl text-amber-300' : 'text-xl sm:text-2xl lg:text-3xl'
              }`}>
                {currentUnit.unitNameEn}: <span className="text-indigo-300 font-bold">{currentUnit.unitNameVi}</span>
              </h1>

              <p className={`text-slate-300 leading-relaxed ${projectionMode ? 'text-lg' : 'text-sm'}`}>
                {currentUnit.overviewVi}
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {currentStudent?.role === 'teacher' && (
                <button
                  onClick={() => setIsTeacherManagerOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm animate-pulse"
                >
                  <Settings className="w-4 h-4 text-amber-400" />
                  <span>Sửa Bài Tập & Giáo Án</span>
                </button>
              )}

              <button
                onClick={() => setIsUnitModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Đổi bài học (8 Units)</span>
              </button>

              <button
                onClick={() => setActiveTab('video')}
                className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Play className="w-4 h-4 text-rose-400" />
                <span>Video Quiz Tương Tác</span>
              </button>

              <button
                onClick={() => setActiveTab('testunit')}
                className="px-3.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Folder Test Unit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display with Framer Motion Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${currentUnit.id}`}
            initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === 'learn' && (
              <FlashcardViewer
                unitId={currentUnit.id}
                vocabList={currentUnit.vocabList}
                soundEnabled={soundEnabled}
                projectionMode={projectionMode}
                student={currentStudent}
                onStudentUpdated={handleStudentUpdated}
                onBadgeUnlocked={handleBadgeUnlocked}
              />
            )}

            {activeTab === 'matching' && (
              <MatchingGame
                unitId={currentUnit.id}
                matchingPairs={currentUnit.matchingPairs}
                soundEnabled={soundEnabled}
                projectionMode={projectionMode}
                student={currentStudent}
                onStudentUpdated={handleStudentUpdated}
                onBadgeUnlocked={handleBadgeUnlocked}
              />
            )}

            {activeTab === 'practice' && (
              <PracticeChallenge
                gapFills={currentUnit.gapFillExercises}
                unscrambles={currentUnit.unscrambleChallenges}
                soundEnabled={soundEnabled}
                projectionMode={projectionMode}
              />
            )}

            {activeTab === 'roleplay' && (
              <RoleplayGame
                unitId={currentUnit.id}
                scenario={currentUnit.roleplayScenario}
                soundEnabled={soundEnabled}
                projectionMode={projectionMode}
                student={currentStudent}
                onStudentUpdated={handleStudentUpdated}
                onBadgeUnlocked={handleBadgeUnlocked}
              />
            )}

            {activeTab === 'quiz' && (
              <AssessmentQuiz
                unitId={currentUnit.id}
                unitNumber={currentUnit.unitNumber}
                unitTitle={currentUnit.unitNameEn}
                questions={currentUnit.reviewQuiz10}
                soundEnabled={soundEnabled}
                projectionMode={projectionMode}
                student={currentStudent}
                onStudentUpdated={handleStudentUpdated}
                onBadgeUnlocked={handleBadgeUnlocked}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            )}

            {activeTab === 'video' && (
              <InteractiveVideoQuiz
                currentUnitNumber={currentUnit.unitNumber}
                soundEnabled={soundEnabled}
                projectionMode={projectionMode}
                student={currentStudent}
                onStudentUpdated={handleStudentUpdated}
                onBadgeUnlocked={handleBadgeUnlocked}
              />
            )}

            {activeTab === 'testunit' && (
              <TestUnitHub
                soundEnabled={soundEnabled}
                projectionMode={projectionMode}
                student={currentStudent}
                onStudentUpdated={handleStudentUpdated}
                onBadgeUnlocked={handleBadgeUnlocked}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Classroom Projection Bar Notice (when projectionMode is ON) */}
      {projectionMode && (
        <div className="bg-amber-500/10 border-t border-amber-500/30 py-2 px-4 text-center text-xs sm:text-sm font-bold text-amber-300 flex items-center justify-center gap-2">
          <Tv className="w-4 h-4 text-amber-400" />
          <span>Đang bật chế độ chiếu màn hình lớp học (Tối ưu tỷ lệ 16:9, font chữ lớn ≥20px, độ tương phản cao).</span>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/70 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">[NMT - ENGLISH]</span>
            <span>•</span>
            <span>EdTech & Game-based Learning Designer for Vietnamese Students</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>Pearson Vocational English: English for IT 1</span>
            <span>•</span>
            <span className="text-rose-400 font-medium">Interactive Video Quiz & Folder Test Unit</span>
          </div>
        </div>
      </footer>

      {/* Unit Selector Modal */}
      <UnitSelectorModal
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
        units={unitsList}
        currentUnit={currentUnit}
        onSelectUnit={(unit) => {
          setCurrentUnit(unit);
          setActiveTab('learn');
        }}
        onOpenCustomImport={() => {
          setActiveTab('testunit');
        }}
      />

      {/* Student Account Login / Register Modal */}
      <StudentAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentStudent={currentStudent}
        soundEnabled={soundEnabled}
      />

      {/* Achievements Showcase Modal */}
      <AchievementModal
        isOpen={isAchievementModalOpen}
        onClose={() => {
          setIsAchievementModalOpen(false);
          setNewlyUnlockedBadge(null);
        }}
        student={currentStudent}
        newlyUnlockedBadge={newlyUnlockedBadge}
      />

      {/* Student Profile & Homework Report Drawer */}
      <StudentProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        student={currentStudent}
        onLogout={handleLogout}
        onOpenAchievements={() => {
          setIsProfileDrawerOpen(false);
          setIsAchievementModalOpen(true);
        }}
        onSwitchAccount={() => {
          setIsProfileDrawerOpen(false);
          setIsAuthModalOpen(true);
        }}
      />

      {/* Teacher Unit Content Manager Modal */}
      <TeacherUnitManagerModal
        isOpen={isTeacherManagerOpen}
        onClose={() => setIsTeacherManagerOpen(false)}
        currentUnit={currentUnit}
        onSaveUnit={handleSaveUnit}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
