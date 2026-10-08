import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  Sparkles, 
  SlidersHorizontal, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Wallet, 
  Award, 
  Building, 
  ChevronRight, 
  ArrowRight, 
  Scale, 
  RotateCcw, 
  GraduationCap, 
  Info, 
  X, 
  Target, 
  Compass, 
  Coins, 
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { CourseRecommendationScore } from '../types';

export const ParentCourseRecommender: React.FC = () => {
  const { 
    parentPreferences, 
    setParentPreferences, 
    courseRecommendationScores, 
    student, 
    setSelectedCareerId, 
    setActiveTab 
  } = usePrism();

  const [inspectingCourse, setInspectingCourse] = useState<CourseRecommendationScore | null>(null);
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [selectedStreamFilter, setSelectedStreamFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreset, setActivePreset] = useState<string>('Custom');

  // Archetype presets that set realistic parent weight preferences
  const PRESETS = [
    {
      id: 'stability',
      name: 'High Job Security & PSU/MNC Stability',
      description: 'Prioritizes recession-proof employment, campus placements, and low career risk.',
      icon: '🛡️',
      weights: { jobStability: 40, feeAffordability: 20, campusPlacement: 25, studentAptitude: 10, locationProximity: 5 },
      maxFee: 4.5,
      riskTolerance: 'Conservative (High Stability)' as const
    },
    {
      id: 'roi_budget',
      name: 'Strict Budget Cap & Max ROI',
      description: 'Strict tuition limits with high starting salary to maximize return on investment.',
      icon: '💰',
      weights: { jobStability: 25, feeAffordability: 40, campusPlacement: 20, studentAptitude: 10, locationProximity: 5 },
      maxFee: 2.5,
      riskTolerance: 'Conservative (High Stability)' as const
    },
    {
      id: 'tier1_prestige',
      name: 'Tier-1 Campus & Placement Velocity',
      description: 'Focuses on 95%+ campus placements and premier institutional accreditation.',
      icon: '🎓',
      weights: { jobStability: 25, feeAffordability: 15, campusPlacement: 40, studentAptitude: 10, locationProximity: 10 },
      maxFee: 5.5,
      riskTolerance: 'Balanced' as const
    },
    {
      id: 'passion_tech',
      name: 'Student Passion & Frontier Tech',
      description: 'Aligns with student PRISM aptitude and emerging high-growth engineering domains.',
      icon: '🚀',
      weights: { jobStability: 15, feeAffordability: 15, campusPlacement: 25, studentAptitude: 35, locationProximity: 10 },
      maxFee: 6.0,
      riskTolerance: 'High Growth (Frontier Tech)' as const
    },
    {
      id: 'balanced',
      name: 'Balanced Family Consensus',
      description: 'Harmonious distribution across financial safety, student skills, and job stability.',
      icon: '⚖️',
      weights: { jobStability: 30, feeAffordability: 25, campusPlacement: 25, studentAptitude: 10, locationProximity: 10 },
      maxFee: 4.5,
      riskTolerance: 'Balanced' as const
    }
  ];

  const applyPreset = (presetId: string) => {
    const p = PRESETS.find(item => item.id === presetId);
    if (!p) return;
    setActivePreset(p.name);
    setParentPreferences(prev => ({
      ...prev,
      criteriaWeights: { ...p.weights },
      maxAnnualFeeLakhs: p.maxFee,
      riskTolerance: p.riskTolerance
    }));
  };

  const handleWeightChange = (key: keyof typeof parentPreferences.criteriaWeights, value: number) => {
    setActivePreset('Custom');
    setParentPreferences(prev => ({
      ...prev,
      criteriaWeights: {
        ...prev.criteriaWeights,
        [key]: value
      }
    }));
  };

  const handleMaxFeeChange = (val: number) => {
    setActivePreset('Custom');
    setParentPreferences(prev => ({
      ...prev,
      maxAnnualFeeLakhs: val
    }));
  };

  const togglePreferredStream = (stream: string) => {
    setActivePreset('Custom');
    setParentPreferences(prev => {
      const exists = prev.preferredStreams.includes(stream);
      return {
        ...prev,
        preferredStreams: exists
          ? prev.preferredStreams.filter(s => s !== stream)
          : [...prev.preferredStreams, stream]
      };
    });
  };

  const handleResetDefaults = () => {
    applyPreset('balanced');
  };

  // Available course streams in catalog
  const ALL_STREAMS = [
    'Engineering & Technology (CSE, AI, Software)',
    'Data Science & Analytics',
    'Electronics & Hardware Systems',
    'Robotics & Industrial Automation',
    'Management & Commerce / FinTech',
    'Pure & Applied Sciences'
  ];

  // Calculate sum of weights for normalization check
  const weights = parentPreferences.criteriaWeights;
  const totalWeightSum = 
    weights.jobStability + 
    weights.feeAffordability + 
    weights.campusPlacement + 
    weights.studentAptitude + 
    weights.locationProximity;

  // Filter recommendations
  const filteredRecommendations = courseRecommendationScores
    .filter(course => {
      const matchesSearch = 
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.careerTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.stream.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStream = 
        selectedStreamFilter === 'All' || 
        course.stream === selectedStreamFilter ||
        (selectedStreamFilter === 'Preferred' && parentPreferences.preferredStreams.includes(course.stream));

      return matchesSearch && matchesStream;
    })
    .sort((a, b) => b.totalRecommendationScore - a.totalRecommendationScore);

  const topMatch = filteredRecommendations[0];

  const openInspection = (course: CourseRecommendationScore) => {
    setInspectingCourse(course);
    setShowFormulaModal(true);
  };

  return (
    <div className="space-y-7">
      
      {/* ==============================================================
          1. HEADER BANNER: PARENT PREFERRED COURSE RECOMMENDER
         ============================================================== */}
      <div className="relative bg-[#090c18] border border-rose-950/50 rounded-2xl p-6 sm:p-7 overflow-hidden shadow-2xl">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800/60 text-rose-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Multi-Vector Course Fit · Parent Preference Weighted Engine</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Parent-Preferred Course Recommendations
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Select what you value most for <span className="text-white font-semibold">{student.name}</span>'s college course—including job security, tuition affordability, placement velocity, and campus prestige. Our algorithm dynamically calculates a personalized <strong className="text-rose-400">Total Recommendation Score (0–100)</strong> with full mathematical transparency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Button to see how total score is calculated */}
            <button
              onClick={() => {
                setInspectingCourse(topMatch || courseRecommendationScores[0]);
                setShowFormulaModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-950/80 to-slate-900 border border-rose-500/40 hover:border-rose-400 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-rose-950/40 cursor-pointer group"
            >
              <Info className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
              <span>How Total Score is Calculated</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="mt-6 pt-5 border-t border-rose-950/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#050814]/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Primary Driver</span>
            <span className="text-white font-bold mt-0.5 block truncate">
              {weights.jobStability >= 30 ? '🛡️ Job Stability First' : weights.feeAffordability >= 30 ? '💰 Budget & ROI' : '⚖️ Balanced Priorities'}
            </span>
          </div>

          <div className="bg-[#050814]/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Max Annual Fee Cap</span>
            <span className="text-rose-400 font-bold font-mono mt-0.5 block">
              ₹{parentPreferences.maxAnnualFeeLakhs.toFixed(1)} Lakhs/yr <span className="text-slate-400 font-normal text-[10px]">(₹{(parentPreferences.maxAnnualFeeLakhs * 4).toFixed(1)}L total)</span>
            </span>
          </div>

          <div className="bg-[#050814]/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Preferred Streams</span>
            <span className="text-white font-bold mt-0.5 block truncate">
              {parentPreferences.preferredStreams.length} Selected
            </span>
          </div>

          <div className="bg-[#050814]/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Top Course Fit</span>
            <span className="text-emerald-400 font-bold font-mono mt-0.5 block truncate">
              {topMatch ? `${topMatch.totalRecommendationScore}% · ${topMatch.courseName.split(' ')[0]}` : 'Calculating...'}
            </span>
          </div>
        </div>
      </div>

      {/* ==============================================================
          2. INTERACTIVE CONTROLS: "WHAT PARENTS PREFERRED FOR PICKING THE COURSE"
         ============================================================== */}
      <div className="bg-[#090c18] border border-rose-950/50 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-rose-950/40">
          <div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Configure What Parents Prefer
              </h2>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Adjust these parent criteria to recalculate the Total Recommendation Scores across all courses in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Total Weights:</span>
            <span className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold ${
              totalWeightSum === 100 
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' 
                : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
            }`}>
              {totalWeightSum}% {totalWeightSum === 100 ? '✓ Normalized' : '(Will normalize to 100%)'}
            </span>
          </div>
        </div>

        {/* Step A: Quick-Select Archetypes / Presets */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
            Quick-Select Family Archetype:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {PRESETS.map(p => {
              const isSelected = activePreset === p.name;
              return (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-rose-950/60 border-rose-500 shadow-md shadow-rose-950/50 ring-1 ring-rose-400/30' 
                      : 'bg-[#050814]/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg">{p.icon}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-rose-400" />
                      )}
                    </div>
                    <h3 className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {p.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    {p.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step B: 5 Priority Weight Sliders */}
        <div className="pt-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
            Custom Parent Criteria Weights (0% – 50% Importance):
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* 1. Job Stability Weight */}
            <div className="bg-[#050814]/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-white">Job Security & Stability</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-800/60">
                  {weights.jobStability}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Resistance to recession, steady hiring, PSU & MNC demand.
              </p>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={weights.jobStability}
                onChange={(e) => handleWeightChange('jobStability', Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* 2. Fee Affordability Weight */}
            <div className="bg-[#050814]/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Tuition & Fee Affordability</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  {weights.feeAffordability}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Staying comfortably within the family annual budget limit.
              </p>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={weights.feeAffordability}
                onChange={(e) => handleWeightChange('feeAffordability', Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* 3. Campus Placement Weight */}
            <div className="bg-[#050814]/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">Campus Placement Rate</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  {weights.campusPlacement}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Placement statistics (% batches placed, median starting package).
              </p>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={weights.campusPlacement}
                onChange={(e) => handleWeightChange('campusPlacement', Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* 4. Student Aptitude Weight */}
            <div className="bg-[#050814]/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">Student PRISM Aptitude</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-800/60">
                  {weights.studentAptitude}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Arjun's actual marks in Math, CS & analytical capability.
              </p>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={weights.studentAptitude}
                onChange={(e) => handleWeightChange('studentAptitude', Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* 5. Location Proximity & Safety */}
            <div className="bg-[#050814]/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">Location Proximity & Safety</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800/60">
                  {weights.locationProximity}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Safe campus corridors within home state or regional tech hubs.
              </p>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={weights.locationProximity}
                onChange={(e) => handleWeightChange('locationProximity', Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* 6. Maximum Budget Slider */}
            <div className="bg-[#050814]/80 p-4 rounded-xl border border-rose-950/60 space-y-2 bg-gradient-to-b from-[#050814] to-rose-950/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-white">Max Annual Tuition Cap</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-600 text-white">
                  ₹{parentPreferences.maxAnnualFeeLakhs.toFixed(1)} L/yr
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Total 4-Yr Degree Cap:</span>
                <span className="font-mono text-rose-300 font-bold">₹{(parentPreferences.maxAnnualFeeLakhs * 4).toFixed(1)} Lakhs</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.25"
                value={parentPreferences.maxAnnualFeeLakhs}
                onChange={(e) => handleMaxFeeChange(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Step C: Preferred Course Domains / Streams */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Parent Preferred Academic Streams (Picks receive a +4% Concordance Bonus):
            </label>
            <span className="text-xs text-rose-400 font-medium">
              Click to toggle preference
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_STREAMS.map(stream => {
              const isSelected = parentPreferences.preferredStreams.includes(stream);
              return (
                <button
                  key={stream}
                  onClick={() => togglePreferredStream(stream)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-rose-950 border border-rose-500 text-rose-200 shadow-md shadow-rose-950/40'
                      : 'bg-[#050814] border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-rose-500' : 'bg-slate-600'}`} />
                  <span>{stream}</span>
                  {isSelected && <span className="text-[10px] text-rose-400 font-bold">✓ Preferred</span>}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ==============================================================
          3. CALCULATED RECOMMENDATION FEED & SORTING CONTROLS
         ============================================================== */}
      <div className="space-y-4">
        
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#090c18] border border-rose-950/40 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Recommended Courses ({filteredRecommendations.length})
            </span>
            <span className="text-xs text-slate-400">· Ranked by Total Calculated Fit</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search course title or stream..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-[#050814] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 w-52"
              />
            </div>

            {/* Stream Filter Pills */}
            <select
              value={selectedStreamFilter}
              onChange={(e) => setSelectedStreamFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#050814] border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              <option value="All">All Streams</option>
              <option value="Preferred">Parent Preferred Only</option>
              {ALL_STREAMS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredRecommendations.map((course, idx) => {
            const isTopOne = idx === 0;
            const isPreferred = parentPreferences.preferredStreams.includes(course.stream);
            const feeDiff = parentPreferences.maxAnnualFeeLakhs - course.tuitionPerYearLakhs;
            const isFeeWithinBudget = feeDiff >= 0;

            // Score Category styling
            const score = course.totalRecommendationScore;
            const scoreColor = score >= 90 ? 'text-emerald-400 border-emerald-500/50 bg-emerald-950/50' 
              : score >= 80 ? 'text-rose-400 border-rose-500/50 bg-rose-950/50' 
              : 'text-amber-400 border-amber-500/50 bg-amber-950/50';

            return (
              <div 
                key={course.courseId}
                className={`bg-[#090c18] rounded-2xl border transition-all duration-200 overflow-hidden relative flex flex-col justify-between ${
                  isTopOne 
                    ? 'border-rose-500/60 shadow-xl shadow-rose-950/40 ring-1 ring-rose-500/30' 
                    : 'border-rose-950/40 hover:border-rose-900/80 shadow-lg'
                }`}
              >
                {/* Top Badge for #1 */}
                {isTopOne && (
                  <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 px-4 py-1 text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-between">
                    <span>👑 #1 Recommended Course for Family Alignment</span>
                    <span>Highest Total Score: {score}/100</span>
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-4">
                  
                  {/* Card Header: Rank, Title, and Calculated Score Radial Pill */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-slate-300 border border-slate-800">
                          Rank #{idx + 1}
                        </span>
                        <span className="text-xs text-rose-400 font-semibold truncate max-w-xs">
                          {course.stream}
                        </span>
                        {isPreferred && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800/80">
                            ★ In Parent Wishlist
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {course.courseName}
                      </h3>
                      
                      <p className="text-xs text-slate-400">
                        {course.degreeType} · Target Career: <span className="text-slate-200 font-medium">{course.careerTitle}</span>
                      </p>
                    </div>

                    {/* Big Calculated Total Score Badge */}
                    <div className="shrink-0 flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-2xl border flex flex-col items-center justify-center shadow-lg ${scoreColor}`}>
                        <span className="text-2xl font-extrabold font-mono leading-none">
                          {score}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 mt-0.5">
                          / 100
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium mt-1">
                        Total Fit Score
                      </span>
                    </div>
                  </div>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#050814] border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Starting CTC</span>
                      <span className="font-mono font-bold text-emerald-400 block mt-0.5">
                        {course.projectedStartingCTC}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Tuition / Year</span>
                      <span className={`font-mono font-bold block mt-0.5 ${isFeeWithinBudget ? 'text-white' : 'text-amber-400'}`}>
                        ₹{course.tuitionPerYearLakhs.toFixed(2)}L
                      </span>
                      <span className="text-[9px] text-slate-400">
                        {isFeeWithinBudget ? `(₹${feeDiff.toFixed(1)}L under cap)` : `(₹${Math.abs(feeDiff).toFixed(1)}L above cap)`}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Placement Rate</span>
                      <span className="font-mono font-bold text-cyan-400 block mt-0.5">
                        {course.placementRate}%
                      </span>
                      <span className="text-[9px] text-slate-400">Historical campus</span>
                    </div>
                  </div>

                  {/* Multi-Factor Progress Breakdown Bars */}
                  <div className="space-y-2 pt-1 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Multi-Vector Sub-Scores:</span>
                      <span className="text-slate-500 text-[10px]">Job Stability · Fee · Placement · Aptitude</span>
                    </div>

                    {/* Progress meters */}
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      <div className="bg-[#050814] p-1.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">Stability</span>
                        <span className="font-mono font-bold text-rose-300">{course.breakdown.jobStabilityScore}%</span>
                        <div className="w-full h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-rose-500" style={{ width: `${course.breakdown.jobStabilityScore}%` }} />
                        </div>
                      </div>

                      <div className="bg-[#050814] p-1.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">Affordability</span>
                        <span className="font-mono font-bold text-emerald-300">{course.breakdown.feeAffordabilityScore}%</span>
                        <div className="w-full h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${course.breakdown.feeAffordabilityScore}%` }} />
                        </div>
                      </div>

                      <div className="bg-[#050814] p-1.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">Placement</span>
                        <span className="font-mono font-bold text-cyan-300">{course.breakdown.campusPlacementScore}%</span>
                        <div className="w-full h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-cyan-500" style={{ width: `${course.breakdown.campusPlacementScore}%` }} />
                        </div>
                      </div>

                      <div className="bg-[#050814] p-1.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">Aptitude</span>
                        <span className="font-mono font-bold text-purple-300">{course.breakdown.studentAptitudeScore}%</span>
                        <div className="w-full h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${course.breakdown.studentAptitudeScore}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Institutions */}
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Tier-1 Target Colleges: </span>
                    <span className="text-slate-300 font-medium">{course.topInstitutions.slice(0, 3).join(', ')}</span>
                  </div>

                </div>

                {/* Bottom Card Actions Bar */}
                <div className="px-5 py-3.5 bg-[#050814] border-t border-rose-950/40 flex items-center justify-between gap-3 text-xs">
                  
                  {/* The Explicit User Requested Option: See How It Calculates Total Score */}
                  <button
                    onClick={() => openInspection(course)}
                    className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer group"
                  >
                    <Info className="w-3.5 h-3.5 text-rose-500 group-hover:scale-110 transition-transform" />
                    <span>See How Total Score ({score}) Is Calculated</span>
                  </button>

                  <button
                    onClick={() => {
                      // Navigate to career explorer or career details
                      setActiveTab('explorer');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Career</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ==============================================================
          4. MODAL / INSPECTOR: "HOW IT CALCULATE THE TOTAL SCORE FOR RECOMMENDING"
         ============================================================== */}
      {showFormulaModal && inspectingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#090c18] border border-rose-500/50 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-rose-950/60">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[11px] font-bold border border-rose-800/80 mb-2">
                  <Sparkles className="w-3 h-3 text-rose-400" />
                  <span>Mathematical Transparency & Score Breakdown</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  How the Total Recommendation Score is Calculated
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Step-by-step mathematical computation for <strong className="text-white">{inspectingCourse.courseName}</strong>
                </p>
              </div>

              <button
                onClick={() => setShowFormulaModal(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Total Result Hero Box */}
            <div className="bg-gradient-to-r from-rose-950/80 via-[#090c18] to-slate-900 border border-rose-500/40 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-rose-300 font-bold uppercase tracking-wider block">
                  Final Computed Recommendation Score:
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white">
                    {inspectingCourse.totalRecommendationScore}
                  </span>
                  <span className="text-sm font-semibold text-rose-300">
                    / 100 Points Match
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {inspectingCourse.totalRecommendationScore >= 90 
                    ? '★ Exceptional Fit — Strongly recommended for parent and student consensus.'
                    : inspectingCourse.totalRecommendationScore >= 80 
                    ? '✓ Strong Fit — High viability across family budget and job stability.'
                    : '⚖️ Moderate Fit — Some trade-offs between tuition fees and career growth.'}
                </p>
              </div>

              <div className="shrink-0 bg-[#050814] p-3 rounded-xl border border-rose-900/40 text-xs space-y-1">
                <div className="text-slate-400">Stream Concordance:</div>
                <div className="text-white font-bold">
                  {parentPreferences.preferredStreams.includes(inspectingCourse.stream)
                    ? '✓ Selected in Parent Wishlist (+4% bonus)'
                    : '— Alternative Domain (0% bonus)'}
                </div>
              </div>
            </div>

            {/* The Formula Equation */}
            <div className="bg-[#050814] p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-400" />
                <span>The Multi-Vector Scoring Formula</span>
              </h3>
              
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs sm:text-sm text-rose-300 overflow-x-auto">
                Total Score = [ (S_stability × W_stability) + (S_fee × W_fee) + (S_placement × W_placement) + (S_aptitude × W_aptitude) + (S_location × W_location) ] / TotalWeights × Multiplier_stream
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                PathWise takes the raw performance score of the course in each category (0–100) and multiplies it by your configured parent importance weights. This guarantees that your parental priorities directly dictate the course ranking.
              </p>
            </div>

            {/* Step-by-Step Mathematical Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Step-by-Step Component Breakdown:
              </h3>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                      <th className="p-3 font-bold">Criterion</th>
                      <th className="p-3 font-bold">Raw Score (0-100)</th>
                      <th className="p-3 font-bold">Parent Weight</th>
                      <th className="p-3 font-bold">Calculation</th>
                      <th className="p-3 font-bold text-right">Points Earned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-white font-medium flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                        <span>Job Security & Stability</span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">{inspectingCourse.breakdown.jobStabilityScore} / 100</td>
                      <td className="p-3 font-mono text-rose-400 font-bold">{weights.jobStability}%</td>
                      <td className="p-3 font-mono text-slate-400">({inspectingCourse.breakdown.jobStabilityScore} × {weights.jobStability}) / {totalWeightSum}</td>
                      <td className="p-3 font-mono font-bold text-rose-300 text-right">+{inspectingCourse.formulaExplanation.weightedJobStability} pts</td>
                    </tr>

                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-white font-medium flex items-center gap-2">
                        <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tuition & Fee Affordability</span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">
                        {inspectingCourse.breakdown.feeAffordabilityScore} / 100
                        <span className="text-[10px] text-slate-500 block">₹{inspectingCourse.tuitionPerYearLakhs}L vs ₹{parentPreferences.maxAnnualFeeLakhs}L cap</span>
                      </td>
                      <td className="p-3 font-mono text-emerald-400 font-bold">{weights.feeAffordability}%</td>
                      <td className="p-3 font-mono text-slate-400">({inspectingCourse.breakdown.feeAffordabilityScore} × {weights.feeAffordability}) / {totalWeightSum}</td>
                      <td className="p-3 font-mono font-bold text-emerald-300 text-right">+{inspectingCourse.formulaExplanation.weightedFeeAffordability} pts</td>
                    </tr>

                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-white font-medium flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Campus Placement Rate</span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">{inspectingCourse.breakdown.campusPlacementScore} / 100</td>
                      <td className="p-3 font-mono text-cyan-400 font-bold">{weights.campusPlacement}%</td>
                      <td className="p-3 font-mono text-slate-400">({inspectingCourse.breakdown.campusPlacementScore} × {weights.campusPlacement}) / {totalWeightSum}</td>
                      <td className="p-3 font-mono font-bold text-cyan-300 text-right">+{inspectingCourse.formulaExplanation.weightedCampusPlacement} pts</td>
                    </tr>

                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-white font-medium flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                        <span>Student PRISM Aptitude</span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">
                        {inspectingCourse.breakdown.studentAptitudeScore} / 100
                        <span className="text-[10px] text-slate-500 block">Arjun's Math & Logic marks</span>
                      </td>
                      <td className="p-3 font-mono text-purple-400 font-bold">{weights.studentAptitude}%</td>
                      <td className="p-3 font-mono text-slate-400">({inspectingCourse.breakdown.studentAptitudeScore} × {weights.studentAptitude}) / {totalWeightSum}</td>
                      <td className="p-3 font-mono font-bold text-purple-300 text-right">+{inspectingCourse.formulaExplanation.weightedStudentAptitude} pts</td>
                    </tr>

                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-white font-medium flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-amber-400" />
                        <span>Location Proximity & Safety</span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">{inspectingCourse.breakdown.locationScore} / 100</td>
                      <td className="p-3 font-mono text-amber-400 font-bold">{weights.locationProximity}%</td>
                      <td className="p-3 font-mono text-slate-400">({inspectingCourse.breakdown.locationScore} × {weights.locationProximity}) / {totalWeightSum}</td>
                      <td className="p-3 font-mono font-bold text-amber-300 text-right">+{inspectingCourse.formulaExplanation.weightedLocation} pts</td>
                    </tr>

                    {/* Subtotal Row */}
                    <tr className="bg-slate-900/70 font-bold">
                      <td colSpan={4} className="p-3 text-white">
                        Raw Base Weighted Subtotal
                      </td>
                      <td className="p-3 font-mono text-white text-right">
                        {(
                          inspectingCourse.formulaExplanation.weightedJobStability +
                          inspectingCourse.formulaExplanation.weightedFeeAffordability +
                          inspectingCourse.formulaExplanation.weightedCampusPlacement +
                          inspectingCourse.formulaExplanation.weightedStudentAptitude +
                          inspectingCourse.formulaExplanation.weightedLocation
                        ).toFixed(1)} pts
                      </td>
                    </tr>

                    {/* Stream Multiplier Row */}
                    <tr className="bg-rose-950/40 text-rose-200">
                      <td colSpan={4} className="p-3">
                        Parent Stream Concordance Adjustment ({parentPreferences.preferredStreams.includes(inspectingCourse.stream) ? 'Preferred Domain Multiplier × 1.04' : 'Alternative Domain Multiplier × 0.90'})
                      </td>
                      <td className="p-3 font-mono text-right font-bold text-rose-300">
                        {parentPreferences.preferredStreams.includes(inspectingCourse.stream) ? '+4% Boost' : '-10% Penalty'}
                      </td>
                    </tr>

                    {/* Final Row */}
                    <tr className="bg-rose-900/30 text-white font-extrabold text-sm border-t-2 border-rose-500">
                      <td colSpan={4} className="p-3.5 text-rose-300">
                        Total Recommendation Score (Normalized 0–100)
                      </td>
                      <td className="p-3.5 font-mono text-right text-rose-400 text-base">
                        {inspectingCourse.totalRecommendationScore} / 100
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Why This Matters For Parents */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <span className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Executive Insight for Parents:</span>
              </span>
              <p>
                Because you gave high weight to <strong>Job Security ({weights.jobStability}%)</strong> and <strong>Placement Rate ({weights.campusPlacement}%)</strong>, courses with 94%+ historical campus absorption are boosted to the top of your list. If your budget is tighter, increasing the <em>Tuition Affordability</em> weight will immediately promote high-ROI autonomous colleges over high-fee private universities.
              </p>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Explanation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
