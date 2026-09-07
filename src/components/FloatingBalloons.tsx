"use client";

import React from "react";
import { useCurtain } from "./CurtainContext";

interface FloatingBalloonsProps {
  tiltX?: number;
}

export default function FloatingBalloons({ tiltX = 0 }: FloatingBalloonsProps) {
  const { isOpen } = useCurtain();

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* Left balloon bundle */}
      <div
        className="absolute left-10 sm:left-20 top-1/4 -translate-y-1/2 flex flex-col items-center transition-transform duration-300 ease-out will-change-transform opacity-85"
        style={{
          transform: `translate(${tiltX * 22}px, -50%)`,
        }}
      >
        <div className="animate-[bounce_3s_ease-in-out_infinite] flex items-center -space-x-2">
          <span className="text-3xl sm:text-4xl drop-shadow-md -rotate-12">🎈</span>
          <span className="text-2xl sm:text-3xl drop-shadow-md rotate-6">🎈</span>
        </div>
      </div>

      {/* Right balloon bundle */}
      <div
        className="absolute right-10 sm:right-20 top-1/3 -translate-y-1/2 flex flex-col items-center transition-transform duration-300 ease-out will-change-transform opacity-85"
        style={{
          transform: `translate(${-tiltX * 22}px, -50%)`,
        }}
      >
        <div className="animate-[bounce_3.4s_ease-in-out_infinite_0.8s] flex items-center -space-x-2">
          <span className="text-2xl sm:text-3xl drop-shadow-md -rotate-6">🎈</span>
          <span className="text-3xl sm:text-4xl drop-shadow-md rotate-12">🎈</span>
        </div>
      </div>
    </div>
  );
}
