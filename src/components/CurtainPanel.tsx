"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";

export interface CurtainPanelsHandle {
  update: (top: number, mid: number, midY: number, bot: number) => void;
}

interface CurtainPanelsProps {
  tiltX?: number;
}

const CurtainPanels = forwardRef<CurtainPanelsHandle, CurtainPanelsProps>(
  ({ tiltX = 0 }, ref) => {
    const leftPathRef = useRef<SVGPathElement>(null);
    const leftOverlayRef = useRef<SVGPathElement>(null);
    const rightPathRef = useRef<SVGPathElement>(null);
    const rightOverlayRef = useRef<SVGPathElement>(null);
    const leftBorderRef = useRef<SVGPathElement>(null);
    const rightBorderRef = useRef<SVGPathElement>(null);

    useImperativeHandle(ref, () => ({
      update: (top: number, mid: number, midY: number, bot: number) => {
        const leftD = `M 0,0 L ${top.toFixed(1)},0 Q ${mid.toFixed(1)},${midY.toFixed(1)} ${bot.toFixed(1)},1000 L 0,1000 Z`;
        const rightD = `M 1000,0 L ${(1000 - top).toFixed(1)},0 Q ${(1000 - mid).toFixed(1)},${midY.toFixed(1)} ${(1000 - bot).toFixed(1)},1000 L 1000,1000 Z`;
        const leftBorderD = `M ${top.toFixed(1)},0 Q ${mid.toFixed(1)},${midY.toFixed(1)} ${bot.toFixed(1)},1000`;
        const rightBorderD = `M ${(1000 - top).toFixed(1)},0 Q ${(1000 - mid).toFixed(1)},${midY.toFixed(1)} ${(1000 - bot).toFixed(1)},1000`;

        if (leftPathRef.current) leftPathRef.current.setAttribute("d", leftD);
        if (leftOverlayRef.current) leftOverlayRef.current.setAttribute("d", leftD);
        if (rightPathRef.current) rightPathRef.current.setAttribute("d", rightD);
        if (rightOverlayRef.current) rightOverlayRef.current.setAttribute("d", rightD);
        if (leftBorderRef.current) leftBorderRef.current.setAttribute("d", leftBorderD);
        if (rightBorderRef.current) rightBorderRef.current.setAttribute("d", rightBorderD);
      },
    }));

    return (
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden will-change-transform"
        style={{
          transformOrigin: "top center",
          transform: `rotate(${(tiltX * 3.2).toFixed(2)}deg) translateX(${(tiltX * 22).toFixed(1)}px)`,
          transition: "transform 0.12s ease-out",
        }}
      >
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="w-full h-full filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
        >
          <defs>
            {/* Rich 3D velvet cylindrical fold pattern */}
            <pattern
              id="velvetFolds"
              width="60"
              height="1000"
              patternUnits="userSpaceOnUse"
            >
              <rect width="60" height="1000" fill="#2a0306" />
              {/* Deep shadow trough */}
              <rect x="0" y="0" width="12" height="1000" fill="#140102" />
              {/* Rising slope */}
              <rect x="12" y="0" width="15" height="1000" fill="#58080f" />
              {/* Cylinder crest highlight */}
              <rect x="27" y="0" width="10" height="1000" fill="#a8131d" />
              <rect x="30" y="0" width="4" height="1000" fill="#dc2626" opacity="0.65" />
              {/* Falling slope */}
              <rect x="37" y="0" width="15" height="1000" fill="#58080f" />
              {/* Dark valley */}
              <rect x="52" y="0" width="8" height="1000" fill="#1e0204" />
            </pattern>

            {/* Vertical stage depth lighting gradient */}
            <linearGradient id="verticalDepth" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
            </linearGradient>

            {/* Gold piping along the curved inner edge */}
            <linearGradient id="goldPiping" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="20%" stopColor="#fbbf24" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#d97706" />
              <stop offset="85%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* LEFT CURTAIN */}
          <g>
            <path
              ref={leftPathRef}
              d="M 0,0 L 500,0 Q 500,500 500,1000 L 0,1000 Z"
              fill="url(#velvetFolds)"
            />
            <path
              ref={leftOverlayRef}
              d="M 0,0 L 500,0 Q 500,500 500,1000 L 0,1000 Z"
              fill="url(#verticalDepth)"
              style={{ mixBlendMode: "multiply" }}
            />
            <path
              ref={leftBorderRef}
              d="M 500,0 Q 500,500 500,1000"
              fill="none"
              stroke="url(#goldPiping)"
              strokeWidth="4"
            />
          </g>

          {/* RIGHT CURTAIN */}
          <g>
            <path
              ref={rightPathRef}
              d="M 1000,0 L 500,0 Q 500,500 500,1000 L 1000,1000 Z"
              fill="url(#velvetFolds)"
            />
            <path
              ref={rightOverlayRef}
              d="M 1000,0 L 500,0 Q 500,500 500,1000 L 1000,1000 Z"
              fill="url(#verticalDepth)"
              style={{ mixBlendMode: "multiply" }}
            />
            <path
              ref={rightBorderRef}
              d="M 500,0 Q 500,500 500,1000"
              fill="none"
              stroke="url(#goldPiping)"
              strokeWidth="4"
            />
          </g>
        </svg>
      </div>
    );
  }
);

CurtainPanels.displayName = "CurtainPanels";

export default CurtainPanels;
