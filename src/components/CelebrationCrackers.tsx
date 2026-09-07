"use client";

import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { useCurtain } from "./CurtainContext";

export default function CelebrationCrackers() {
  const { isOpen } = useCurtain();

  // Synthesize celebration party popper / cracker pop sound using Web Audio API
  const playCrackerSound = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Double pop sound
      [0, 0.12].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, ctx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + delay + 0.18);

        gain.gain.setValueAtTime(0.01, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.25);
      });
    } catch {
      // Audio is an enhancement
    }
  }, []);

  const fireCrackers = useCallback(() => {
    playCrackerSound();

    const colors = [
      "#f43f5e", // Rose pink
      "#ec4899", // Deep pink
      "#fbbf24", // Gold
      "#f59e0b", // Amber
      "#a855f7", // Purple
      "#ffffff", // White shimmer
    ];

    // Left cannon burst (shoots toward center)
    confetti({
      particleCount: 75,
      angle: 60,
      spread: 65,
      origin: { x: 0.08, y: 0.85 },
      colors,
      startVelocity: 55,
      gravity: 0.85,
      ticks: 280,
      scalar: 1.1,
    });

    // Right cannon burst (shoots toward center)
    confetti({
      particleCount: 75,
      angle: 120,
      spread: 65,
      origin: { x: 0.92, y: 0.85 },
      colors,
      startVelocity: 55,
      gravity: 0.85,
      ticks: 280,
      scalar: 1.1,
    });

    // Center star & heart firework burst with brief delay
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.5, y: 0.45 },
        colors: ["#fbbf24", "#f43f5e", "#fef08a", "#fda4af"],
        startVelocity: 38,
        gravity: 0.75,
        shapes: ["circle"],
        scalar: 1.2,
      });
    }, 280);

    // Falling golden shimmer rain
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.15 },
        colors: ["#fbbf24", "#fef08a", "#f59e0b"],
        startVelocity: 20,
        gravity: 0.6,
        scalar: 0.9,
      });
    }, 600);
  }, [playCrackerSound]);

  useEffect(() => {
    if (isOpen) {
      // Fire crackers exactly as the curtains part open
      const timer = setTimeout(() => {
        fireCrackers();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isOpen, fireCrackers]);

  return null;
}
