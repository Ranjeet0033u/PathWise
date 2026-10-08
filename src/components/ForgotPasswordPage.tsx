import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { ThemeToggle } from './ThemeToggle';
import { 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Send, 
  Sparkles 
} from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { setAuthView, setIsViewingLanding } = usePrism();
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!identifier.trim()) {
      setErrorMsg('Please enter your registered email or username.');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsSubmitted(true);
    } catch {
      setErrorMsg('Failed to process request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white dark:bg-[#090c18] rounded-3xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-rose-950/60 p-8 sm:p-10 relative overflow-hidden">
        
        {/* Top Right Theme Toggle */}
        <div className="absolute top-5 right-5 z-20">
          <ThemeToggle variant="login" showLabel={false} />
        </div>

        {/* Subtle Ambient Crimson Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-500/10 dark:bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Icon */}
        <div className="text-center mb-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto mb-3 shadow-md shadow-rose-950/20">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Reset your password
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xs mx-auto font-medium">
            Enter your registered email or username and we’ll help you regain access.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-start gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="text-center space-y-4 py-4 relative z-10 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Check your inbox</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                If an account exists for <strong className="text-rose-600 dark:text-rose-400">{identifier}</strong>, we have sent password reset instructions.
              </p>
            </div>
            <button
              onClick={() => setAuthView('login')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-extrabold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1.5">
                Registered Email or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => { setIdentifier(e.target.value); setErrorMsg(null); }}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-slate-50 dark:bg-[#050814] focus:bg-white text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] hover:from-rose-600 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-950/40 ring-1 ring-rose-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="text-white">Processing...</span>
                </>
              ) : (
                <>
                  <span className="text-white">SEND RESET LINK</span>
                  <Send className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setAuthView('login')}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
