import React, { useState, useEffect } from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Brain, 
  Wallet, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';

interface AnalysisPipelineModalProps {
  onComplete: () => void;
}

export const AnalysisPipelineModal: React.FC<AnalysisPipelineModalProps> = ({ onComplete }) => {
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  const pipelineStages = [
    { label: 'Student competencies analysed', icon: Brain, detail: 'Aptitude 88%, Math 91%, Programming 82%' },
    { label: 'Family constraints mapped', icon: Wallet, detail: 'Budget ₹4.5L/yr, Balanced risk tolerance' },
    { label: 'Vector normalization executed', icon: Layers, detail: 'Weighted 30% Student, 25% Finance, 25% Market' },
    { label: 'Financial feasibility calculated', icon: Wallet, detail: 'Low-cost state vs moderate autonomous options' },
    { label: 'Alignment conflict evaluated', icon: ShieldCheck, detail: 'Parent-Student Conflict Index: 28/100 (Low)' },
    { label: 'Market opportunities analysed', icon: TrendingUp, detail: 'Chennai, Bengaluru & Hyderabad hiring velocity' },
    { label: 'Career pathways ranked', icon: Sparkles, detail: 'AI/ML, Data Science, Cyber Defense synthesized' },
    { label: 'Personalized roadmap generated', icon: CheckCircle2, detail: 'Entrance exams, scholarships & milestone stages' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedSteps(prev => {
        if (prev < pipelineStages.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [pipelineStages.length]);

  const isAllDone = completedSteps >= pipelineStages.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 overflow-hidden text-center">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-500 flex items-center justify-center text-white mx-auto shadow-md mb-4 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          PRISM is building your career intelligence.
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Multi-vector constraint solving in progress across Student, Family, and Market datasets.
        </p>

        {/* Pipeline Execution List */}
        <div className="mt-8 space-y-2.5 max-h-72 overflow-y-auto px-1 text-left">
          {pipelineStages.map((stage, idx) => {
            const isCompleted = idx < completedSteps;
            const isCurrent = idx === completedSteps;
            const Icon = stage.icon;

            return (
              <div 
                key={stage.label}
                className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                  isCompleted 
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800' 
                    : isCurrent 
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-semibold ring-1 ring-indigo-200' 
                      : 'bg-slate-50/50 border-slate-200/60 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isCompleted ? 'bg-emerald-100 text-emerald-700' : isCurrent ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{stage.label}</div>
                    <div className="text-[11px] text-slate-500">{stage.detail}</div>
                  </div>
                </div>

                <div className="text-[11px] font-mono">
                  {isCompleted ? (
                    <span className="text-emerald-700 font-bold">READY</span>
                  ) : isCurrent ? (
                    <span className="text-indigo-600 font-semibold animate-pulse">SOLVING...</span>
                  ) : (
                    <span className="text-slate-400">QUEUED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Message & Action */}
        <div className="mt-8 pt-4 border-t border-slate-100">
          {isAllDone ? (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <p className="text-sm font-bold text-slate-900 mb-3">
                “Your personalized career pathways are ready.”
              </p>
              <button
                onClick={onComplete}
                className="w-full sm:w-auto px-8 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <span>VIEW MY RESULTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Optimizing multi-dimensional trade-offs...</span>
              <button 
                onClick={onComplete}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                Skip Animation
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
