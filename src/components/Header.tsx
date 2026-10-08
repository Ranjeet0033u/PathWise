import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { UserRole } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { 
  Sparkles, 
  MessageSquareCode, 
  ChevronDown, 
  User, 
  CheckCircle2, 
  LogOut, 
  LogIn, 
  UserPlus 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    loadDemoProfile, 
    setIsChatOpen, 
    currentUser, 
    isAuthenticated, 
    setAuthView, 
    logout, 
    isViewingLanding, 
    setIsViewingLanding 
  } = usePrism();
  
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setShowRoleMenu(false);
    if (newRole === 'counsellor') {
      setActiveTab('counsellor');
    } else if (newRole === 'parent') {
      setActiveTab('home');
    } else {
      setActiveTab('home');
    }
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      setIsViewingLanding(false);
      setAuthView(null);
      setActiveTab('home');
    } else {
      setIsViewingLanding(true);
      setAuthView(null);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#030712]/95 backdrop-blur-md border-b border-rose-950/40 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Zone - PathWise Lockup */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleLogoClick}
            className="group flex items-center text-left focus:outline-none cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="PathWise"
              className="pathwise-logo"
            />
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {isAuthenticated ? (
            <>
              {role === 'student' && (
                <>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('home'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'home' && !isViewingLanding ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('swot'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'swot' && !isViewingLanding ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    My PRISM
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('explorer'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'explorer' && !isViewingLanding ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Careers
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('financial'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'financial' && !isViewingLanding ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Financial Fit
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('conflict'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'conflict' && !isViewingLanding ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Family Alignment
                  </button>

                  {/* More dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowMoreMenu(!showMoreMenu)}
                      className="flex items-center gap-1 hover:text-white transition-colors py-1 text-slate-300 cursor-pointer"
                    >
                      <span>More</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {showMoreMenu && (
                      <div 
                        className="absolute right-0 mt-2 w-48 bg-[#090c18] rounded-xl shadow-xl border border-rose-950/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                        onMouseLeave={() => setShowMoreMenu(false)}
                      >
                        <button 
                          onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('market'); setShowMoreMenu(false); }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                        >
                          Market Intelligence
                        </button>
                        <button 
                          onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('roadmap'); setShowMoreMenu(false); }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                        >
                          Career Roadmap
                        </button>
                        <button 
                          onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('scholarships'); setShowMoreMenu(false); }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                        >
                          Scholarships & Exams
                        </button>
                        <button 
                          onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('assessments'); setShowMoreMenu(false); }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                        >
                          Assessment Hub
                        </button>
                        <button 
                          onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('experts'); setShowMoreMenu(false); }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                        >
                          Expert Mentors
                        </button>
                        <button 
                          onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('history'); setShowMoreMenu(false); }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                        >
                          Timeline History
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {role === 'parent' && (
                <>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('home'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'home' ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Parent Command
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('parent-preferences'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'parent-preferences' ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Course Recommender
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('conflict'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'conflict' ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Family Alignment
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('financial'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'financial' ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Financial Viability
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('experts'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'experts' ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Talk to Advisor
                  </button>
                </>
              )}

              {role === 'counsellor' && (
                <>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('counsellor'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'counsellor' ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Cohort Caseload
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('conflict'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'conflict' ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Intervention Cases
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('market'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'market' ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Market Analytics
                  </button>
                  <button 
                    onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('appointments'); }}
                    className={`transition-colors py-1 cursor-pointer ${activeTab === 'appointments' ? 'text-rose-400 font-semibold border-b-2 border-rose-500' : 'hover:text-white'}`}
                  >
                    Counselling Schedule
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <button 
                onClick={() => { setIsViewingLanding(true); setAuthView(null); }}
                className="hover:text-white text-slate-300 transition-colors py-1 cursor-pointer"
              >
                Overview
              </button>
              <button 
                onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('explorer'); }}
                className="hover:text-white text-slate-300 transition-colors py-1 cursor-pointer"
              >
                Career Explorer
              </button>
              <button 
                onClick={() => { setIsViewingLanding(false); setAuthView(null); setActiveTab('market'); }}
                className="hover:text-white text-slate-300 transition-colors py-1 cursor-pointer"
              >
                Market Intelligence
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Primary Actions Matching Image 2 Theme */}
        <div className="flex items-center gap-2.5">
          {/* Bright Mode / Dark Mode Feature Toggle */}
          <ThemeToggle variant="header" />

          {/* Quick Demo Pre-load */}
          <button
            onClick={loadDemoProfile}
            title="Load complete STEAM profile of Arjun (18, Chennai)"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-rose-950/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Try Demo (Arjun)</span>
          </button>

          {isAuthenticated ? (
            <>
              {/* User Persona / Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap border border-slate-800 cursor-pointer"
                >
                  <div className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {currentUser?.name?.[0] || 'U'}
                  </div>
                  <span className="font-semibold text-white truncate max-w-[100px]">
                    {currentUser?.name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showRoleMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-[#090c18] rounded-xl shadow-2xl border border-rose-950/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setShowRoleMenu(false)}
                  >
                    <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Role: {role}
                    </div>
                    <div className="h-px bg-slate-800 my-1" />
                    <button
                      onClick={() => handleRoleChange('student')}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${role === 'student' ? 'bg-rose-950/70 text-rose-300 font-semibold' : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'}`}
                    >
                      <span>Student View</span>
                      {role === 'student' && <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />}
                    </button>
                    <button
                      onClick={() => handleRoleChange('parent')}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${role === 'parent' ? 'bg-rose-950/70 text-rose-300 font-semibold' : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'}`}
                    >
                      <span>Parent View</span>
                      {role === 'parent' && <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />}
                    </button>
                    <button
                      onClick={() => handleRoleChange('counsellor')}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${role === 'counsellor' ? 'bg-rose-950/70 text-rose-300 font-semibold' : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'}`}
                    >
                      <span>Counsellor View</span>
                      {role === 'counsellor' && <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />}
                    </button>
                    
                    <div className="h-px bg-slate-800 my-1" />
                    
                    {/* Log Out option */}
                    <button
                      onClick={() => { setShowRoleMenu(false); logout(); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/40 flex items-center gap-1.5 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Ask PRISM AI Drawer Trigger */}
              <button
                onClick={() => setIsChatOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-md shadow-rose-950/50 transition-all whitespace-nowrap cursor-pointer"
              >
                <MessageSquareCode className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask PRISM</span>
              </button>
            </>
          ) : (
            <>
              {/* Unauthenticated: Log In & Create Account */}
              <button
                onClick={() => { setAuthView('login'); setIsViewingLanding(false); }}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900/80 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-400" />
                <span>Login</span>
              </button>

              <button
                onClick={() => { setAuthView('signup'); setIsViewingLanding(false); }}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] hover:from-rose-600 hover:to-pink-500 rounded-xl shadow-md shadow-rose-950/60 ring-1 ring-rose-400/30 transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
};
