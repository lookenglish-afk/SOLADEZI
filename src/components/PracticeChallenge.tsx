import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  ArrowRight,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { GapFillExercise, UnscrambleChallenge } from '../types/index.ts';
import { audioService } from '../utils/audio.ts';

interface PracticeChallengeProps {
  gapFills: GapFillExercise[];
  unscrambles: UnscrambleChallenge[];
  soundEnabled: boolean;
  projectionMode: boolean;
}

export const PracticeChallenge: React.FC<PracticeChallengeProps> = ({
  gapFills,
  unscrambles,
  soundEnabled,
  projectionMode
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'gapfill' | 'unscramble'>('gapfill');

  // Gap fill state
  const [currentGfIndex, setCurrentGfIndex] = useState(0);
  const [selectedGfOption, setSelectedGfOption] = useState<string | null>(null);
  const [isGfConfirmed, setIsGfConfirmed] = useState(false);
  const [gfScores, setGfScores] = useState<Record<string, boolean>>({});

  // Unscramble state
  const [currentUsIndex, setCurrentUsIndex] = useState(0);
  const [selectedWordPool, setSelectedWordPool] = useState<string[]>([]);
  const [availableWordPool, setAvailableWordPool] = useState<string[]>([]);
  const [isUsConfirmed, setIsUsConfirmed] = useState(false);
  const [isUsCorrect, setIsUsCorrect] = useState<boolean | null>(null);

  const currentGf = gapFills[currentGfIndex] || gapFills[0];
  const currentUs = unscrambles[currentUsIndex] || unscrambles[0];

  // Initialize unscramble word pool
  React.useEffect(() => {
    if (currentUs) {
      setAvailableWordPool([...currentUs.jumbledWords].sort(() => Math.random() - 0.5));
      setSelectedWordPool([]);
      setIsUsConfirmed(false);
      setIsUsCorrect(null);
    }
  }, [currentUs, currentUsIndex]);

  // Reset Gap Fill when switching
  const handleSelectGfOption = (opt: string) => {
    if (isGfConfirmed) return;
    if (soundEnabled) audioService.playClick();
    setSelectedGfOption(opt);
  };

  const handleConfirmGf = () => {
    if (!selectedGfOption || isGfConfirmed || !currentGf) return;

    setIsGfConfirmed(true);
    const isCorrect = selectedGfOption.trim().toLowerCase() === currentGf.missingWord.trim().toLowerCase();

    if (isCorrect) {
      if (soundEnabled) audioService.playCorrect();
      setGfScores((prev) => ({ ...prev, [currentGf.id]: true }));
    } else {
      if (soundEnabled) audioService.playIncorrect();
      setGfScores((prev) => ({ ...prev, [currentGf.id]: false }));
    }
  };

  const handleNextGf = () => {
    setSelectedGfOption(null);
    setIsGfConfirmed(false);
    setCurrentGfIndex((prev) => (prev + 1) % gapFills.length);
  };

  // Unscramble handlers
  const handlePickWord = (word: string, index: number) => {
    if (isUsConfirmed) return;
    if (soundEnabled) audioService.playClick();

    const newAvailable = [...availableWordPool];
    newAvailable.splice(index, 1);
    setAvailableWordPool(newAvailable);
    setSelectedWordPool([...selectedWordPool, word]);
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (isUsConfirmed) return;
    if (soundEnabled) audioService.playClick();

    const newSelected = [...selectedWordPool];
    newSelected.splice(index, 1);
    setSelectedWordPool(newSelected);
    setAvailableWordPool([...availableWordPool, word]);
  };

  const handleResetWords = () => {
    if (!currentUs) return;
    setAvailableWordPool([...currentUs.jumbledWords].sort(() => Math.random() - 0.5));
    setSelectedWordPool([]);
    setIsUsConfirmed(false);
    setIsUsCorrect(null);
  };

  const handleConfirmUs = () => {
    if (selectedWordPool.length === 0 || isUsConfirmed || !currentUs) return;

    setIsUsConfirmed(true);
    const formedSentence = selectedWordPool.join(' ').trim().toLowerCase().replace(/[.?!,]/g, '');
    const targetSentence = currentUs.correctSentence.trim().toLowerCase().replace(/[.?!,]/g, '');

    const isMatch = formedSentence === targetSentence;
    setIsUsCorrect(isMatch);

    if (isMatch) {
      if (soundEnabled) audioService.playCorrect();
    } else {
      if (soundEnabled) audioService.playIncorrect();
    }
  };

  const handleNextUs = () => {
    setCurrentUsIndex((prev) => (prev + 1) % unscrambles.length);
  };

  return (
    <div className={`space-y-6 max-w-4xl mx-auto ${projectionMode ? 'text-lg' : ''}`}>
      {/* Activity Sub-tabs */}
      <div className="flex items-center justify-between bg-slate-800/60 p-2 rounded-2xl border border-slate-700/80">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('gapfill')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'gapfill'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            Thử thách 1: Điền từ khuyết (Gap-Filling)
          </button>

          <button
            onClick={() => setActiveSubTab('unscramble')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'unscramble'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            Thử thách 2: Sắp xếp trật tự câu (Sentence Unscramble)
          </button>
        </div>

        <div className="text-xs text-slate-400 font-semibold px-2 hidden sm:block">
          Giáo trình Pearson IT 1
        </div>
      </div>

      {/* MODE 1: GAP FILLING */}
      {activeSubTab === 'gapfill' && currentGf && (
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                Câu {currentGfIndex + 1} / {gapFills.length}
              </span>
              <span className="text-xs text-slate-400 font-medium">Hoàn thành chỗ trống trong câu</span>
            </div>

            <button
              onClick={() => audioService.speakEn(currentGf.sentenceWithBlank.replace('_____', currentGf.missingWord))}
              className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700"
              title="Nghe câu hoàn chỉnh"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe câu mẫu</span>
            </button>
          </div>

          {/* Sentence Display */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700/80 text-center">
            <p className={`font-semibold text-white leading-relaxed ${
              projectionMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}>
              {currentGf.sentenceWithBlank.split('_____').map((part, idx, arr) => (
                <React.Fragment key={idx}>
                  {part}
                  {idx < arr.length - 1 && (
                    <span className={`inline-block px-3 py-1 mx-1.5 rounded-lg font-bold border ${
                      isGfConfirmed
                        ? selectedGfOption === currentGf.missingWord
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500 ring-2 ring-emerald-500/30'
                          : 'bg-rose-950 text-rose-300 border-rose-500'
                        : selectedGfOption
                        ? 'bg-indigo-900 text-indigo-200 border-indigo-500'
                        : 'bg-slate-800 text-amber-300 border-dashed border-amber-400/60 min-w-[90px]'
                    }`}>
                      {selectedGfOption || '... ? ...'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </p>

            {currentGf.hintVi && (
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-400">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Gợi ý: {currentGf.hintVi}</span>
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentGf.options.map((opt) => {
              const isSelected = selectedGfOption === opt;
              const isCorrectOpt = opt === currentGf.missingWord;

              return (
                <button
                  key={opt}
                  disabled={isGfConfirmed}
                  onClick={() => handleSelectGfOption(opt)}
                  className={`p-3.5 rounded-xl font-bold border transition-all text-sm sm:text-base cursor-pointer ${
                    isGfConfirmed
                      ? isCorrectOpt
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                        : isSelected
                        ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 opacity-60'
                      : isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/40 ring-2 ring-indigo-400/50'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-indigo-400 hover:bg-slate-750'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isGfConfirmed && (
            <div className={`p-4 rounded-2xl border text-sm animate-in fade-in duration-300 ${
              selectedGfOption === currentGf.missingWord
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
            }`}>
              <div className="font-bold flex items-center gap-2 mb-1">
                {selectedGfOption === currentGf.missingWord ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Chính xác! (+10 điểm)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>Chưa chính xác! Đáp án đúng là: <strong className="text-white underline">{currentGf.missingWord}</strong></span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {currentGf.explanation}
              </p>
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              Chọn đáp án và nhấn Xác nhận để nộp bài
            </span>

            {!isGfConfirmed ? (
              <button
                disabled={!selectedGfOption}
                onClick={handleConfirmGf}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  selectedGfOption
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                Xác nhận đáp án
              </button>
            ) : (
              <button
                onClick={handleNextGf}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: SENTENCE UNSCRAMBLE */}
      {activeSubTab === 'unscramble' && currentUs && (
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
                Câu {currentUsIndex + 1} / {unscrambles.length}
              </span>
              <span className="text-xs text-slate-400 font-medium">Ghép các mảnh từ thành câu chuẩn ngữ pháp</span>
            </div>

            <button
              onClick={handleResetWords}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại</span>
            </button>
          </div>

          {/* Vietnamese Target Meaning */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/70">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              Câu tiếng Việt cần diễn đạt:
            </div>
            <p className={`font-semibold text-amber-300 ${projectionMode ? 'text-xl' : 'text-lg'}`}>
              "{currentUs.translationVi}"
            </p>
            {currentUs.grammarTipVi && (
              <p className="text-xs text-slate-400 mt-1 italic">
                Cấu trúc: {currentUs.grammarTipVi}
              </p>
            )}
          </div>

          {/* User Formed Sentence Box */}
          <div className="min-h-[90px] rounded-2xl p-4 bg-slate-950/70 border-2 border-dashed border-indigo-500/40 flex flex-wrap items-center gap-2">
            {selectedWordPool.length === 0 ? (
              <span className="text-xs sm:text-sm text-slate-400 italic">
                Nhấn vào các từ bên dưới để xếp thành câu hoàn chỉnh...
              </span>
            ) : (
              selectedWordPool.map((word, idx) => (
                <button
                  key={`${word}-${idx}`}
                  disabled={isUsConfirmed}
                  onClick={() => handleRemoveWord(word, idx)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-1 group cursor-pointer"
                  title="Nhấn để gỡ từ này"
                >
                  <span>{word}</span>
                  {!isUsConfirmed && <span className="text-indigo-300 text-xs ml-1 group-hover:text-white">×</span>}
                </button>
              ))
            )}
          </div>

          {/* Available Word Pool */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Ngân hàng từ ngữ (Nhấn để chọn):
            </div>
            <div className="flex flex-wrap gap-2.5 min-h-[50px] p-3 rounded-2xl bg-slate-900/40 border border-slate-700/60">
              {availableWordPool.length === 0 ? (
                <span className="text-xs text-slate-400 italic">Đã dùng hết tất cả các từ trong kho.</span>
              ) : (
                availableWordPool.map((word, idx) => (
                  <button
                    key={`${word}-${idx}`}
                    disabled={isUsConfirmed}
                    onClick={() => handlePickWord(word, idx)}
                    className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold text-sm sm:text-base border border-slate-600 hover:border-indigo-400 transition-all cursor-pointer"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Result Banner */}
          {isUsConfirmed && (
            <div className={`p-4 rounded-2xl border text-sm animate-in fade-in duration-300 ${
              isUsCorrect
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
            }`}>
              <div className="font-bold flex items-center gap-2 mb-1">
                {isUsCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Xuất sắc! Câu ghép chuẩn xác 100%!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>Chưa đúng trật tự câu!</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Câu chuẩn: <strong className="text-sky-300 font-semibold">{currentUs.correctSentence}</strong>
              </p>
            </div>
          )}

          {/* Unscramble Bottom Buttons */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              Xếp xong câu và nhấn Kiểm tra
            </span>

            {!isUsConfirmed ? (
              <button
                disabled={selectedWordPool.length === 0}
                onClick={handleConfirmUs}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  selectedWordPool.length > 0
                    ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                Kiểm tra câu
              </button>
            ) : (
              <button
                onClick={handleNextUs}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
