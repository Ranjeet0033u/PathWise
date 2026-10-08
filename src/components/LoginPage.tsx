import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { UserRole } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  ShieldCheck, 
  GraduationCap, 
  Lock, 
  Mail 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginDemo, loginWithGoogle, setAuthView, setIsViewingLanding } = usePrism();
  
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Empty field validation
    if (!emailOrUsername.trim() || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    // Format validation if user entered email
    if (emailOrUsername.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailOrUsername.trim())) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Simulate realistic network delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 450));
      const res = await login(emailOrUsername, password);
      
      if (!res.success) {
        setErrorMsg(res.error || 'Incorrect email or password.');
      } else {
        setIsSuccess(true);
      }
    } catch {
      setErrorMsg('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoFill = (role: UserRole) => {
    if (role === 'student') {
      setEmailOrUsername('demo@prism.ai');
      setPassword('demo123');
    } else if (role === 'parent') {
      setEmailOrUsername('parent@prism.ai');
      setPassword('demo123');
    } else {
      setEmailOrUsername('counsellor@prism.ai');
      setPassword('demo123');
    }
    setErrorMsg(null);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white dark:bg-[#090c18] rounded-3xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-rose-950/60 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* LEFT / VISUAL SIDE */}
        <div className="md:col-span-5 bg-gradient-to-br from-rose-50 via-pink-50 to-slate-100 dark:from-[#1c0512] dark:via-[#0d0309] dark:to-[#050814] p-8 sm:p-10 text-slate-900 dark:text-white flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-rose-200 dark:border-rose-950/50">
          
          {/* Subtle Ambient Crimson Glows */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-rose-500/10 dark:bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500/10 dark:bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Branding */}
          <div className="relative z-10">
            <button 
              onClick={() => { setAuthView(null); setIsViewingLanding(true); }}
              className="group flex items-center text-left focus:outline-none mb-8 cursor-pointer"
            >
              <img
                src="/logo.png"
                alt="PathWise"
                className="h-9 sm:h-10 w-auto max-w-[190px] object-contain group-hover:scale-[1.02] transition-transform drop-shadow-xs"
              />
            </button>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-slate-900 dark:text-white">
              “Your strengths. <br />
              <span className="text-rose-600 dark:text-transparent dark:bg-gradient-to-r dark:from-rose-400 dark:via-pink-400 dark:to-rose-200 dark:bg-clip-text font-black">
                Your reality.
              </span> <br />
              Your future.”
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-xs font-medium">
              Build a career pathway based on your strengths, family reality and future market opportunities.
            </p>
          </div>

          {/* Abstract Vector Geometry Visual */}
          <div className="relative z-10 py-6 my-auto">
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#050814]/80 backdrop-blur-md border border-rose-200 dark:border-rose-950/60 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300">
                <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>Evidence-Based Triangulation</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-xs text-slate-800 dark:text-slate-200 font-mono text-center">
                <div className="bg-rose-100/70 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-900/50 rounded-lg p-1.5 text-rose-800 dark:text-rose-300 font-bold">Student</div>
                <div className="bg-rose-100/70 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-900/50 rounded-lg p-1.5 text-rose-800 dark:text-rose-300 font-bold">Family</div>
                <div className="bg-rose-100/70 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-900/50 rounded-lg p-1.5 text-rose-800 dark:text-rose-300 font-bold">Market</div>
              </div>
            </div>
          </div>

          {/* Footer Subtext */}
          <div className="relative z-10 pt-4 border-t border-rose-200 dark:border-rose-950/40 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between font-semibold">
            <span>Verified STEAM Trajectories</span>
            <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">2026 Edition</span>
          </div>

        </div>

        {/* RIGHT / FORM SIDE */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white dark:bg-[#090c18]">
          
          <div className="max-w-md mx-auto w-full">
            
            {/* Form Headers with Bright/Dark Theme Switcher */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Welcome back
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  Login to continue your PathWise journey.
                </p>
              </div>

              {/* Theme Mode Toggle inside Login Page */}
              <ThemeToggle variant="login" />
            </div>

            {/* Error Message Box */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-start gap-2 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success State */}
            {isSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Login successful! Opening your PathWise dashboard...</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email / Username */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1.5">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => { setEmailOrUsername(e.target.value); setErrorMsg(null); }}
                    placeholder="Enter your email or username"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-slate-50 dark:bg-[#050814] focus:bg-white text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password with Eye Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrorMsg(null); }}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-slate-50 dark:bg-[#050814] focus:bg-white text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                {/* Forgot Password Link */}
                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={() => setAuthView('forgot-password')}
                    className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline font-bold cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Primary LOGIN Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] hover:from-rose-600 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-950/40 ring-1 ring-rose-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span className="text-white">Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span className="text-white">LOGIN</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </>
                )}
              </button>

            </form>

            {/* OR Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">OR</span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>

            {/* Google Button */}
            <button
              onClick={() => loginWithGoogle()}
              type="button"
              className="w-full py-2.5 px-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 bg-white hover:bg-slate-50 dark:bg-[#050814] dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>CONTINUE WITH GOOGLE</span>
            </button>

            {/* Quick Demo Logins Section */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  <span>TRY DEMO ROLES (1-Click)</span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">Password: demo123</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => loginDemo('student')}
                  className="p-2.5 text-left bg-slate-50 hover:bg-rose-50 dark:bg-[#050814] dark:hover:bg-rose-950/40 border border-slate-200 hover:border-rose-300 dark:border-slate-800 dark:hover:border-rose-800/60 rounded-xl transition-all cursor-pointer group shadow-xs"
                >
                  <span className="text-xs font-extrabold text-slate-900 dark:text-slate-200 block group-hover:text-rose-600 dark:group-hover:text-rose-300">Student</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono truncate">demo@prism.ai</span>
                </button>

                <button
                  type="button"
                  onClick={() => loginDemo('parent')}
                  className="p-2.5 text-left bg-slate-50 hover:bg-rose-50 dark:bg-[#050814] dark:hover:bg-rose-950/40 border border-slate-200 hover:border-rose-300 dark:border-slate-800 dark:hover:border-rose-800/60 rounded-xl transition-all cursor-pointer group shadow-xs"
                >
                  <span className="text-xs font-extrabold text-slate-900 dark:text-slate-200 block group-hover:text-rose-600 dark:group-hover:text-rose-300">Parent</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono truncate">parent@prism.ai</span>
                </button>

                <button
                  type="button"
                  onClick={() => loginDemo('counsellor')}
                  className="p-2.5 text-left bg-slate-50 hover:bg-rose-50 dark:bg-[#050814] dark:hover:bg-rose-950/40 border border-slate-200 hover:border-rose-300 dark:border-slate-800 dark:hover:border-rose-800/60 rounded-xl transition-all cursor-pointer group shadow-xs"
                >
                  <span className="text-xs font-extrabold text-slate-900 dark:text-slate-200 block group-hover:text-rose-600 dark:group-hover:text-rose-300">Counsellor</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono truncate">counsellor@prism.ai</span>
                </button>
              </div>
            </div>

            {/* Bottom: "New to PathWise?" CREATE ACCOUNT */}
            <div className="mt-6 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>New to PathWise? </span>
              <button
                type="button"
                onClick={() => setAuthView('signup')}
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-extrabold hover:underline ml-1 cursor-pointer"
              >
                CREATE ACCOUNT
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

