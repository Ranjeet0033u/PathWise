import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  GraduationCap, 
  MapPin, 
  BarChart3, 
  Layers,
  ChevronRight,
  SlidersHorizontal,
  Target,
  Award,
  Users,
  Briefcase,
  Activity
} from 'lucide-react';

export const LandingPage: React.FC<{ onStartOnboarding: () => void }> = ({ onStartOnboarding }) => {
  const { loadDemoProfile, setActiveTab, runAnalysisPipeline, setAuthView, setIsViewingLanding, setRole } = usePrism();
  const [interactiveVector, setInteractiveVector] = useState<'student' | 'parent' | 'market'>('student');

  const handleStartDemo = () => {
    loadDemoProfile();
    runAnalysisPipeline('home');
  };

  const handleLaunchRoleDemo = (targetRole: 'student' | 'parent' | 'counsellor') => {
    setRole(targetRole);
    loadDemoProfile();
    if (targetRole === 'counsellor') {
      setActiveTab('counsellor');
    } else {
      setActiveTab('home');
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#030712] text-slate-100 min-h-screen">
      
      {/* Background Cyber-Crimson Ambient Glowing Orbs and Waves (Matching Image 2 Reference) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[780px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/4 w-[560px] h-[560px] bg-rose-600/15 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute top-64 left-1/2 -translate-x-1/2 w-[640px] h-[340px] bg-rose-950/20 rounded-full blur-3xl" />
        
        {/* Subtle cyber grid backdrop */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f43f5e 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* Dynamic Crimson Fluid Glowing Wave in Background (Matching Image 2 Aesthetic) */}
      <svg 
        className="absolute -top-10 right-0 w-[580px] h-[520px] pointer-events-none opacity-45 -z-10" 
        viewBox="0 0 500 450"
      >
        <defs>
          <linearGradient id="landingCrimsonWaveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9f1239" stopOpacity="0" />
            <stop offset="40%" stopColor="#e11d48" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#f43f5e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff2a6d" stopOpacity="0.95" />
          </linearGradient>
          <filter id="landingWaveGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path 
          d="M 60 450 Q 240 280 400 110 T 500 40" 
          fill="none" 
          stroke="url(#landingCrimsonWaveGrad)" 
          strokeWidth="5" 
          filter="url(#landingWaveGlow)" 
        />
        <path 
          d="M 100 450 Q 270 250 430 80 T 500 20" 
          fill="none" 
          stroke="#fb7185" 
          strokeWidth="2.5" 
          opacity="0.8" 
        />
      </svg>

      {/* ==============================================================
          HERO SECTION
         ============================================================== */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
        
        {/* Editorial Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/70 border border-rose-800/60 text-xs font-semibold text-rose-300 mb-6 shadow-md shadow-rose-950/50">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Next-Generation Multi-Vector STEAM Career Decision Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] text-balance">
          Turn Career Confusion Into a <span className="bg-gradient-to-r from-[#e11d48] via-[#f43f5e] to-[#fb7185] bg-clip-text text-transparent">Clear Path.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          PathWise combines your strengths, your family&apos;s financial reality, and future market opportunities to build an evidence-based career pathway that fits.
        </p>

        {/* Action CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartOnboarding}
            className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] hover:from-rose-600 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-950/70 ring-1 ring-rose-400/30 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>START MY PRISM</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={scrollToHowItWorks}
            className="px-6 py-3.5 text-sm font-bold text-slate-200 bg-[#090c18] hover:bg-[#0d1222] border border-rose-950/60 hover:border-rose-800/80 rounded-xl shadow-md transition-all cursor-pointer"
          >
            HOW PRISM WORKS
          </button>

          <button
            onClick={handleStartDemo}
            className="px-6 py-3.5 text-sm font-bold text-rose-300 bg-[#050814] hover:bg-rose-950/40 border border-rose-900/60 hover:border-rose-700/80 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>Try Instant Demo (Arjun, 18)</span>
          </button>
        </div>

        {/* Existing account quick link */}
        <div className="mt-4 text-xs text-slate-400">
          <span>Already registered? </span>
          <button
            onClick={() => { setAuthView('login'); setIsViewingLanding(false); }}
            className="text-rose-400 hover:text-rose-300 font-bold hover:underline cursor-pointer transition-colors"
          >
            Login to your PathWise account →
          </button>
        </div>

        {/* ==============================================================
            INTERACTIVE LIVE PLATFORM PREVIEW (Directly referencing Image 2)
           ============================================================== */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-[#090c18] border border-rose-950/70 shadow-2xl overflow-hidden text-left relative">
          
          {/* Dashboard Window Header Bar */}
          <div className="px-5 py-3.5 bg-[#050814] border-b border-rose-950/50 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-pink-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-rose-900/80" />
              </div>
              <span className="font-mono text-slate-400 text-[11px] pl-1">
                PATHWISE ENGINE LIVE PREVIEW • ARJUN (18, CHENNAI)
              </span>
            </div>

            {/* Interactive Vector Toggle Pills */}
            <div className="flex items-center gap-1.5 bg-[#090c18] p-1 rounded-xl border border-rose-950/60">
              <button
                onClick={() => setInteractiveVector('student')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  interactiveVector === 'student' 
                    ? 'bg-rose-950 text-rose-300 border border-rose-800/80 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Brain className="w-3 h-3 text-rose-400" />
                <span>Student Vector</span>
              </button>

              <button
                onClick={() => setInteractiveVector('parent')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  interactiveVector === 'parent' 
                    ? 'bg-rose-950 text-rose-300 border border-rose-800/80 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wallet className="w-3 h-3 text-rose-300" />
                <span>Family Vector</span>
              </button>

              <button
                onClick={() => setInteractiveVector('market')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  interactiveVector === 'market' 
                    ? 'bg-rose-950 text-rose-300 border border-rose-800/80 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <TrendingUp className="w-3 h-3 text-pink-400" />
                <span>Market Vector</span>
              </button>
            </div>
          </div>

          {/* Interactive Preview Body */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Active Vector Metric Card */}
            <div className="p-5 rounded-xl bg-[#050814] border border-rose-950/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider font-bold">
                  {interactiveVector === 'student' && '01. COGNITIVE & APTITUDE'}
                  {interactiveVector === 'parent' && '02. PARENT VIABILITY & BUDGET'}
                  {interactiveVector === 'market' && '03. HYPER-LOCAL HIRING CLUSTERS'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800/60">
                  {interactiveVector === 'student' && '88/100 Strengths'}
                  {interactiveVector === 'parent' && '₹18L Budget'}
                  {interactiveVector === 'market' && '+28% Velocity'}
                </span>
              </div>

              {interactiveVector === 'student' && (
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white">Algorithmic Problem Solving & Systems</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Arjun demonstrates exceptional spatial logic, high computational fluency, and passion for distributed systems architecture.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-900/40 font-mono">Math: 92%</span>
                    <span className="px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-900/40 font-mono">Physics: 89%</span>
                    <span className="px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-900/40 font-mono">Coding: 94%</span>
                  </div>
                </div>
              )}

              {interactiveVector === 'parent' && (
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white">Generational Alignment: 82% Concordance</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Father prioritizes debt safety and campus placement track records. Recommends tier-1 autonomous engineering with zero loan liability.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-900/40 font-mono">Max Fee: ₹18L</span>
                    <span className="px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-900/40 font-mono">Location: South India</span>
                    <span className="px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-900/40 font-mono">Conflict: 18% (Low)</span>
                  </div>
                </div>
              )}

              {interactiveVector === 'market' && (
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white">Bengaluru & Chennai High-Velocity Corridors</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Massive industrial absorption for Distributed Systems, Cloud Infra, and Robotics AI. Low vulnerability to basic LLM replacement.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-rose-950/40 text-pink-300 border border-rose-900/40 font-mono">Entry: ₹14.5 LPA</span>
                    <span className="px-2 py-0.5 rounded bg-rose-950/40 text-pink-300 border border-rose-900/40 font-mono">5Y Growth: 3.2x</span>
                    <span className="px-2 py-0.5 rounded bg-rose-950/40 text-pink-300 border border-rose-900/40 font-mono">AI Resilience: 94%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Triangulation Score Meter */}
            <div className="p-5 rounded-xl bg-[#050814] border border-rose-950/60 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider mb-2">
                  OVERALL RECOMMENDATION FIT
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">87%</span>
                  <span className="text-xs font-semibold text-rose-300">Evidence-Backed Match</span>
                </div>
                <p className="mt-2 text-xs text-slate-300">
                  Calculated using 30% Student Vector + 25% Parent Affordability + 25% Market Absorption + 20% Skill Horizon.
                </p>
              </div>

              {/* Live breakdown meters */}
              <div className="space-y-2 mt-4 pt-3 border-t border-rose-950/40">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Student Cognitive Fit</span>
                  <span className="text-rose-400 font-bold font-mono">91%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-600 to-pink-500 h-full rounded-full" style={{ width: '91%' }} />
                </div>

                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Family Budget Fit</span>
                  <span className="text-rose-300 font-bold font-mono">88%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-500 to-rose-400 h-full rounded-full" style={{ width: '88%' }} />
                </div>

                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Market Absorption</span>
                  <span className="text-pink-400 font-bold font-mono">84%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-600 to-rose-400 h-full rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>

            {/* Column 3: Top Recommended Career & Action Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#120610] to-[#050814] border border-rose-900/60 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800/60 mb-2">
                  <Award className="w-3 h-3 text-rose-400" />
                  <span>#1 RESOLVED PATHWAY</span>
                </div>
                <h4 className="text-base font-bold text-white leading-snug">
                  Cloud & Distributed Systems Architect
                </h4>
                <p className="mt-1 text-xs text-rose-300 font-semibold">
                  B.Tech CSE / AI & DS Track
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  Passes parental ₹18L fee ceiling, matches student logic strength, and unlocks high-growth infrastructure hubs.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-950/50 flex flex-col gap-2">
                <button
                  onClick={handleStartDemo}
                  className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] hover:from-rose-600 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-950/80 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Arjun&apos;s Full Dashboard</span>
                </button>

                <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                  <span>Switch Views:</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleLaunchRoleDemo('parent')} 
                      className="text-rose-400 hover:underline font-semibold cursor-pointer"
                    >
                      Parent View →
                    </button>
                    <button 
                      onClick={() => handleLaunchRoleDemo('counsellor')} 
                      className="text-pink-400 hover:underline font-semibold cursor-pointer"
                    >
                      Counsellor View →
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Core Dimension Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          
          {/* Card 1: Student */}
          <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/50 hover:border-rose-700/60 shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-950/70 border border-rose-900/60 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">YOUR STRENGTHS</h3>
            <p className="mt-1 text-xs text-rose-400 font-semibold">Student Vector</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span>Aptitude</span>
              <span aria-hidden="true" className="text-rose-500/60">·</span>
              <span>Interests</span>
              <span aria-hidden="true" className="text-rose-500/60">·</span>
              <span>Skills</span>
            </div>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              Synthesizes cognitive preferences, algorithmic problem solving, academic stream performance, and authentic intrinsic motivations.
            </p>
          </div>

          {/* Card 2: Family */}
          <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/50 hover:border-rose-700/60 shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-950/70 border border-rose-900/60 flex items-center justify-center text-rose-300 mb-4 group-hover:scale-105 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">YOUR FAMILY</h3>
            <p className="mt-1 text-xs text-rose-300 font-semibold">Family Vector</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span>Affordability</span>
              <span aria-hidden="true" className="text-rose-500/60">·</span>
              <span>Risk</span>
              <span aria-hidden="true" className="text-rose-500/60">·</span>
              <span>Aspirations</span>
            </div>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              Integrates real parental budgets, geographic mobility comfort, debt sensitivity, and generational stability expectations.
            </p>
          </div>

          {/* Card 3: Market */}
          <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/50 hover:border-rose-700/60 shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-950/70 border border-rose-900/60 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">YOUR FUTURE</h3>
            <p className="mt-1 text-xs text-pink-400 font-semibold">Market Vector</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span>Demand</span>
              <span aria-hidden="true" className="text-rose-500/60">·</span>
              <span>Geography</span>
              <span aria-hidden="true" className="text-rose-500/60">·</span>
              <span>Trends</span>
            </div>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              Tracks actual regional hiring velocity across Chennai, Bengaluru, and Hyderabad, salary trajectories, and AI disruption indices.
            </p>
          </div>

        </div>

        {/* PRISM Equation Box */}
        <div className="mt-10 p-6 bg-[#050814] border border-rose-950/60 rounded-2xl max-w-3xl mx-auto shadow-xl">
          <div className="text-xs font-semibold text-rose-400/90 uppercase tracking-widest mb-2">
            The Multi-Vector Equilibrium Formula
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base font-bold text-slate-200">
            <span className="text-rose-400">STUDENT VECTOR</span>
            <span className="text-slate-500 font-mono text-lg">+</span>
            <span className="text-rose-300">FAMILY VECTOR</span>
            <span className="text-slate-500 font-mono text-lg">+</span>
            <span className="text-pink-400">MARKET VECTOR</span>
          </div>
          <div className="my-2 text-slate-500 font-mono text-xl">=</div>
          <div className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 bg-clip-text text-transparent">
            PATHWISE CAREER TRAJECTORY
          </div>
        </div>

      </section>

      {/* ==============================================================
          SECTION: WHY TRADITIONAL GUIDANCE FALLS SHORT
         ============================================================== */}
      <section className="py-16 bg-[#050814] border-y border-rose-950/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Traditional Career Guidance Falls Short
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              Most career tests are isolated quizzes that ask what you like, ignoring financial realities and rapid economic shifts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Flawed Legacy Model */}
            <div className="p-6 rounded-2xl bg-[#090c18] border border-rose-950/60 shadow-lg">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span>⚠️ Generic Career Quizzes & Chatbots</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Blind to Family Budgets:</strong> Recommends expensive private/overseas universities without checking if parents can afford ₹25+ Lakhs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Creates Generational Conflict:</strong> Gives recommendations that parents reject, causing emotional deadlock at home.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Stale Market Data:</strong> Recommends saturated fields without tracking local hiring clusters or automation disruption.</span>
                </li>
              </ul>
            </div>

            {/* PathWise Advantage */}
            <div className="p-6 rounded-2xl bg-[#090c18] border border-rose-800/80 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span>✓ PathWise Multi-Vector System</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>3-Tier Financial Feasibility:</strong> Delivers Low-Cost Govt, Moderate Autonomous, and Premium routes with exact tuition and ROI.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Parent-Student Conflict Index:</strong> Pinpoints common ground and crafts actionable compromises (e.g., Computer Engineering with AI minor).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Hyper-Local STEAM Intelligence:</strong> Calibrates actual recruitment demand in Chennai, Bengaluru, and Hyderabad.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION: HOW IT WORKS
         ============================================================== */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">
            Engine Architecture
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            How The PRISM Pipeline Resolves Decisions
          </h2>
          <p className="mt-3 text-slate-300">
            A transparent 9-step normalization pipeline calculates evidence-based pathways rather than black-box guesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/50 hover:border-rose-700/60 shadow-xl relative">
            <div className="text-xs font-mono font-bold text-rose-400 mb-2">01. INGESTION</div>
            <h3 className="text-base font-bold text-white mb-2">Vector Profiling</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Captures cognitive aptitude, subject scores, family budget limits, risk tolerance, and regional location preferences.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <Brain className="w-3.5 h-3.5 text-rose-400" />
              <span>Generates SWOT Profile</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/50 hover:border-rose-700/60 shadow-xl relative">
            <div className="text-xs font-mono font-bold text-rose-300 mb-2">02. SOLVER</div>
            <h3 className="text-base font-bold text-white mb-2">Multi-Vector Optimization</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applies transparent weights: 30% Student Fit, 25% Financial Feasibility, 25% Market Demand, 10% Geography, 10% Skill Readiness.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <Layers className="w-3.5 h-3.5 text-rose-400" />
              <span>Calculates Alignment Conflict</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/50 hover:border-rose-700/60 shadow-xl relative">
            <div className="text-xs font-mono font-bold text-pink-400 mb-2">03. EXECUTION</div>
            <h3 className="text-base font-bold text-white mb-2">Actionable Roadmap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Produces a milestone-based timeline: Entrance exams, matched scholarships, skill gaps to bridge, and expert consultation slots.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <Compass className="w-3.5 h-3.5 text-pink-400" />
              <span>Semester-by-Semester Milestones</span>
            </div>
          </div>

        </div>
      </section>

      {/* ==============================================================
          SECTION: KEY FEATURES
         ============================================================== */}
      <section className="py-16 bg-[#050814] border-t border-rose-950/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Engineered For Real-World STEAM Careers
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Comprehensive decision tools designed for Indian education systems and global engineering benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-[#090c18] rounded-xl border border-rose-950/50 shadow-lg">
              <BarChart3 className="w-6 h-6 text-rose-400 mb-3" />
              <h4 className="text-sm font-bold text-white">Explainable AI</h4>
              <p className="mt-1 text-xs text-slate-300">Every match details exactly why it fits student ability, family budget, and industry hiring velocity.</p>
            </div>

            <div className="p-5 bg-[#090c18] rounded-xl border border-rose-950/50 shadow-lg">
              <Wallet className="w-6 h-6 text-rose-300 mb-3" />
              <h4 className="text-sm font-bold text-white">3-Tier Costing</h4>
              <p className="mt-1 text-xs text-slate-300">Low-cost govt, moderate autonomous, and premium tiers so families never face surprise debt.</p>
            </div>

            <div className="p-5 bg-[#090c18] rounded-xl border border-rose-950/50 shadow-lg">
              <ShieldCheck className="w-6 h-6 text-purple-400 mb-3" />
              <h4 className="text-sm font-bold text-white">Conflict De-Escalation</h4>
              <p className="mt-1 text-xs text-slate-300">Quantifies parent-student alignment and offers hybrid compromise solutions.</p>
            </div>

            <div className="p-5 bg-[#090c18] rounded-xl border border-rose-950/50 shadow-lg">
              <MapPin className="w-6 h-6 text-pink-400 mb-3" />
              <h4 className="text-sm font-bold text-white">Regional Hotspots</h4>
              <p className="mt-1 text-xs text-slate-300">Maps actual hiring corridors across Chennai, Bengaluru, and Hyderabad tech belts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          FINAL CTA BANNER
         ============================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#18040d] via-[#090c18] to-[#200612] border border-rose-900/60 text-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight relative z-10">
            Ready to find your optimal STEAM trajectory?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto relative z-10">
            Take the guided assessment or launch the instant demo to see the multi-vector decision engine in action.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
            <button
              onClick={onStartOnboarding}
              className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] hover:from-rose-600 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-950/70 ring-1 ring-rose-400/30 transition-all cursor-pointer"
            >
              Start My Assessment
            </button>
            <button
              onClick={() => { setAuthView('login'); setIsViewingLanding(false); }}
              className="px-6 py-3.5 text-sm font-bold text-slate-200 bg-[#050814] hover:bg-[#0d1222] border border-rose-950/80 hover:border-rose-800 rounded-xl transition-all cursor-pointer"
            >
              Log In to Account
            </button>
            <button
              onClick={handleStartDemo}
              className="px-6 py-3.5 text-sm font-bold text-rose-300 bg-[#050814] hover:bg-rose-950/40 border border-rose-900/60 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Explore With Arjun (Demo)</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
