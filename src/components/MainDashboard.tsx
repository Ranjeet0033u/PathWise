import React from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  Sparkles, 
  ArrowUpRight, 
  ArrowRight, 
  GraduationCap, 
  Target, 
  ShieldAlert, 
  Star, 
  Zap, 
  ClipboardList, 
  Compass, 
  User, 
  Check, 
  RotateCcw, 
  Layers, 
  BarChart3, 
  Calendar, 
  FileText 
} from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const { 
    student, 
    careers, 
    overallMetrics, 
    setSelectedCareerId, 
    setActiveTab, 
    setIsChatOpen 
  } = usePrism();

  // Top career items matching the template
  const defaultTopMatches = [
    {
      id: 'ai-ml-engineer',
      num: 1,
      title: 'AI / Machine Learning Engineer',
      matchScore: 98,
      tags: ['Tech', 'High Growth', 'Innovation'],
      description: 'Build intelligent systems that learn from data and solve real-world problems.'
    },
    {
      id: 'data-scientist',
      num: 2,
      title: 'Data Science & Big Data Systems',
      matchScore: 89,
      tags: ['Data', 'Analytics', 'Problem Solving'],
      description: 'Work with large datasets to uncover insights and drive decisions.'
    },
    {
      id: 'cloud-devops',
      num: 3,
      title: 'Cloud & DevOps Engineer',
      matchScore: 86,
      tags: ['Cloud', 'Infrastructure', 'Automation'],
      description: 'Build and maintain scalable systems and cloud infrastructure.'
    }
  ];

  const handleOpenCareer = (careerId: string) => {
    setSelectedCareerId(careerId);
    setActiveTab('career-detail');
  };

  const firstName = student.name ? student.name.split(' ')[0] : 'Arjun';

  return (
    <div className="space-y-6">
      
      {/* ==============================================================
          TOP ROW: HERO CARD (LEFT) & OVERALL MATCH RING (RIGHT)
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
              <linearGradient id="crimsonWaveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9f1239" stopOpacity="0" />
                <stop offset="30%" stopColor="#e11d48" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ff2a6d" stopOpacity="0.95" />
              </linearGradient>
              <filter id="crimsonGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M 60 220 Q 240 180 340 90 T 500 30 L 500 220 Z"
              fill="url(#crimsonWaveGrad)"
              opacity="0.18"
            />
            <path
              d="M 50 220 Q 230 170 340 85 T 500 25"
              fill="none"
              stroke="url(#crimsonWaveGrad)"
              strokeWidth="6"
              filter="url(#crimsonGlowFilter)"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 dark:bg-rose-950/60 dark:border-rose-800/60 dark:text-rose-300 text-xs font-bold mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#f43f5e] animate-ping" />
              <span>Multi-Vector Career Intelligence Active</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, <span className="text-rose-600 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-rose-100 dark:to-rose-300 dark:bg-clip-text font-black">{firstName}</span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
              Your PRISM profile has computed high congruence across 3 high-growth STEAM specializations. All vectors are aligned with local industry hiring benchmarks.
            </p>
          </div>

          {/* Bottom Micro Indicators */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 relative z-10 flex flex-wrap items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Academic standing: <strong className="text-slate-900 dark:text-white font-bold">{student.classDegree || 'Undergraduate'}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Target branch: <strong className="text-slate-900 dark:text-white font-bold">{student.beBtechDetails?.branch || student.academicStream || 'CSE / AI'}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>Arrears: <strong className="text-slate-900 dark:text-white font-bold">{student.beBtechDetails?.currentBacklogs || 0} active</strong></span>
            </div>
          </div>

        </div>

        {/* OVERALL MATCH CARD (4 Columns on lg) */}
        <div className="lg:col-span-4 bg-[#090c18] border border-rose-950/50 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-300 uppercase tracking-wider">Overall Match</span>
            <span className="text-[10px] font-bold text-rose-800 bg-rose-100 border border-rose-300 dark:text-rose-300 dark:bg-rose-950/60 dark:border-rose-900/60 px-2 py-0.5 rounded-full">
              Live Index
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
                  stroke="#e2e8f0"
                  strokeWidth="10"
                  className="dark:stroke-slate-800"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="10"
                  strokeDasharray="314.16"
                  strokeDashoffset={314.16 * (1 - 0.88)}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#be123c" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#fb7185" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-mono">88%</span>
                <span className="text-[10px] text-rose-700 dark:text-rose-300 font-bold uppercase tracking-wider">Top Fit</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 text-center mt-2 max-w-xs font-medium">
              Based on your strengths, market trends, and academic performance.
            </p>
          </div>

          {/* Bottom Action Button */}
          <button
            type="button"
            onClick={() => setActiveTab('swot')}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/50 transition-all cursor-pointer"
          >
            <span>View Full Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* ==============================================================
          ROW 2: FIVE KEY PERFORMANCE INDICATOR CARDS
         ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Metric 1: STEAM Academic Index */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-400">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-400">STEAM Index</span>
            <Target className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono">92%</div>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Strong Foundational Base</span>
          </div>
        </div>

        {/* Metric 2: Family Alignment */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-400">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-400">Family Alignment</span>
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono">78%</div>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Low generational tension</span>
          </div>
        </div>

        {/* Metric 3: Financial Feasibility */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-400">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-400">Financial Fit</span>
            <Zap className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono">SAFE</div>
            <span className="text-xs text-slate-700 dark:text-slate-400 font-semibold">Within ₹4.5L family ceiling</span>
          </div>
        </div>

        {/* Metric 4: Market Hiring Velocity */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-400">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-400">Market Velocity</span>
            <ArrowUpRight className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono">+34%</div>
            <span className="text-xs text-sky-700 dark:text-sky-300 font-bold">High hiring expansion</span>
          </div>
        </div>

        {/* Metric 5: Top Matched Career */}
        <div className="bg-[#090c18] border border-rose-950/40 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-400">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-400">Top Career Track</span>
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <div className="text-sm font-black text-slate-900 dark:text-white truncate">AI / ML Engineer</div>
            <span className="text-xs text-rose-700 dark:text-rose-400 font-mono font-bold">98% Fit Score</span>
          </div>
        </div>

      </div>

      {/* ==============================================================
          ROW 3: TOP CAREER MATCHES (LEFT) & QUICK ACTIONS (RIGHT)
         ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Top 3 Career Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Top Career Matches</span>
            </h2>
            <button
              onClick={() => setActiveTab('explorer')}
              className="text-xs text-rose-700 hover:text-rose-900 dark:text-rose-400 dark:hover:text-rose-300 font-bold cursor-pointer"
            >
              See all careers →
            </button>
          </div>

          <div className="space-y-3">
            {defaultTopMatches.map((career) => (
              <div 
                key={career.id}
                className="bg-[#090c18] border border-rose-950/40 hover:border-rose-500/50 rounded-2xl p-5 transition-all shadow-md group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800 text-xs font-black flex items-center justify-center shrink-0">
                      {career.num}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                      {career.title}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1 text-right">
                    <span className="text-2xl font-black text-[#be123c] dark:text-[#f43f5e] font-mono">{career.matchScore}%</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Match</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {career.tags.map(t => (
                    <span key={t} className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 border border-slate-300 text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-400 leading-relaxed font-normal">
                  {career.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-900 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleOpenCareer(career.id)}
                    className="text-xs font-bold text-rose-700 hover:text-rose-900 dark:text-rose-400 dark:hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions 2x2 Grid (4 cols) */}
        <div className="lg:col-span-4 bg-[#090c18] border border-rose-950/40 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
              Quick Actions
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 font-normal">
              Accelerate your decision with high-priority next steps.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('assessments')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-400 hover:bg-rose-50/40 dark:bg-[#0d1222] dark:border-slate-800 dark:hover:border-rose-900/60 dark:hover:bg-rose-950/20 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-900 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-slate-200 group-hover:text-rose-700">Take Assessment</div>
                <span className="text-[10px] text-rose-700 dark:text-rose-400 font-bold mt-0.5 block">Start quiz →</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('explorer')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-400 hover:bg-rose-50/40 dark:bg-[#0d1222] dark:border-slate-800 dark:hover:border-rose-900/60 dark:hover:bg-rose-950/20 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-900 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-slate-200 group-hover:text-rose-700">Explore Careers</div>
                <span className="text-[10px] text-rose-700 dark:text-rose-400 font-bold mt-0.5 block">Browse 40+ →</span>
              </button>

              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-400 hover:bg-rose-50/40 dark:bg-[#0d1222] dark:border-slate-800 dark:hover:border-rose-900/60 dark:hover:bg-rose-950/20 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-900 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-slate-200 group-hover:text-rose-700">Ask PRISM</div>
                <span className="text-[10px] text-rose-700 dark:text-rose-400 font-bold mt-0.5 block">Instant AI chat →</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('experts')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-400 hover:bg-rose-50/40 dark:bg-[#0d1222] dark:border-slate-800 dark:hover:border-rose-900/60 dark:hover:bg-rose-950/20 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-900 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <User className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-slate-200 group-hover:text-rose-700">Talk to Expert</div>
                <span className="text-[10px] text-rose-700 dark:text-rose-400 font-bold mt-0.5 block">Book slot →</span>
              </button>
            </div>
          </div>

          {/* Academic Signals Pill */}
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-400 font-bold mb-1.5">
              <span>Academic Readiness:</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-extrabold">Cleared</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
            </div>
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1.5 block">
              0 active arrears detected · Ready for high-velocity tech placements
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
