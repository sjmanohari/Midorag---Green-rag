import React from 'react';

export const BotanicalDecorations: React.FC<{ variant?: 'full' | 'subtle' }> = ({
  variant = 'full',
}) => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10 select-none">
      {/* ========================================================
          TOP-LEFT: Green Botanical Branch with Delicate Leaves
          ======================================================== */}
      <div className="absolute -top-6 -left-6 md:-top-4 md:-left-4 w-48 h-48 md:w-80 md:h-80 opacity-75 md:opacity-85 transition-opacity">
        <svg viewBox="0 0 320 320" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1B4332" />
              <stop offset="60%" stop-color="#2D6A4F" />
              <stop offset="100%" stop-color="#40916C" />
            </linearGradient>
            <linearGradient id="leafGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2D6A4F" />
              <stop offset="50%" stop-color="#52B788" />
              <stop offset="100%" stop-color="#74C69D" />
            </linearGradient>
            <linearGradient id="accentPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F4A7B9" />
              <stop offset="100%" stop-color="#FFE4E6" />
            </linearGradient>
          </defs>

          {/* Thin technical arc lines */}
          <circle cx="20" cy="20" r="140" stroke="#2D6A4F" strokeOpacity="0.1" strokeDasharray="4 6" strokeWidth="1" />
          <circle cx="20" cy="20" r="220" stroke="#2D6A4F" strokeOpacity="0.08" strokeDasharray="3 7" strokeWidth="1" />

          {/* Main Stem */}
          <path
            d="M -10 10 C 60 40, 120 70, 180 140 C 220 190, 240 240, 260 300"
            stroke="url(#stemGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Secondary shoots */}
          <path
            d="M 80 50 C 130 55, 170 30, 210 15"
            stroke="url(#stemGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 140 100 C 190 120, 220 110, 250 90"
            stroke="url(#stemGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 180 145 C 190 200, 170 230, 150 260"
            stroke="url(#stemGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Leaves along upper shoot */}
          <path
            d="M 120 46 C 145 35, 165 42, 170 50 C 160 62, 135 60, 120 46 Z"
            fill="url(#leafGradLeft)"
            opacity="0.9"
          />
          <path
            d="M 175 25 C 200 12, 218 20, 222 28 C 210 38, 190 35, 175 25 Z"
            fill="url(#leafGradLeft)"
            opacity="0.85"
          />

          {/* Leaves along mid branch */}
          <path
            d="M 70 42 C 55 20, 75 10, 90 20 C 95 32, 85 45, 70 42 Z"
            fill="url(#leafGradLeft)"
            opacity="0.85"
          />
          <path
            d="M 130 92 C 155 75, 180 82, 182 92 C 170 105, 145 105, 130 92 Z"
            fill="url(#leafGradLeft)"
            opacity="0.9"
          />
          <path
            d="M 185 116 C 215 105, 235 115, 240 125 C 225 138, 200 132, 185 116 Z"
            fill="url(#leafGradLeft)"
            opacity="0.88"
          />

          {/* Drooping lower leaves */}
          <path
            d="M 178 180 C 160 205, 145 220, 135 220 C 145 200, 165 185, 178 180 Z"
            fill="url(#leafGradLeft)"
            opacity="0.8"
          />
          <path
            d="M 215 185 C 245 190, 260 210, 260 220 C 240 225, 225 210, 215 185 Z"
            fill="url(#leafGradLeft)"
            opacity="0.9"
          />

          {/* Tiny blush bud / petal accent */}
          <circle cx="212" cy="15" r="3.5" fill="url(#accentPinkGrad)" opacity="0.9" />
          <circle cx="250" cy="88" r="4" fill="url(#accentPinkGrad)" opacity="0.95" />
          <circle cx="265" cy="305" r="3" fill="#52B788" opacity="0.7" />
        </svg>
      </div>

      {/* ========================================================
          TOP-RIGHT: Sakura Cherry Blossom Branch with Pink Flowers
          ======================================================== */}
      <div className="absolute -top-6 -right-6 md:-top-4 md:-right-4 w-52 h-52 md:w-96 md:h-96 opacity-80 md:opacity-95 transition-opacity">
        <svg viewBox="0 0 360 360" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="sakuraWood" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3D2B1F" />
              <stop offset="70%" stop-color="#5C3D2E" />
              <stop offset="100%" stop-color="#7B503E" />
            </linearGradient>
            <linearGradient id="sakuraPetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF5F7" />
              <stop offset="50%" stop-color="#F4A7B9" />
              <stop offset="100%" stop-color="#E87A90" />
            </linearGradient>
            <linearGradient id="sakuraPetalSoft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="70%" stop-color="#FFCAD4" />
              <stop offset="100%" stop-color="#F4A7B9" />
            </linearGradient>
            <radialGradient id="flowerCenter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#D90429" />
              <stop offset="60%" stop-color="#E87A90" />
              <stop offset="100%" stop-color="#F4A7B9" stop-opacity="0.3" />
            </radialGradient>
          </defs>

          {/* Delicate Technical framing ring */}
          <circle cx="340" cy="20" r="160" stroke="#F4A7B9" strokeOpacity="0.12" strokeDasharray="3 5" strokeWidth="1" />
          <circle cx="340" cy="20" r="240" stroke="#F4A7B9" strokeOpacity="0.08" strokeDasharray="2 6" strokeWidth="1" />

          {/* Wood Branch */}
          <path
            d="M 370 20 C 310 30, 240 70, 180 130 C 140 170, 110 220, 80 280"
            stroke="url(#sakuraWood)"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          <path
            d="M 270 50 C 220 50, 170 35, 130 10"
            stroke="url(#sakuraWood)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 215 105 C 170 120, 130 115, 90 95"
            stroke="url(#sakuraWood)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 150 160 C 120 200, 80 230, 40 250"
            stroke="url(#sakuraWood)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Little green leaves on sakura twig */}
          <path
            d="M 125 15 C 105 18, 100 28, 105 32 C 115 32, 125 24, 125 15 Z"
            fill="#52B788"
            opacity="0.85"
          />
          <path
            d="M 85 92 C 70 85, 62 92, 65 98 C 75 102, 85 98, 85 92 Z"
            fill="#52B788"
            opacity="0.8"
          />

          {/* FLOWER 1 (Large Blossom, near x=200, y=110) */}
          <g transform="translate(200, 115)">
            <ellipse cx="0" cy="-14" rx="8" ry="12" fill="url(#sakuraPetalSoft)" />
            <ellipse cx="13" cy="-4" rx="12" ry="8" fill="url(#sakuraPetalSoft)" />
            <ellipse cx="8" cy="12" rx="9" ry="12" fill="url(#sakuraPetalSoft)" />
            <ellipse cx="-8" cy="12" rx="9" ry="12" fill="url(#sakuraPetalSoft)" />
            <ellipse cx="-13" cy="-4" rx="12" ry="8" fill="url(#sakuraPetalSoft)" />
            <circle cx="0" cy="0" r="4.5" fill="url(#flowerCenter)" />
            {/* Pistils */}
            <circle cx="2" cy="-2" r="0.9" fill="#FFCCD5" />
            <circle cx="-2" cy="2" r="0.9" fill="#FFCCD5" />
            <circle cx="-2" cy="-2" r="0.9" fill="#FFCCD5" />
          </g>

          {/* FLOWER 2 (Medium Blossom, near x=135, y=12) */}
          <g transform="translate(132, 18) scale(0.85)">
            <ellipse cx="0" cy="-14" rx="8" ry="12" fill="url(#sakuraPetal)" />
            <ellipse cx="13" cy="-4" rx="12" ry="8" fill="url(#sakuraPetal)" />
            <ellipse cx="8" cy="12" rx="9" ry="12" fill="url(#sakuraPetal)" />
            <ellipse cx="-8" cy="12" rx="9" ry="12" fill="url(#sakuraPetal)" />
            <ellipse cx="-13" cy="-4" rx="12" ry="8" fill="url(#sakuraPetal)" />
            <circle cx="0" cy="0" r="4" fill="url(#flowerCenter)" />
          </g>

          {/* FLOWER 3 (Side Blooming Blossom, near x=140, y=175) */}
          <g transform="translate(142, 178) scale(0.75) rotate(-25)">
            <ellipse cx="0" cy="-14" rx="8" ry="12" fill="url(#sakuraPetalSoft)" />
            <ellipse cx="13" cy="-4" rx="12" ry="8" fill="url(#sakuraPetalSoft)" />
            <ellipse cx="8" cy="12" rx="9" ry="12" fill="url(#sakuraPetalSoft)" />
            <ellipse cx="-8" cy="12" rx="9" ry="12" fill="url(#sakuraPetalSoft)" />
            <ellipse cx="-13" cy="-4" rx="12" ry="8" fill="url(#sakuraPetalSoft)" />
            <circle cx="0" cy="0" r="4" fill="url(#flowerCenter)" />
          </g>

          {/* FLOWER 4 (Near x=90, y=95) */}
          <g transform="translate(90, 95) scale(0.7) rotate(40)">
            <ellipse cx="0" cy="-14" rx="8" ry="12" fill="url(#sakuraPetal)" />
            <ellipse cx="13" cy="-4" rx="12" ry="8" fill="url(#sakuraPetal)" />
            <ellipse cx="8" cy="12" rx="9" ry="12" fill="url(#sakuraPetal)" />
            <ellipse cx="-8" cy="12" rx="9" ry="12" fill="url(#sakuraPetal)" />
            <ellipse cx="-13" cy="-4" rx="12" ry="8" fill="url(#sakuraPetal)" />
            <circle cx="0" cy="0" r="3.5" fill="url(#flowerCenter)" />
          </g>

          {/* Falling Bud and Petals drifting */}
          <path
            d="M 50 255 C 40 248, 42 238, 52 242 C 58 248, 56 254, 50 255 Z"
            fill="url(#sakuraPetal)"
            opacity="0.9"
          />
          <path
            d="M 78 285 C 68 280, 72 270, 80 274 C 84 279, 82 284, 78 285 Z"
            fill="url(#sakuraPetalSoft)"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* ========================================================
          BOTTOM: Subtle botanical & cherry blossom accents along edge
          ======================================================== */}
      {variant === 'full' && (
        <div className="absolute -bottom-8 left-0 right-0 h-24 flex justify-between items-end px-4 md:px-12 opacity-60">
          {/* Bottom Left Subtle Petal Sprig */}
          <svg width="180" height="70" viewBox="0 0 180 70" fill="none">
            <path d="M 0 60 C 40 55, 90 45, 140 20" stroke="#2D6A4F" strokeWidth="1.2" opacity="0.4" />
            <path d="M 60 52 C 75 42, 85 46, 82 55 C 75 60, 65 58, 60 52 Z" fill="#52B788" opacity="0.4" />
            <ellipse cx="110" cy="30" rx="8" ry="5" fill="#F4A7B9" opacity="0.6" transform="rotate(-15 110 30)" />
            <ellipse cx="130" cy="22" rx="7" ry="4" fill="#FFCAD4" opacity="0.5" transform="rotate(20 130 22)" />
          </svg>

          {/* Bottom Right Delicate Sakura Flower Group */}
          <svg width="200" height="70" viewBox="0 0 200 70" fill="none">
            <path d="M 200 65 C 160 55, 120 45, 70 25" stroke="#7B503E" strokeWidth="1.2" opacity="0.4" />
            <g transform="translate(130, 42) scale(0.6)">
              <ellipse cx="0" cy="-12" rx="7" ry="10" fill="#F4A7B9" opacity="0.75" />
              <ellipse cx="11" cy="-3" rx="10" ry="7" fill="#F4A7B9" opacity="0.75" />
              <ellipse cx="7" cy="10" rx="7" ry="10" fill="#F4A7B9" opacity="0.75" />
              <ellipse cx="-7" cy="10" rx="7" ry="10" fill="#F4A7B9" opacity="0.75" />
              <ellipse cx="-11" cy="-3" rx="10" ry="7" fill="#F4A7B9" opacity="0.75" />
              <circle cx="0" cy="0" r="3.5" fill="#E87A90" />
            </g>
            <ellipse cx="85" cy="30" rx="6" ry="4" fill="#F4A7B9" opacity="0.5" transform="rotate(-30 85 30)" />
            <ellipse cx="50" cy="22" rx="7" ry="5" fill="#FFCAD4" opacity="0.5" transform="rotate(10 50 22)" />
          </svg>
        </div>
      )}
    </div>
  );
};
