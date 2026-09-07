"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface CurtainRopeProps {
  isOpen: boolean;
  onPull: () => void;
  onProgress?: (progress: number) => void;
  tiltX?: number;
}

export default function CurtainRope({ isOpen, onPull, onProgress, tiltX = 0 }: CurtainRopeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ropeElRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  // Pendulum sway influenced by physical device gravity / gyroscope tilt
  useEffect(() => {
    if (isOpen || !ropeElRef.current || isDraggingRef.current) return;

    const targetAngle = tiltX * 24; // tilt swings rope up to 24 degrees with gravity
    gsap.to(ropeElRef.current, {
      rotation: targetAngle,
      x: tiltX * 22,
      transformOrigin: "top center",
      duration: 0.35,
      ease: "power2.out",
    });
  }, [isOpen, tiltX]);

  // When isOpen changes to true, fly up out of view
  useEffect(() => {
    if (isOpen && ropeElRef.current) {
      gsap.to(ropeElRef.current, {
        y: -550,
        opacity: 0,
        duration: 0.9,
        ease: "power3.in",
      });
    } else if (!isOpen && ropeElRef.current) {
      gsap.to(ropeElRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  // Pointer down (mouse or touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isOpen) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    currentYRef.current = 0;

    gsap.killTweensOf(ropeElRef.current);
  };

  // Pointer move (dragging with physics)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || isOpen) return;
    e.preventDefault();

    const rawDelta = e.clientY - startYRef.current;
    if (rawDelta < 0) {
      currentYRef.current = 0;
    } else {
      // Elastic resistance as user pulls further down
      currentYRef.current = Math.min(rawDelta * 0.85, 180);
    }

    // Stretch the rope cord
    if (cordRef.current) {
      gsap.set(cordRef.current, {
        scaleY: 1 + currentYRef.current / 220,
        transformOrigin: "top center",
      });
    }

    if (ropeElRef.current) {
      gsap.set(ropeElRef.current, {
        y: currentYRef.current,
        rotation: 0,
      });
    }

    // Inform parent about pull progress (0 to 1)
    const progress = Math.min(currentYRef.current / 110, 1);
    onProgress?.(progress);
  };

  // Pointer up / release
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || isOpen) return;
    isDraggingRef.current = false;

    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }

    // If dragged past threshold (40px) or clicked with small distance
    if (currentYRef.current > 40 || currentYRef.current === 0) {
      // Pull down slightly more for click satisfaction, then trigger open
      gsap.to(ropeElRef.current, {
        y: 60,
        duration: 0.18,
        ease: "power2.out",
        onComplete: () => {
          onPull();
        },
      });
    } else {
      // Released too early: spring back up to top with damped elastic recoil
      gsap.to(ropeElRef.current, {
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1.4, 0.4)",
      });
      if (cordRef.current) {
        gsap.to(cordRef.current, {
          scaleY: 1,
          duration: 0.7,
          ease: "elastic.out(1.4, 0.4)",
        });
      }
      onProgress?.(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center select-none touch-none ${
        isOpen ? "pointer-events-none" : "cursor-grab active:cursor-grabbing"
      }`}
      style={{ touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={ropeElRef} className="flex flex-col items-center">
        {/* Top gold mounting ring */}
        <div className="w-6 h-4 bg-linear-to-b from-amber-600 via-amber-300 to-amber-800 rounded-b shadow-md" />

        {/* Braided golden cord */}
        <div
          ref={cordRef}
          className="w-2.5 sm:w-3 h-32 sm:h-44 relative shadow-xl"
          style={{
            background:
              "repeating-linear-gradient(45deg, #78350f 0px, #b45309 3px, #fbbf24 6px, #fef08a 8px, #78350f 11px)",
            borderRadius: "1px",
          }}
        >
          {/* 3D cylindrical lighting overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/45 via-white/25 to-black/35 pointer-events-none" />
        </div>

        {/* Tassel assembly */}
        <div className={`flex flex-col items-center -mt-1 transition-transform duration-200 ${isHovered ? "scale-105" : ""}`}>
          {/* Brass connector ring */}
          <div className="w-5 h-2.5 bg-linear-to-r from-amber-700 via-amber-300 to-amber-800 rounded-sm shadow-md" />

          {/* Ornamental braided velvet knot */}
          <div
            className="w-8 h-10 sm:w-9 sm:h-11 rounded-full shadow-2xl relative overflow-hidden border border-amber-400"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #fef08a 0%, #f59e0b 35%, #b45309 70%, #451a03 100%)",
            }}
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2.5 border-y border-amber-900/60 bg-amber-600/30" />
          </div>

          {/* Golden bullion skirt fringe */}
          <div
            className="w-7 sm:w-8 h-12 sm:h-14 -mt-1 shadow-2xl relative"
            style={{
              clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
              background:
                "repeating-linear-gradient(90deg, #78350f 0px, #d97706 2px, #fef08a 4px, #92400e 6px)",
            }}
          />

          {/* Interactive instruction badge */}
          <div className="mt-3 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-bold tracking-widest uppercase shadow-2xl transition-all duration-300 group-hover:border-amber-300">
            Pull Rope
          </div>
        </div>
      </div>
    </div>
  );
}
