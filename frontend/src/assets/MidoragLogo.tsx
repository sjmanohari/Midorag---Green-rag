
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
  const width = {
    sm: 'w-28',
    md: 'w-32',
    lg: 'w-44',
    hero: 'w-64 sm:w-80 md:w-[480px]',
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <img
        src="/images/midorag-logo.jpg"
        alt="MIDORAG CO₂"
        className={`${width} max-w-full h-auto object-contain`}
      />
      {showTagline && (
        <span className="mt-2 text-[10px] text-midora-muted tracking-wider uppercase">
          Carbon-Aware Resource Orchestration
        </span>
      )}
    </div>
  );
};
