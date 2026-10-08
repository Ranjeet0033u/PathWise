import React from 'react';
import { usePrism } from '../context/PrismContext';

interface PathWiseSymbolProps {
  className?: string;
  size?: number;
}

/**
 * PathWise / PathWay Symbol:
 * The signature dynamic ascending arrow and ribbon symbol from PathWise,
 * rendered with 100% crisp vector geometry optimized for BOTH bright and dark modes.
 */
export const PathWiseSymbol: React.FC<PathWiseSymbolProps> = ({ 
  className = 'w-9 h-9',
  size 
}) => {
  const { theme } = usePrism();
  const isLight = theme === 'light';
  const sizeStyle = size ? { width: size, height: size } : undefined;

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-visible drop-shadow-sm ${className}`}
      style={sizeStyle}
    >
      <defs>
        <linearGradient id="symOrbit" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isLight ? '#881337' : '#be123c'} stopOpacity={isLight ? '0.4' : '0.2'} />
          <stop offset="50%" stopColor="#be123c" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="symRibbon" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor={isLight ? '#f43f5e' : '#fb7185'} />
          <stop offset="50%" stopColor="#be123c" />
          <stop offset="100%" stopColor={isLight ? '#700b2b' : '#881337'} />
        </linearGradient>

        <linearGradient id="symArrow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#be123c" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="100%" stopColor={isLight ? '#ea580c' : '#fb923c'} />
        </linearGradient>

        <linearGradient id="symSheen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="symOrb" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="35%" stopColor="#f43f5e" />
          <stop offset="80%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#4c0519" />
        </radialGradient>
      </defs>

      {/* Orbital Base Loop */}
      <path
        d="M 12 70 C 12 84 28 92 50 92 C 74 92 90 83 93 72 C 94 67 90 64 86 65 C 79 72 65 78 50 78 C 30 78 20 71 20 65 C 20 60 27 55 38 52 C 40 51 40 48 37 47 C 23 52 12 60 12 70 Z"
        fill="url(#symOrbit)"
        stroke={isLight ? '#9f1239' : '#e11d48'}
        strokeWidth={isLight ? '0.75' : '0.5'}
      />

      {/* Orbital Speed Notch */}
      <path
        d="M 28 77 C 38 83 58 85 75 78"
        stroke="#ffffff"
        strokeWidth={isLight ? '1.8' : '1.5'}
        strokeLinecap="round"
        strokeOpacity={isLight ? '0.9' : '0.75'}
      />

      {/* 3D Faceted Ribbon Loop */}
      <path
        d="M 24 44 C 30 30 43 30 48 44 L 52 56 C 55 64 58 68 63 66 C 67 64 68 58 67 51 L 65 42 C 64 36 69 32 73 35 C 77 38 78 44 79 50 L 80 62 C 81 72 74 80 64 80 C 52 80 46 71 42 60 L 38 49 C 35 41 29 39 25 46 C 22 51 21 60 26 66 C 28 68 27 71 24 71 C 20 71 18 66 18 61 C 18 52 20 48 24 44 Z"
        fill="url(#symRibbon)"
        stroke={isLight ? '#700b2b' : '#9f1239'}
        strokeWidth={isLight ? '0.85' : '0.5'}
      />

      {/* Ribbon Shadow */}
      <path
        d="M 42 60 C 46 71 52 80 64 80 C 70 80 75 76 77 71 C 72 75 65 75 60 70 C 56 66 52 59 50 49 L 42 60 Z"
        fill={isLight ? '#580820' : '#4c0519'}
        opacity="0.9"
      />

      {/* Ascending Vector Arrow Wing */}
      <path
        d="M 48 74 C 55 68 62 57 69 43 L 83 18 C 84 16 86 16 87 19 L 89 23 C 86 31 82 45 77 57 C 72 70 65 78 58 80 L 48 74 Z"
        fill="url(#symArrow)"
        stroke={isLight ? '#9f1239' : '#f43f5e'}
        strokeWidth={isLight ? '0.8' : '0.5'}
      />

      {/* Leading Sheen */}
      <path
        d="M 53 71 C 60 62 70 44 81 22"
        stroke="url(#symSheen)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Arrow Head Peak */}
      <path
        d="M 75 21 L 91 10 C 93 9 95 11 94 13 L 88 29 C 87 31 85 31 84 28 L 83 23 L 77 24 C 74 24 73 22 75 21 Z"
        fill={isLight ? '#dc2626' : '#ff4d6d'}
        stroke={isLight ? '#881337' : '#ffffff'}
        strokeWidth={isLight ? '0.75' : '0.6'}
      />

      {/* Navigational Jewel Beacon */}
      <circle
        cx="92"
        cy="36"
        r="7.5"
        fill="url(#symOrb)"
        stroke={isLight ? '#700b2b' : '#ffccd5'}
        strokeWidth={isLight ? '1' : '0.6'}
      />

      <ellipse
        cx="90"
        cy="33.5"
        rx="2.6"
        ry="1.8"
        fill="#ffffff"
        opacity="0.92"
      />
    </svg>
  );
};
