import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  Wallet, 
  Brain, 
  MapPin, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  GraduationCap, 
  Scale,
  Info 
} from 'lucide-react';

export const CareerDetailView: React.FC = () => {
  const { selectedCareer, careers, setSelectedCareerId, setActiveTab } = usePrism();
  const [activeTabSub, setActiveTabSub] = useState<'why' | 'pathway' | 'compare'>('why');
  const [compareCareerId, setCompareCareerId] = useState<string>(
    careers.find(c => c.id !== selectedCareer.id)?.id || 'data-science-systems'
  );

  const compareCareer = careers.find(c => c.id === compareCareerId) || careers[1];

  return (
    <div className="space-y-6">
      
      {/* Back button & Title */}
      <div>
        <button
          onClick={() => setActiveTab('explorer')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-white mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Careers</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>{selectedCareer.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-emerald-400">{selectedCareer.salaryRange}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-sky-400">Hiring Velocity: {selectedCareer.hiringVelocity}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedCareer.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {selectedCareer.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="font-mono text-3xl font-extrabold text-[#f43f5e] tabular-nums">
                {selectedCareer.matchScore}%
              </span>
              <span className="text-xs text-slate-400 block uppercase font-semibold">PRISM MATCH</span>
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-950/60 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>BUILD MY ROADMAP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Indicative Disclaimer */}
      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-center justify-between text-xs text-amber-200/90 gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span><strong>Indicative Reference:</strong> Salary ranges ({selectedCareer.salaryRange}) and fee structures are estimated benchmarks. Verify on official portal and university sites. No guarantees implied.</span>
        </div>
        <span className="text-[11px] font-mono text-amber-400/80 shrink-0 hidden sm:inline">Last updated: Oct 2026</span>
      </div>

      {/* Vector Score Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 bg-[#090c18] rounded-xl border border-rose-950/40 text-center shadow-xl">
          <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">STUDENT FIT</span>
          <span className="font-mono text-xl font-bold text-white">{selectedCareer.scores.studentFit}%</span>
        </div>
        <div className="p-3.5 bg-[#090c18] rounded-xl border border-rose-950/40 text-center shadow-xl">
          <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">FINANCIAL FIT</span>
          <span className="font-mono text-xl font-bold text-emerald-400">{selectedCareer.scores.financialFit}%</span>
        </div>
        <div className="p-3.5 bg-[#090c18] rounded-xl border border-rose-950/40 text-center shadow-xl">
          <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">MARKET DEMAND</span>
          <span className="font-mono text-xl font-bold text-sky-400">{selectedCareer.scores.marketDemand}%</span>
        </div>
        <div className="p-3.5 bg-[#090c18] rounded-xl border border-rose-950/40 text-center shadow-xl">
          <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">GEOGRAPHIC OPPTY</span>
          <span className="font-mono text-xl font-bold text-rose-300">{selectedCareer.scores.geographicOpportunity}%</span>
        </div>
        <div className="p-3.5 bg-[#090c18] rounded-xl border border-rose-950/40 text-center shadow-xl col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">SKILL READINESS</span>
          <span className="font-mono text-xl font-bold text-purple-400">{selectedCareer.scores.skillReadiness}%</span>
        </div>
      </div>

      {/* Segmented View Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTabSub('why')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTabSub === 'why' 
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-md shadow-rose-950/60' 
              : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
          }`}
        >
          Why This Career? (Explainable Logic)
        </button>
        <button
          onClick={() => setActiveTabSub('pathway')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTabSub === 'pathway' 
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-md shadow-rose-950/60' 
              : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
          }`}
        >
          Education Pathways (3-Tier Costs)
        </button>
        <button
          onClick={() => setActiveTabSub('compare')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTabSub === 'compare' 
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-md shadow-rose-950/60' 
              : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
          }`}
        >
          Compare Career Vectors
        </button>
      </div>

      {/* TAB 1: EXPLAINABLE "WHY THIS CAREER?" */}
      {activeTabSub === 'why' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          
          {/* Main AI Explanation Synthesis */}
          <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/60 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Transparent Algorithmic Rationale</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              “Why did PRISM recommend this career?”
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-[#0d1222] p-4 rounded-xl border border-slate-800 shadow-sm">
              {selectedCareer.whyRecommended.synthesis}
            </p>
          </div>

          {/* 4 Multi-Vector Pillars Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Student Pillar */}
            <div className="p-5 bg-[#090c18] rounded-xl border border-rose-950/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase mb-2">
                <Brain className="w-4 h-4" />
                <span>Student Competency Alignment</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedCareer.whyRecommended.studentReason}
              </p>
            </div>

            {/* Family Pillar */}
            <div className="p-5 bg-[#090c18] rounded-xl border border-rose-950/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase mb-2">
                <Wallet className="w-4 h-4" />
                <span>Family Budget & Risk Viability</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedCareer.whyRecommended.familyReason}
              </p>
            </div>

            {/* Market Pillar */}
            <div className="p-5 bg-[#090c18] rounded-xl border border-rose-950/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Regional Market Velocity</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedCareer.whyRecommended.marketReason}
              </p>
            </div>

            {/* Skill Gap Pillar */}
            <div className="p-5 bg-[#090c18] rounded-xl border border-rose-950/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase mb-2">
                <Layers className="w-4 h-4" />
                <span>Manageable Skill Transition</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedCareer.whyRecommended.skillReason}
              </p>
            </div>

          </div>

          {/* Skills Breakdown: Matched vs Missing */}
          <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-4">
              Competency Diagnosis: Current Skills vs Required Gap
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Current Matched Skills */}
              <div className="p-4 bg-[#0d1222] rounded-xl border border-emerald-900/60">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  Verified In Your Vector
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCareer.studentSkillsMatched.map(skill => (
                    <li key={skill} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Target Skills */}
              <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Industry Role Requirements
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCareer.requiredSkills.map(skill => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actionable Gap To Bridge */}
              <div className="p-4 bg-[#0d1222] rounded-xl border border-amber-900/60">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Recommended Development
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCareer.skillGap.map(gap => (
                    <li key={gap} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: EDUCATION PATHWAYS & 3-TIER COSTS */}
      {activeTabSub === 'pathway' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div>
            <h3 className="text-base font-bold text-white">
              3-Tier Education Cost & Feasibility Pathways
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose the degree pathway that fits your family&apos;s budget without incurring high-risk debt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {selectedCareer.educationTiers.map(tier => (
              <div 
                key={tier.type}
                className="p-5 rounded-2xl bg-[#090c18] border border-rose-950/40 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-white">{tier.type}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      tier.riskAssessment === 'Low Risk' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' :
                      tier.riskAssessment === 'Moderate Risk' ? 'bg-slate-900 text-slate-300 border-slate-700' :
                      'bg-rose-950/80 text-rose-300 border-rose-800'
                    }`}>
                      {tier.riskAssessment}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 min-h-[36px]">
                    {tier.institutionCategory}
                  </p>

                  <div className="space-y-2 py-3 border-y border-slate-800 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Annual Tuition:</span>
                      <strong className="font-mono text-white">₹{tier.annualFeeLakhs} LPA</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total 4-Yr Degree:</span>
                      <strong className="font-mono text-rose-400 font-bold">₹{tier.totalDegreeCostLakhs} Lakhs</strong>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-300">
                    <span className="font-semibold block text-slate-400 text-[11px] mb-1">Scholarship Feasibility:</span>
                    <p className="text-[11px] leading-relaxed">{tier.scholarshipFeasibility}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  <span>Entrance Exams: </span>
                  <strong className="text-rose-300">{tier.recommendedExams.join(', ')}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Education Timeline */}
          <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 p-6 shadow-xl">
            <h4 className="text-sm font-bold text-white mb-4">
              Step-by-Step Educational Sequence
            </h4>
            <div className="space-y-4">
              {selectedCareer.educationTimeline.map((item, idx) => (
                <div key={item.step} className="flex items-start gap-4 text-xs">
                  <div className="w-8 h-8 rounded-full bg-rose-950 border border-rose-800 text-rose-300 font-mono font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 pb-3 border-b border-slate-800">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-xs sm:text-sm">{item.action}</strong>
                      <span className="text-slate-400 font-mono text-[11px]">{item.duration}</span>
                    </div>
                    <p className="text-slate-300 mt-1">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CAREER COMPARISON */}
      {activeTabSub === 'compare' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Direct Career Vector Comparison
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Compare trade-offs between two STEAM career trajectories.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Compare with:</span>
              <select
                value={compareCareerId}
                onChange={(e) => setCompareCareerId(e.target.value)}
                className="px-3 py-1.5 border border-slate-800 rounded-lg bg-[#0d1222] text-slate-200 text-xs focus:outline-none focus:border-rose-500"
              >
                {careers.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-[#090c18] rounded-2xl border border-rose-950/40 p-6 shadow-xl">
            {/* Career A */}
            <div className="p-4 bg-[#0d1222] rounded-xl border border-rose-950/80">
              <h4 className="text-base font-bold text-white mb-1">{selectedCareer.title}</h4>
              <div className="font-mono text-2xl font-extrabold text-[#f43f5e] mb-3">{selectedCareer.matchScore}% Match</div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Student Fit:</span> <strong className="font-mono text-white">{selectedCareer.scores.studentFit}%</strong>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Financial Fit:</span> <strong className="font-mono text-emerald-400">{selectedCareer.scores.financialFit}%</strong>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Market Demand:</span> <strong className="font-mono text-sky-400">{selectedCareer.scores.marketDemand}%</strong>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Salary Range:</span> <strong className="font-mono text-white">{selectedCareer.salaryRange}</strong>
                </li>
                <li className="flex justify-between pb-1">
                  <span>Parent Conflict:</span> <strong className="font-mono text-emerald-400">{selectedCareer.scores.conflictIndex}/100</strong>
                </li>
              </ul>
            </div>

            {/* Career B */}
            <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800">
              <h4 className="text-base font-bold text-white mb-1">{compareCareer.title}</h4>
              <div className="font-mono text-2xl font-extrabold text-purple-400 mb-3">{compareCareer.matchScore}% Match</div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Student Fit:</span> <strong className="font-mono text-white">{compareCareer.scores.studentFit}%</strong>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Financial Fit:</span> <strong className="font-mono text-emerald-400">{compareCareer.scores.financialFit}%</strong>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Market Demand:</span> <strong className="font-mono text-sky-400">{compareCareer.scores.marketDemand}%</strong>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Salary Range:</span> <strong className="font-mono text-white">{compareCareer.salaryRange}</strong>
                </li>
                <li className="flex justify-between pb-1">
                  <span>Parent Conflict:</span> <strong className="font-mono text-emerald-400">{compareCareer.scores.conflictIndex}/100</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
