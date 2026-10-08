import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { UserRole } from '../types';
import { X, Sparkles, User, Shield, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { setRole, loadDemoProfile, setActiveTab, runAnalysisPipeline } = usePrism();
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [emailOrPhone, setEmailOrPhone] = useState('arjun.swami@example.com');
  const [fullName, setFullName] = useState('Arjun Swaminathan');
  const [password, setPassword] = useState('••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    onSuccess();
    if (selectedRole === 'counsellor') {
      setActiveTab('counsellor');
    } else if (selectedRole === 'parent') {
      setActiveTab('conflict');
    } else {
      setActiveTab('home');
    }
    onClose();
  };

  const handleDemoLogin = () => {
    loadDemoProfile();
    setRole('student');
    onSuccess();
    onClose();
    runAnalysisPipeline('home');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="PathWise"
            className="h-10 w-auto mx-auto mb-3 object-contain"
          />
          <h3 className="text-xl font-bold text-slate-900">
            {isSignUp ? 'Create your PRISM Account' : 'Welcome to PRISM'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isSignUp ? 'Start your multi-dimensional career pathway' : 'Access your personalized STEAM career intelligence'}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Select Your Role
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-medium">
            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`py-2 rounded-lg transition-all ${selectedRole === 'student' ? 'bg-white text-indigo-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('parent')}
              className={`py-2 rounded-lg transition-all ${selectedRole === 'parent' ? 'bg-white text-purple-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Parent
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('counsellor')}
              className={`py-2 rounded-lg transition-all ${selectedRole === 'counsellor' ? 'bg-white text-sky-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Counsellor
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Email or Mobile</label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. arjun@example.com or +91 98400..."
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-medium text-slate-700">Password</label>
              {!isSignUp && (
                <button type="button" className="text-[11px] text-indigo-600 hover:underline">
                  Forgot Password?
                </button>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer mt-2"
          >
            {isSignUp ? `Sign Up as ${selectedRole}` : `Login as ${selectedRole}`}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-[11px] text-slate-400 uppercase">or</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        {/* Demo Account Button */}
        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full py-2.5 px-4 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 rounded-lg transition-colors flex items-center justify-center gap-2 mb-2.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Try Demo Account (Arjun - Grade 12 STEM)</span>
        </button>

        {/* Google Continue Button */}
        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full py-2 px-4 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Toggle Sign Up / Login */}
        <div className="mt-4 text-center text-xs text-slate-500">
          {isSignUp ? (
            <span>Already have an account? <button onClick={() => setIsSignUp(false)} className="text-indigo-600 font-semibold hover:underline">Log In</button></span>
          ) : (
            <span>Don't have an account? <button onClick={() => setIsSignUp(true)} className="text-indigo-600 font-semibold hover:underline">Sign Up</button></span>
          )}
        </div>

      </div>
    </div>
  );
};
