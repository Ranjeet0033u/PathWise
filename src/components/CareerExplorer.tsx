import React, { useState, useMemo } from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Wallet, 
  Brain, 
  MapPin, 
  Compass, 
  Check, 
  ChevronRight,
  Target,
  Info
} from 'lucide-react';

export const CareerExplorer: React.FC = () => {
  const { careers, setSelectedCareerId, setActiveTab } = usePrism();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDemand, setSelectedDemand] = useState<string>('All');
  const [maxBudgetFilter, setMaxBudgetFilter] = useState<number>(15);

  const categories = [
    'All',
    'AI & Data',
    'Software & Systems',
    'Hardware & Robotics',
    'BioTech & Health',
    'Sustainability & Energy',
    'Design & HCI'
  ];

  const filteredCareers = useMemo(() => {
    return careers.filter(career => {
      const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            career.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
      const matchesDemand = selectedDemand === 'All' || career.hiringVelocity === selectedDemand;
      const matchesBudget = career.educationTiers[1].annualFeeLakhs <= maxBudgetFilter;

      return matchesSearch && matchesCategory && matchesDemand && matchesBudget;
    });
  }, [careers, searchQuery, selectedCategory, selectedDemand, maxBudgetFilter]);

  const handleOpenDetail = (careerId: string) => {
    setSelectedCareerId(careerId);
    setActiveTab('career-detail');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Career Explorer</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">STEAM Innovation Frontiers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Discover Evaluated Career Trajectories
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Every career here is cross-referenced against your academic profile, family affordability threshold, and local market demand.
          </p>
        </div>

        <div className="text-right">
          <span className="text-sm font-mono font-bold text-white tabular-nums bg-rose-950/60 border border-rose-800/60 px-3 py-1 rounded-full inline-block">
            {filteredCareers.length} of {careers.length} Matched
          </span>
        </div>
      </div>

      {/* Filter and Search Bar Deck */}
      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers, technologies, algorithms, skills..."
              className="w-full bg-[#0d1222] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/40 transition-all"
            />
          </div>

          {/* Hiring Velocity Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-medium text-slate-400 shrink-0">Hiring:</span>
            <select
              value={selectedDemand}
              onChange={(e) => setSelectedDemand(e.target.value)}
              className="px-3 py-2 text-xs bg-[#0d1222] border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-rose-500/80 cursor-pointer"
            >
              <option value="All">All Velocity Tiers</option>
              <option value="Critical">Critical Hiring (Surge)</option>
              <option value="High">High Hiring</option>
              <option value="Moderate">Moderate Growth</option>
            </select>
          </div>

          {/* Annual Budget Filter Slider */}
          <div className="flex items-center gap-2 w-full sm:w-auto text-xs text-slate-300 bg-[#0d1222] px-3.5 py-2 rounded-xl border border-slate-800">
            <span className="shrink-0 font-medium text-slate-400">Max Fee:</span>
            <span className="font-mono font-bold text-rose-300 tabular-nums">₹{maxBudgetFilter}L/yr</span>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={maxBudgetFilter}
              onChange={(e) => setMaxBudgetFilter(Number(e.target.value))}
              className="w-24 accent-rose-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-bold text-xs ${
                selectedCategory === cat 
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/60 ring-1 ring-rose-400/40' 
                  : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Indicative Legal Disclaimer Banner */}
      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-center justify-between text-xs text-amber-200/90 gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span><strong>Indicative Notice:</strong> All salary figures, cut-offs, and fee amounts are indicative estimates. Verify on official admissions portals. No guarantees implied.</span>
        </div>
        <span className="text-[11px] font-mono text-amber-400/80 shrink-0 hidden sm:inline">Last updated: Oct 2026</span>
      </div>

      {/* Career Grid Matching the Top Career Matches Template */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCareers.map((career, idx) => (
          <div
            key={career.id}
            onClick={() => handleOpenDetail(career.id)}
            className="p-5 bg-[#090c18] rounded-2xl border border-rose-950/40 hover:border-rose-500/60 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-1">
                    {career.title}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-xl font-extrabold text-[#f43f5e] tabular-nums">
                    {career.matchScore}%
                  </span>
                  <span className="text-[10px] text-slate-400 block uppercase">Match</span>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300">
                  {career.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-900 border border-slate-800 text-emerald-400 font-mono">
                  {career.salaryRange}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-900 border border-slate-800 text-sky-400">
                  {career.hiringVelocity}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                {career.description}
              </p>

              {/* Key Fit Metrics */}
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#0d1222] rounded-xl border border-slate-800/80 text-xs mb-3.5 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Student</span>
                  <span className="font-mono font-bold text-white">{career.scores.studentFit}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Finance</span>
                  <span className="font-mono font-bold text-emerald-400">{career.scores.financialFit}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Market</span>
                  <span className="font-mono font-bold text-sky-400">{career.scores.marketDemand}%</span>
                </div>
              </div>

              {/* Required Skills Chips */}
              <div className="text-xs text-slate-400 mb-4">
                <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">Required Skills:</span>
                <div className="flex flex-wrap gap-1 text-[11px]">
                  {career.requiredSkills.slice(0, 3).map(skill => (
                    <span key={skill} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md text-slate-300">
                      {skill}
                    </span>
                  ))}
                  {career.requiredSkills.length > 3 && (
                    <span className="text-slate-400 self-center">+{career.requiredSkills.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Regional Hotspots */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="truncate">{career.regionalHotspots.slice(0, 2).join(', ')}</span>
              </div>
            </div>

            {/* Footer Action matching the template */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-white transition-colors">
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
