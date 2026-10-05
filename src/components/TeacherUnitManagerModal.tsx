import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  FileText, 
  HelpCircle,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Upload
} from 'lucide-react';
import { UnitData, VocabItem, GapFillExercise, MatchingPair, UnscrambleChallenge, QuizQuestion } from '../types/index.ts';
import { audioService } from '../utils/audio.ts';

interface TeacherUnitManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUnit: UnitData;
  onSaveUnit: (updatedUnit: UnitData) => void;
  soundEnabled: boolean;
}

export const TeacherUnitManagerModal: React.FC<TeacherUnitManagerModalProps> = ({
  isOpen,
  onClose,
  currentUnit,
  onSaveUnit,
  soundEnabled
}) => {
  const [activeTab, setActiveTab] = useState<'vocab' | 'notes' | 'practice' | 'quiz' | 'quickImport'>('vocab');

  // Editable Unit Copy
  const [unitData, setUnitData] = useState<UnitData>(JSON.parse(JSON.stringify(currentUnit)));

  // Vocab editor state
  const [editingVocabId, setEditingVocabId] = useState<string | null>(null);
  const [vWord, setVWord] = useState('');
  const [vPhonetics, setVPhonetics] = useState('');
  const [vPos, setVPos] = useState<'noun' | 'verb' | 'adjective' | 'phrase' | 'acronym'>('noun');
  const [vMeaningVi, setVMeaningVi] = useState('');
  const [vDefEn, setVDefEn] = useState('');
  const [vExampleEn, setVExampleEn] = useState('');
  const [vExampleVi, setVExampleVi] = useState('');

  // Gap fill editor state
  const [editingGapId, setEditingGapId] = useState<string | null>(null);
  const [gapSentence, setGapSentence] = useState('');
  const [gapMissing, setGapMissing] = useState('');
  const [gapOpts, setGapOpts] = useState('');
  const [gapHint, setGapHint] = useState('');
  const [gapExp, setGapExp] = useState('');

  // Quiz editor state
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptA, setQuizOptA] = useState('');
  const [quizOptB, setQuizOptB] = useState('');
  const [quizOptC, setQuizOptC] = useState('');
  const [quizOptD, setQuizOptD] = useState('');
  const [quizCorrect, setQuizCorrect] = useState('');
  const [quizExp, setQuizExp] = useState('');

  // Quick import state
  const [importText, setImportText] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  // VOCAB ACTIONS
  const handleOpenAddVocab = () => {
    setEditingVocabId('new');
    setVWord('');
    setVPhonetics('');
    setVPos('noun');
    setVMeaningVi('');
    setVDefEn('');
    setVExampleEn('');
    setVExampleVi('');
  };

  const handleEditVocab = (v: VocabItem) => {
    setEditingVocabId(v.id);
    setVWord(v.word);
    setVPhonetics(v.phonetics || '');
    setVPos(v.partOfSpeech || 'noun');
    setVMeaningVi(v.vietnameseMeaning);
    setVDefEn(v.definitionEn);
    setVExampleEn(v.exampleSentence);
    setVExampleVi(v.exampleVietnamese);
  };

  const handleSaveVocabItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vWord.trim() || !vMeaningVi.trim()) return;

    if (editingVocabId === 'new') {
      const newItem: VocabItem = {
        id: `v-custom-${Date.now()}`,
        word: vWord.trim(),
        phonetics: vPhonetics.trim() || undefined,
        partOfSpeech: vPos,
        vietnameseMeaning: vMeaningVi.trim(),
        definitionEn: vDefEn.trim() || `IT term: ${vWord.trim()}`,
        exampleSentence: vExampleEn.trim() || `Example with ${vWord.trim()}`,
        exampleVietnamese: vExampleVi.trim() || `Ví dụ với từ ${vWord.trim()}`,
        category: unitData.unitNameEn
      };
      // Also add matching pair
      const newPair: MatchingPair = {
        id: `m-custom-${Date.now()}`,
        english: vWord.trim(),
        vietnamese: vMeaningVi.trim(),
        category: unitData.unitNameEn
      };
      setUnitData(prev => ({
        ...prev,
        vocabList: [newItem, ...prev.vocabList],
        matchingPairs: [newPair, ...prev.matchingPairs]
      }));
    } else {
      setUnitData(prev => ({
        ...prev,
        vocabList: prev.vocabList.map(v => v.id === editingVocabId ? {
          ...v,
          word: vWord.trim(),
          phonetics: vPhonetics.trim() || undefined,
          partOfSpeech: vPos,
          vietnameseMeaning: vMeaningVi.trim(),
          definitionEn: vDefEn.trim(),
          exampleSentence: vExampleEn.trim(),
          exampleVietnamese: vExampleVi.trim(),
        } : v),
        matchingPairs: prev.matchingPairs.map(m => m.english.toLowerCase() === vWord.trim().toLowerCase() ? {
          ...m,
          english: vWord.trim(),
          vietnamese: vMeaningVi.trim()
        } : m)
      }));
    }

    setEditingVocabId(null);
    showNotice('Đã lưu từ vựng!');
  };

  const handleDeleteVocab = (id: string) => {
    setUnitData(prev => ({
      ...prev,
      vocabList: prev.vocabList.filter(v => v.id !== id),
      matchingPairs: prev.matchingPairs.filter(m => m.id !== id)
    }));
    showNotice('Đã xóa từ vựng.');
  };

  // GAP FILL ACTIONS
  const handleOpenAddGap = () => {
    setEditingGapId('new');
    setGapSentence('A database _____ analyses and presents electronic data.');
    setGapMissing('analyst');
    setGapOpts('analyst, developer, technician, cashier');
    setGapHint('Người phân tích cơ sở dữ liệu');
    setGapExp('Unit 1: Database analyst chịu trách nhiệm phân tích dữ liệu.');
  };

  const handleEditGap = (g: GapFillExercise) => {
    setEditingGapId(g.id);
    setGapSentence(g.sentenceWithBlank);
    setGapMissing(g.missingWord);
    setGapOpts(g.options.join(', '));
    setGapHint(g.hintVi);
    setGapExp(g.explanation);
  };

  const handleSaveGap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gapSentence.trim() || !gapMissing.trim()) return;

    const opts = gapOpts.split(',').map(s => s.trim()).filter(Boolean);
    if (!opts.includes(gapMissing.trim())) {
      opts.push(gapMissing.trim());
    }

    if (editingGapId === 'new') {
      const newExercise: GapFillExercise = {
        id: `gap-custom-${Date.now()}`,
        sentenceWithBlank: gapSentence.trim(),
        missingWord: gapMissing.trim(),
        options: opts,
        hintVi: gapHint.trim(),
        explanation: gapExp.trim()
      };
      setUnitData(prev => ({
        ...prev,
        gapFillExercises: [newExercise, ...prev.gapFillExercises]
      }));
    } else {
      setUnitData(prev => ({
        ...prev,
        gapFillExercises: prev.gapFillExercises.map(g => g.id === editingGapId ? {
          ...g,
          sentenceWithBlank: gapSentence.trim(),
          missingWord: gapMissing.trim(),
          options: opts,
          hintVi: gapHint.trim(),
          explanation: gapExp.trim()
        } : g)
      }));
    }

    setEditingGapId(null);
    showNotice('Đã lưu bài tập điền từ!');
  };

  const handleDeleteGap = (id: string) => {
    setUnitData(prev => ({
      ...prev,
      gapFillExercises: prev.gapFillExercises.filter(g => g.id !== id)
    }));
    showNotice('Đã xóa bài tập điền từ.');
  };

  // QUIZ ACTIONS
  const handleEditQuiz = (q: QuizQuestion) => {
    setEditingQuizId(q.id);
    setQuizQuestion(q.question);
    setQuizOptA(q.options[0] || '');
    setQuizOptB(q.options[1] || '');
    setQuizOptC(q.options[2] || '');
    setQuizOptD(q.options[3] || '');
    setQuizCorrect(q.correct_answer);
    setQuizExp(q.explanation);
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizQuestion.trim() || !quizOptA.trim() || !quizOptB.trim()) return;

    const opts = [quizOptA.trim(), quizOptB.trim()];
    if (quizOptC.trim()) opts.push(quizOptC.trim());
    if (quizOptD.trim()) opts.push(quizOptD.trim());

    const updatedQuiz: QuizQuestion = {
      id: editingQuizId || `quiz-custom-${Date.now()}`,
      game_type: 'quiz',
      question: quizQuestion.trim(),
      options: opts,
      correct_answer: quizCorrect.trim() || quizOptA.trim(),
      explanation: quizExp.trim() || 'Giải thích chuẩn từ giáo trình.',
      sourceContext: unitData.unitNameEn
    };

    setUnitData(prev => ({
      ...prev,
      reviewQuiz10: prev.reviewQuiz10.map(q => q.id === editingQuizId ? updatedQuiz : q)
    }));

    setEditingQuizId(null);
    showNotice('Đã lưu câu hỏi kiểm tra!');
  };

  // QUICK PPTX IMPORT PARSER
  const handleQuickImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;

    const lines = importText.split('\n').map(l => l.trim()).filter(Boolean);
    const newVocabs: VocabItem[] = [];
    const newPairs: MatchingPair[] = [];

    lines.forEach((line, idx) => {
      // Format: word: meaning (example) or word - meaning
      const parts = line.split(/[:\-\t]/);
      if (parts.length >= 2) {
        const word = parts[0].trim();
        const meaning = parts[1].trim();
        if (word && meaning) {
          newVocabs.push({
            id: `v-imp-${Date.now()}-${idx}`,
            word,
            partOfSpeech: 'noun',
            vietnameseMeaning: meaning,
            definitionEn: `IT Term: ${word}`,
            exampleSentence: `Working with ${word} is essential in IT.`,
            exampleVietnamese: `Làm việc với ${word} là cần thiết trong CNTT.`,
            category: unitData.unitNameEn
          });
          newPairs.push({
            id: `m-imp-${Date.now()}-${idx}`,
            english: word,
            vietnamese: meaning,
            category: unitData.unitNameEn
          });
        }
      }
    });

    if (newVocabs.length > 0) {
      setUnitData(prev => ({
        ...prev,
        vocabList: [...newVocabs, ...prev.vocabList],
        matchingPairs: [...newPairs, ...prev.matchingPairs]
      }));
      setImportText('');
      showNotice(`Đã thêm thành công ${newVocabs.length} từ vựng mới vào Unit!`);
    } else {
      alert('Không nhận diện được từ vựng. Vui lòng nhập định dạng: Từ tiếng Anh : Nghĩa tiếng Việt (mỗi từ 1 dòng)');
    }
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    if (soundEnabled) audioService.playClick();
    setTimeout(() => setNotification(null), 3000);
  };

  // FINAL SAVE ALL UNIT CHANGES
  const handleFinalSave = () => {
    onSaveUnit(unitData);
    if (soundEnabled) audioService.playCorrect();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-base sm:text-lg">
                  Quản Trị & Chỉnh Sửa Nội Dung Unit {unitData.unitNumber}
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Quyền Giảng Viên
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Thêm, xoá, điều chỉnh từ vựng, bài tập điền từ, bài kiểm tra 10 câu & giáo án bài ôn
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-800 bg-slate-950/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'vocab'
                ? 'border-indigo-500 text-indigo-300 bg-slate-850'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📚 Từ Vựng ({unitData.vocabList.length})
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'notes'
                ? 'border-indigo-500 text-indigo-300 bg-slate-850'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📝 Giáo Án & Bài Ôn
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'practice'
                ? 'border-indigo-500 text-indigo-300 bg-slate-850'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🧩 Bài Tập Điền Từ ({unitData.gapFillExercises.length})
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-indigo-500 text-indigo-300 bg-slate-850'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🎯 Đề Kiểm Tra 10 Câu ({unitData.reviewQuiz10.length})
          </button>

          <button
            onClick={() => setActiveTab('quickImport')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'quickImport'
                ? 'border-rose-500 text-rose-300 bg-slate-850'
                : 'border-transparent text-rose-400/80 hover:text-rose-300'
            }`}
          >
            ⚡ Nhập Nhanh PPTX
          </button>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mx-6 mt-3 p-3 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TAB 1: VOCABULARY MANAGEMENT */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    Danh Sách Từ Vựng Trọng Tâm Unit {unitData.unitNumber}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Từ vựng này sẽ hiển thị trên Flashcards, Trò chơi Ghép từ và các bài tập luyện tập.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddVocab}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Từ Mới</span>
                </button>
              </div>

              {/* Vocab Edit/Add Form Modal Overlay */}
              {editingVocabId && (
                <form onSubmit={handleSaveVocabItem} className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-xs uppercase text-indigo-400">
                      {editingVocabId === 'new' ? 'Thêm từ vựng mới' : `Chỉnh sửa từ: ${vWord}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingVocabId(null)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Đóng
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Từ vựng (Tiếng Anh) *</label>
                      <input
                        type="text"
                        required
                        value={vWord}
                        onChange={(e) => setVWord(e.target.value)}
                        placeholder="VD: Motherboard"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Phiên âm quốc tế</label>
                      <input
                        type="text"
                        value={vPhonetics}
                        onChange={(e) => setVPhonetics(e.target.value)}
                        placeholder="VD: /ˈmʌðəbɔːd/"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Từ loại</label>
                      <select
                        value={vPos}
                        onChange={(e: any) => setVPos(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:border-indigo-500"
                      >
                        <option value="noun">Danh từ (Noun)</option>
                        <option value="verb">Động từ (Verb)</option>
                        <option value="adjective">Tính từ (Adjective)</option>
                        <option value="phrase">Cụm từ (Phrase)</option>
                        <option value="acronym">Viết tắt (Acronym)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Nghĩa tiếng Việt *</label>
                      <input
                        type="text"
                        required
                        value={vMeaningVi}
                        onChange={(e) => setVMeaningVi(e.target.value)}
                        placeholder="VD: Bo mạch chủ"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Định nghĩa tiếng Anh</label>
                      <input
                        type="text"
                        value={vDefEn}
                        onChange={(e) => setVDefEn(e.target.value)}
                        placeholder="VD: The main printed circuit board connecting CPU and RAM."
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Câu ví dụ (English)</label>
                      <input
                        type="text"
                        value={vExampleEn}
                        onChange={(e) => setVExampleEn(e.target.value)}
                        placeholder="VD: The technician replaced the faulty motherboard."
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Dịch câu ví dụ (Tiếng Việt)</label>
                      <input
                        type="text"
                        value={vExampleVi}
                        onChange={(e) => setVExampleVi(e.target.value)}
                        placeholder="VD: Kỹ thuật viên đã thay thế bo mạch chủ bị lỗi."
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingVocabId(null)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:text-white"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Lưu Từ Vựng</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Vocab List Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {unitData.vocabList.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 flex items-start justify-between gap-3 group transition-all"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{item.word}</span>
                        {item.phonetics && (
                          <span className="text-[11px] text-slate-400 font-mono">{item.phonetics}</span>
                        )}
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                          {item.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-300 font-semibold">{item.vietnameseMeaning}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{item.exampleSentence}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditVocab(item)}
                        className="p-1.5 rounded-lg bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Chỉnh sửa từ này"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteVocab(item.id)}
                        className="p-1.5 rounded-lg bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Xóa từ này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LESSON & REVISION NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-base">
                  Giáo Án & Tóm Tắt Bài Ôn Unit {unitData.unitNumber}
                </h4>
                <p className="text-xs text-slate-400">
                  Nội dung tóm tắt hiển thị trực tiếp ở đầu trang để học sinh nắm rõ trọng tâm bài học.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-300">
                    Tên Unit (Tiếng Anh)
                  </label>
                  <input
                    type="text"
                    value={unitData.unitNameEn}
                    onChange={(e) => setUnitData({ ...unitData, unitNameEn: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-300">
                    Tên Unit (Tiếng Việt)
                  </label>
                  <input
                    type="text"
                    value={unitData.unitNameVi}
                    onChange={(e) => setUnitData({ ...unitData, unitNameVi: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-300">
                    Mô tả trọng tâm bài học & Hướng dẫn sinh viên (Overview Vi)
                  </label>
                  <textarea
                    rows={4}
                    value={unitData.overviewVi}
                    onChange={(e) => setUnitData({ ...unitData, overviewVi: e.target.value })}
                    className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-300">
                      Ngữ pháp trọng tâm (Grammar Focus English)
                    </label>
                    <input
                      type="text"
                      value={unitData.grammarFocusEn}
                      onChange={(e) => setUnitData({ ...unitData, grammarFocusEn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-300">
                      Giải thích ngữ pháp (Tiếng Việt)
                    </label>
                    <input
                      type="text"
                      value={unitData.grammarFocusVi}
                      onChange={(e) => setUnitData({ ...unitData, grammarFocusVi: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GAP FILL EXERCISES */}
          {activeTab === 'practice' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">
                    Quản Lý Bài Tập Điền Từ Khuyết (In-Class Practice)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Bài tập điền từ theo ngữ cảnh CNTT trong sách giáo khoa.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddGap}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Câu Điền Từ</span>
                </button>
              </div>

              {/* Gap fill editor form */}
              {editingGapId && (
                <form onSubmit={handleSaveGap} className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/50 space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Câu hỏi (Dùng dấu _____ cho chỗ trống) *</label>
                    <input
                      type="text"
                      required
                      value={gapSentence}
                      onChange={(e) => setGapSentence(e.target.value)}
                      placeholder="VD: A network _____ sets up firewalls and wireless connections."
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Từ còn thiếu (Đáp án đúng) *</label>
                      <input
                        type="text"
                        required
                        value={gapMissing}
                        onChange={(e) => setGapMissing(e.target.value)}
                        placeholder="administrator"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Các lựa chọn (phân cách bằng dấu phẩy)</label>
                      <input
                        type="text"
                        value={gapOpts}
                        onChange={(e) => setGapOpts(e.target.value)}
                        placeholder="administrator, developer, analyst, cashier"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Gợi ý tiếng Việt</label>
                      <input
                        type="text"
                        value={gapHint}
                        onChange={(e) => setGapHint(e.target.value)}
                        placeholder="Người quản trị mạng"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Giải thích cho học viên</label>
                      <input
                        type="text"
                        value={gapExp}
                        onChange={(e) => setGapExp(e.target.value)}
                        placeholder="Theo Unit 1 trang 6: Network administrator thiết lập tường lửa."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingGapId(null)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                    >
                      Lưu Câu Điền Từ
                    </button>
                  </div>
                </form>
              )}

              {/* Gap List */}
              <div className="space-y-2">
                {unitData.gapFillExercises.map((g, idx) => (
                  <div
                    key={g.id}
                    className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-indigo-400">Câu {idx + 1}:</div>
                      <p className="text-xs font-semibold text-white mt-0.5">{g.sentenceWithBlank}</p>
                      <p className="text-[11px] text-emerald-400 mt-1">Đáp án: {g.missingWord}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditGap(g)}
                        className="p-1.5 rounded-lg bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGap(g.id)}
                        className="p-1.5 rounded-lg bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEW QUIZ 10 */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-base">
                  Chỉnh Sửa Đề Kiểm Tra 10 Câu Unit {unitData.unitNumber}
                </h4>
                <p className="text-xs text-slate-400">
                  Học viên sẽ làm bài kiểm tra này trong tab "Kiểm tra 10 câu".
                </p>
              </div>

              {/* Quiz editor form */}
              {editingQuizId && (
                <form onSubmit={handleSaveQuiz} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/50 space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Nội dung câu hỏi *</label>
                    <input
                      type="text"
                      required
                      value={quizQuestion}
                      onChange={(e) => setQuizQuestion(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Phương án A</label>
                      <input
                        type="text"
                        required
                        value={quizOptA}
                        onChange={(e) => setQuizOptA(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Phương án B</label>
                      <input
                        type="text"
                        required
                        value={quizOptB}
                        onChange={(e) => setQuizOptB(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Phương án C</label>
                      <input
                        type="text"
                        value={quizOptC}
                        onChange={(e) => setQuizOptC(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Phương án D</label>
                      <input
                        type="text"
                        value={quizOptD}
                        onChange={(e) => setQuizOptD(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-400">Đáp án đúng chính xác *</label>
                      <input
                        type="text"
                        required
                        value={quizCorrect}
                        onChange={(e) => setQuizCorrect(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Giải thích chi tiết</label>
                      <input
                        type="text"
                        value={quizExp}
                        onChange={(e) => setQuizExp(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingQuizId(null)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
                    >
                      Lưu Câu Hỏi
                    </button>
                  </div>
                </form>
              )}

              {/* Quiz list */}
              <div className="space-y-2.5">
                {unitData.reviewQuiz10.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-amber-400 uppercase">Câu {idx + 1}:</span>
                      <p className="text-xs font-semibold text-white">{q.question}</p>
                      <div className="text-[11px] text-emerald-400">
                        Đáp án đúng: <strong>{q.correct_answer}</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleEditQuiz(q)}
                      className="p-2 rounded-xl bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors shrink-0"
                      title="Sửa câu này"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: QUICK PPTX / TEXT IMPORTER */}
          {activeTab === 'quickImport' && (
            <form onSubmit={handleQuickImport} className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-base">
                  Nhập Nhanh Từ Vựng Từ Slide PPTX Hoặc File Văn Bản
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dán danh sách từ theo cấu trúc: <code>Từ tiếng Anh : Nghĩa tiếng Việt</code> (mỗi từ 1 dòng). Hệ thống sẽ tự động tạo Flashcards và thẻ ghép từ.
                </p>
              </div>

              <textarea
                rows={8}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={`Motherboard : Bo mạch chủ
Central Processing Unit : Bộ vi xử lý trung tâm
Power Supply Unit : Bộ nguồn máy tính
Expansion Card : Card mở rộng`}
                className="w-full p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 border border-slate-700 leading-relaxed focus:border-rose-500"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Bóc Tách & Nạp Vào Unit Này</span>
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer with Final Save */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-850/90 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Toàn bộ sửa đổi sẽ được lưu vĩnh viễn và áp dụng ngay cho học viên.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm"
            >
              Đóng Không Lưu
            </button>

            <button
              type="button"
              onClick={handleFinalSave}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-slate-950" />
              <span>Lưu Toàn Bộ Cập Nhật Unit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
