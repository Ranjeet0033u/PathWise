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
  Mail, 
  Phone, 
  Lock, 
  ShieldCheck, 
  Check, 
  X,
  FileText,
  Compass
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { 
    signup, 
    setAuthView, 
    setIsViewingLanding, 
    setIsOnboarding, 
    setActiveTab, 
    loadDemoProfile, 
    setStudent 
  } = usePrism();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Modal states for Terms & Privacy without redirecting away
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [modalType, setModalType] = useState<'terms' | 'privacy'>('terms');

  // Form Validation & Submission
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Full name validation
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (fullName.trim().length < 2) {
      setErrorMsg('Name must be at least 2 characters long.');
      return;
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // 3. Mobile number validation
    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    // 4. Password strength validation
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    // 5. Confirm password match
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    // 6. Terms agreement
    if (!agreedToTerms) {
      setErrorMsg('Please agree to the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate realistic registration delay
      await new Promise(resolve => setTimeout(resolve, 600));

      const res = await signup({
        name: fullName.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        password,
        role: selectedRole
      });

      if (!res.success) {
        setErrorMsg(res.error || 'Failed to create account.');
        setIsLoading(false);
        return;
      }

      // Populate student state with the newly created account data
      setStudent(prev => ({
        ...prev,
        name: fullName.trim()
      }));

      // Show success state
      setIsSuccess(true);
      setIsLoading(false);

      // Smooth transition based on role
      setTimeout(() => {
        setAuthView(null);
        setIsViewingLanding(false);

        if (selectedRole === 'student') {
          setIsOnboarding(true);
          setActiveTab('assessments');
        } else if (selectedRole === 'parent') {
          setIsOnboarding(false);
          setActiveTab('family-profile');
        } else {
          setIsOnboarding(false);
          setActiveTab('counsellor');
        }
      }, 1000);

    } catch {
      setErrorMsg('Something went wrong during account creation. Please try again.');
      setIsLoading(false);
    }
  };

  const [demoPopulated, setDemoPopulated] = useState(false);

  const handleDemoAccountClick = () => {
    setFullName('Arjun Swaminathan');
    setEmail('demo@prism.ai');
    setMobile('+91 98400 98210');
    setPassword('DemoPass123!');
    setConfirmPassword('DemoPass123!');
    setSelectedRole('student');
    setAgreedToTerms(true);
    setErrorMsg(null);
    setDemoPopulated(true);
  };

  const openLegalModal = (type: 'terms' | 'privacy') => {
    setModalType(type);
    setShowTermsModal(true);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white dark:bg-[#090c18] rounded-3xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-rose-950/60 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[660px]">
        
        {/* ==================================================
            1. LEFT SIDE: BRANDING PANEL
           ================================================== */}
        <div className="md:col-span-5 bg-gradient-to-br from-rose-50 via-pink-50 to-slate-100 dark:from-[#1c0512] dark:via-[#0f040b] dark:to-[#050814] p-8 sm:p-10 text-slate-900 dark:text-white flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-rose-200 dark:border-rose-950/50">
          
          {/* Subtle Ambient Crimson Glows */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-rose-500/10 dark:bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-500/10 dark:bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Branding Lockup */}
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

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-slate-900 dark:text-white">
              “Begin your <br />
              <span className="text-rose-600 dark:text-transparent dark:bg-gradient-to-r dark:from-rose-400 dark:via-pink-400 dark:to-rose-200 dark:bg-clip-text font-black">
                evidence-based
              </span> <br />
              STEAM journey.”
            </h2>

            {/* Supporting Text */}
            <p className="mt-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Build a career pathway based on your strengths, family reality and future market opportunities.
            </p>
          </div>

          {/* Compact Feature Card: WHAT YOU UNLOCK */}
          <div className="relative z-10 my-6">
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#050814]/80 backdrop-blur-md border border-rose-200 dark:border-rose-950/60 space-y-2.5 shadow-xs">
              <div className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>WHAT YOU UNLOCK</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>Personalized Student Profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Financially Viable Career Paths</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                  <span>Parent–Student Alignment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                  <span>Market-Aware Career Guidance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom of Left Panel */}
          <div className="relative z-10 pt-4 border-t border-rose-200 dark:border-rose-950/40 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between font-semibold">
            <span>Student Career Intelligence</span>
            <span className="text-rose-600 dark:text-rose-400 text-xs font-mono font-bold">Built for smarter decisions</span>
          </div>

        </div>

        {/* ==================================================
            2. RIGHT SIDE: REGISTRATION FORM
           ================================================== */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-[#090c18]">
          
          <div className="max-w-md mx-auto w-full">
            
            {/* Heading & Subtitle with Theme Toggle */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Create your PathWise account
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  Start building your personalized career pathway.
                </p>
              </div>

              {/* Theme Mode Toggle */}
              <ThemeToggle variant="login" />
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-start gap-2 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span className="font-medium">{errorMsg}</span>
              </div>
            )}

            {/* Success State */}
            {isSuccess && (
              <div className="mb-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs space-y-1 animate-in fade-in duration-150 font-semibold">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Account created successfully</span>
                </div>
                <p className="text-emerald-700 pl-6">
                  “Let&apos;s build your PathWise profile.” Redirecting to workspace...
                </p>
              </div>
            )}

            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); setErrorMsg(null); }}
                    placeholder="e.g. Arjun Swaminathan"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-slate-50 dark:bg-[#050814] focus:bg-white text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-xs"
                    disabled={isLoading || isSuccess}
                  />
                </div>
              </div>

              {/* Email & Mobile Number Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrorMsg(null); }}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-slate-50 dark:bg-[#050814] focus:bg-white text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-xs"
                      disabled={isLoading || isSuccess}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => { setMobile(e.target.value); setErrorMsg(null); }}
                      placeholder="+91 98400 XXXXX"
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-slate-50 dark:bg-[#050814] focus:bg-white text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-xs"
                      disabled={isLoading || isSuccess}
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrorMsg(null); }}
                      placeholder="Minimum 8 characters"
                      className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-slate-50 dark:bg-[#050814] focus:bg-white text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-xs"
                      disabled={isLoading || isSuccess}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none p-1 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setErrorMsg(null); }}
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-slate-50 dark:bg-[#050814] focus:bg-white text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-xs"
                      disabled={isLoading || isSuccess}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none p-1 cursor-pointer"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  3. ROLE SELECTION (Three Horizontal Selectable Cards)
                 ================================================== */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1.5">
                  Select your role
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  
                  {/* Student Card */}
                  <div
                    onClick={() => setSelectedRole('student')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between shadow-xs ${
                      selectedRole === 'student'
                        ? 'border-rose-500 bg-rose-600 text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050814] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-extrabold ${selectedRole === 'student' ? 'text-white' : 'text-slate-900 dark:text-slate-300'}`}>
                        STUDENT
                      </span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        selectedRole === 'student' ? 'border-white bg-white text-rose-600' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {selectedRole === 'student' && <Check className="w-2.5 h-2.5 text-rose-600 stroke-[3]" />}
                      </div>
                    </div>
                    <span className={`text-[11px] leading-tight font-medium ${selectedRole === 'student' ? 'text-rose-100' : 'text-slate-600 dark:text-slate-400'}`}>
                      I am exploring my career
                    </span>
                  </div>

                  {/* Parent Card */}
                  <div
                    onClick={() => setSelectedRole('parent')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between shadow-xs ${
                      selectedRole === 'parent'
                        ? 'border-rose-500 bg-rose-600 text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050814] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-extrabold ${selectedRole === 'parent' ? 'text-white' : 'text-slate-900 dark:text-slate-300'}`}>
                        PARENT
                      </span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        selectedRole === 'parent' ? 'border-white bg-white text-rose-600' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {selectedRole === 'parent' && <Check className="w-2.5 h-2.5 text-rose-600 stroke-[3]" />}
                      </div>
                    </div>
                    <span className={`text-[11px] leading-tight font-medium ${selectedRole === 'parent' ? 'text-rose-100' : 'text-slate-600 dark:text-slate-400'}`}>
                      I am supporting a student
                    </span>
                  </div>

                  {/* Counsellor / Educator Card */}
                  <div
                    onClick={() => setSelectedRole('counsellor')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between shadow-xs ${
                      selectedRole === 'counsellor'
                        ? 'border-rose-500 bg-rose-600 text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050814] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-extrabold truncate ${selectedRole === 'counsellor' ? 'text-white' : 'text-slate-900 dark:text-slate-300'}`}>
                        COUNSELLOR
                      </span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        selectedRole === 'counsellor' ? 'border-white bg-white text-rose-600' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {selectedRole === 'counsellor' && <Check className="w-2.5 h-2.5 text-rose-600 stroke-[3]" />}
                      </div>
                    </div>
                    <span className={`text-[11px] leading-tight font-medium ${selectedRole === 'counsellor' ? 'text-rose-100' : 'text-slate-600 dark:text-slate-400'}`}>
                      I provide career guidance
                    </span>
                  </div>

                </div>
              </div>

              {/* ==================================================
                  4. TERMS & PRIVACY CHECKBOX (Clickable modal, no redirect)
                 ================================================== */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="accent-rose-500 rounded cursor-pointer w-3.5 h-3.5"
                  />
                  <span>
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); openLegalModal('terms'); }}
                      className="text-rose-600 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                    >
                      Terms
                    </button>{' '}
                    &{' '}
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); openLegalModal('privacy'); }}
                      className="text-rose-600 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </div>

              {/* ==================================================
                  5. CREATE ACCOUNT BUTTON
                 ================================================== */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full py-3 px-4 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] hover:from-rose-600 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-950/40 ring-1 ring-rose-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span className="text-white">Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span className="text-white">CREATE ACCOUNT</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>

            </form>

            {/* ==================================================
                6. LOGIN LINK
               ================================================== */}
            <div className="mt-4 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={() => setAuthView('login')}
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-extrabold hover:underline cursor-pointer ml-0.5"
              >
                LOG IN
              </button>
            </div>

            {/* ==================================================
                7. DEMO ACCOUNT BUTTON
               ================================================== */}
              <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800 text-center">
              {demoPopulated && (
                <div className="mb-2 py-1.5 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Demo details filled! Click &quot;CREATE ACCOUNT →&quot; to continue.</span>
                </div>
              )}
              <button
                type="button"
                onClick={handleDemoAccountClick}
                className="w-full py-2 px-3.5 text-xs font-bold text-rose-700 dark:text-rose-300 bg-slate-50 dark:bg-[#050814] hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-800/80 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
                <span>✦ TRY DEMO ACCOUNT</span>
              </button>
              <p className="text-[11px] text-slate-600 dark:text-slate-500 font-medium mt-1">
                Fills sample student credentials instantly into the form.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ==================================================
          MODAL: TERMS & PRIVACY (Keeps user on the page)
         ================================================== */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#090c18] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-rose-950/80 space-y-4 max-h-[85vh] overflow-y-auto text-slate-800 dark:text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/80 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm">
                  {modalType === 'terms' ? 'PathWise Terms of Service' : 'PathWise Student Privacy Policy'}
                </h3>
              </div>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modalType === 'terms' ? (
              <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                <p>
                  <strong>1. Educational Guidance Purpose:</strong> PathWise provides multi-dimensional career and academic path guidance based on student aptitude, family financial constraints, and real-time market vectors. Recommendations are evidence-informed advisory tools designed to support informed decision-making.
                </p>
                <p>
                  <strong>2. Fair & Ethical Algorithms:</strong> Our vector scoring engine prioritizes student long-term financial viability, academic suitability, and transparent explainability over commercial institutional promotion.
                </p>
                <p>
                  <strong>3. Account Responsibilities:</strong> Users are responsible for providing authentic academic scores and preferences to ensure accurate vector modeling and personalized pathway roadmaps.
                </p>
              </div>
            ) : (
              <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                <p>
                  <strong>1. Zero Data-Selling Guarantee:</strong> PathWise never sells student or family financial information to third-party advertisers, coaching institutes, or lead generators.
                </p>
                <p>
                  <strong>2. Family Financial Confidentiality:</strong> All entered family budgets, parental risk tolerances, and location preferences are stored securely and used exclusively to calculate affordability indices.
                </p>
                <p>
                  <strong>3. Rights & Control:</strong> You have full control over your data and can request deletion or export of your assessment vectors at any time through account settings.
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
