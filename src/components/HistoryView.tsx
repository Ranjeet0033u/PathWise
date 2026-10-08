import React from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  History, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Brain, 
  ShieldCheck 
} from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { historyLog, student, overallMetrics, setActiveTab } = usePrism();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Career Companion Record</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Continuous Longitudinal Guidance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            PRISM Student History & Evolution
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            A permanent record of how your aptitude, family realities, and market priorities evolve over time.
          </p>
        </div>

        <div className="text-right">
          <span className="font-mono text-2xl font-extrabold text-[#f43f5e]">
            {overallMetrics.overallPrismScore} / 100
          </span>
          <span className="text-xs text-slate-400 block">Current PRISM Score</span>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Student Profile
          </span>
          <div className="text-sm font-bold text-white">{student.name}</div>
          <div className="text-xs text-slate-400">{student.academicStream}</div>
        </div>

        <div className="p-4 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Primary Target Career
          </span>
          <div className="text-sm font-bold text-rose-400">AI / Machine Learning Engineer</div>
          <div className="text-xs text-slate-400">92% Multi-Vector Alignment</div>
        </div>

        <div className="p-4 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Family Alignment Status
          </span>
          <div className="text-sm font-bold text-emerald-400">Stable Concordance (82%)</div>
          <div className="text-xs text-slate-400">4-Year Budget Pool Safe</div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 p-6 shadow-xl space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <History className="w-5 h-5 text-rose-400" />
          <span>Audit Log & Vector Evolution Timeline</span>
        </h3>

        <div className="space-y-4">
          {historyLog.map((item, idx) => (
            <div key={item.id} className="p-4 bg-[#0d1222] rounded-xl border border-slate-800 flex items-start gap-4 text-xs">
              <div className="w-8 h-8 rounded-full bg-rose-950 border border-rose-800 text-rose-300 flex items-center justify-center shrink-0 font-bold font-mono">
                #{idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{item.action}</span>
                  <span className="text-slate-400 font-mono text-[11px]">{item.timestamp}</span>
                </div>
                <p className="text-slate-300 mt-1">{item.detail}</p>
                <div className="mt-2 text-[11px] text-rose-400 font-mono">
                  Engine Version: PRISM Multi-Vector v2.4
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
