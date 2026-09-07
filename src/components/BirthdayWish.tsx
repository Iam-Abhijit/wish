"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCurtain } from "./CurtainContext";
import PolaroidCard from "./PolaroidCard";

export default function BirthdayWish() {
  const { isOpen } = useCurtain();
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const loveNoteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isOpen) {
        const tl = gsap.timeline({ delay: 0.25 });

        // 1. Polaroid photo pops in with playful spring rotation
        tl.fromTo(
          photoRef.current,
          { scale: 0.4, opacity: 0, y: -20, rotation: -12 },
          { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "back.out(1.8)" }
        )

        // 2. Love badge pops into view
        .fromTo(
          badgeRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
          "-=0.4"
        )

        // 3. Happy Birthday Title rises up with golden shine
        .fromTo(
          titleRef.current,
          { y: 25, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )

        // 4. Romantic message fades in
        .fromTo(
          messageRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )

        // 5. Love note sign-off fades in
        .fromTo(
          loveNoteRef.current,
          { y: 15, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)" },
          "-=0.3"
        )

        // 6. Celebration floating hearts and sparkles pop out
        .fromTo(
          ".sparkle-item",
          { scale: 0, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "back.out(2)" },
          "-=0.5"
        );

        // Gentle floating animation on title
        gsap.to(titleRef.current, {
          y: -4,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });

        // Floating hearts & sparkles
        gsap.to(".sparkle-item", {
          y: "-=6",
          rotation: 10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          stagger: 0.15,
          ease: "sine.inOut",
          delay: 1.2,
        });
      } else {
        // Reset when curtain is closed
        gsap.to(
          [
            photoRef.current,
            badgeRef.current,
            titleRef.current,
            messageRef.current,
            loveNoteRef.current,
            ".sparkle-item",
          ],
          {
            opacity: 0,
            y: 15,
            duration: 0.35,
            ease: "power2.in",
          }
        );
      }
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full max-w-82.5 min-[380px]:max-w-90 sm:max-w-md md:max-w-lg flex flex-col items-center justify-center relative z-10 px-3.5 py-3.5 sm:px-6 sm:py-5 rounded-3xl bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border border-white/90 dark:border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.14)] select-text text-center transition-all duration-300"
    >
      {/* Interactive Polaroid Photo Card */}
      <div ref={photoRef} className="opacity-0 mb-2 sm:mb-2.5 filter drop-shadow-md">
        <PolaroidCard />
      </div>

      {/* Love badge */}
      <div
        ref={badgeRef}
        className="opacity-0 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/35 text-rose-500 text-[10px] min-[380px]:text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-xs mb-1.5 sm:mb-2"
      >
        To My Favorite Person ❤️
      </div>

      {/* Animated Title with Warm Golden Rose Gradient */}
      <div className="relative flex items-center justify-center w-full my-0.5 sm:my-1">
        {/* Floating hearts and sparkles */}
        <span className="sparkle-item opacity-0 absolute -top-3.5 -left-1 sm:-left-3 text-lg sm:text-2xl pointer-events-none select-none">
          💖
        </span>
        <span className="sparkle-item opacity-0 absolute -top-3.5 -right-1 sm:-right-3 text-lg sm:text-2xl pointer-events-none select-none">
          ✨
        </span>

        <h1
          ref={titleRef}
          className="opacity-0 text-xl min-[380px]:text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-snug drop-shadow-xs text-center bg-linear-to-r from-amber-600 via-rose-500 to-amber-600 bg-clip-text text-transparent px-2"
        >
          Happy Birthday, My Love!
        </h1>
      </div>

      {/* Heartfelt Birthday Message */}
      <div className="relative mt-1 sm:mt-1.5 w-full flex flex-col items-center gap-2 sm:gap-2.5">
        <span className="sparkle-item opacity-0 absolute -bottom-1 -left-1 sm:left-1 text-base sm:text-xl pointer-events-none select-none">
          🌹
        </span>
        <span className="sparkle-item opacity-0 absolute -bottom-1 -right-1 sm:right-1 text-base sm:text-xl pointer-events-none select-none">
          💕
        </span>

        <p
          ref={messageRef}
          className="opacity-0 text-xs min-[380px]:text-sm sm:text-base text-foreground/90 font-medium leading-relaxed max-w-70 min-[380px]:max-w-xs sm:max-w-md px-2"
        >
          Thank you for bringing so much happiness, warmth, and laughter into my life. Every day with you is special, but today is all about celebrating you!
        </p>

        {/* Romantic sign-off */}
        <div
          ref={loveNoteRef}
          className="opacity-0 mt-0.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-linear-to-r from-amber-500/15 via-rose-500/15 to-amber-500/15 border border-amber-400/35 text-[11px] min-[380px]:text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 shadow-xs"
        >
          I hope all your wishes come true. I love you! ❤️
        </div>
      </div>
    </div>
  );
}
