"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface PolaroidCardProps {
  initialImage?: string;
  altText?: string;
}

const PHOTOS = [
  {
    src: "/images/birthday-roses.png",
    caption: "Forever & Always 🌹",
  },
  {
    src: "/images/m3.jpeg",
    caption: "Our Sweet Moments 💕",
  },
  {
    src: "/images/m2.jpeg",
    caption: "My Happiest Days ✨",
  },
  {
    src: "/images/m1.jpeg",
    caption: "With All My Heart 💖",
  },
];

export default function PolaroidCard({ initialImage }: PolaroidCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const togglePhoto = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipping) return;
    setIsFlipping(true);

    // Mini heart burst from click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 18,
      spread: 60,
      origin: { x, y },
      colors: ["#f43f5e", "#fbbf24", "#f472b6"],
      startVelocity: 18,
      gravity: 0.9,
      scalar: 0.85,
    });

    setTimeout(() => {
      setPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
      setIsFlipping(false);
    }, 180);
  };

  const current = PHOTOS[photoIndex];

  return (
    <div
      onClick={togglePhoto}
      title="Click to see next memory"
      className="group cursor-pointer select-none relative inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      {/* Decorative cute tape piece at top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-200/80 backdrop-blur-xs border border-amber-300/60 -rotate-3 shadow-xs z-20 rounded-xs pointer-events-none" />

      {/* Polaroid Frame */}
      <div
        className={`bg-white p-2.5 sm:p-3 pb-3 sm:pb-4 rounded-md shadow-[0_14px_30px_rgba(0,0,0,0.25)] border border-neutral-200/90 transition-all duration-300 ${
          isFlipping ? "scale-90 rotate-4 opacity-50" : "rotate-[-1.5deg]"
        }`}
      >
        {/* Photo Container */}
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 overflow-hidden rounded-xs bg-neutral-100 shadow-inner">
          <Image
            key={current.src}
            src={initialImage || current.src}
            alt="Birthday memory"
            fill
            sizes="(max-width: 640px) 144px, 192px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          {/* Subtle photo gloss */}
          <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 via-transparent to-white/20 pointer-events-none" />
        </div>

        {/* Caption and Photo Dots */}
        <div className="mt-2 text-center flex flex-col items-center justify-center gap-1">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-neutral-800 tracking-wide font-sans">
              {current.caption}
            </span>
            <span className="text-[10px] text-rose-400 font-semibold">
              (tap 💖)
            </span>
          </div>

          {/* Photo Dots Indicator */}
          <div className="flex items-center gap-1 mt-0.5">
            {PHOTOS.map((_, idx) => (
              <span
                key={idx}
                className={`transition-all duration-300 rounded-full ${
                  idx === photoIndex
                    ? "w-2 h-2 bg-rose-500"
                    : "w-1.5 h-1.5 bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
