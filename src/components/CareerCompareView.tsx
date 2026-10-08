import React from 'react';
import { usePrism } from '../context/PrismContext';
import { Layers, ArrowRight, X, TrendingUp, Wallet, ShieldAlert, CheckCircle2, AlertTriangle, Plus, Sparkles } from 'lucide-react';

export const CareerCompareView: React.FC = () => {
  const { careers, compareCareerIds, toggleCompareCareer, clearCompareCareers, setSelectedCareerId, setActiveTab, openExplainScore } = usePrism();

  const selectedCareers = careers.filter(c => compareCareerIds.includes(c.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            <span>Multi-Vector Career Matrix</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Side-by-Side Comparison Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Compare STEAM Pathways Side-by-Side
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Evaluate up to 3 pathways simultaneously across 4-year degree costs, starting packages, growth velocity, and family alignment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {compareCareerIds.length > 0 && (
            <button
              onClick={clearCompareCareers}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 transition-colors cursor-pointer"
            >
              Clear Comparison
            </button>
          )}
          <button
            onClick={() => setActiveTab('explorer')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-600 hover:to-pink-500 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Add More from Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      {selectedCareers.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#090c18] border border-slate-800 space-y-4">
          <Layers className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Careers Selected for Comparison</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Choose careers from the Career Explorer or click below to automatically load the top 2 recommended trajectories.
          </p>
          <button
            onClick={() => {
              toggleCompareCareer('ai-ml-engineer');
              toggleCompareCareer('data-science-systems');
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-all cursor-pointer"
          >
            Compare AI/ML vs Data Science (Top Matches)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedCareers.map((c) => {
            const lowCost = c.educationTiers[0]?.totalDegreeCostLakhs || 3.4;
            const modCost = c.educationTiers[1]?.totalDegreeCostLakhs || 11.0;
            const premCost = c.educationTiers[2]?.totalDegreeCostLakhs || 22.0;

            return (
              <div 
                key={c.id} 
                className="rounded-2xl bg-[#090c18] border border-rose-950/60 p-5 shadow-xl flex flex-col justify-between space-y-5 relative"
              >
                {/* Remove button */}
                <button
                  onClick={() => toggleCompareCareer(c.id)}
                  className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <div className="pr-8">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60 uppercase font-bold">
                      {c.category}
                    </span>
                    <h2 className="text-lg font-extrabold text-white mt-1.5 leading-snug">{c.title}</h2>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{c.description}</p>
                  </div>

                  {/* Big Score Box */}
                  <div className="my-4 p-3.5 rounded-xl bg-[#050814] border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">PRISM Score</span>
                      <span className="font-mono text-3xl font-extrabold text-[#f43f5e]">{c.matchScore}%</span>
                    </div>
                    <button
                      onClick={() => openExplainScore({
                        scoreTitle: `${c.title} PRISM Match`,
                        totalScore: c.matchScore,
                        maxScore: 100,
                        formula: '30% Student Fit + 25% Financial Fit + 25% Market Demand + 10% Regional Opp + 10% Skill Readiness',
                        weights: [
                          { label: 'Student Aptitude & Math Fit', weightPercent: 30, rawScore: c.scores.studentFit, weightedContribution: parseFloat((c.scores.studentFit * 0.3).toFixed(1)), explanation: 'Calculated from math logic and problem solving scores.' },
                          { label: 'Family Budget Affordability', weightPercent: 25, rawScore: c.scores.financialFit, weightedContribution: parseFloat((c.scores.financialFit * 0.25).toFixed(1)), explanation: 'Measured against family annual budget limit.' },
                          { label: 'Market Demand & Hiring Velocity', weightPercent: 25, rawScore: c.scores.marketDemand, weightedContribution: parseFloat((c.scores.marketDemand * 0.25).toFixed(1)), explanation: '5-year regional hiring trajectory across South India.' },
                          { label: 'Regional Cluster Opportunities', weightPercent: 10, rawScore: c.scores.geographicOpportunity, weightedContribution: parseFloat((c.scores.geographicOpportunity * 0.1).toFixed(1)), explanation: 'Opportunity density in Chennai & Bengaluru.' },
                          { label: 'Skill Readiness Index', weightPercent: 10, rawScore: c.scores.skillReadiness, weightedContribution: parseFloat((c.scores.skillReadiness * 0.1).toFixed(1)), explanation: 'Readiness from current academic curriculum.' }
                        ],
                        verdictNote: 'Determined deterministically based on Arjun Swaminathan profile.'
                      })}
                      className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                    >
                      Explain score →
                    </button>
                  </div>

                  {/* Key Metrics Comparison */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Indicative Starting CTC:</span>
                      <strong className="text-white font-mono">{c.salaryRange}</strong>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Hiring Velocity:</span>
                      <span className="font-semibold text-pink-400">{c.hiringVelocity}</span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Student Aptitude Fit:</span>
                      <strong className="text-emerald-400 font-mono">{c.scores.studentFit}%</strong>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Financial Feasibility:</span>
                      <strong className="text-rose-400 font-mono">{c.scores.financialFit}%</strong>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Family Alignment Strain:</span>
                      <span className={`font-mono font-bold ${c.scores.conflictIndex > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {c.scores.conflictIndex}/100 ({c.scores.conflictIndex > 50 ? 'Moderate' : 'Low'})
                      </span>
                    </div>

                    {/* Degree Cost Tiers */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        4-Year Degree Tuition Spectrum:
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[11px]">
                        <div className="p-1.5 rounded bg-[#050814] border border-slate-800">
                          <span className="text-[9px] text-slate-500 block">Govt/Aided</span>
                          <strong className="text-emerald-400">₹{lowCost}L</strong>
                        </div>
                        <div className="p-1.5 rounded bg-[#050814] border border-slate-800">
                          <span className="text-[9px] text-slate-500 block">Auto Tier-2</span>
                          <strong className="text-white">₹{modCost}L</strong>
                        </div>
                        <div className="p-1.5 rounded bg-[#050814] border border-slate-800">
                          <span className="text-[9px] text-slate-500 block">Private Tier-1</span>
                          <strong className="text-amber-400">₹{premCost}L</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedCareerId(c.id);
                      setActiveTab('career-detail');
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View In-Depth Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {selectedCareers.length < 3 && (
            <div 
              onClick={() => setActiveTab('explorer')}
              className="rounded-2xl border-2 border-dashed border-slate-800 hover:border-rose-800/80 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[350px] space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-500">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-300">Add Another Career (Max 3)</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                Select from Cybersecurity, Robotics, Biomedical, or Clean Energy to compare simultaneously.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
