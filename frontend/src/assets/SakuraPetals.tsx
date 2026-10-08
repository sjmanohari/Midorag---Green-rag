import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number; // percentage (0-100)
  size: number; // pixels
  duration: number; // seconds
  delay: number; // seconds
  driftX: number; // horizontal drift px
  rotStart: number; // deg
  rotEnd: number; // deg
  color: string;
  opacity: number;
}

export const SakuraPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Check if mobile screen
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 14 : 26;

    const colors = [
      '#F4A7B9', // sakura classic
      '#FFB7C5', // soft blush
      '#FFCAD4', // pale pink
      '#FDE2E4', // pastel white-pink
      '#E87A90', // deeper pink
    ];

    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 98,
      size: Math.floor(Math.random() * 8) + 11, // 11px - 18px
      duration: Math.random() * 8 + 10, // 10s - 18s smooth slow fall
      delay: -(Math.random() * 15), // stagger immediately across page
      driftX: (Math.random() - 0.3) * 120, // gentle wind drift to the right
      rotStart: Math.floor(Math.random() * 360),
      rotEnd: Math.floor(Math.random() * 360) + 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.4 + 0.45, // 0.45 to 0.85 opacity
    }));

    setPetals(generated);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-20 select-none"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="falling-petal"
          style={
            {
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              opacity: petal.opacity,
              '--drift-x': `${petal.driftX}px`,
              '--rot-end': `${petal.rotEnd}deg`,
            } as React.CSSProperties
          }
        >
          {/* Authentic notched 2-curved Sakura petal SVG */}
          <svg
            viewBox="0 0 24 32"
            fill="none"
            className="w-full h-full drop-shadow-sm"
            style={{ transform: `rotate(${petal.rotStart}deg)` }}
          >
            <path
              d="M 12 0 C 14 6, 22 14, 22 22 C 22 28, 16 31, 13.5 29.5 C 12 28.5, 12 28.5, 10.5 29.5 C 8 31, 2 28, 2 22 C 2 14, 10 6, 12 0 Z"
              fill={petal.color}
            />
            {/* Subtle inner vein */}
            <path
              d="M 12 6 C 12 14, 12 22, 12 27"
              stroke="#FFFFFF"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
