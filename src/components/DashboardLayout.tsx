import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { UserRole } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { 
  Home, 
  Sparkles, 
  Briefcase, 
  Coins, 
  Users, 
  MoreHorizontal, 
  Search, 
  Bell, 
  ChevronDown, 
  ChevronRight, 
  Star, 
  Layers, 
  BarChart3, 
  ClipboardList, 
  User, 
  Rocket, 
  Lightbulb, 
  LogOut, 
  RotateCcw, 
  X,
  GraduationCap,
  ShieldAlert,
  SlidersHorizontal,
  Compass,
  Calendar,
  Scale,
  MessageSquare
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { 
    student, 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    currentUser, 
    logout, 
    loadDemoProfile, 
    setIsViewingLanding,
    setIsGlobalSearchOpen,
    setSearchQuery: setGlobalSearchQuery
  } = usePrism();

  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Derive active nav category from activeTab and role
  const getActiveNav = (): string => {
    if (activeTab === 'home' || (activeTab === 'counsellor' && role === 'counsellor')) return 'dashboard';
    if (activeTab === 'parent-preferences') return 'recommender';
    if (activeTab === 'swot') return 'prism';
    if (activeTab === 'explorer' || activeTab === 'career-detail' || activeTab === 'pathway') return 'careers';
    if (activeTab === 'financial') return 'financial';
    if (activeTab === 'conflict' || activeTab === 'family-profile') return 'family';
    if (activeTab === 'experts') return 'experts';
    if (activeTab === 'market') return 'market';
    if (activeTab === 'appointments') return 'appointments';
    if (activeTab === 'scholarships') return 'scholarships';
    return 'more';
  };

  const activeNav = getActiveNav();

  // Determine active step in the journey stepper ribbon
  const getJourneyStep = (): number => {
    if (activeTab === 'home' || activeTab === 'explorer' || activeTab === 'career-detail' || activeTab === 'parent-preferences') return 1;
    if (activeTab === 'conflict' || activeTab === 'family-profile') return 2;
    if (activeTab === 'financial' || activeTab === 'roadmap' || activeTab === 'swot') return 3;
    return 4; // achieve / assessments / experts / appointments
  };

  const activeStep = getJourneyStep();

  const firstName = currentUser?.name 
    ? currentUser.name.split(' ')[0] 
    : (student.name ? student.name.split(' ')[0] : 'Arjun');

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    // If switching role, return to home to view that role's primary dashboard
    setActiveTab('home');
    setShowProfileMenu(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalSearchQuery(searchQuery);
    setIsGlobalSearchOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-rose-500 selection:text-white">
      
      {/* ==============================================================
          1. LEFT SIDEBAR: PATHWISE CYBER-CRIMSON NAVIGATION
         ============================================================== */}
      <aside className="w-full lg:w-64 bg-[#050814] border-b lg:border-b-0 lg:border-r border-rose-950/40 p-4 lg:p-5 flex flex-col justify-between shrink-0 relative overflow-hidden">
        
        {/* Subtle Ambient Glowing Orb in Sidebar */}
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />
        <svg className="absolute bottom-0 left-0 w-36 h-48 pointer-events-none opacity-25" viewBox="0 0 100 140">
          <path d="M -15 140 Q 35 80 5 0" fill="none" stroke="#f43f5e" strokeWidth="4" filter="blur(3px)" />
        </svg>

        <div>
          {/* Logo Lockup */}
          <div 
            onClick={() => setActiveTab('home')}
            className="cursor-pointer group mb-7 px-1 flex items-center"
          >
            <img
              src="/logo.png"
              alt="PathWise"
              className="pathwise-logo"
            />
          </div>

          {/* Persona Indicator Badge in Sidebar */}
          <div className="mb-4 px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-800 dark:text-slate-400 text-[11px] font-bold">Viewing as:</span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60">
              {role === 'student' ? 'Student' : role === 'parent' ? 'Parent' : 'Counsellor'}
            </span>
          </div>

          {/* Navigation Items (Role-Specific) */}
          <nav className="space-y-1.5 text-xs sm:text-sm font-semibold">
            
            {/* ==================== 1. STUDENT NAVIGATION ==================== */}
            {role === 'student' && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'dashboard'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Home className={`w-4 h-4 ${activeNav === 'dashboard' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('swot')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'prism'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Star className={`w-4 h-4 ${activeNav === 'prism' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>My PRISM</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('explorer')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'careers'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 ${activeNav === 'careers' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Careers</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('financial')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'financial'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Coins className={`w-4 h-4 ${activeNav === 'financial' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Financial Fit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('conflict')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'family'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Users className={`w-4 h-4 ${activeNav === 'family' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Family Alignment</span>
                </button>
              </>
            )}

            {/* ==================== 2. PARENT NAVIGATION ==================== */}
            {role === 'parent' && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'dashboard'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Home className={`w-4 h-4 ${activeNav === 'dashboard' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Parent Command</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('parent-preferences')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'recommender'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <SlidersHorizontal className={`w-4 h-4 ${activeNav === 'recommender' ? 'text-white' : 'text-rose-500'}`} />
                  <span className="flex-1">Course Recommender</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40">
                    New
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('conflict')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'family'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Scale className={`w-4 h-4 ${activeNav === 'family' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Family Alignment</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('financial')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'financial'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Coins className={`w-4 h-4 ${activeNav === 'financial' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Financial Viability</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('experts')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'experts'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <MessageSquare className={`w-4 h-4 ${activeNav === 'experts' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Talk to Advisor</span>
                </button>
              </>
            )}

            {/* ==================== 3. COUNSELLOR NAVIGATION ==================== */}
            {role === 'counsellor' && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'dashboard'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Users className={`w-4 h-4 ${activeNav === 'dashboard' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Cohort Caseload</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('conflict')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'family'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <ShieldAlert className={`w-4 h-4 ${activeNav === 'family' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Intervention Cases</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('market')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'market'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <BarChart3 className={`w-4 h-4 ${activeNav === 'market' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Market Analytics</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'appointments'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Calendar className={`w-4 h-4 ${activeNav === 'appointments' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Counselling Schedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('scholarships')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeNav === 'scholarships'
                      ? 'bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] text-white font-bold shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Coins className={`w-4 h-4 ${activeNav === 'scholarships' ? 'text-white' : 'text-slate-700 dark:text-slate-400'}`} />
                  <span>Scholarships & Aid</span>
                </button>
              </>
            )}

            {/* ==================== 4. MORE DROPDOWN TRIGGER ==================== */}
            <div className="relative pt-1">
              <button
                type="button"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                  activeNav === 'more' || showMoreMenu
                    ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900/90 font-bold'
                    : 'text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 font-semibold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MoreHorizontal className="w-4 h-4" />
                  <span>More Tools</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showMoreMenu ? 'rotate-90 text-rose-500' : ''}`} />
              </button>

              {/* Popover / Expandable list for More */}
              {showMoreMenu && (
                <div className="mt-1 pl-4 space-y-1 text-xs border-l border-slate-300 dark:border-rose-950/60 animate-in fade-in duration-100 font-semibold">
                  <button
                    onClick={() => { setActiveTab('roadmap'); setShowMoreMenu(false); }}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                      activeTab === 'roadmap' ? 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/50 font-bold' : 'text-slate-800 dark:text-slate-400 hover:text-rose-700 hover:bg-rose-50/50 dark:hover:text-rose-300 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-rose-500" />
                    <span>Career Roadmap</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('market'); setShowMoreMenu(false); }}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                      activeTab === 'market' ? 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/50 font-bold' : 'text-slate-800 dark:text-slate-400 hover:text-rose-700 hover:bg-rose-50/50 dark:hover:text-rose-300 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Market Intelligence</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('scholarships'); setShowMoreMenu(false); }}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                      activeTab === 'scholarships' ? 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/50 font-bold' : 'text-slate-800 dark:text-slate-400 hover:text-rose-700 hover:bg-rose-50/50 dark:hover:text-rose-300 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5 text-rose-500" />
                    <span>Scholarships & Exams</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('assessments'); setShowMoreMenu(false); }}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                      activeTab === 'assessments' ? 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/50 font-bold' : 'text-slate-800 dark:text-slate-400 hover:text-rose-700 hover:bg-rose-50/50 dark:hover:text-rose-300 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    <ClipboardList className="w-3.5 h-3.5 text-rose-500" />
                    <span>Self Assessments</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('experts'); setShowMoreMenu(false); }}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                      activeTab === 'experts' ? 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/50 font-bold' : 'text-slate-800 dark:text-slate-400 hover:text-rose-700 hover:bg-rose-50/50 dark:hover:text-rose-300 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-rose-400" />
                    <span>Talk to Expert</span>
                  </button>

                  {role !== 'parent' && (
                    <button
                      onClick={() => { setActiveTab('parent-preferences'); setShowMoreMenu(false); }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                        activeTab === 'parent-preferences' ? 'text-rose-300 bg-rose-950/50 font-bold' : 'text-slate-400 hover:text-rose-300 hover:bg-rose-950/30'
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />
                      <span>Parent Preference Engine</span>
                    </button>
                  )}
                </div>
              )}
            </div>

          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="pt-6 border-t border-slate-900 text-[11px] text-slate-500 relative z-10 hidden lg:block">
          <div className="flex items-center gap-2 text-rose-400 font-semibold mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>PRISM Multi-Vector v2.4</span>
          </div>
          <p className="text-slate-400">Evidence-based career decisions.</p>
        </div>

      </aside>

      {/* ==============================================================
          2. MAIN CONTENT AREA WITH TOP NAVBAR & CHILDREN
         ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#030712]">
        
        {/* Top Navbar: Search Bar, Role Switcher Pills, Notifications, Profile Avatar */}
        <header className="h-16 px-4 sm:px-6 lg:px-8 border-b border-rose-950/30 bg-[#050814]/90 backdrop-blur-md flex items-center justify-between gap-3 sticky top-0 z-30">
          
          {/* Left/Center: Search Input Box */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => {
                setGlobalSearchQuery(searchQuery);
                setIsGlobalSearchOpen(true);
              }}
              placeholder="Search careers, skills, scholarships..."
              className="w-full bg-[#0b101f] border border-slate-800/90 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/40 transition-all cursor-pointer"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Bright Mode / Dark Mode Toggle */}
            <ThemeToggle variant="header" />
            
            {/* Quick Role Switcher Pills */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-[#090e1a] border border-slate-300 dark:border-slate-800 rounded-xl p-1 gap-1 text-xs font-bold shadow-xs">
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  role === 'student'
                    ? 'bg-rose-600 text-white shadow-xs font-extrabold'
                    : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>🎓</span>
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('parent')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  role === 'parent'
                    ? 'bg-rose-600 text-white shadow-xs font-extrabold'
                    : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>👨‍👩‍👧</span>
                <span>Parent</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('counsellor')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  role === 'counsellor'
                    ? 'bg-rose-600 text-white shadow-xs font-extrabold'
                    : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>🧑‍🏫</span>
                <span>Counsellor</span>
              </button>
            </div>

            {/* Notification Bell with Red Badge */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-900/60 text-slate-300 hover:text-white flex items-center justify-center transition-all relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f43f5e] ring-2 ring-[#050814]" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0c1020] border border-rose-900/50 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                    <span className="text-[10px] text-rose-400 font-mono">2 New</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    {role === 'student' && (
                      <>
                        <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-900/40">
                          <div className="font-semibold text-rose-200">PRISM Multi-Vector Synchronized</div>
                          <p className="text-[11px] text-slate-400 mt-0.5">Overall match calculated at 88% with zero backlogs impact.</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                          <div className="font-semibold text-slate-200">AI / ML Engineer Pathway Unlocked</div>
                          <p className="text-[11px] text-slate-400 mt-0.5">High hiring velocity in Bengaluru & Hyderabad tech corridors.</p>
                        </div>
                      </>
                    )}
                    {role === 'parent' && (
                      <>
                        <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-900/40">
                          <div className="font-semibold text-rose-200">Parent-Student Alignment: 78%</div>
                          <p className="text-[11px] text-slate-400 mt-0.5">Student's top choice (AI/ML) aligns within your 4-year tuition ceiling.</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                          <div className="font-semibold text-slate-200">Tier 2 Merit Scholarship Identified</div>
                          <p className="text-[11px] text-slate-400 mt-0.5">Potential savings of ₹2.5 Lakhs based on academic score.</p>
                        </div>
                      </>
                    )}
                    {role === 'counsellor' && (
                      <>
                        <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-900/40">
                          <div className="font-semibold text-rose-200">Caseload Alert: 7 High-Tension Families</div>
                          <p className="text-[11px] text-slate-400 mt-0.5">Triaged for parent-student career mediation this week.</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                          <div className="font-semibold text-slate-200">Campus Placement Benchmark Updated</div>
                          <p className="text-[11px] text-slate-400 mt-0.5">CSE & AI streams show 94% median starting placement.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Badge with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-xl hover:bg-slate-900/60 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#be123c] via-[#e11d48] to-[#fb7185] text-white font-bold text-xs flex items-center justify-center shadow-md shadow-rose-950/50 ring-1 ring-white/20">
                  {firstName.charAt(0)}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white hidden sm:block">
                  {firstName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0c1020] border border-rose-900/40 rounded-2xl p-2.5 shadow-2xl z-50 text-xs animate-in fade-in duration-150">
                  <div className="px-3 py-2 border-b border-slate-800/80 mb-1.5">
                    <div className="font-bold text-white">{currentUser?.name || student.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{currentUser?.email || 'user@pathwise.ai'}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-300 text-[10px] border border-rose-800/50 uppercase font-semibold">
                      Role: {role}
                    </span>
                  </div>

                  {/* Switch Role Options in Mobile */}
                  <div className="sm:hidden px-3 py-1.5 border-b border-slate-800 mb-1.5 space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold block">SWITCH PERSONA</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleRoleChange('student')}
                        className={`flex-1 py-1 rounded text-[10px] font-bold ${role === 'student' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                      >
                        Student
                      </button>
                      <button
                        onClick={() => handleRoleChange('parent')}
                        className={`flex-1 py-1 rounded text-[10px] font-bold ${role === 'parent' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                      >
                        Parent
                      </button>
                      <button
                        onClick={() => handleRoleChange('counsellor')}
                        className={`flex-1 py-1 rounded text-[10px] font-bold ${role === 'counsellor' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                      >
                        Counsellor
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => { setActiveTab('swot'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 flex items-center gap-2"
                  >
                    <Star className="w-3.5 h-3.5 text-rose-400" />
                    <span>View Student Profile & SWOT</span>
                  </button>

                  <button
                    onClick={() => { loadDemoProfile(); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                    <span>Reload Demo Profile</span>
                  </button>

                  <div className="my-1.5 border-t border-slate-800" />

                  <button
                    onClick={() => { logout(); setIsViewingLanding(true); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* Dashboard Main Scrollable Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 space-y-6 max-w-[1600px] w-full mx-auto">
          {children}

          {/* ==============================================================
              STANDARDIZED "YOUR JOURNEY" STEPPER RIBBON FOOTER
             ============================================================== */}
          <div className="bg-[#090c18] border border-rose-950/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
            
            {/* Left: Rocket & Stepper */}
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-xs font-medium">
              
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-950/40">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-white text-xs uppercase tracking-wider">Your Journey:</span>
              </div>

              {/* Step 1: Explore */}
              <div className={`flex items-center gap-2 cursor-pointer transition-colors ${
                activeStep === 1 ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`} onClick={() => setActiveTab('explorer')}>
                <div className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                  activeStep === 1 
                    ? 'bg-rose-500 text-white ring-2 ring-rose-500/30' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}>
                  1
                </div>
                <span>Explore</span>
              </div>

              {/* Connecting Line */}
              <div className="w-4 sm:w-8 h-0.5 bg-rose-950" />

              {/* Step 2: Align */}
              <div className={`flex items-center gap-2 cursor-pointer transition-colors ${
                activeStep === 2 ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`} onClick={() => setActiveTab('conflict')}>
                <div className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                  activeStep === 2 
                    ? 'bg-rose-500 text-white ring-2 ring-rose-500/30' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}>
                  2
                </div>
                <span>Align</span>
              </div>

              {/* Connecting Line */}
              <div className="w-4 sm:w-8 h-0.5 bg-rose-950" />

              {/* Step 3: Build */}
              <div className={`flex items-center gap-2 cursor-pointer transition-colors ${
                activeStep === 3 ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`} onClick={() => setActiveTab('financial')}>
                <div className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                  activeStep === 3 
                    ? 'bg-rose-500 text-white ring-2 ring-rose-500/30' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}>
                  3
                </div>
                <span>Build</span>
              </div>

              {/* Connecting Line */}
              <div className="w-4 sm:w-8 h-0.5 bg-rose-950" />

              {/* Step 4: Achieve */}
              <div className={`flex items-center gap-2 cursor-pointer transition-colors ${
                activeStep === 4 ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`} onClick={() => setActiveTab('assessments')}>
                <div className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                  activeStep === 4 
                    ? 'bg-rose-500 text-white ring-2 ring-rose-500/30' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}>
                  4
                </div>
                <span>Achieve</span>
              </div>

            </div>

            {/* Right: Small steps, Big future pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/20 border border-rose-900/50 text-rose-300 text-xs shrink-0">
              <Lightbulb className="w-3.5 h-3.5 text-rose-400" />
              <span>Small steps. Big future.</span>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
};
