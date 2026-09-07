"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import StageLighting from "./StageLighting";
import CurtainValance from "./CurtainValance";
import CurtainRope from "./CurtainRope";
import CurtainPanels, { CurtainPanelsHandle } from "./CurtainPanel";
import CurtainContext from "./CurtainContext";
import CelebrationCrackers from "./CelebrationCrackers";
import FloatingHearts from "./FloatingHearts";
import TouchSparkles from "./TouchSparkles";
import CurtainHint from "./CurtainHint";
import FloatingBalloons from "./FloatingBalloons";
import { useGyroscope } from "@/hooks/useGyroscope";

interface CurtainProps {
  children: React.ReactNode;
}

export default function Curtain({ children }: CurtainProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<CurtainPanelsHandle>(null);
  const { tiltX, tiltY, requestGyroPermission } = useGyroscope();

  // Mutable coordinates ref for zero-react-rerender 120 FPS GSAP tweening
  const coordsRef = useRef({
    topX: 500,
    midX: 500,
    midY: 500,
    botX: 500,
  });

  // Direct DOM update via ref handle
  const applyCoordinates = useCallback((topX: number, midX: number, midY: number, botX: number) => {
    coordsRef.current = { topX, midX, midY, botX };
    panelsRef.current?.update(topX, midX, midY, botX);
  }, []);

  // Web Audio velvet fabric sound effect
  const playSwooshSound = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const bufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 1.5);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch {
      // Audio is an enhancement; continue silently if not allowed
    }
  }, []);

  // Real-time preview when dragging the rope
  const handleRopeDragProgress = useCallback(
    (progress: number) => {
      if (isOpen) return;

      const topX = 500 - progress * 190;
      const midX = 500 - progress * 240;
      const midY = 460;
      const botX = 500 - progress * 380;

      applyCoordinates(topX, midX, midY, botX);
    },
    [isOpen, applyCoordinates]
  );

  // Execute full opening animation with mobile-friendly wide sweep arch
  const triggerOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    playSwooshSound();

    gsap.killTweensOf(coordsRef.current);

    const targetCoords = { ...coordsRef.current };
    const tl = gsap.timeline();

    // 1. Accelerated sweep open into majestic theater arch
    tl.to(targetCoords, {
      topX: 120,
      midX: 145,
      midY: 460,
      botX: 35,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        applyCoordinates(targetCoords.topX, targetCoords.midX, targetCoords.midY, targetCoords.botX);
      },
    })
    // 2. Physical cloth settling with damped harmonic recoil
    .to(targetCoords, {
      topX: 105,
      midX: 130,
      midY: 465,
      botX: 25,
      duration: 0.9,
      ease: "elastic.out(1.2, 0.4)",
      onUpdate: () => {
        applyCoordinates(targetCoords.topX, targetCoords.midX, targetCoords.midY, targetCoords.botX);
      },
    });
  }, [isOpen, playSwooshSound, applyCoordinates]);

  // Close curtain
  const triggerClose = useCallback(() => {
    if (!isOpen) return;
    playSwooshSound();

    gsap.killTweensOf(coordsRef.current);

    const targetCoords = { ...coordsRef.current };

    gsap.to(targetCoords, {
      topX: 500,
      midX: 500,
      midY: 500,
      botX: 500,
      duration: 1.8,
      ease: "power3.inOut",
      onUpdate: () => {
        applyCoordinates(targetCoords.topX, targetCoords.midX, targetCoords.midY, targetCoords.botX);
      },
      onComplete: () => {
        setIsOpen(false);
      },
    });
  }, [isOpen, playSwooshSound, applyCoordinates]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      gsap.killTweensOf(coordsRef.current);
    };
  }, []);

  return (
    <CurtainContext.Provider
      value={{
        isOpen,
        openCurtain: triggerOpen,
        closeCurtain: triggerClose,
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-dvh overflow-hidden bg-background select-none touch-manipulation"
      >
        {/* Stage contents behind the curtain with vivid 3D depth holographic tilt */}
        <div
          className="absolute inset-0 z-0 overflow-y-auto overflow-x-hidden flex flex-col items-center px-3 will-change-transform"
          style={{
            transform: `perspective(850px) rotateY(${(tiltX * 14).toFixed(1)}deg) rotateX(${(-tiltY * 12).toFixed(1)}deg) translateX(${(-tiltX * 18).toFixed(1)}px)`,
            transition: "transform 0.12s ease-out",
          }}
        >
          <div className="my-auto w-full flex flex-col items-center justify-center pt-20 pb-24 sm:pt-24 sm:pb-24">
            {children}
          </div>
        </div>

        {/* Floating Festive Birthday Balloons with gyroscope tilt */}
        <FloatingBalloons tiltX={tiltX} />

        {/* Ambient Floating Hearts & Sparkles */}
        <FloatingHearts />

        {/* Celebration Poppers & Confetti Crackers on Curtain Open */}
        <CelebrationCrackers />

        {/* Atmospheric Stage Lighting with Gyroscope optical shift */}
        <StageLighting tiltX={tiltX} tiltY={tiltY} />

        {/* Interactive touch and click sparkle ripples */}
        <TouchSparkles />

        {/* Clickable area when curtain is closed */}
        <div
          className={`absolute inset-0 z-20 ${isOpen ? "pointer-events-none" : "cursor-pointer"}`}
          onClick={() => {
            requestGyroPermission();
            if (!isOpen) triggerOpen();
          }}
          title={!isOpen ? "Click to open curtain" : undefined}
        >
          <CurtainPanels ref={panelsRef} tiltX={tiltX} />
        </div>

        {/* Closed Curtain Prompt and directional guide */}
        <CurtainHint />

        {/* Classic Theater Pelmet Valance */}
        <CurtainValance />

        {/* Interactive Golden Pull Rope with Gyroscope gravity sway */}
        <CurtainRope
          isOpen={isOpen}
          onPull={() => {
            requestGyroPermission();
            triggerOpen();
          }}
          onProgress={handleRopeDragProgress}
          tiltX={tiltX}
        />

        {/* Close Curtain Replay Button - Responsive Mobile-Centered Pill */}
        {isOpen && (
          <button
            onClick={triggerClose}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-8 sm:translate-x-0 z-40 px-5 py-2.5 rounded-full bg-black/85 hover:bg-black text-amber-300 border border-amber-500/50 text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Close Curtain
          </button>
        )}
      </div>
    </CurtainContext.Provider>
  );
}
