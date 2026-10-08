import React from 'react';
import { usePrism } from '../context/PrismContext';
import { Printer, Download, X, ShieldCheck, CheckCircle2, Wallet, TrendingUp, Sparkles } from 'lucide-react';

export const CareerReportPrintModal: React.FC = () => {
  const { 
    isReportPrintOpen, 
    setIsReportPrintOpen, 
    student, 
    family, 
    careers, 
    overallMetrics, 
    roadmapMilestones,
    roadmapProgressPercent 
  } = usePrism();

  if (!isReportPrintOpen) return null;

  const top3 = careers.slice(0, 3);
  const total4YrCapacity = (family.annualBudgetLakhs * 4).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 print:p-0 print:bg-white print:static">
      <div 
        className="w-full max-w-4xl bg-white text-slate-900 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden print:max-h-none print:shadow-none print:rounded-none"
        role="dialog"
        aria-modal="true"
        aria-label="PathWise Career Report Summary"
      >
        {/* Modal Controls (Hidden in Print) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-bold">PathWise Career Guidance Report — Print &amp; PDF Export</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setIsReportPrintOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable One-Page Content Body */}
        <div id="printable-report" className="p-8 overflow-y-auto space-y-6 text-slate-800 font-sans print:p-6 print:overflow-visible">
          {/* Header Lockup */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold tracking-widest text-rose-600 uppercase">
                  PATHWISE • PRISM ENGINE
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-500">TAMIL NADU STEAM GUIDANCE SUITE</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Candidate Career Synthesis Report
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Evidence-Based Multi-Vector STEAM Pathway Allocation
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-700 border border-slate-300">
                OFFICIAL REPORT
              </span>
              <p className="text-[11px] text-slate-500 mt-1">Generated: March 2026</p>
            </div>
          </div>

          {/* Student & Family Profile Summary Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Student Candidate</span>
              <strong className="text-sm font-bold text-slate-900">{student.name}</strong>
              <span className="text-[11px] text-slate-600 block">{student.classDegree}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Cognitive Profile</span>
              <strong className="text-sm font-bold text-slate-900">Math {student.skills.mathematics}%</strong>
              <span className="text-[11px] text-slate-600 block">Analytical {student.skills.analyticalThinking}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Family Annual Budget</span>
              <strong className="text-sm font-bold text-rose-600">₹{family.annualBudgetLakhs}L / year</strong>
              <span className="text-[11px] text-slate-600 block">4-Yr Pool: ₹{total4YrCapacity}L</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Family Alignment</span>
              <strong className="text-sm font-bold text-emerald-700">{overallMetrics.conflictIndex}/100 Strain</strong>
              <span className="text-[11px] text-slate-600 block">Status: High Concordance</span>
            </div>
          </div>

          {/* Section 1: Top 3 Recommended Career Pathways */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>1. Top 3 Synthesized Career Trajectories</span>
              <span className="text-[10px] font-normal text-slate-400">Ranked by PRISM Alignment Algorithm</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {top3.map((c, i) => (
                <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-rose-600">RANK #{i + 1}</span>
                    <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-rose-50 text-rose-700">
                      {c.matchScore}% Match
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs leading-tight">{c.title}</h4>
                  <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100 font-mono">
                    <div>CTC: <strong className="text-slate-900">{c.salaryRange}</strong></div>
                    <div>Student Fit: <strong>{c.scores.studentFit}%</strong></div>
                    <div>Financial Fit: <strong>{c.scores.financialFit}%</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Financial Feasibility & Debt Safety */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              2. Financial Feasibility &amp; Degree Cost Analysis
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Primary Target Degree Cost:</span>
                <strong className="text-sm font-bold text-slate-900">₹11.0 Lakhs (4 Years)</strong>
                <span className="text-[10px] text-slate-500 block">Autonomous Engineering Tier</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Family 4-Year Capacity:</span>
                <strong className="text-sm font-bold text-emerald-700">₹{total4YrCapacity} Lakhs</strong>
                <span className="text-[10px] text-emerald-600 block">Debt-Free Feasible (+₹{(Number(total4YrCapacity) - 11.0).toFixed(1)}L Buffer)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Government Concession Target:</span>
                <strong className="text-sm font-bold text-slate-900">TN First Graduate Scheme</strong>
                <span className="text-[10px] text-slate-500 block">₹25,000 / year tuition waiver</span>
              </div>
            </div>
          </div>

          {/* Section 3: Roadmap Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                3. Class 11-12 Milestone Execution ({roadmapProgressPercent}% Completed)
              </h3>
              <span className="text-xs font-mono font-bold text-slate-700">{roadmapProgressPercent}% Ready</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {roadmapMilestones.slice(0, 4).map((m) => (
                <div key={m.id} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className={`w-4 h-4 rounded flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${m.completed ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-slate-400'}`}>
                    {m.completed ? '✓' : ''}
                  </span>
                  <div>
                    <span className={`font-semibold ${m.completed ? 'text-slate-900' : 'text-slate-500'}`}>{m.title}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{m.stage} • {m.targetQuarter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Disclaimer & Sign-off */}
          <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 space-y-1">
            <p>
              <strong>Indicative Guidance Disclaimer:</strong> Salary ranges, cut-offs, and scholarship allowances are estimated based on past TNEA Anna University admission records and 2026 hiring reports. Verify all cut-off marks and official scholarship criteria on official government portals.
            </p>
            <div className="flex justify-between items-center pt-3 font-mono text-[9px] text-slate-400">
              <span>PathWise PRISM Engine • www.pathwise-prism.edu</span>
              <span>Candidate Signature: __________________</span>
              <span>Counsellor Signature: __________________</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
