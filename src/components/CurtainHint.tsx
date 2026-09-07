"use client";

import React from "react";
import { useCurtain } from "./CurtainContext";

export default function CurtainHint() {
  const { isOpen, openCurtain } = useCurtain();

  if (isOpen) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-25 flex flex-col items-center justify-center select-none transition-opacity duration-500">
      {/* Center callout badge */}
      <div 
        onClick={openCurtain}
        className="pointer-events-auto cursor-pointer flex flex-col items-center gap-2.5 px-5 py-2.5 rounded-full bg-neutral-950/80 hover:bg-neutral-900 border border-amber-400/60 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-amber-200 transition-all duration-300 hover:scale-105 active:scale-95 animate-bounce"
      >
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg animate-pulse">🎁</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-amber-300">
            Pull the golden rope to open
          </span>
          <span className="text-base sm:text-lg animate-pulse">✨</span>
        </div>
      </div>

      {/* Floating directional arrow pointing to the rope on the right */}
      <div className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 flex items-center gap-2 text-amber-300 drop-shadow-md animate-pulse pointer-events-none">
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest bg-black/60 px-2.5 py-1 rounded-full border border-amber-400/40">
          Pull Here
        </span>
        <span className="text-2xl sm:text-3xl animate-bounce">👉</span>
      </div>
    </div>
  );
}
