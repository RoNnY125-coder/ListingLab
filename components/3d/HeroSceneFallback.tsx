import React from "react";

export const HeroSceneFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <div className="relative w-[500px] h-[500px] sm:w-[680px] sm:h-[680px]">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange/20 via-orange/10 to-transparent blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-surface-raised/40 blur-[80px] border border-orange/10" />
      </div>
    </div>
  );
};