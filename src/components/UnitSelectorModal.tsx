import React from 'react';
import { X, BookOpen, Check, FileUp, Sparkles, Layers } from 'lucide-react';
import { UnitData } from '../types/index.ts';

interface UnitSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  units: UnitData[];
  currentUnit: UnitData;
  onSelectUnit: (unit: UnitData) => void;
  onOpenCustomImport: () => void;
}

export const UnitSelectorModal: React.FC<UnitSelectorModalProps> = ({
  isOpen,
  onClose,
  units,
  currentUnit,
  onSelectUnit,
  onOpenCustomImport
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl shadow-black/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Chọn Bài Học hoặc Nhập Dữ Liệu Mới</h2>
              <p className="text-xs text-slate-400">Giáo trình Pearson English for IT 1 (CEF A1-A2)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Unit Grid */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Custom Material Importer Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-900/40 via-sky-950/30 to-purple-900/30 border border-indigo-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white text-sm">Nhập File PPTX hoặc Danh sách từ của Giáo viên</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Tự động bóc tách từ vựng, tạo Flashcards, game ghép từ, bài tập điền từ và bài kiểm tra 10 câu theo chuẩn EdTech.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenCustomImport();
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm whitespace-nowrap shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileUp className="w-4 h-4" />
              <span>Nhập Nội dung</span>
            </button>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1 pt-2">
            8 Bài học tiêu chuẩn trong sách giáo khoa:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {units.map((unit) => {
              const isSelected = unit.id === currentUnit.id;
              return (
                <button
                  key={unit.id}
                  onClick={() => {
                    onSelectUnit(unit);
                    onClose();
                  }}
                  className={`p-4 rounded-xl text-left border transition-all relative flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg'
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-500/40 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3 text-indigo-400" />
                      <span>Đang chọn</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-900/60 text-sky-300 border border-sky-600/30">
                        Unit {unit.unitNumber}
                      </span>
                      <span className="text-[11px] text-slate-400">{unit.pageRange}</span>
                    </div>

                    <h3 className="font-bold text-slate-100 text-sm group-hover:text-indigo-300 transition-colors">
                      {unit.unitNameEn}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">{unit.unitNameVi}</p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="truncate max-w-[200px]">
                      Ngữ pháp: <strong className="text-slate-300 font-normal">{unit.grammarFocusVi}</strong>
                    </span>
                    <span className="text-indigo-400 font-semibold flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {unit.vocabList.length} từ vựng
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-800/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
