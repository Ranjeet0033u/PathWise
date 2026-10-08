import React from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  Users, 
  Wallet, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  GraduationCap, 
  Sparkles, 
  Coins, 
  Scale, 
  HeartHandshake, 
  HelpCircle, 
  Building, 
  MapPin, 
  Award,
  ChevronRight,
  SlidersHorizontal,
  Info,
  Target,
  X
} from 'lucide-react';
import { CourseRecommendationScore } from '../types';

export const ParentDashboard: React.FC = () => {
  const { 
    student, 
    family, 
    careers, 
    selectedCareer, 
    setSelectedCareerId, 
    setActiveTab, 
    setIsChatOpen, 
    currentUser,
    parentPreferences,
    courseRecommendationScores
  } = usePrism();

  const [inspectingCourse, setInspectingCourse] = React.useState<CourseRecommendationScore | null>(null);
  const [showFormulaModal, setShowFormulaModal] = React.useState(false);

  const handleOpenCareer = (id: string) => {
    setSelectedCareerId(id);
    setActiveTab('career-detail');
  };

  const parentName = currentUser?.name || 'Parent';
  const studentName = student.name ? student.name.split(' ')[0] : 'Arjun';

  // Key metrics for parents
  const fourYearTuitionCapacity = family.annualBudgetLakhs * 4;
  const targetCareerFeeTotal = selectedCareer.educationTiers[1].annualFeeLakhs * 4;
  const budgetSurplus = fourYearTuitionCapacity - targetCareerFeeTotal;
  const isBudgetSafe = budgetSurplus >= 0;

  const consensusScore = 100 - selectedCareer.scores.conflictIndex; // e.g. 78%

  return (
    <div className="space-y-6">
      
      {/* ==============================================================
          TOP ROW: PARENT HERO CARD & OVERALL CONSENSUS GAUGE
         ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* HERO CARD (8 Columns on lg) */}
        <div className="lg:col-span-8 bg-[#090c18] border border-rose-950/50 rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-xl">
          
          {/* Dynamic Crimson Fluid Glowing Wave across right side */}
          <svg 
            className="absolute right-0 top-0 bottom-0 h-full w-full sm:w-3/5 pointer-events-none opacity-85" 
            preserveAspectRatio="none" 
            viewBox="0 0 500 220"
          >
            <defs>
              <linearGradient id="parentCrimsonWaveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9f1239" stopOpacity="0" />
                <stop offset="30%" stopColor="#e11d48" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ff2a6d" stopOpacity="0.95" />
              </linearGradient>
              <filter id="parentGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M 60 220 Q 240 180 340 90 T 500 30 L 500 220 Z"
              fill="url(#parentCrimsonWaveGrad)"
              opacity="0.18"
            />
            <path
              d="M 50 220 Q 230 170 340 85 T 500 25"
              fill="none"
              stroke="url(#parentCrimsonWaveGrad)"
              strokeWidth="6"
              filter="url(#parentGlowFilter)"
            />
            <path
              d="M 90 220 Q 260 150 365 70 T 500 15"
              fill="none"
              stroke="#fb7185"
              strokeWidth="2.5"
              opacity="0.9"
            />
          </svg>

          {/* Top greeting badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#f43f5e] animate-ping" />
              <span>Parent Command Center · Family Vector Protection</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Welcome, <span className="bg-gradient-to-r from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">{parentName}</span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Guiding <span className="text-rose-300 font-semibold">{studentName}&apos;s</span> educational roadmap with financial clarity, degree stability metrics, and generational consensus.
            </p>
          </div>

          {/* Bottom Micro Indicators */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 relative z-10 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Annual Family Budget: <strong className="text-white font-mono">₹{family.annualBudgetLakhs}L/year</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>4-Year Reserve: <strong className="text-white font-mono">₹{fourYearTuitionCapacity}L</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>Preferred Degree: <strong className="text-white">B.E / B.Tech (STEAM)</strong></span>
            </div>
          </div>

        </div>

        {/* OVERALL CONSENSUS GAUGE (4 Columns on lg) */}
        <div className="lg:col-span-4 bg-[#090c18] border border-rose-950/50 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Family Alignment</span>
            <span className="text-[10px] font-semibold text-rose-300 bg-rose-950/60 border border-rose-900/60 px-2 py-0.5 rounded-full">
              Real-Time
            </span>
          </div>

          {/* Glowing Circular Ring */}
          <div className="my-4 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#parentRingGrad)"
                  strokeWidth="10"
                  strokeDasharray="314.16"
                  strokeDashoffset={314.16 * (1 - consensusScore / 100)}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="parentRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#be123c" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#fb7185" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-white tracking-tight font-mono">{consensusScore}%</span>
                <span className="text-[10px] text-rose-300 font-medium uppercase tracking-wider">Consensus</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 text-center mt-2 max-w-xs">
              High agreement on degree choice and financial affordability.
            </p>
          </div>

          {/* Bottom Action Button */}
          <button
            type="button"
            onClick={() => setActiveTab('conflict')}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/50 transition-all cursor-pointer"
          >
            <span>Review Consensus Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* ==============================================================
          ROW 2: FIVE KEY PARENT METRIC CARDS
         ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Metric 1: Family Alignment */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Family Alignment</span>
            <Users className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-extrabold text-white font-mono">{consensusScore}%</div>
            <span className="text-[10px] text-emerald-400 font-medium">Strong Generational Sync</span>
          </div>
        </div>

        {/* Metric 2: Financial Safety Buffer */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">4-Year College Buffer</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-extrabold text-emerald-400 font-mono">
              {isBudgetSafe ? `+₹${budgetSurplus.toFixed(1)}L` : `-₹${Math.abs(budgetSurplus).toFixed(1)}L`}
            </div>
            <span className="text-[10px] text-slate-400">
              {isBudgetSafe ? 'Debt-Free Feasible' : 'Requires Scholarship'}
            </span>
          </div>
        </div>

        {/* Metric 3: Career Stability */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Career Stability Index</span>
            <ShieldCheck className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-extrabold text-white font-mono">94%</div>
            <span className="text-[10px] text-rose-300 font-medium">Recession-Resilient STEAM</span>
          </div>
        </div>

        {/* Metric 4: Placement Velocity */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Projected Starting CTC</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-extrabold text-white font-mono">₹8.5L – ₹14L</div>
            <span className="text-[10px] text-slate-400">Top Recruiters Hiring</span>
          </div>
        </div>

        {/* Metric 5: Degree ROI Payback */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Degree ROI Payback</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-extrabold text-amber-400 font-mono">1.8 Years</div>
            <span className="text-[10px] text-slate-400">Post-graduation recovery</span>
          </div>
        </div>

      </div>

      {/* ==============================================================
          NEW FEATURE ROW: PARENT COURSE RECOMMENDATION ENGINE
         ============================================================== */}
      <div className="bg-[#090c18] border border-rose-950/60 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-rose-950/40">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-xs font-semibold border border-rose-800/80 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Parent Preference Recommender · Multi-Vector Calculated Fit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Top Recommended Courses Based on Parent Preferences</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Dynamically scored using your active priorities: Job Stability (<strong className="text-rose-300">{parentPreferences.criteriaWeights.jobStability}%</strong>), Tuition Affordability (<strong className="text-emerald-300">{parentPreferences.criteriaWeights.feeAffordability}%</strong>), and Campus Placements (<strong className="text-cyan-300">{parentPreferences.criteriaWeights.campusPlacement}%</strong>).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Direct Option to See How Total Score is Calculated */}
            <button
              onClick={() => {
                const topCourse = courseRecommendationScores[0];
                setInspectingCourse(topCourse);
                setShowFormulaModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-900/40 text-rose-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-rose-400" />
              <span>How Score is Calculated</span>
            </button>

            {/* Customize Preferences & View All */}
            <button
              onClick={() => setActiveTab('parent-preferences')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-rose-950/60 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Adjust Preferences & All Courses</span>
            </button>
          </div>
        </div>

        {/* 3 Top Scored Course Cards */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {courseRecommendationScores.slice(0, 3).map((course, idx) => {
            const isPreferred = parentPreferences.preferredStreams.includes(course.stream);
            const feeDiff = parentPreferences.maxAnnualFeeLakhs - course.tuitionPerYearLakhs;
            const isWithinBudget = feeDiff >= 0;

            return (
              <div 
                key={course.courseId}
                className="bg-[#050814] rounded-xl border border-rose-950/50 hover:border-rose-500/50 p-4 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800/80">
                      Rank #{idx + 1} Match
                    </span>

                    {/* Big Score Radial Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-rose-500/40">
                      <span className="text-sm font-extrabold font-mono text-rose-400">
                        {course.totalRecommendationScore}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">
                        / 100
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors line-clamp-2">
                    {course.courseName}
                  </h3>
                  
                  <span className="text-[11px] text-slate-400 block mt-1 truncate">
                    {course.stream}
                  </span>

                  <div className="mt-3 space-y-1.5 pt-2.5 border-t border-slate-800 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Starting Salary:</span>
                      <span className="font-mono font-bold text-emerald-400">{course.projectedStartingCTC}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Tuition Fee:</span>
                      <span className={`font-mono font-bold ${isWithinBudget ? 'text-white' : 'text-amber-400'}`}>
                        ₹{course.tuitionPerYearLakhs.toFixed(2)}L/yr {isWithinBudget ? '✓' : '⚠'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Placement Rate:</span>
                      <span className="font-mono font-bold text-cyan-400">{course.placementRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px]">
                  <button
                    onClick={() => {
                      setInspectingCourse(course);
                      setShowFormulaModal(true);
                    }}
                    className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3 h-3" />
                    <span>Calculation Math</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('parent-preferences')}
                    className="text-slate-400 hover:text-white font-medium flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Full View</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==============================================================
          ROW 3: STUDENT'S ASPIRATIONS & PARENTAL EVALUATION
         ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Top 3 Student Career Matches Evaluated for Parents (8 cols) */}
        <div className="lg:col-span-8 bg-[#090c18] border border-rose-950/40 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-rose-400" />
                <span>{studentName}&apos;s Top Career Trajectories (Parental Feasibility)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated against your 4-year tuition limit of ₹{fourYearTuitionCapacity} Lakhs.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('explorer')}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3.5">
            {careers.slice(0, 3).map((career, idx) => {
              const fourYrCost = career.educationTiers[1].annualFeeLakhs * 4;
              const isFeasible = fourYearTuitionCapacity >= fourYrCost;
              return (
                <div 
                  key={career.id}
                  onClick={() => handleOpenCareer(career.id)}
                  className="p-4 rounded-xl bg-[#0d1222] border border-slate-800/80 hover:border-rose-500/50 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-rose-950 text-rose-300 border border-rose-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                          {career.title}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900 border border-slate-700 text-slate-300">
                          {career.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{career.description}</p>
                      
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                        <span>4-Yr Degree Cost: <strong className="text-white font-mono">₹{fourYrCost}L</strong></span>
                        <span>·</span>
                        <span>Starting CTC Range: <strong className="text-emerald-400 font-mono">{career.salaryRange}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      isFeasible 
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800' 
                        : 'bg-amber-950/60 text-amber-300 border-amber-800'
                    }`}>
                      {isFeasible ? '✓ Budget Fit' : '⚠ Scholarship Needed'}
                    </span>
                    <span className="text-[11px] text-rose-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Parent-Student Perspective Bridge (4 cols) */}
        <div className="lg:col-span-4 bg-[#090c18] border border-rose-950/40 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-rose-400" />
                <span>Generational Consensus Bridge</span>
              </h2>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-semibold text-rose-300 flex items-center gap-1.5 mb-1">
                  <span>🎓</span>
                  <span>Student&apos;s Core Preference:</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Passionate about emerging AI algorithms and cutting-edge software engineering. Wants freedom to build innovative projects.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                  <span>🛡️</span>
                  <span>Parent&apos;s Prime Priority:</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Long-term job security, affordable college fees without education debt, and reputed campus placement records.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/50">
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                  <span>💡</span>
                  <span>Recommended Win-Win Resolution:</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Enroll in Tier-2 Government/Reputed State Tech Institute (saves ₹5L+) while specializing in AI/DS electives.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80">
            <button
              onClick={() => setActiveTab('experts')}
              className="w-full py-2 px-3 rounded-xl bg-[#0d1222] border border-rose-900/40 hover:border-rose-500/60 text-slate-200 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>Book Mediation with Certified Counsellor</span>
            </button>
          </div>
        </div>

      </div>

      {/* ==============================================================
          ROW 4: QUICK ACTION BUTTONS (4 Grid)
         ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <button
          onClick={() => setActiveTab('financial')}
          className="p-4 rounded-xl bg-[#090c18] border border-rose-950/40 hover:border-rose-500/50 text-left transition-all cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-300 border border-rose-800/80 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Wallet className="w-4 h-4" />
          </div>
          <div className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors flex items-center justify-between">
            <span>Tuition Solver</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Stress-test 4-year college budgets vs parent savings.</p>
        </button>

        <button
          onClick={() => setActiveTab('conflict')}
          className="p-4 rounded-xl bg-[#090c18] border border-rose-950/40 hover:border-rose-500/50 text-left transition-all cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-300 border border-rose-800/80 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Users className="w-4 h-4" />
          </div>
          <div className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors flex items-center justify-between">
            <span>Family Alignment</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">View the 4 disagreement vectors and consensus paths.</p>
        </button>

        <button
          onClick={() => setActiveTab('scholarships')}
          className="p-4 rounded-xl bg-[#090c18] border border-rose-950/40 hover:border-rose-500/50 text-left transition-all cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-300 border border-rose-800/80 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Coins className="w-4 h-4" />
          </div>
          <div className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors flex items-center justify-between">
            <span>Scholarship Finder</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Browse ₹10L+ in merit & state higher-ed scholarships.</p>
        </button>

        <button
          onClick={() => setActiveTab('parent-preferences')}
          className="p-4 rounded-xl bg-[#090c18] border border-rose-950/40 hover:border-rose-500/50 text-left transition-all cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-300 border border-rose-800/80 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors flex items-center justify-between">
            <span>Course Recommender</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Configure parent preferences & calculate total match scores.</p>
        </button>

      </div>

      {/* ==============================================================
          CALCULATION FORMULA & SCORE INSPECTOR MODAL
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
                PathWise takes the raw performance score of the course in each category (0–100) and multiplies it by your configured parent importance weights: Job Stability ({parentPreferences.criteriaWeights.jobStability}%), Budget ({parentPreferences.criteriaWeights.feeAffordability}%), Placement ({parentPreferences.criteriaWeights.campusPlacement}%), Aptitude ({parentPreferences.criteriaWeights.studentAptitude}%), and Location ({parentPreferences.criteriaWeights.locationProximity}%).
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
                      <td className="p-3 font-mono text-rose-400 font-bold">{parentPreferences.criteriaWeights.jobStability}%</td>
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
                      <td className="p-3 font-mono text-emerald-400 font-bold">{parentPreferences.criteriaWeights.feeAffordability}%</td>
                      <td className="p-3 font-mono font-bold text-emerald-300 text-right">+{inspectingCourse.formulaExplanation.weightedFeeAffordability} pts</td>
                    </tr>

                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-white font-medium flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Campus Placement Rate</span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">{inspectingCourse.breakdown.campusPlacementScore} / 100</td>
                      <td className="p-3 font-mono text-cyan-400 font-bold">{parentPreferences.criteriaWeights.campusPlacement}%</td>
                      <td className="p-3 font-mono font-bold text-cyan-300 text-right">+{inspectingCourse.formulaExplanation.weightedCampusPlacement} pts</td>
                    </tr>

                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-white font-medium flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                        <span>Student PRISM Aptitude</span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">
                        {inspectingCourse.breakdown.studentAptitudeScore} / 100
                        <span className="text-[10px] text-slate-500 block">Math & Analytical logic</span>
                      </td>
                      <td className="p-3 font-mono text-purple-400 font-bold">{parentPreferences.criteriaWeights.studentAptitude}%</td>
                      <td className="p-3 font-mono font-bold text-purple-300 text-right">+{inspectingCourse.formulaExplanation.weightedStudentAptitude} pts</td>
                    </tr>

                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-white font-medium flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-amber-400" />
                        <span>Location Proximity & Safety</span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">{inspectingCourse.breakdown.locationScore} / 100</td>
                      <td className="p-3 font-mono text-amber-400 font-bold">{parentPreferences.criteriaWeights.locationProximity}%</td>
                      <td className="p-3 font-mono font-bold text-amber-300 text-right">+{inspectingCourse.formulaExplanation.weightedLocation} pts</td>
                    </tr>

                    {/* Subtotal Row */}
                    <tr className="bg-slate-900/70 font-bold">
                      <td colSpan={3} className="p-3 text-white">
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
                      <td colSpan={3} className="p-3">
                        Parent Stream Concordance Adjustment ({parentPreferences.preferredStreams.includes(inspectingCourse.stream) ? 'Preferred Domain Multiplier × 1.04' : 'Alternative Domain Multiplier × 0.90'})
                      </td>
                      <td className="p-3 font-mono text-right font-bold text-rose-300">
                        {parentPreferences.preferredStreams.includes(inspectingCourse.stream) ? '+4% Boost' : '-10% Penalty'}
                      </td>
                    </tr>

                    {/* Final Row */}
                    <tr className="bg-rose-900/30 text-white font-extrabold text-sm border-t-2 border-rose-500">
                      <td colSpan={3} className="p-3.5 text-rose-300">
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

            {/* Close Button */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  setShowFormulaModal(false);
                  setActiveTab('parent-preferences');
                }}
                className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Adjust Weights in Course Recommender</span>
              </button>

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
