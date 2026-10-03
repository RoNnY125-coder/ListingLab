"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const FullscreenBeforeAfterScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeClipRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(50);
  const [isManualDragging, setIsManualDragging] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          if (!isManualDragging) {
            const p = self.progress;
            const percent = 88 - p * 76;
            setSplitPercent(percent);
          }
        },
      });

      return () => trigger.kill();
    }, containerRef);

    return () => ctx.revert();
  }, [isManualDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsManualDragging(true);
    updateSplitFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isManualDragging) {
      updateSplitFromPointer(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsManualDragging(false);
  };

  const updateSplitFromPointer = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSplitPercent(percent);
  };

  return (
    <section
      ref={containerRef}
      id="before-after-fullscreen"
      className="relative w-full h-screen bg-[#14100C] text-[#E8DCC8] overflow-hidden select-none cursor-ew-resize flex flex-col justify-between"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Background Studio Base (After — Cloudinary optimized) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/demo/image/upload/c_fill,g_auto,w_1920,h_1080,f_auto,q_auto/docs/models.jpg"
          alt="Studio Staged Output"
          className="absolute right-0 top-0 h-full w-[200%] max-w-none object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100C]/70 via-transparent to-[#14100C]/40 pointer-events-none" />

        {/* After Label - Clean Non-Pill Rectangular Badge */}
        <div className="absolute top-8 right-8 z-30 pointer-events-none">
          <span className="px-3.5 py-1.5 bg-[#14100C]/85 backdrop-blur-md border border-[#FF7A30]/40 text-[#FF7A30] text-xs font-mono tracking-wider">
            AFTER — f_auto, q_auto, c_fill
          </span>
        </div>
      </div>

      {/* Clipped Overlay (Before — original upload) */}
      <div
        ref={wipeClipRef}
        className="absolute inset-0 h-full overflow-hidden bg-[#14100C]"
        style={{ width: `${splitPercent}%` }}
      >
        <div className="relative w-screen h-screen overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/demo/image/upload/docs/models.jpg"
            alt="Original Upload"
            className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14100C]/70 via-transparent to-[#14100C]/40 pointer-events-none" />

          {/* Raw Label - Clean Non-Pill Rectangular Badge */}
          <div className="absolute top-8 left-8 z-30 pointer-events-none">
            <span className="px-3.5 py-1.5 bg-[#14100C]/85 backdrop-blur-md border border-[#E8DCC8]/20 text-[#B8AC96] text-xs font-mono tracking-wider">
              BEFORE — Original Upload
            </span>
          </div>
        </div>
      </div>

      {/* Divider Bar & Handle */}
      <div
        ref={dividerRef}
        className="absolute top-0 bottom-0 w-[2px] bg-[#FF7A30] shadow-[0_0_20px_rgba(255,122,48,0.9)] z-40 pointer-events-none -translate-x-1/2"
        style={{ left: `${splitPercent}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-[#1D1712] border border-[#FF7A30] shadow-[0_0_24px_rgba(255,122,48,0.5)] flex items-center justify-center text-[#FF7A30] pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
          </svg>
        </div>
      </div>

      {/* Minimal Bottom Instruction */}
      <div className="relative z-30 py-4 px-6 text-center bg-[#14100C]/60 backdrop-blur-md text-[11px] font-mono text-[#B8AC96] tracking-wide border-t border-[#E8DCC8]/10 mt-auto">
        <span>Scroll down to reveal transformation • or drag slider horizontally</span>
      </div>
    </section>
  );
};
