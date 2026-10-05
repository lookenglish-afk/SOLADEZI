export type GameType = 'quiz' | 'fill_in_blanks' | 'matching' | 'flashcard' | 'roleplay' | 'unscramble';

export interface VocabItem {
  id: string;
  word: string;
  phonetics?: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'phrase' | 'acronym';
  vietnameseMeaning: string;
  definitionEn: string;
  exampleSentence: string;
  exampleVietnamese: string;
  category: string;
}

export interface MatchingPair {
  id: string;
  english: string;
  vietnamese: string;
  category: string;
  note?: string;
}

export interface GapFillExercise {
  id: string;
  sentenceWithBlank: string;
  missingWord: string;
  options: string[];
  hintVi: string;
  explanation: string;
}

export interface UnscrambleChallenge {
  id: string;
  correctSentence: string;
  jumbledWords: string[];
  translationVi: string;
  grammarTipVi: string;
}

export interface RoleplayOption {
  id: string;
  dialogEn: string;
  dialogVi: string;
  isBest: boolean;
  score: number;
  feedbackVi: string;
}

export interface RoleplayStep {
  stepId: number;
  speakerName: string;
  speakerRole: string;
  speakerAvatar: string;
  npcDialogueEn: string;
  npcDialogueVi: string;
  studentTaskVi: string;
  options: RoleplayOption[];
}

export interface RoleplayScenario {
  id: string;
  title: string;
  scenarioDescriptionVi: string;
  studentRole: string;
  colleagueRole: string;
  context: string;
  steps: RoleplayStep[];
}

export interface QuizQuestion {
  id: string;
  game_type: 'quiz' | 'fill_in_blanks' | 'matching';
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  sourceContext: string;
}

export interface VideoQuizCheckpoint {
  id: string;
  timestampSeconds: number; // point in video e.g. 12
  question: string;
  options: string[];
  correctAnswer: string;
  explanationVi: string;
  gameType?: 'quiz' | 'fill_in_blanks';
}

export interface VideoLesson {
  id: string;
  title: string;
  descriptionVi: string;
  videoUrl: string; // file blob or online stream
  unitNumber?: number;
  durationSeconds?: number;
  checkpoints: VideoQuizCheckpoint[];
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface TestUnit {
  id: string;
  title: string;
  unitCode: string; // e.g. "TEST-U1", "MIDTERM"
  descriptionVi: string;
  timeLimitMinutes: number; // e.g. 15
  totalQuestions: number;
  questions: TestQuestion[];
  createdAt: string;
  isCustom?: boolean;
}

export interface TestSubmission {
  id: string;
  testId: string;
  testTitle: string;
  studentNumber: string;
  studentName: string;
  className: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeSpentSeconds: number;
  submittedAt: string;
  answers: Record<string, string>;
}

export interface UnitData {
  id: string;
  unitNumber: number;
  unitNameEn: string;
  unitNameVi: string;
  pageRange: string;
  level: string;
  grammarFocusEn: string;
  grammarFocusVi: string;
  overviewVi: string;
  vocabList: VocabItem[];
  matchingPairs: MatchingPair[];
  gapFillExercises: GapFillExercise[];
  unscrambleChallenges: UnscrambleChallenge[];
  roleplayScenario: RoleplayScenario;
  reviewQuiz10: QuizQuestion[];
  videoLesson?: VideoLesson;
  lessonPlan?: any;
}

export interface AchievementBadge {
  id: string;
  code: 'perfect_quiz' | 'all_tasks_completed' | 'flashcard_master' | 'matching_pro' | 'roleplay_star' | 'first_step';
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  icon: string;
  color: string;
  criteriaVi: string;
  unlockedAt?: string;
}

export interface HomeworkRecord {
  id: string;
  unitId: string;
  unitNumber: number;
  unitNameEn: string;
  quizScore: number;
  totalQuestions: number;
  percentage: number;
  dateCompleted: string;
  tasksCompleted: {
    flashcards: boolean;
    matching: boolean;
    practice: boolean;
    roleplay: boolean;
    quiz: boolean;
  };
}

export interface UnitTaskProgress {
  flashcardsCompleted: boolean;
  matchingCompleted: boolean;
  practiceCompleted: boolean;
  roleplayCompleted: boolean;
  quizCompleted: boolean;
  highestQuizScore: number;
  lastUpdated: string;
}

export type UserRole = 'teacher' | 'student';

export interface StudentProfile {
  studentNumber: string; // MSSV - unique identifier (or teacher ID e.g. ngominhtri99@)
  fullName: string;
  className: string;
  role?: UserRole;
  registeredAt: string;
  totalScore: number;
  badges: string[]; // Badge IDs
  homeworkHistory: HomeworkRecord[];
  unitProgress: Record<string, UnitTaskProgress>;
}
