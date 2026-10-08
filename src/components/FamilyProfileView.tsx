import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  Wallet, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  MapPin, 
  ArrowRight, 
  HelpCircle 
} from 'lucide-react';

export const FamilyProfileView: React.FC<{ onSaveFamily: () => void }> = ({ onSaveFamily }) => {
  const { family, setFamily } = usePrism();

  const [budgetLakhs, setBudgetLakhs] = useState<number>(family.annualBudgetLakhs);
  const [flexibility, setFlexibility] = useState(family.financialFlexibility);
  const [locationPref, setLocationPref] = useState(family.preferredLocation);
  const [scholarshipDep, setScholarshipDep] = useState(family.scholarshipDependency);
  const [risk, setRisk] = useState(family.riskAppetite);
  const [stability, setStability] = useState(family.parentStabilityPreference);
  const [expectedOutcome, setExpectedOutcome] = useState(family.expectedOutcome);
  const [preferredDomains, setPreferredDomains] = useState<string[]>([...family.parentPreferredDomains]);

  const allDomains = [
    'Computer Science Engineering',
    'Electronics & Communication (ECE)',
    'Mechanical / Automobile Engineering',
    'Data Science & Analytics',
    'Biotechnology / Medicine Allied',
    'Civil / Architecture'
  ];

  const toggleDomain = (domain: string) => {
    if (preferredDomains.includes(domain)) {
      setPreferredDomains(preferredDomains.filter(d => d !== domain));
    } else {
      setPreferredDomains([...preferredDomains, domain]);
    }
  };

  const handleSave = () => {
    setFamily(prev => ({
      ...prev,
      annualBudgetLakhs: budgetLakhs,
      financialFlexibility: flexibility,
      preferredLocation: locationPref,
      scholarshipDependency: scholarshipDep,
      riskAppetite: risk,
      parentStabilityPreference: stability,
      expectedOutcome: expectedOutcome,
      parentPreferredDomains: preferredDomains
    }));
    onSaveFamily();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-semibold mb-2">
          <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
          <span>Dimension 2 of 3: Family Reality</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Parent & Family Profile
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          Career guidance must be grounded in real household economics. We protect your family from unsustainable debt while honoring long-term aspirations.
        </p>
      </div>

      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl p-6 sm:p-8 space-y-8">
        
        {/* SECTION 1: FINANCIAL PROFILE */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
            <Wallet className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">Financial Profile & Budget Realism</h3>
          </div>

          <div className="space-y-6">
            {/* Budget Slider */}
            <div className="bg-[#0d1222] p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <label className="text-xs font-bold text-white">Maximum Annual Education Budget</label>
                  <p className="text-[11px] text-slate-400">Includes estimated college tuition, hostel, and study materials per year.</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-lg font-extrabold text-[#f43f5e] tabular-nums">
                    ₹{budgetLakhs.toFixed(1)} Lakhs
                  </span>
                  <span className="text-[11px] text-slate-400 block">/ year</span>
                </div>
              </div>
              <input
                type="range"
                min="0.5"
                max="15.0"
                step="0.5"
                value={budgetLakhs}
                onChange={(e) => setBudgetLakhs(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>₹50,000 (Govt Focus)</span>
                <span>₹4.5L (Tier-1 State / Autonomous)</span>
                <span>₹15L+ (Global / High-End)</span>
              </div>
            </div>

            {/* Financial Flexibility & Scholarship Dependency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Budget Flexibility
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'strict', label: 'Strict Limit' },
                    { id: 'moderate', label: 'Moderate' },
                    { id: 'high', label: 'Flexible' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFlexibility(item.id as any)}
                      className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        flexibility === item.id 
                          ? 'bg-rose-600 text-white font-bold border-rose-500 shadow-md shadow-rose-950/60' 
                          : 'bg-[#0d1222] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Scholarship Dependency
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'critical', label: 'Essential' },
                    { id: 'preferred', label: 'Preferred' },
                    { id: 'optional', label: 'Bonus' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setScholarshipDep(item.id as any)}
                      className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        scholarshipDep === item.id 
                          ? 'bg-rose-600 text-white font-bold border-rose-500 shadow-md shadow-rose-950/60' 
                          : 'bg-[#0d1222] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PARENTAL EXPECTATIONS */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Parental Priorities & Location</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Domains of Parental Comfort (Multi-select)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {allDomains.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDomain(d)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      preferredDomains.includes(d)
                        ? 'bg-rose-950/80 border-rose-600 text-rose-200 font-semibold'
                        : 'bg-[#0d1222] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Outcome Priority
                </label>
                <select
                  value={expectedOutcome}
                  onChange={(e) => setExpectedOutcome(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-800 rounded-xl bg-[#0d1222] text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  <option value="high-starting-package">Highest Starting Package (₹10+ LPA)</option>
                  <option value="early-employment">Immediate Placement After 4 Years</option>
                  <option value="prestigious-brand">Prestigious Institute Brand (IIT/NIT/Anna Univ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Geographic Preference
                </label>
                <select
                  value={locationPref}
                  onChange={(e) => setLocationPref(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-800 rounded-xl bg-[#0d1222] text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  <option value="home-state">Same State / Near Home</option>
                  <option value="pan-india">Pan-India Tier 1 Cities</option>
                  <option value="global">Overseas / International</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Family Vector Summary Box */}
        <div className="p-4 bg-[#0d1222] rounded-xl border border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Synthesized Family Vector Output
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Affordability:</span>
              <strong className="text-white font-mono">₹{budgetLakhs}L/yr ({flexibility})</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Risk Appetite:</span>
              <strong className="text-white capitalize">{risk}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Career Expectations:</span>
              <strong className="text-white capitalize">{expectedOutcome.replace('-', ' ')}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Mobility:</span>
              <strong className="text-white capitalize">{locationPref.replace('-', ' ')}</strong>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 text-center">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>SAVE FAMILY PROFILE & RUN PRISM ENGINE</span>
          </button>
        </div>

      </div>

    </div>
  );
};
