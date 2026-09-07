"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

export default function BirthdayCandle() {
  const [isBlown, setIsBlown] = useState(false);

  const playChimeSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.6); // C6

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Ignore audio errors on unsupported browsers
    }
  };

  const handleToggleCandle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isBlown) {
      // Blow out candle
      setIsBlown(true);
      playChimeSound();

      // Fire celebratory stars & confetti
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { x: 0.5, y: 0.72 },
        colors: ["#fbbf24", "#f43f5e", "#a855f7", "#38bdf8"],
        startVelocity: 18,
        gravity: 0.85,
        scalar: 0.8,
      });
    } else {
      // Relight
      setIsBlown(false);
    }
  };

  return (
    <div
      onClick={handleToggleCandle}
      className="cursor-pointer group flex flex-col items-center justify-center mt-1 sm:mt-1.5 transition-transform duration-300 hover:scale-105 active:scale-95 select-none"
      title={isBlown ? "Tap to relight candle" : "Tap to blow candle and make a wish"}
    >
      {/* Candle & Flame Graphics */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Flame with glowing light aura */}
        {!isBlown ? (
          <div className="relative flex flex-col items-center">
            {/* Soft pulsing warm glow */}
            <div className="absolute -top-3 w-8 h-8 rounded-full bg-amber-400/35 blur-md animate-pulse pointer-events-none" />

            {/* Candle flame */}
            <div className="w-3.5 h-5 rounded-full bg-linear-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-[bounce_1.2s_infinite] origin-bottom" />
            
            {/* Candle wick */}
            <div className="w-0.5 h-1.5 bg-neutral-800 -mt-0.5" />
          </div>
        ) : (
          /* Sweet puff of smoke when blown */
          <div className="relative flex flex-col items-center h-6.5 justify-end">
            <span className="text-xs text-neutral-400 animate-fade-out pointer-events-none">
              💨
            </span>
            <div className="w-0.5 h-1.5 bg-neutral-600" />
          </div>
        )}

        {/* Birthday Candle Body (striped festive candle) */}
        <div className="w-2.5 h-7 rounded-t-xs bg-linear-to-b from-rose-300 via-pink-400 to-rose-500 border-x border-t border-rose-300/80 shadow-xs relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,#ffffff_3px,#ffffff_6px)]" />
        </div>

        {/* Mini Cute Cupcake Base */}
        <div className="text-xl sm:text-2xl -mt-1 drop-shadow-xs">
          🧁
        </div>
      </div>

      {/* Interactive prompt button / status */}
      <div className="mt-1 flex items-center gap-1 text-[11px] sm:text-xs font-semibold">
        {!isBlown ? (
          <span className="px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-600 dark:text-amber-300 group-hover:bg-amber-400/25 transition-colors">
            Tap candle to make a wish 🎂
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-500 animate-pulse">
            Your wish is made! Tap to relight ✨
          </span>
        )}
      </div>
    </div>
  );
}
