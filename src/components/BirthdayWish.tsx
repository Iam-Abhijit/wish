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
      className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center justify-center relative z-10 px-4 py-2 select-text text-center"
    >
      {/* Interactive Polaroid Photo Card */}
      <div ref={photoRef} className="opacity-0 mb-3 filter drop-shadow-md">
        <PolaroidCard />
      </div>

      {/* Love badge */}
      <div
        ref={badgeRef}
        className="opacity-0 px-4 py-1 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-500 text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-xs mb-2"
      >
        To My Favorite Person ❤️
      </div>

      {/* Animated Title with Warm Golden Rose Gradient */}
      <div className="relative flex items-center justify-center w-full">
        {/* Floating hearts and sparkles */}
        <span className="sparkle-item opacity-0 absolute -top-5 left-2 sm:-left-4 text-xl sm:text-2xl pointer-events-none select-none">
          💖
        </span>
        <span className="sparkle-item opacity-0 absolute -top-4 right-2 sm:-right-4 text-xl sm:text-2xl pointer-events-none select-none">
          ✨
        </span>

        <h1
          ref={titleRef}
          className="opacity-0 text-2xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-xs text-center bg-linear-to-r from-amber-600 via-rose-500 to-amber-600 bg-clip-text text-transparent px-2"
        >
          Happy Birthday, My Love!
        </h1>
      </div>

      {/* Heartfelt Birthday Message */}
      <div className="relative mt-2 w-full flex flex-col items-center gap-2.5">
        <span className="sparkle-item opacity-0 absolute -bottom-2 -left-2 sm:left-2 text-lg sm:text-xl pointer-events-none select-none">
          🌹
        </span>
        <span className="sparkle-item opacity-0 absolute -bottom-3 -right-2 sm:right-2 text-lg sm:text-xl pointer-events-none select-none">
          💕
        </span>

        <p
          ref={messageRef}
          className="opacity-0 text-xs sm:text-sm md:text-base text-foreground/90 font-medium leading-relaxed max-w-xs sm:max-w-sm md:max-w-md px-2"
        >
          Thank you for bringing so much happiness, warmth, and laughter into my life. Every day with you is special, but today is all about celebrating you!
        </p>

        {/* Romantic sign-off */}
        <div
          ref={loveNoteRef}
          className="opacity-0 mt-0.5 px-4 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400"
        >
          I hope all your wishes come true. I love you! ❤️
        </div>
      </div>
    </div>
  );
}
