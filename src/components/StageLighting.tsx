"use client";

import React from "react";

interface StageLightingProps {
  tiltX?: number;
  tiltY?: number;
}

export default function StageLighting({ tiltX = 0, tiltY = 0 }: StageLightingProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Center overhead spotlight beam with optical parallax */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-200 h-full opacity-65 mix-blend-screen pointer-events-none transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translateX(calc(-50% + ${tiltX * 85}px)) scale(${1 + tiltY * 0.08}) rotate(${tiltX * 4}deg)`,
          transformOrigin: "top center",
          background: "radial-gradient(ellipse 65% 100% at 50% 0%, rgba(255, 230, 180, 0.5) 0%, rgba(255, 200, 120, 0.18) 50%, transparent 80%)"
        }}
      />
      {/* Floor footlights glow */}
      <div 
        className="absolute bottom-0 left-0 w-full h-40 opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255, 220, 150, 0.25) 0%, transparent 75%)"
        }}
      />
      {/* Vignette border darkness */}
      <div 
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
}
