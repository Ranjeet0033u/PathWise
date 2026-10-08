import React from 'react';
import { usePrism } from '../context/PrismContext';

interface PathWayBrandLockupProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  showWordmark?: boolean;
  onClick?: () => void;
}

/**
 * PathWay / PathWise Brand Emblem & Lockup
 * High-definition, multi-layered 3D vector model of the ascending pathway ribbon & arrow icon.
 * Engineered for razor-sharp clarity, dimensional depth, and instant recognition in BOTH bright and dark modes.
 */
export const PathWayBrandLockup: React.FC<PathWayBrandLockupProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  showWordmark = true,
  onClick
}) => {
  const { theme } = usePrism();
  const isLight = theme === 'light';

  // Dimension mapping
  const iconDimensions = {
    sm: { w: 32, h: 32, textScale: 'text-lg', subScale: 'text-[9px]' },
    md: { w: 40, h: 40, textScale: 'text-xl', subScale: 'text-[10px]' },
    lg: { w: 52, h: 52, textScale: 'text-2xl', subScale: 'text-xs' }
  }[size];

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none transition-all group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      role={onClick ? 'button' : 'banner'}
      aria-label="PathWay - Evidence-Based Career Navigator"
    >
      {/* 3D VECTOR EMBLEM */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: iconDimensions.w, height: iconDimensions.h }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-md"
          aria-hidden="true"
        >
          <defs>
            {/* Dark Mode Luminous Gradients */}
            <linearGradient id="pwOrbitDark" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#be123c" stopOpacity="0.2" />
              <stop offset="40%" stopColor="#e11d48" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#ff2a6d" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff7043" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="pwRibbonDark" x1="10%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="45%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>

            <linearGradient id="pwArrowDark" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9f1239" />
              <stop offset="40%" stopColor="#e11d48" />
              <stop offset="75%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>

            {/* Bright / Light Mode High-Contrast Carmine & Royal Ruby Gradients */}
            <linearGradient id="pwOrbitLight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#881337" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#be123c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="pwRibbonLight" x1="10%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#700b2b" />
            </linearGradient>

            <linearGradient id="pwArrowLight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#be123c" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            {/* Specular White Sheen */}
            <linearGradient id="pwSheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Glowing Orb Gradient */}
            <radialGradient id="pwOrbGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fecdd3" />
              <stop offset="35%" stopColor="#f43f5e" />
              <stop offset="80%" stopColor="#9f1239" />
              <stop offset="100%" stopColor="#4c0519" />
            </radialGradient>
          </defs>

          {/* LAYER 1: Dynamic Elliptical Orbital Track (Trajectory Path) */}
          <path
            d="M 12 70 C 12 84 28 92 50 92 C 74 92 90 83 93 72 C 94 67 90 64 86 65 C 79 72 65 78 50 78 C 30 78 20 71 20 65 C 20 60 27 55 38 52 C 40 51 40 48 37 47 C 23 52 12 60 12 70 Z"
            fill={isLight ? 'url(#pwOrbitLight)' : 'url(#pwOrbitDark)'}
            stroke={isLight ? '#9f1239' : '#e11d48'}
            strokeWidth={isLight ? '0.75' : '0.5'}
          />

          {/* Orbital Speed Notch Highlights */}
          <path
            d="M 28 77 C 38 83 58 85 75 78"
            stroke="#ffffff"
            strokeWidth={isLight ? '1.8' : '1.5'}
            strokeLinecap="round"
            strokeOpacity={isLight ? '0.9' : '0.75'}
          />

          {/* LAYER 2: 3D Faceted Origami Ribbon Loop (The "P" & "W" Continuum) */}
          <path
            d="M 24 44 C 30 30 43 30 48 44 L 52 56 C 55 64 58 68 63 66 C 67 64 68 58 67 51 L 65 42 C 64 36 69 32 73 35 C 77 38 78 44 79 50 L 80 62 C 81 72 74 80 64 80 C 52 80 46 71 42 60 L 38 49 C 35 41 29 39 25 46 C 22 51 21 60 26 66 C 28 68 27 71 24 71 C 20 71 18 66 18 61 C 18 52 20 48 24 44 Z"
            fill={isLight ? 'url(#pwRibbonLight)' : 'url(#pwRibbonDark)'}
            stroke={isLight ? '#700b2b' : '#9f1239'}
            strokeWidth={isLight ? '0.85' : '0.5'}
          />

          {/* Inner Fold 3D Ambient Shadow */}
          <path
            d="M 42 60 C 46 71 52 80 64 80 C 70 80 75 76 77 71 C 72 75 65 75 60 70 C 56 66 52 59 50 49 L 42 60 Z"
            fill={isLight ? '#580820' : '#4c0519'}
            opacity="0.9"
          />

          {/* LAYER 3: Soaring Aerodynamic Vector Arrow Wing */}
          <path
            d="M 48 74 C 55 68 62 57 69 43 L 83 18 C 84 16 86 16 87 19 L 89 23 C 86 31 82 45 77 57 C 72 70 65 78 58 80 L 48 74 Z"
            fill={isLight ? 'url(#pwArrowLight)' : 'url(#pwArrowDark)'}
            stroke={isLight ? '#9f1239' : '#f43f5e'}
            strokeWidth={isLight ? '0.8' : '0.5'}
          />

          {/* Glossy Leading-Edge Sheen on Arrow Wing */}
          <path
            d="M 53 71 C 60 62 70 44 81 22"
            stroke="url(#pwSheen)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* LAYER 4: High-Velocity Arrow Peak (Direction of Future Mastery) */}
          <path
            d="M 75 21 L 91 10 C 93 9 95 11 94 13 L 88 29 C 87 31 85 31 84 28 L 83 23 L 77 24 C 74 24 73 22 75 21 Z"
            fill={isLight ? '#dc2626' : '#ff4d6d'}
            stroke={isLight ? '#881337' : '#ffffff'}
            strokeWidth={isLight ? '0.75' : '0.6'}
          />

          {/* LAYER 5: Floating Navigational Jewel Beacon (The Student's Focus) */}
          <circle
            cx="92"
            cy="36"
            r="7.5"
            fill="url(#pwOrbGrad)"
            stroke={isLight ? '#700b2b' : '#ffccd5'}
            strokeWidth={isLight ? '1' : '0.6'}
          />

          {/* Glint Highlight on Beacon */}
          <ellipse
            cx="90"
            cy="33.5"
            rx="2.6"
            ry="1.8"
            fill="#ffffff"
            opacity="0.92"
          />
        </svg>
      </div>

      {/* TYPOGRAPHIC WORDMARK */}
      {showWordmark && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            {/* Primary Word: "Path" */}
            <span 
              className={`font-black tracking-tight ${iconDimensions.textScale} transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Path
            </span>

            {/* Suffix: "Wise" / "Way" with vibrant Ruby Gradient */}
            <span 
              className={`font-black tracking-tight ${iconDimensions.textScale} bg-clip-text text-transparent ${
                isLight
                  ? 'bg-gradient-to-r from-rose-700 via-rose-600 to-crimson-600'
                  : 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300'
              }`}
              style={{
                backgroundImage: isLight 
                  ? 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)' 
                  : 'linear-gradient(135deg, #fb7185 0%, #f43f5e 50%, #ff8da1 100%)'
              }}
            >
              Wise
            </span>

            {/* Micro PRISM Navigator Pill Badge */}
            <span 
              className={`ml-1 px-1.5 py-0.5 rounded font-mono font-black tracking-wider uppercase text-[9px] border transition-all ${
                isLight
                  ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                  : 'bg-rose-950/80 text-rose-300 border-rose-800/80 shadow-xs shadow-rose-950/60'
              }`}
            >
              PRISM
            </span>
          </div>

          {showSubtitle && (
            <span 
              className={`mt-1 font-semibold tracking-wide uppercase transition-colors ${iconDimensions.subScale} ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              Career Pathway Navigator
            </span>
          )}
        </div>
      )}
    </div>
  );
};
