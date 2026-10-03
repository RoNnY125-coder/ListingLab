"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Scissors,
  Sun,
  Crop,
  Tag,
  Zap,
  Terminal,
  Sliders,
  Check,
  Sparkles,
  RotateCcw,
} from "lucide-react";

interface FeatureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  badge: string;
  description: string;
  detail: string;
  metric: string;
}

const features: FeatureItem[] = [
  {
    id: "matting",
    icon: Scissors,
    title: "AI Background Removal",
    badge: "Sub-Pixel Matting",
    description:
      "Sub-pixel edge detection trained on millions of commercial photos. Retains fine hair, shoelaces, and transparent glass.",
    detail: "Edge alpha mask precision down to 0.5px. Zero haloing on dark or reflective backgrounds.",
    metric: "99.8% Matting Accuracy",
  },
  {
    id: "lighting",
    icon: Sun,
    title: "Studio Relighting & Shadows",
    badge: "Physically-Accurate",
    description:
      "Generates physically-accurate contact shadows, rim lights, and soft ambient diffusion matching high-end softbox rigs.",
    detail: "Ray-traced shadow occlusion engine calculates ground elevation and specular reflection.",
    metric: "3D Softbox Simulation",
  },
  {
    id: "cropping",
    icon: Crop,
    title: "Smart Platform Cropping",
    badge: "Marketplace Rules",
    description:
      "One-click dynamic framing adhering to Amazon 85% rules, Shopify square ratios, and luxury auction requirements.",
    detail: "Automatic bounding box centering with customizable percentage margins per catalog category.",
    metric: "1-Click Multi-Ratio",
  },
  {
    id: "seo",
    icon: Tag,
    title: "Auto Tagging & SEO Alt Text",
    badge: "Vision LLM",
    description:
      "Vision models extract brand signatures, silhouette details, and color harmonies for organic search rank.",
    detail: "Generates structured JSON-LD schema, keyword-rich alt tags, and hex color breakdown.",
    metric: "Automated Metadata",
  },
  {
    id: "compression",
    icon: Zap,
    title: "Lossless Compression",
    badge: "AVIF / WebP Pipeline",
    description:
      "AVIF and WebP optimization pipeline delivering fast catalog load speeds without perceptual color shift.",
    detail: "Chroma subsampling preservation ensures product colors match physical items in hand.",
    metric: "82% Size Reduction",
  },
  {
    id: "api",
    icon: Terminal,
    title: "Batch Processing API & CLI",
    badge: "High Volume SLA",
    description:
      "Ingest thousands of SKU shots per day via Webhooks, Zapier, Python SDK, or developer CLI.",
    detail: "Parallel GPU cluster processing up to 500 images per minute per workspace.",
    metric: "500 SKUs / min",
  },
];

