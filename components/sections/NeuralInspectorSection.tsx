"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

export const NeuralInspectorSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".floating-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        scale: 0.96,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
      });

      // Drastically reduced movement speed (80s duration) for ultra-subtle, elegant marquee loop
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          xPercent: -50,
          duration: 80,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 lg:py-24 bg-[#14100C] text-[#E8DCC8] overflow-hidden flex flex-col justify-center border-t border-[#E8DCC8]/10"
      id="abilities"
    >
      {/* Giant Background Watermark Moving Very Slowly Left to Right in a Perfect Loop */}
      <div className="absolute inset-0 flex items-center pointer-events-none z-0 overflow-hidden select-none">
        <div
          ref={watermarkRef}
          className="flex whitespace-nowrap will-change-transform"
        >
          <span className="font-headline text-[18vw] font-black text-[#26201A]/35 tracking-widest uppercase pr-16">
            LISTINGLAB • LISTINGLAB • LISTINGLAB • LISTINGLAB •
          </span>
          <span className="font-headline text-[18vw] font-black text-[#26201A]/35 tracking-widest uppercase pr-16">
            LISTINGLAB • LISTINGLAB • LISTINGLAB • LISTINGLAB •
          </span>
        </div>
      </div>

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full mb-12 text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF7A30] block mb-2">
          AUTOMATED STUDIO WORKSPACE
        </span>
        <h2 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#E8DCC8]">
          Precise Commercial Control
        </h2>
        <p className="text-sm sm:text-base text-[#B8AC96] max-w-xl mx-auto mt-2 font-normal">
          Inspect, adjust, and orchestrate product photography with intuitive presets.
        </p>
      </div>

      {/* Floating Tool Palettes & Windows Layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Tool Palette Menu */}
        <div className="floating-card md:col-span-4 bg-[#1D1712]/90 backdrop-blur-xl border border-[#E8DCC8]/15 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DCC8]/10 mb-4">
            <span className="text-xs font-mono uppercase text-[#B8AC96]">
              Core Capabilities
            </span>
          </div>

          <div className="flex flex-col gap-2 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#26201A] border border-[#FF7A30]/40 text-[#FF7A30] flex items-center justify-between">
              <span>Background Removal</span>
              <Check className="w-3.5 h-3.5" />
            </div>

            <div className="p-3 rounded-lg bg-[#14100C]/60 text-[#E8DCC8] hover:bg-[#26201A] flex items-center justify-between transition-colors">
              <span>Edge Isolation</span>
              <Check className="w-3.5 h-3.5 text-[#B8AC96]" />
            </div>

            <div className="p-3 rounded-lg bg-[#14100C]/60 text-[#E8DCC8] hover:bg-[#26201A] flex items-center justify-between transition-colors">
              <span>Ground Shadow</span>
              <Check className="w-3.5 h-3.5 text-[#B8AC96]" />
            </div>

            <div className="p-3 rounded-lg bg-[#14100C]/60 text-[#E8DCC8] hover:bg-[#26201A] flex items-center justify-between transition-colors">
              <span>Pedestal Staging</span>
              <Check className="w-3.5 h-3.5 text-[#B8AC96]" />
            </div>

            <div className="p-3 rounded-lg bg-[#14100C]/60 text-[#E8DCC8] hover:bg-[#26201A] flex items-center justify-between transition-colors">
              <span>Color Normalization</span>
              <Check className="w-3.5 h-3.5 text-[#B8AC96]" />
            </div>
          </div>
        </div>

        {/* Center Column: Live Subject Window */}
        <div className="floating-card md:col-span-5 bg-[#1D1712]/90 backdrop-blur-xl border border-[#E8DCC8]/15 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 text-[11px] font-mono text-[#B8AC96] border-b border-[#E8DCC8]/10 mb-3">
            <span>PREVIEW || SNEAKER & WATCH</span>
            <span className="text-[#FF7A30]">CALIBRATED</span>
          </div>

          <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#14100C]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBboKy_HRfzp-jtWq11x566_t6XJD0v5TcVemtfHGMlf_3z_nWmKwK6KjmOeMXUjxLCUUMO_1B1CBcC8u2cWCdLYVK-PApujOEpYw-F4bXrFKzptw57LVbqSROPE69LCEuEua8A5kO2c0iOsavf5UL9bH-IHzTYkbr_tslQxl6Kmz2YL4DXYhK6Lpd_WT_cQ4NkoAtcBCKECkzqhmLQbdiImYJbJwZ26yAUXZkleNSWnSLFwgMyXw8C"
              alt="Luxury Timepiece"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: Key Specifications */}
        <div className="floating-card md:col-span-3 flex flex-col gap-4">
          <div className="bg-[#1D1712]/90 backdrop-blur-xl border border-[#E8DCC8]/15 rounded-2xl p-5 shadow-xl">
            <span className="text-[10px] font-mono text-[#B8AC96] uppercase block mb-1">
              SURFACE CLARITY
            </span>
            <span className="font-headline text-2xl font-bold text-[#E8DCC8]">Studio Sharp</span>
            <p className="text-xs text-[#B8AC96] mt-1">
              Reflections, highlights, and micro-textures cleanly preserved.
            </p>
          </div>

          <div className="bg-[#1D1712]/90 backdrop-blur-xl border border-[#E8DCC8]/15 rounded-2xl p-5 shadow-xl">
            <span className="text-[10px] font-mono text-[#B8AC96] uppercase block mb-1">
              OPTIMIZATION
            </span>
            <span className="font-headline text-2xl font-bold text-[#FF7A30]">68% Lighter</span>
            <p className="text-xs text-[#B8AC96] mt-1">
              Fast page loads across all marketplace storefronts.
            </p>
          </div>

          <div className="bg-[#26201A] border border-[#E8DCC8]/15 rounded-2xl p-5 shadow-xl">
            <span className="text-[10px] font-mono text-[#FF7A30] uppercase block mb-1">
              COMPLIANCE
            </span>
            <span className="text-xs font-semibold text-[#E8DCC8]">Amazon • Shopify • Chrono24</span>
          </div>
        </div>
      </div>
    </section>
  );
};