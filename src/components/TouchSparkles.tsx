"use client";

import React, { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  char: string;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const SPARKLE_CHARS = ["💖", "✨", "💕", "⭐", "🌸", "❤️"];

export default function TouchSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let animId: number;

    const handlePointerDown = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const burstCount = 6;
      const newSparkles: Sparkle[] = [];

      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 2.5 + 1.5;
        newSparkles.push({
          id: Date.now() + Math.random(),
          x,
          y,
          char: SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)],
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2, // bias upwards
          size: Math.floor(Math.random() * 8 + 14),
          opacity: 1,
        });
      }

      setSparkles((prev) => [...prev.slice(-24), ...newSparkles]);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // Physics step
    const step = () => {
      setSparkles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            vy: s.vy - 0.05, // gentle float
            opacity: s.opacity - 0.025,
          }))
          .filter((s) => s.opacity > 0);
      });

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute select-none will-change-transform"
          style={{
            left: s.x,
            top: s.y,
            transform: "translate(-50%, -50%)",
            fontSize: `${s.size}px`,
            opacity: s.opacity,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
