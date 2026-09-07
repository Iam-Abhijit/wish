"use client";

import React, { useState } from "react";
import Image from "next/image";

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
    caption: "Our Sweet Moments 💕",
  },
  {
    src: "/images/m1.jpeg",
    caption: "Forever & Always 🌹",
  },
];

export default function PolaroidCard({ initialImage }: PolaroidCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const togglePhoto = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
      setIsFlipping(false);
    }, 180);
  };

  const current = PHOTOS[photoIndex];

  return (
    <div
      onClick={togglePhoto}
      title="Click to flip photo"
      className="group cursor-pointer select-none relative inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      {/* Decorative cute tape piece at top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-200/75 backdrop-blur-xs border border-amber-300/60 -rotate-3 shadow-xs z-20 rounded-xs pointer-events-none" />

      {/* Polaroid Frame */}
      <div
        className={`bg-white p-2.5 sm:p-3 pb-3 sm:pb-4 rounded-md shadow-[0_12px_28px_rgba(0,0,0,0.22)] border border-neutral-200/80 transition-all duration-300 ${isFlipping ? "scale-90 rotate-3 opacity-60" : "rotate-[-1.5deg]"
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
          {/* Subtle warm photo gloss overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 via-transparent to-white/20 pointer-events-none" />
        </div>

        {/* Handwritten Polaroid Caption */}
        <div className="mt-2 text-center flex items-center justify-center gap-1">
          <span className="text-xs sm:text-sm font-bold text-neutral-800 tracking-wide font-sans">
            {current.caption}
          </span>
          <span className="text-[10px] text-neutral-400 font-medium ml-1">
            (tap to flip)
          </span>
        </div>
      </div>
    </div>
  );
}