export const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFeatureId, setActiveFeatureId] = useState<string>("matting");

  // Interactive Consistency Studio state
  const [bgColor, setBgColor] = useState<"white" | "sand" | "dark">("white");
  const [paddingPercent, setPaddingPercent] = useState<number>(85);
  const [shadowIntensity, setShadowIntensity] = useState<number>(65);
  const [rgbStrictLock, setRgbStrictLock] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".consistency-box", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeFeature = features.find((f) => f.id === activeFeatureId) || features[0];

  const handleResetDefaults = () => {
    setBgColor("white");
    setPaddingPercent(85);
    setShadowIntensity(65);
    setRgbStrictLock(true);
  };

  const getCanvasBgClass = () => {
    if (bgColor === "white") return "bg-white text-black";
    if (bgColor === "sand") return "bg-[#E8DCC8] text-[#14100C]";
    return "bg-[#14100C] text-[#E8DCC8]";
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center py-8 lg:py-12 bg-[#14100C] border-t border-[#E8DCC8]/10 text-[#E8DCC8] relative overflow-hidden"
      id="features"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FF7A30]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header - Sleek without pill badges */}
        <div className="max-w-3xl mb-5">
          <span className="font-mono text-xs text-[#FF7A30] uppercase tracking-widest block mb-1">
            COMMERCIAL CONSISTENCY ENGINE
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-[#E8DCC8] leading-tight">
            Engineered for Commercial Consistency
          </h2>
          <p className="text-xs sm:text-sm text-[#B8AC96] mt-1.5 max-w-2xl leading-relaxed font-normal">
            Built for high-volume merchants, luxury auction houses, and photography studios requiring exact compliance parameters across catalog SKUs.
          </p>
        </div>

        {/* Live Commercial Consistency Interactive Studio Box */}
        <div className="consistency-box bg-[#1D1712] border border-[#E8DCC8]/15 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          {/* Module Selector Pills Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-5 pb-4 border-b border-[#E8DCC8]/10">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isSelected = activeFeatureId === feature.id;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeatureId(feature.id)}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? "bg-[#26201A] border-[#FF7A30] text-[#FF7A30] shadow-md"
                      : "bg-[#14100C]/60 hover:bg-[#26201A] border-[#E8DCC8]/10 text-[#B8AC96] hover:text-[#E8DCC8]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#FF7A30]" : "text-[#B8AC96]"}`} />
                    <span className="font-mono text-[8px] px-1.5 py-0.2 rounded bg-[#14100C]">
                      {feature.badge}
                    </span>
                  </div>
                  <span className="font-headline text-[11px] font-bold truncate block">
                    {feature.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub Header for Selected Module */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8DCC8]/10 mb-5 gap-2">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Sliders className="w-3.5 h-3.5 text-[#FF7A30]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF7A30]">
                  MODULE CONTROLLER
                </span>
              </div>
              <h3 className="font-headline text-base sm:text-lg font-bold text-[#E8DCC8]">
                Active Module: <span className="text-[#FF7A30]">{activeFeature.title}</span>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#B8AC96] hidden sm:inline">
                Preset Rule: <strong className="text-[#E8DCC8]">Amazon 2026 Strict</strong>
              </span>
              <button
                onClick={handleResetDefaults}
                className="px-2.5 py-1 rounded-lg bg-[#26201A] hover:bg-[#FF7A30]/20 text-[#E8DCC8] border border-[#E8DCC8]/15 hover:border-[#FF7A30]/40 font-mono text-[10px] flex items-center gap-1 transition-all active:scale-95"
              >
                <RotateCcw className="w-3 h-3 text-[#FF7A30]" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Controls Panel */}
            <div className="lg:col-span-6 flex flex-col gap-3.5">
              {/* Feature Focus Description */}
              <div className="bg-[#26201A] border border-[#E8DCC8]/10 rounded-xl p-3">
                <span className="text-[9px] font-mono uppercase text-[#FF7A30] block mb-0.5">
                  MODULE TELEMETRY
                </span>
                <p className="text-xs text-[#E8DCC8] leading-relaxed font-normal">
                  {activeFeature.detail}
                </p>
              </div>

              {/* Control 1: Background Tone Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#B8AC96] flex items-center justify-between">
                  <span>1. Target Background Canvas</span>
                  <span className="text-[#FF7A30]">{bgColor.toUpperCase()}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setBgColor("white")}
                    className={`py-1.5 px-2 rounded-lg font-mono text-[10px] flex items-center justify-center gap-1 border transition-all ${
                      bgColor === "white"
                        ? "bg-white text-black border-white shadow-md font-semibold"
                        : "bg-[#26201A] text-[#B8AC96] border-[#E8DCC8]/15 hover:text-[#E8DCC8]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded bg-white border border-gray-300" />
                    <span>Pure White</span>
                  </button>

                  <button
                    onClick={() => setBgColor("sand")}
                    className={`py-1.5 px-2 rounded-lg font-mono text-[10px] flex items-center justify-center gap-1 border transition-all ${
                      bgColor === "sand"
                        ? "bg-[#E8DCC8] text-[#14100C] border-[#E8DCC8] shadow-md font-semibold"
                        : "bg-[#26201A] text-[#B8AC96] border-[#E8DCC8]/15 hover:text-[#E8DCC8]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded bg-[#E8DCC8]" />
                    <span>Studio Sand</span>
                  </button>

                  <button
                    onClick={() => setBgColor("dark")}
                    className={`py-1.5 px-2 rounded-lg font-mono text-[10px] flex items-center justify-center gap-1 border transition-all ${
                      bgColor === "dark"
                        ? "bg-[#14100C] text-[#FF7A30] border-[#FF7A30] shadow-md font-semibold"
                        : "bg-[#26201A] text-[#B8AC96] border-[#E8DCC8]/15 hover:text-[#E8DCC8]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded bg-[#14100C] border border-[#FF7A30]" />
                    <span>Obsidian Dark</span>
                  </button>
                </div>
              </div>

              {/* Control 2: Subject Padding Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="uppercase text-[#B8AC96]">2. Subject Framing Ratio</span>
                  <span className="text-[#FF7A30] font-bold">{paddingPercent}% Coverage</span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="95"
                  value={paddingPercent}
                  onChange={(e) => setPaddingPercent(Number(e.target.value))}
                  className="w-full accent-[#FF7A30] bg-[#26201A] h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Control 3: Contact Shadow Intensity Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="uppercase text-[#B8AC96]">3. Soft Shadow Density</span>
                  <span className="text-[#FF7A30] font-bold">{shadowIntensity}% Opacity</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={shadowIntensity}
                  onChange={(e) => setShadowIntensity(Number(e.target.value))}
                  className="w-full accent-[#FF7A30] bg-[#26201A] h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Control 4: Strict Color Calibration Lock Toggle */}
              <div
                onClick={() => setRgbStrictLock(!rgbStrictLock)}
                className="p-2.5 rounded-xl bg-[#26201A] border border-[#E8DCC8]/10 hover:border-[#FF7A30]/30 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      rgbStrictLock ? "bg-[#FF7A30] text-[#14100C]" : "bg-[#14100C] text-[#B8AC96]"
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#E8DCC8] block">
                      Strict RGB 255 Background Lock
                    </span>
                    <span className="text-[9px] font-mono text-[#B8AC96]">
                      Forces pure white pixels on transparent background borders
                    </span>
                  </div>
                </div>
                <span
                  className={`font-mono text-[9px] px-2 py-0.5 rounded ${
                    rgbStrictLock ? "bg-[#FF7A30]/20 text-[#FF7A30]" : "bg-[#14100C] text-[#B8AC96]"
                  }`}
                >
                  {rgbStrictLock ? "ACTIVE" : "OFF"}
                </span>
              </div>
            </div>

            {/* Visual Simulator Canvas & Real-Time Inspection */}
            <div className="lg:col-span-6">
              <div className="bg-[#14100C] border border-[#E8DCC8]/15 rounded-xl p-3.5 shadow-2xl relative">
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-2 text-[10px] font-mono text-[#B8AC96] border-b border-[#E8DCC8]/10 mb-2.5">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#FF7A30]" />
                    <span>CANVAS SIMULATOR</span>
                  </span>
                  <span className="text-[#FF7A30] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#FF7A30] animate-pulse" />
                    LIVE RENDERING
                  </span>
                </div>

                {/* Simulated Canvas Viewport */}
                <div
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] border border-[#E8DCC8]/20 flex items-center justify-center transition-all duration-300 ${getCanvasBgClass()}`}
                >
                  {/* Grid Overlay Guide Lines */}
                  <div className="absolute inset-0 pointer-events-none border border-dashed border-[#FF7A30]/30 opacity-40 m-2.5 flex items-center justify-center">
                    <span className="absolute top-1 left-2 font-mono text-[8px] text-[#FF7A30] opacity-80">
                      SAFETY MARGIN ({paddingPercent}%)
                    </span>
                  </div>

                  {/* Bounding Frame representing the user slider % */}
                  <div
                    className="relative flex items-center justify-center transition-all duration-300"
                    style={{
                      width: `${paddingPercent}%`,
                      height: `${paddingPercent}%`,
                    }}
                  >
                    {/* Shadow Layer under product */}
                    <div
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full blur-md bg-black transition-opacity duration-200 pointer-events-none"
                      style={{
                        width: "80%",
                        height: "18%",
                        opacity: shadowIntensity / 100,
                      }}
                    />

                    {/* Product Image preview */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/trailblazer.jpg"
                      alt="Sample SKU Preview"
                      className="w-full h-full object-contain relative z-10 filter drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Bottom Real-time Telemetry Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2.5 border-t border-[#E8DCC8]/10 text-center font-mono">
                  <div className="bg-[#1D1712] p-1.5 rounded-lg border border-[#E8DCC8]/10">
                    <span className="text-[8px] uppercase text-[#B8AC96] block">Delta-E Shift</span>
                    <span className="text-[11px] font-bold text-[#E8DCC8]">&lt; 0.18</span>
                  </div>

                  <div className="bg-[#1D1712] p-1.5 rounded-lg border border-[#E8DCC8]/10">
                    <span className="text-[8px] uppercase text-[#B8AC96] block">Coverage</span>
                    <span className="text-[11px] font-bold text-[#FF7A30]">{paddingPercent}%</span>
                  </div>

                  <div className="bg-[#1D1712] p-1.5 rounded-lg border border-[#E8DCC8]/10">
                    <span className="text-[8px] uppercase text-[#B8AC96] block">Compliance</span>
                    <span className="text-[11px] font-bold text-green-400">100% PASS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};