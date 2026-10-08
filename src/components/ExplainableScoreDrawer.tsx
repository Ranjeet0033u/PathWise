import React from 'react';
import { usePrism } from '../context/PrismContext';
import { X, Calculator, Info, ShieldCheck, CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';

export const ExplainableScoreDrawer: React.FC = () => {
  const { explainScoreData, closeExplainScore, language } = usePrism();

  if (!explainScoreData) return null;

  const isTamil = language === 'ta';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#070b19] border-l border-rose-950/60 h-full overflow-y-auto shadow-2xl flex flex-col p-6 text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-label="Explain this score"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                {isTamil ? 'வெளிப்படையான கணக்கீட்டு முறை' : 'EXPLAINABLE SCORING FORMULA'}
              </span>
              <h2 className="text-lg font-extrabold text-white">
                {explainScoreData.scoreTitle}
              </h2>
            </div>
          </div>
          <button
            onClick={closeExplainScore}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Score Display */}
        <div className="my-6 p-5 rounded-2xl bg-gradient-to-br from-[#12050f] via-[#090c18] to-[#050814] border border-rose-950/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">
              {isTamil ? 'இறுதி கணக்கீட்டு மதிப்பீடு' : 'Total Synthesized Score'}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold font-mono text-[#f43f5e]">
                {explainScoreData.totalScore}
              </span>
              <span className="text-slate-500 font-mono text-sm">/ {explainScoreData.maxScore}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isTamil ? 'சரிபார்க்கப்பட்ட கணிதம்' : 'Verifiable Algorithm'}</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1.5 font-mono">
              {isTamil ? 'உறுதியான ஃபார்முலா' : '100% Deterministic Math'}
            </span>
          </div>
        </div>

        {/* Formula breakdown */}
        <div className="space-y-4 flex-1">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-rose-400" />
              <span>{isTamil ? 'சூத்திரம் (Formula)' : 'Mathematical Formula'}</span>
            </h3>
            <div className="p-3 bg-[#0d1222] rounded-xl border border-slate-800 font-mono text-xs text-rose-300 break-words leading-relaxed">
              {explainScoreData.formula}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {isTamil ? 'அளவீடுகள் & பங்களிப்பு (Component Weights)' : 'Weighted Factor Breakdown'}
            </h3>
            <div className="space-y-2.5">
              {explainScoreData.weights.map((w, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#090c18] border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">{w.label}</span>
                    <span className="font-mono text-rose-400">+{w.weightedContribution} pts ({w.weightPercent}%)</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-rose-600 to-pink-500 h-1.5 rounded-full" 
                      style={{ width: `${Math.min(100, (w.rawScore / 100) * 100)}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Raw Input Score: <strong className="text-white font-mono">{w.rawScore}/100</strong></span>
                    <span className="text-[10px] text-slate-400">{w.explanation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verdict Note */}
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-400">
              <Info className="w-3.5 h-3.5" />
              <span>{isTamil ? 'வழிகாட்டுதல் குறிப்பு' : 'PRISM Transparency Guarantee'}</span>
            </div>
            <p className="leading-relaxed">
              {explainScoreData.verdictNote}
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 mt-4 border-t border-rose-950/40">
          <button
            onClick={closeExplainScore}
            className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all cursor-pointer"
          >
            {isTamil ? 'மூடுக (Close Explanation)' : 'Close Explanation Drawer'}
          </button>
        </div>
      </div>
    </div>
  );
};
