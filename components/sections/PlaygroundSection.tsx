"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, Check, ArrowRight, Sparkles, Watch, ShoppingBag } from "lucide-react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

// NOTE: sneaker uses the high-definition side-by-side shoe image (trailblazer-hd.jpg)
const demos = {
  sneaker: {
    title: "Trailblazer Outdoor Shoe",
    sku: "Live Cloudinary Transform",
    // Original unoptimized upload
    before:
      "/images/trailblazer-hd.jpg",
    after:
      "/images/trailblazer-hd.jpg",
    useCustomCrop: true,
  },
  watch: {
    title: "Chronograph Timepiece",
    sku: "Sample SKU #4410",
    before:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyBQmbF6fcABo3MvQw696FvPSL6QWGDZGTqGfx5On8XJRE5HMnJwo5ahM8Hj59PMUgaGcSRe6IMoSUWt0LHk6-9KpeCW1b1Li0a7_ADQgm3-FIcGtpex8OkaPYXM_18518eka3vA8Vmt5sDCQgMB5MQ3fGpFw492Nmuxqp5KvAq3F7qnNzo4ABd5XYBvX8IAKHcjWO3R_--s4Fxbtyh_PYYuRgK_PSa4GGDPaWzoeelPidSl6MVoWi",
    after:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBboKy_HRfzp-jtWq11x566_t6XJD0v5TcVemtfHGMlf_3z_nWmKwK6KjmOeMXUjxLCUUMO_1B1CBcC8u2cWCdLYVK-PApujOEpYw-F4bXrFKzptw57LVbqSROPE69LCEuEua8A5kO2c0iOsavf5UL9bH-IHzTYkbr_tslQxl6Kmz2YL4DXYhK6Lpd_WT_cQ4NkoAtcBCKECkzqhmLQbdiImYJbJwZ26yAUXZkleNSWnSLFwgMyXw8C",
    useCustomCrop: false,
  },
};

export const PlaygroundSection: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<"sneaker" | "watch">("sneaker");
  const [activeLighting, setActiveLighting] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".console-box", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".cta-box", {
        scrollTrigger: {
          trigger: ".cta-box",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lightingPresets = ["Obsidian Pedestal", "Amazon Pure 255", "Softbox Rim Light"];
  const currentDemo = demos[activeSubject];

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 lg:py-28 bg-[#14100C] border-t border-[#E8DCC8]/10 relative overflow-hidden text-[#E8DCC8]"
      id="transform"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] bg-[#FF7A30]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="console-box rounded-3xl bg-[#1D1712] border border-[#E8DCC8]/15 p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Playground Controls */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs text-[#FF7A30] uppercase tracking-widest block mb-2">
                  LIVE EXPERIMENT CONSOLE
                </span>
                <h3 className="font-headline text-3xl sm:text-4xl font-bold text-[#E8DCC8] tracking-tight">
                  Test the Pipeline Now
                </h3>
                <p className="text-sm sm:text-base text-[#B8AC96] mt-2 leading-relaxed font-normal">
                  Switch targets and preset lighting models to experience real-time neural compositing.
                </p>
              </div>

              {/* Subject Selection Buttons */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase text-[#B8AC96]">
                  Select Demo Subject
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubject("sneaker")}
                    className={`px-4 py-3 font-headline text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all border ${
                      activeSubject === "sneaker"
                        ? "bg-[#FF7A30] text-[#14100C] border-[#FF7A30]"
                        : "bg-[#26201A] text-[#B8AC96] border-[#E8DCC8]/15 hover:text-[#E8DCC8]"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Outdoor Shoe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubject("watch")}
                    className={`px-4 py-3 font-headline text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all border ${
                      activeSubject === "watch"
                        ? "bg-[#FF7A30] text-[#14100C] border-[#FF7A30]"
                        : "bg-[#26201A] text-[#B8AC96] border-[#E8DCC8]/15 hover:text-[#E8DCC8]"
                    }`}
                  >
                    <Watch className="w-4 h-4" />
                    <span>Chronograph</span>
                  </button>
                </div>
              </div>

              {/* Lighting Presets */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase text-[#B8AC96]">
                  Lighting Rig Preset
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {lightingPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveLighting(idx)}
                      className={`px-2.5 py-2 font-mono text-xs text-center transition-all border ${
                        activeLighting === idx
                          ? "bg-[#26201A] text-[#FF7A30] border-[#FF7A30]/40"
                          : "bg-[#14100C] text-[#B8AC96] border-[#E8DCC8]/15 hover:border-[#E8DCC8]/30"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Super-Res Telemetry */}
              <div className="bg-[#26201A] border border-[#E8DCC8]/15 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF7A30]/10 border border-[#FF7A30]/20 text-[#FF7A30] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#E8DCC8]">
                      Export Super-Resolution
                    </span>
                    <span className="font-mono text-[11px] text-[#B8AC96]">
                      ESRGAN 4X Upscaler active
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-[#FF7A30]/20 text-[#FF7A30] border border-[#FF7A30]/30 font-semibold">
                  ENABLED
                </span>
              </div>

              {/* Batch Process CTA */}
              <Link
                href="#footer"
                className="w-full py-3.5 font-headline text-sm sm:text-base font-semibold text-center text-[#14100C] bg-[#FF7A30] hover:bg-[#FF7A30]/90 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Batch Process Your Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Interactive Canvas */}
            <div className="lg:col-span-7">
              <div className="bg-[#14100C] p-4 sm:p-5 border border-[#E8DCC8]/15 shadow-2xl">
                <div className="flex items-center justify-between pb-3 text-[#B8AC96] font-mono text-xs border-b border-[#E8DCC8]/10 mb-3">
                  <span>
                    Displaying: <strong className="text-[#E8DCC8]">{currentDemo.title}</strong> ({currentDemo.sku})
                  </span>
                  <span className="text-[#FF7A30] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A30] animate-pulse" />
                    99.8% Confidence
                  </span>
                </div>

                <BeforeAfterSlider
                  key={activeSubject}
                  beforeImage={currentDemo.before}
                  afterImage={currentDemo.after}
                  beforeLabel="Before: Original upload"
                  afterLabel="After: Cloudinary smart crop + f_auto, q_auto"
                  aspectRatio="aspect-square sm:aspect-[4/3]"
                  useCustomCrop={currentDemo.useCustomCrop}
                />

                <div className="flex items-center justify-between pt-3 text-[#B8AC96] font-mono text-[11px]">
                  <span>Before: Original upload</span>
                  <span>After: c_fill, g_auto, w_1080, h_1080, f_auto, q_auto</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="cta-box mt-20 text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 bg-[#FF7A30]/10 border border-[#FF7A30]/25 text-[#FF7A30] flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-[#E8DCC8] tracking-tight leading-tight">
            Ready to turn amateur snapshots into catalog assets?
          </h2>
          <p className="text-base sm:text-lg text-[#B8AC96] mt-4 max-w-xl mx-auto leading-relaxed font-normal">
            Start with 50 free high-resolution studio exports. No credit card required. Ingest your first batch in seconds.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-headline text-base font-semibold text-[#14100C] bg-[#FF7A30] hover:bg-[#FF7A30]/90 transition-all duration-300 active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[#B8AC96] font-mono text-xs mt-2">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FF7A30]" />
                <span>Supports PNG, JPG, HEIC, WEBP & RAW</span>
              </span>
              <span className="text-[#E8DCC8]/30">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FF7A30]" />
                <span>Commercial usage rights included</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
