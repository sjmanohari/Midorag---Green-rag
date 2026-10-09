
import React from 'react';

interface BotanicalDecorationsProps {
  variant?: 'full' | 'subtle';
}

export const BotanicalDecorations: React.FC<BotanicalDecorationsProps> = ({
  variant = 'full',
}) => {
  const full = variant === 'full';

  return (
    <div className="pointer-events-none fixed inset-0 z-[10] overflow-hidden">
      {/* Hanging green leaves — upper left */}
      <img
        src="/images/midorag-green-leaves.png"
        alt=""
        aria-hidden="true"
        className={`absolute left-0 top-20 sm:top-16
  w-80 sm:w-[28rem] md:w-[36rem] h-auto
  object-contain object-left-top
  mix-blend-multiply
  ${full ? 'opacity-100' : 'opacity-40'}`}

      />

      {/* Sakura tree — upper right */}
      <img
        src="/images/midorag-sakura.png"
        alt=""
        aria-hidden="true"
        className={`absolute right-0 top-24 sm:top-20
  w-[28rem] sm:w-[38rem] md:w-[48rem] lg:w-[56rem] h-auto
  object-contain object-right-top
  mix-blend-multiply
  ${full ? 'opacity-100' : 'opacity-40'}`}




      />
    </div>
  );
};