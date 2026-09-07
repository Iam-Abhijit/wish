"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface PolaroidCardProps {
  initialImage?: string;
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
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const fireMiniConfetti = (e?: React.MouseEvent | React.TouchEvent) => {
    let x = 0.5;
    let y = 0.32;
    if (e && "clientX" in e && e.clientX) {
      x = e.clientX / window.innerWidth;
      y = e.clientY / window.innerHeight;
    }

    confetti({
      particleCount: 18,
      spread: 50,
      origin: { x, y },
      colors: ["#f43f5e", "#fbbf24", "#f472b6", "#fda4af"],
      startVelocity: 15,
      gravity: 0.9,
      scalar: 0.75,
    });
  };

  const goToPhoto = (index: number, e?: React.MouseEvent | React.TouchEvent) => {
    if (isFlipping || index === photoIndex) return;
    setIsFlipping(true);
    fireMiniConfetti(e);

    setTimeout(() => {
      setPhotoIndex(index);
      setIsFlipping(false);
    }, 150);
  };

  const nextPhoto = (e?: React.MouseEvent | React.TouchEvent) => {
    if (isFlipping) return;
    setIsFlipping(true);
    fireMiniConfetti(e);

    setTimeout(() => {
      setPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
      setIsFlipping(false);
    }, 150);
  };

  const prevPhoto = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (isFlipping) return;
    setIsFlipping(true);
    fireMiniConfetti(e);

    setTimeout(() => {
      setPhotoIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
      setIsFlipping(false);
    }, 150);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX.current;
    const diffY = touchEndY - touchStartY.current;

    // Trigger on horizontal swipe (ignore vertical scrolling)
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextPhoto(e);
      } else {
        prevPhoto(e);
      }
    }
  };

  const current = PHOTOS[photoIndex];

  return (
    <div
      onClick={nextPhoto}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      title="Tap or swipe to see next photo"
      className="group cursor-pointer select-none relative inline-block transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] touch-manipulation pt-2"
    >
      {/* Decorative cute washi tape / tab piece at top - clearly visible */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-5.5 bg-amber-300/95 dark:bg-amber-400/95 text-amber-900/80 border border-amber-400 -rotate-2 shadow-md z-20 rounded-xs pointer-events-none flex items-center justify-center text-[10px] font-bold tracking-widest select-none">
        ♥ ♥ ♥
      </div>

      {/* Polaroid Frame */}
      <div
        className={`bg-white p-2.5 sm:p-3 pb-3 sm:pb-3.5 rounded-xl shadow-[0_14px_35px_rgba(0,0,0,0.18)] border border-neutral-200/80 transition-all duration-200 ${
          isFlipping ? "scale-95 rotate-2 opacity-50" : "rotate-[-0.5deg]"
        }`}
      >
        {/* Photo Container - Enlarged & clear on mobile */}
        <div className="relative w-44 h-44 min-[380px]:w-52 min-[380px]:h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 overflow-hidden rounded-md bg-neutral-100 shadow-inner">
          <Image
            key={current.src}
            src={initialImage || current.src}
            alt="Birthday memory"
            fill
            sizes="(max-width: 480px) 208px, (max-width: 640px) 240px, 256px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />

          {/* Subtle warm photo gloss overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 via-transparent to-white/20 pointer-events-none" />

          {/* Counter pill at top right */}
          <div className="absolute top-2 right-2 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[11px] sm:text-xs font-semibold text-white/95 shadow-sm pointer-events-none flex items-center gap-1">
            <span>{photoIndex + 1}/{PHOTOS.length}</span>
            <span className="text-rose-400">♥</span>
          </div>

          {/* Left arrow affordance */}
          <button
            type="button"
            onClick={prevPhoto}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/75 active:scale-90 text-white flex items-center justify-center text-base sm:text-lg font-bold transition-all shadow-md z-10 cursor-pointer"
            title="Previous Photo"
            aria-label="Previous Photo"
          >
            ‹
          </button>

          {/* Right arrow affordance */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto(e);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/75 active:scale-90 text-white flex items-center justify-center text-base sm:text-lg font-bold transition-all shadow-md z-10 cursor-pointer"
            title="Next Photo"
            aria-label="Next Photo"
          >
            ›
          </button>
        </div>

        {/* Caption and Photo Tabs */}
        <div className="mt-2 text-center flex flex-col items-center justify-center gap-1.5">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-neutral-800 tracking-wide">
              {current.caption}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-500 font-semibold">
              (tap 💖)
            </span>
          </div>

          {/* Photo navigation tabs */}
          <div className="flex items-center justify-center gap-1.5">
            {PHOTOS.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPhoto(idx, e);
                }}
                className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  idx === photoIndex
                    ? "bg-rose-500 text-white shadow-xs scale-105"
                    : "bg-neutral-100 hover:bg-rose-100/70 text-neutral-600 hover:text-rose-600"
                }`}
                aria-label={`Photo tab ${idx + 1}`}
              >
                <span>{idx === 0 ? "🌹" : idx === 1 ? "💕" : idx === 2 ? "✨" : "💖"}</span>
                <span>{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
