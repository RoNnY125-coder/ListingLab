"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  className?: string;
  aspectRatio?: string;
  microInstruction?: string;
  useCustomCrop?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = "Before processing",
  afterAlt = "After studio processing",
  beforeLabel = "Before: Phone Snap",
  afterLabel = "After: Studio Grade",
  initialPosition = 50,
  className,
  aspectRatio = "aspect-[16/9] sm:aspect-[21/9]",
  microInstruction = "Drag slider horizontally to inspect neural synthesis",
  useCustomCrop = false,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSliderPosition(Math.max(2, Math.min(98, percent)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore if pointer capture release is not supported or not active
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden select-none cursor-ew-resize rounded-xl border border-outline bg-surface-dim",
        aspectRatio,
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After Image (Full Base layer) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterImage}
        alt={afterAlt}
        className={cn(
          "absolute inset-0 h-full pointer-events-none",
          useCustomCrop ? "w-[200%] max-w-none object-cover object-right" : "w-full object-cover"
        )}
        loading="eager"
      />

      {/* After Label Badge */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-dim/85 backdrop-blur-md border border-outline text-orange text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
          {afterLabel}
        </span>
      </div>

      {/* Before Image (Clipped Overlay layer) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeImage}
          alt={beforeAlt}
          className={cn(
            "absolute top-0 left-0 h-full pointer-events-none max-w-none object-cover",
            useCustomCrop ? "w-[200%] object-left" : ""
          )}
          style={{ width: useCustomCrop ? "200%" : (containerWidth > 0 ? `${containerWidth}px` : "100%") }}
          loading="eager"
        />

        {/* Before Label Badge */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-dim/85 backdrop-blur-md border border-outline text-beige-dim text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-beige-dim" />
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* Divider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 -translate-x-1/2 w-[2px] bg-orange shadow-[0_0_12px_rgba(255,122,48,0.8)] z-30 pointer-events-none transition-transform"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-raised border border-orange flex items-center justify-center text-orange shadow-card-hover transition-transform hover:scale-110">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
          </svg>
        </div>
      </div>

      {/* Micro instructions pill */}
      {microInstruction && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-dim/85 backdrop-blur-md border border-outline text-beige-muted text-[11px] font-mono tracking-tight">
            <span>?</span> {microInstruction}
          </span>
        </div>
      )}
    </div>
  );
};
