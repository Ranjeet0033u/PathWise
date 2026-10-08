import React from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  ArrowRight, 
  Brain, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart2, 
  SlidersHorizontal,
  GraduationCap,
  Target,
  Award
} from 'lucide-react';

export const StudentSwotView: React.FC<{ onContinueToFamily: () => void }> = ({ onContinueToFamily }) => {
  const { student, setActiveTab } = usePrism();

  const coreMetrics = [
    { label: 'Analytical Thinking', value: student.skills.analyticalThinking, color: 'bg-rose-500' },
    { label: 'Problem Solving', value: student.skills.problemSolving, color: 'bg-rose-500' },
    { label: 'Technology Interest', value: student.skills.technologyInterest, color: 'bg-pink-500' },
    { label: 'Mathematics Foundations', value: student.skills.mathematics, color: 'bg-rose-500' },
    { label: 'Creativity & Lateral Ideation', value: student.skills.creativity, color: 'bg-sky-500' },
    { label: 'Technical Communication', value: student.skills.communication, color: 'bg-amber-400' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Student Vector Analytics</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-white font-bold">{student.name}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{student.location}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            MY PRISM SWOT PROFILE
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            A calibrated audit of your intellectual competencies, cognitive tendencies, and environmental opportunities before factoring family and market constraints.
          </p>
        </div>

        <button
          onClick={onContinueToFamily}
          className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-950/60 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <span>CONTINUE TO FAMILY PROFILE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Top Academic Profile Summary Card */}
      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-950 text-rose-300 border border-rose-800 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                {student.classDegree || 'Academic Standing'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {student.academicStream} · Aggregate Standing: <strong className="text-rose-400">{student.academicScore}%</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-950/60 text-rose-300 border border-rose-800/60">
              {student.educationLevel === 'be_btech' ? 'Undergraduate Degree (B.E / B.Tech)' : 'Grade 12 Senior Secondary'}
            </span>
          </div>
        </div>

        {/* Grade 12 Breakdown */}
        {student.educationLevel !== 'be_btech' && student.grade12Details && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-2.5">Subject Performance</span>
              <div className="space-y-2 text-xs">
                {Object.entries(student.grade12Details.subjectMarks || {}).filter(([_, v]) => v !== undefined).map(([subj, mark]) => (
                  <div key={subj} className="flex justify-between items-center text-slate-300">
                    <span className="capitalize">{subj.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-mono font-bold text-rose-400">{mark}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-2.5">Strengths & Preferred Subjects</span>
              <div className="space-y-2.5 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {(student.grade12Details.preferredSubjects || []).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-rose-950/80 text-rose-200 border border-rose-900/60 text-[11px] font-medium">{s}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(student.grade12Details.academicStrengths || []).map((st, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-200 border border-purple-900/60 text-[11px] font-medium">{st}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-2.5">Entrance Exams Targeted</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {(student.grade12Details.competitiveExams || []).map((ex, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-sky-950/60 text-sky-300 border border-sky-800/60 font-semibold text-xs">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* B.E / B.Tech Breakdown */}
        {student.educationLevel === 'be_btech' && student.beBtechDetails && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-2.5">Academic Standing</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Current CGPA:</span>
                  <span className="font-mono font-bold text-rose-400">{student.beBtechDetails.currentCgpa} / 10</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Overall CGPA:</span>
                  <span className="font-mono font-bold text-rose-400">{student.beBtechDetails.overallCgpa} / 10</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Arrears Status:</span>
                  <span className={`font-bold ${student.beBtechDetails.hasArrears ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {student.beBtechDetails.hasArrears ? `${student.beBtechDetails.activeArrears || 1} Active` : 'Zero Backlogs'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate pt-1 border-t border-slate-800 mt-1">
                  {student.beBtechDetails.college}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-2.5">Discipline Subjects</span>
              <div className="space-y-1.5 text-xs">
                {Object.entries(student.beBtechDetails.branchSubjects || {}).slice(0, 4).map(([subj, score]) => (
                  <div key={subj} className="flex justify-between text-slate-300">
                    <span className="truncate">{subj}</span>
                    <span className="font-mono font-bold text-rose-400 ml-1">{score}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-2.5">Certifications & Projects</span>
              <div className="space-y-2 text-xs">
                <div className="flex flex-wrap gap-1">
                  {(student.beBtechDetails.certifications || []).slice(0, 2).map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-200 border border-purple-900/60 text-[10px] font-medium">{c}</span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2">
                  {student.beBtechDetails.projectsCompleted}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-2.5">Industry Readiness</span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Skill Level:</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-bold text-[10px]">
                    {student.beBtechDetails.skillLevel}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 line-clamp-2">
                  Internship: {student.beBtechDetails.internshipExperience}
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {(student.beBtechDetails.areasNeedingImprovement || []).slice(0, 2).map((a, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-900/60 text-[10px]">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Core Competency Bars */}
      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">Quantified Competency Vector</h3>
          </div>
          <span className="text-xs text-slate-400">Benchmark: All-India STEM Peer Cohort</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreMetrics.map(item => (
            <div key={item.label} className="p-4 bg-[#0d1222] rounded-xl border border-slate-800/80">
              <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2.5">
                <span>{item.label}</span>
                <span className="font-mono font-bold text-white tabular-nums">{item.value}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SWOT 4-Quadrant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* STRENGTHS */}
        <div className="p-6 bg-[#090c18] rounded-2xl border-l-4 border-l-emerald-500 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2.5 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-wide">STRENGTHS</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Innate advantages, verified academic rigor, and strong quantitative foundations.
          </p>
          <ul className="space-y-2.5">
            {student.swot.strengths.map((s, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WEAKNESSES */}
        <div className="p-6 bg-[#090c18] rounded-2xl border-l-4 border-l-amber-500 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2.5 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">WEAKNESSES</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Identified execution gaps to proactively target with university coursework and internships.
          </p>
          <ul className="space-y-2.5">
            {student.swot.weaknesses.map((w, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* OPPORTUNITIES */}
        <div className="p-6 bg-[#090c18] rounded-2xl border-l-4 border-l-sky-500 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2.5 mb-2">
            <TrendingUp className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-white tracking-wide">OPPORTUNITIES</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Favourable macro economic trends and regional STEAM corridors tailored to your profile.
          </p>
          <ul className="space-y-2.5">
            {student.swot.opportunities.map((o, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* THREATS */}
        <div className="p-6 bg-[#090c18] rounded-2xl border-l-4 border-l-rose-500 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2.5 mb-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white tracking-wide">THREATS</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Systemic headwinds, examination cut-off bottlenecks, and technology velocity shifts.
          </p>
          <ul className="space-y-2.5">
            {student.swot.threats.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Action Card */}
      <div className="p-6 bg-[#090c18] border border-rose-950/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="text-sm font-bold text-white">Next: Map the Family Financial & Risk Vector</h4>
          <p className="text-xs text-slate-300 mt-0.5">
            A career is only viable if it aligns with parental budgets and risk tolerances.
          </p>
        </div>
        <button
          onClick={onContinueToFamily}
          className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl transition-all shadow-md shadow-rose-950/60 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>CONTINUE TO FAMILY PROFILE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
