import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  className?: string;
}

export const MidoragLogo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const iconSize = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    hero: 'w-20 h-20 md:w-24 md:h-24',
  }[size];

  const textClass = {
    sm: 'text-lg font-bold tracking-tight',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl font-bold tracking-tight',
    hero: 'text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight',
  }[size];

  const taglineClass = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    hero: 'text-sm md:text-base font-medium tracking-widest mt-1 text-midora-muted uppercase',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Botanical / Tech Symbol */}
      <div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
          <defs>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#166534" />
              <stop offset="45%" stop-color="#228B53" />
              <stop offset="100%" stop-color="#10B981" />
            </linearGradient>
            <linearGradient id="sakuraGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F4A7B9" />
              <stop offset="100%" stop-color="#E87A90" />
            </linearGradient>
            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ECFDF5" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
            </radialGradient>
          </defs>

          {/* Background delicate halo */}
          <circle cx="50" cy="50" r="44" fill="url(#ringGlow)" />

          {/* Thin technical outer concentric ring with degree ticks */}
          <circle cx="50" cy="50" r="45" stroke="#228B53" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="39" stroke="#121614" strokeOpacity="0.12" strokeWidth="0.8" />

          {/* Precision Crosshairs */}
          <line x1="50" y1="2" x2="50" y2="8" stroke="#228B53" strokeWidth="1.2" />
          <line x1="50" y1="92" x2="50" y2="98" stroke="#228B53" strokeWidth="1.2" />
          <line x1="2" y1="50" x2="8" y2="50" stroke="#228B53" strokeWidth="1.2" />
          <line x1="92" y1="50" x2="98" y2="50" stroke="#228B53" strokeWidth="1.2" />

          {/* Intertwined Organic-Circuits: Primary Green Loop */}
          <path
            d="M 50 14 C 70 14, 86 30, 86 50 C 86 63, 78 75, 68 81"
            stroke="url(#leafGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 50 86 C 30 86, 14 70, 14 50 C 14 37, 22 25, 32 19"
            stroke="url(#leafGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Central Leaf Structure with Carbon/Tech Node */}
          <path
            d="M 50 25 C 64 36, 64 64, 50 75 C 36 64, 36 36, 50 25 Z"
            fill="#E8F5EE"
            fillOpacity="0.85"
            stroke="#228B53"
            strokeWidth="2"
          />
          <line x1="50" y1="30" x2="50" y2="70" stroke="#228B53" strokeWidth="1.5" strokeDasharray="2 2" />

          {/* Central Carbon Pulse Node */}
          <circle cx="50" cy="50" r="4.5" fill="#228B53" />
          <circle cx="50" cy="50" r="2" fill="#FFFFFF" />

          {/* Delicate Sakura Petals Accenting the Tech Core */}
          <path
            d="M 64 35 C 72 32, 77 40, 70 46 C 65 44, 62 39, 64 35 Z"
            fill="url(#sakuraGrad2)"
            opacity="0.9"
          />
          <path
            d="M 33 62 C 26 57, 29 49, 36 51 C 38 56, 36 60, 33 62 Z"
            fill="url(#sakuraGrad2)"
            opacity="0.85"
          />
          <circle cx="68" cy="38" r="1" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-display text-midora-dark tracking-wider uppercase ${textClass}`}>
            MIDORAG
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-midora-green inline-block animate-pulse"></span>
        </div>
        {showTagline && (
          <span className={`font-mono text-midora-muted tracking-wider uppercase ${taglineClass}`}>
            Carbon-Aware Resource Orchestration
          </span>
        )}
      </div>
    </div>
  );
};
