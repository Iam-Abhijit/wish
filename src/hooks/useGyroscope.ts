"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface GyroscopeState {
  tiltX: number; // -1 (tilted left) to 1 (tilted right)
  tiltY: number; // -1 (tilted back) to 1 (tilted forward)
  hasSensor: boolean;
  permissionGranted: boolean;
}

export function useGyroscope() {
  const [gyro, setGyro] = useState<GyroscopeState>({
    tiltX: 0,
    tiltY: 0,
    hasSensor: false,
    permissionGranted: false,
  });

  const targetTiltX = useRef(0);
  const targetTiltY = useRef(0);
  const currentTiltX = useRef(0);
  const currentTiltY = useRef(0);
  const animFrameId = useRef<number | null>(null);

  // Smooth lerp loop for organic physics
  useEffect(() => {
    const updateLoop = () => {
      // 0.1 factor for responsive yet silky-smooth motion
      currentTiltX.current += (targetTiltX.current - currentTiltX.current) * 0.1;
      currentTiltY.current += (targetTiltY.current - currentTiltY.current) * 0.1;

      setGyro((prev) => ({
        ...prev,
        tiltX: Number(currentTiltX.current.toFixed(4)),
        tiltY: Number(currentTiltY.current.toFixed(4)),
      }));

      animFrameId.current = requestAnimationFrame(updateLoop);
    };

    animFrameId.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Request permission function (crucial for iOS 13+)
  const requestGyroPermission = useCallback(async () => {
    if (
      typeof window !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function"
    ) {
      try {
        const response = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
        if (response === "granted") {
          setGyro((prev) => ({ ...prev, permissionGranted: true }));
          return true;
        }
        return false;
      } catch {
        return false;
      }
    }
    setGyro((prev) => ({ ...prev, permissionGranted: true }));
    return true;
  }, []);

  // Handle Mobile Gyroscope (DeviceOrientation)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;

      // gamma: left-to-right tilt in degrees [-90 to 90]. Responsive within ±35°
      // beta: front-to-back tilt in degrees [-180 to 180]. Centered around ~45° natural holding angle
      const gamma = e.gamma;
      const beta = e.beta - 45;

      const clampedX = Math.max(-35, Math.min(35, gamma));
      const clampedY = Math.max(-35, Math.min(35, beta));

      targetTiltX.current = clampedX / 35; // -1 to 1
      targetTiltY.current = clampedY / 35; // -1 to 1

      setGyro((prev) => (prev.hasSensor ? prev : { ...prev, hasSensor: true }));
    };

    // Desktop Mouse Parallax Fallback
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetTiltX.current = (e.clientX - centerX) / centerX;
      targetTiltY.current = (e.clientY - centerY) / centerY;
    };

    // Auto-request iOS permission on the first user touch anywhere
    const handleFirstTouch = () => {
      requestGyroPermission();
      window.removeEventListener("touchstart", handleFirstTouch);
      window.removeEventListener("click", handleFirstTouch);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("deviceorientation", handleOrientation);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchstart", handleFirstTouch, { once: true });
      window.addEventListener("click", handleFirstTouch, { once: true });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchstart", handleFirstTouch);
        window.removeEventListener("click", handleFirstTouch);
      }
    };
  }, [requestGyroPermission]);

  return { ...gyro, requestGyroPermission };
}
