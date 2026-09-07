"use client";

import React from "react";

export default function CurtainValance() {
  return (
    <div className="absolute top-0 left-0 w-full z-30 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)]">
      {/* Upper header bar - compact and sleek on mobile */}
      <div 
        className="w-full h-8 sm:h-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1f0204 0%, #680d12 40%, #8b1118 70%, #47060a 100%)",
          boxShadow: "inset 0 -3px 8px rgba(0,0,0,0.6)"
        }}
      >
        {/* Subtle vertical pleat lines */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 15px, rgba(0,0,0,0.4) 15px, rgba(255,255,255,0.1) 20px, transparent 25px)"
          }}
        />
        {/* Golden upper border */}
        <div className="absolute top-0 left-0 w-full h-0.75 bg-linear-to-r from-amber-600 via-amber-300 to-amber-600 shadow-sm" />
      </div>

      {/* Scalloped Swag Drape Pelmet */}
      <div className="w-full relative -mt-0.5 flex justify-center items-start overflow-hidden h-10 sm:h-16">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full filter drop-shadow-md"
        >
          <defs>
            <linearGradient id="valanceVelvet" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a060a" />
              <stop offset="35%" stopColor="#9b141c" />
              <stop offset="70%" stopColor="#6e0c12" />
              <stop offset="100%" stopColor="#2e0306" />
            </linearGradient>
            <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#926214" />
              <stop offset="25%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="75%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#926214" />
            </linearGradient>
          </defs>

          {/* 5 graceful swags forming the scalloped theater drape */}
          <path
            d="
              M 0,0 
              L 1200,0 
              L 1200,45
              Q 1080,105 960,45
              Q 840,105 720,45
              Q 600,110 480,45
              Q 360,105 240,45
              Q 120,105 0,45
              Z
            "
            fill="url(#valanceVelvet)"
          />

          {/* Golden fringe border following the scalloped edge */}
          <path
            d="
              M 0,45
              Q 120,105 240,45
              Q 360,105 480,45
              Q 600,110 720,45
              Q 840,105 960,45
              Q 1080,105 1200,45
            "
            fill="none"
            stroke="url(#goldTrim)"
            strokeWidth="4"
            strokeDasharray="6 3"
          />
        </svg>
      </div>
    </div>
  );
}
