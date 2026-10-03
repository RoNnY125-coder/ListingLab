"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ParametricVortexSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=800",
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      return () => trigger.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Compute crisp vector geometries dynamically so no raster blur ever occurs
  const totalRings = 32;
  const baseRotation = progress * 160;
  const expansionFactor = 1 + progress * 3.8;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#E8DCC8] text-[#14100C] overflow-hidden flex flex-col justify-between p-6 sm:p-12 select-none border-t border-[#14100C]/15"
    >
      {/* Top Header Grid without the right pill */}
      <div className="relative z-20 flex items-center justify-between border-b border-[#14100C]/15 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-headline font-bold text-sm tracking-tight text-[#14100C]">
            PARAMETRIC APERTURE
          </span>
          <span className="text-[10px] font-mono text-[#14100C]/60">[SCALABLE ENGINE]</span>
        </div>
      </div>

      {/* Razor-Sharp Pure Vector SVG Aperture (Zero Blur, mathematically crisp) */}
      <div className="relative z-10 flex-1 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="-400 -400 800 800"
          className="w-[85vw] h-[85vh] max-w-[800px] max-h-[800px] overflow-visible"
          style={{ shapeRendering: "geometricPrecision" }}
        >
          {Array.from({ length: totalRings }).map((_, i) => {
            const t = i / totalRings;
            const size = (340 - i * 9.5) * expansionFactor;
            const angle = baseRotation + i * 5.8;
            const isInner = i > 18;
            const strokeColor = isInner ? "#FF7A30" : "rgba(20, 16, 12, 0.4)";
            const strokeOpacity = Math.max(0.15, 1 - t * 0.7);
            const cornerRadius = 32 * expansionFactor * (1 - t * 0.4);

            return (
              <rect
                key={i}
                x={-size / 2}
                y={-size / 2}
                width={size}
                height={size}
                rx={cornerRadius}
                ry={cornerRadius}
                fill={i === totalRings - 1 ? "#14100C" : "none"}
                stroke={strokeColor}
                strokeWidth={isInner ? 2 : 1.2}
                strokeOpacity={strokeOpacity}
                transform={`rotate(${angle})`}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
      </div>

      {/* Bottom Editorial Caption */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#14100C]/15 pt-4 text-xs font-mono">
        <div>
          <span className="text-[#14100C]/60 block mb-0.5">SUB-PIXEL COMPOSITING</span>
          <p className="font-headline text-base sm:text-lg font-semibold text-[#14100C]">
            Ruthless consistency across commercial SKU transforms.
          </p>
        </div>
        <div className="flex md:justify-end items-end text-[#14100C]/70">
          <span>Scroll to expand aperture into catalog gallery ↓</span>
        </div>
      </div>
    </section>
  );
};