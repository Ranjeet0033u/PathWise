import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Sparkles, 
  Coins,
  Scale
} from 'lucide-react';
import { WhatIfSimulator } from './WhatIfSimulator';

export const FinancialFeasibilityView: React.FC = () => {
  const { family, setFamily, selectedCareer, setActiveTab } = usePrism();
  const [testBudget, setTestBudget] = useState<number>(family.annualBudgetLakhs);

  const lowTier = selectedCareer.educationTiers[0];
  const modTier = selectedCareer.educationTiers[1];
  const premTier = selectedCareer.educationTiers[2];

  const fourYearFamilyCapacity = testBudget * 4;

  const isModFeasible = testBudget >= modTier.annualFeeLakhs;
  const isLowFeasible = testBudget >= lowTier.annualFeeLakhs;

  const handleUpdateBudget = (val: number) => {
    setTestBudget(val);
    setFamily(prev => ({ ...prev, annualBudgetLakhs: val }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Financial Constraint Solver</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Family Vector Protection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Can Your Family Afford This Path?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Evaluating degree expenses against parental capacity to eliminate graduation debt shock and maximize education ROI.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950/60 border border-emerald-800/80 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">STATUS</div>
            <div className="text-xs font-bold text-emerald-300">FINANCIALLY FEASIBLE</div>
          </div>
        </div>
      </div>

      {/* Interactive Family Budget Calibration Deck */}
      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wallet className="w-4 h-4 text-rose-400" />
              <span>Interactive Family Budget Simulator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust the slider to instantly simulate financial feasibility and see which pathway tiers unlock.
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono text-2xl font-extrabold text-[#f43f5e] tabular-nums">
              ₹{testBudget.toFixed(1)} Lakhs
            </span>
            <span className="text-xs text-slate-400 block">per year capacity</span>
          </div>
        </div>

        <input
          type="range"
          min="0.5"
          max="12.0"
          step="0.5"
          value={testBudget}
          onChange={(e) => handleUpdateBudget(Number(e.target.value))}
          className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3.5 bg-[#0d1222] rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">4-Year Budget Pool:</span>
            <strong className="text-white font-mono text-sm">₹{fourYearFamilyCapacity.toFixed(1)} Lakhs</strong>
          </div>
          <div className="p-3.5 bg-[#0d1222] rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Scholarship Target:</span>
            <strong className="text-rose-400 font-mono text-sm">₹50,000 - ₹1.2L/yr</strong>
          </div>
          <div className="p-3.5 bg-[#0d1222] rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Financial Risk Index:</span>
            <strong className="text-emerald-400 font-mono text-sm">Low (12/100)</strong>
          </div>
          <div className="p-3.5 bg-[#0d1222] rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Expected Payback ROI:</span>
            <strong className="text-sky-400 font-mono text-sm">1.2 Years of Salary</strong>
          </div>
        </div>
      </div>

      {/* 3 Pathway Cards */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">
            Comparative Pathways for {selectedCareer.title}
          </h2>
          <p className="text-xs text-slate-400">
            PRISM maps every career into 3 distinct institutional fee tiers to ensure options exist for every economic bracket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Low-Cost Pathway */}
          <div className="p-6 bg-[#090c18] rounded-2xl border-2 border-emerald-500/60 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  LOW-COST PATHWAY
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                  100% FEASIBLE
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                State Autonomous & Govt Colleges
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Premier merit institutes (Anna Univ CEG/MIT, PSG Tech, Govt College of Tech). Negligible debt.
              </p>

              <div className="p-3.5 bg-[#0d1222] rounded-xl space-y-2 text-xs mb-4 border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Tuition:</span>
                  <strong className="font-mono text-white">₹{lowTier.annualFeeLakhs} Lakhs</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total 4-Yr Degree:</span>
                  <strong className="font-mono text-emerald-400 font-bold">₹{lowTier.totalDegreeCostLakhs} Lakhs</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Starting Package:</span>
                  <strong className="font-mono text-rose-300">₹7 - ₹12 LPA</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                <strong className="text-slate-300">Scholarships:</strong> Eligible for State First Graduate fee waiver & Central Sector Scheme.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('scholarships')}
              className="w-full py-2.5 px-3 text-xs font-semibold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore State Admissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Moderate-Cost Pathway */}
          <div className="p-6 bg-[#090c18] rounded-2xl border-2 border-rose-500/60 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  MODERATE-COST PATHWAY
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  isModFeasible 
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800' 
                    : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                }`}>
                  {isModFeasible ? '✓ BUDGET FIT' : '⚠ SCHOLARSHIP NEEDED'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Reputed Private & Deemed Universities
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                National footprint universities with strong corporate placement cells (VIT, Amrita, SRM, Thapar).
              </p>

              <div className="p-3.5 bg-[#0d1222] rounded-xl space-y-2 text-xs mb-4 border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Tuition:</span>
                  <strong className="font-mono text-white">₹{modTier.annualFeeLakhs} Lakhs</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total 4-Yr Degree:</span>
                  <strong className="font-mono text-rose-400 font-bold">₹{modTier.totalDegreeCostLakhs} Lakhs</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Starting Package:</span>
                  <strong className="font-mono text-rose-300">₹8.5 - ₹16 LPA</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                <strong className="text-slate-300">Scholarships:</strong> Institutional entrance exam fee waivers (e.g., top 1,000 ranks get 50% waiver).
              </p>
            </div>

            <button
              onClick={() => setActiveTab('scholarships')}
              className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl transition-all shadow-md shadow-rose-950/60 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Merit Scholarships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Premium Pathway */}
          <div className="p-6 bg-[#090c18] rounded-2xl border border-purple-900/60 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  PREMIUM / GLOBAL PATHWAY
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-800">
                  LOAN / AID
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Elite Private & Global Campuses
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Top private institutions & international branch campuses (BITS Pilani, Ashoka, Plaksha, Overseas UG).
              </p>

              <div className="p-3.5 bg-[#0d1222] rounded-xl space-y-2 text-xs mb-4 border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Tuition:</span>
                  <strong className="font-mono text-white">₹{premTier.annualFeeLakhs} Lakhs</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total 4-Yr Degree:</span>
                  <strong className="font-mono text-purple-400 font-bold">₹{premTier.totalDegreeCostLakhs} Lakhs</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Starting Package:</span>
                  <strong className="font-mono text-rose-300">₹16 - ₹32 LPA</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                <strong className="text-slate-300">Financing:</strong> Collateral-free education loans up to ₹20L under SBI Scholar scheme.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('experts')}
              className="w-full py-2.5 px-3 text-xs font-semibold text-purple-300 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-800/80 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Consult Financial Advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Part 2 Feature: What-If Stress-Test & EMI Simulator */}
      <WhatIfSimulator />

    </div>
  );
};
