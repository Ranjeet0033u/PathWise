import React from 'react';
import { usePrism } from '../context/PrismContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'header' | 'login' | 'dashboard' | 'segmented' | 'compact';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'header',
}) => {
  const { theme, setTheme } = usePrism();
  const isLight = theme === 'light';

  // Compact icon-only toggle (if space is tight)
  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => setTheme(isLight ? 'dark' : 'light')}
        aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Bright Mode'}
        title={isLight ? 'Switch to Dark Mode' : 'Switch to Bright Mode'}
        className={`p-1.5 rounded-xl transition-all cursor-pointer ${
          isLight
            ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs'
            : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 shadow-xs'
        } ${className}`}
      >
        {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
      </button>
    );
  }

  // Segmented Pill Control: Crystal-clear dual buttons for judges and users
  return (
    <div 
      className={`inline-flex items-center p-0.5 rounded-xl transition-all select-none ${
        isLight 
          ? 'bg-slate-200/80 border border-slate-300 shadow-xs' 
          : 'bg-[#050814] border border-slate-800 shadow-xs'
      } ${className}`}
      role="group"
      aria-label="Theme mode switcher (Bright / Dark)"
    >
      {/* BRIGHT MODE BUTTON */}
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={isLight}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
          isLight
            ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-300/80 font-extrabold'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
        }`}
        title="Switch to Bright (Light) Mode"
      >
        <Sun className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
        <span className={isLight ? 'text-slate-900' : 'text-slate-400'}>Bright</span>
      </button>

      {/* DARK MODE BUTTON */}
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={!isLight}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
          !isLight
            ? 'bg-slate-800 text-white shadow-xs ring-1 ring-slate-700 font-extrabold'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`}
        title="Switch to Dark Mode"
      >
        <Moon className={`w-3.5 h-3.5 shrink-0 ${!isLight ? 'text-rose-400 fill-rose-400/20' : 'text-slate-500'}`} />
        <span className={!isLight ? 'text-white' : 'text-slate-600'}>Dark</span>
      </button>
    </div>
  );
};
