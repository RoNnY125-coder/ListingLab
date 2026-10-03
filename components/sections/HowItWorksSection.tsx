"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UploadCloud, Loader2,
  Cpu,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  FileCode,
  Copy,
  Check,
  Download,
  Eye,
} from "lucide-react";

interface PipelineStep {
  id: string;
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: "ingest",
    num: "01",
    tag: "RAW INGESTION",
    title: "Bulk Photo Ingestion",
    subtitle: "Upload smartphone captures, RAW DSLR rolls, or S3 cloud archives.",
    description:
      "Automated EXIF analysis extracts camera sensor data, lens profiles, exposure parameters, and color temperature profiles.",
  },
  {
    id: "calibrate",
    num: "02",
    tag: "NEURAL SYNTHESIS",
    title: "Neural Matting & Relighting",
    subtitle: "Sub-pixel background isolation, edge refining, and 3D softbox raytracing.",
    description:
      "Generative neural networks separate the core SKU object, synthesize soft ambient contact shadows, and polish specular highlights.",
  },
  {
    id: "compliance",
    num: "03",
    tag: "RULE ENGINE",
    title: "Marketplace Compliance Rules",
    subtitle: "One-click adherence to strict Amazon, Shopify, eBay, and luxury specs.",
    description:
      "Enforces pure white background standards (RGB 255,255,255), 85% frame filling boundaries, and multi-ratio crop formats.",
  },
  {
    id: "deliver",
    num: "04",
    tag: "CATALOG DEPLOYMENT",
    title: "API Sync & Catalog Delivery",
    subtitle: "Instant Webhook events, CDN links, and automated storefront publishing.",
    description:
      "Download high-res AVIF/WebP packages or trigger automatic sync directly into your Shopify catalog or ERP via developer API.",
  },
];

export const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const [processedUrls, setProcessedUrls] = useState<any>(null);
  const [rawImageUrl, setRawImageUrl] = useState<string>("/images/trailblazer.jpg");

  const [sizeSavedPct, setSizeSavedPct] = useState<number>(0);
  const [uploadMetadata, setUploadMetadata] = useState<any>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setRawImageUrl(objectUrl);
    setUploadedImageId(null);
    setProcessedUrls(null);
    setIsUploading(true);
    setUploadMetadata(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) throw new Error(uploadData.detail || "Upload failed");

      setUploadedImageId(uploadData.publicId);
      setUploadMetadata(uploadData);

      const processRes = await fetch(`http://localhost:8000/api/process?publicId=${uploadData.publicId}`);
      const processData = await processRes.json();

      if (!processRes.ok) throw new Error(processData.detail || "Process failed");

      setProcessedUrls(processData.urls);
      setSizeSavedPct(processData.sizeSavedPct ?? 0);
      // Auto-advance to Stage 02 to show real results
      setActiveStepIdx(1);
    } catch (err) {
      console.error(err);
      alert("Failed to upload and process image. Make sure the backend is running and Cloudinary credentials are configured in .env");
    } finally {
      setIsUploading(false);
    }
  };


  // Stage 2 Layer Toggle States
  const [showAlphaMask, setShowAlphaMask] = useState<boolean>(true);
  const [showContactShadow, setShowContactShadow] = useState<boolean>(true);
  const [showRelighting, setShowRelighting] = useState<boolean>(true);

  // Stage 3 Platform Selector State
  const [selectedPlatform, setSelectedPlatform] = useState<"amazon" | "shopify" | "chrono24">(
    "amazon"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".step-nav-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeStep = pipelineSteps[activeStepIdx];

  const handleCopyApi = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center py-8 lg:py-12 bg-[#14100C] border-t border-[#E8DCC8]/10 text-[#E8DCC8] relative overflow-hidden"
      id="how-it-works"
    >
      {/* Background Ambient Circle */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF7A30]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header - Sleek without pill tags */}
        <div className="max-w-3xl mb-5">
          <span className="font-mono text-xs text-[#FF7A30] uppercase tracking-widest block mb-1">
            4-STAGE ORCHESTRATION PIPELINE
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-[#E8DCC8] leading-tight">
            From Raw Photo to Live Listing
          </h2>
          <p className="text-xs sm:text-sm text-[#B8AC96] mt-1.5 font-normal leading-relaxed">
            Four streamlined stages designed for high-volume catalog pipelines.
          </p>
        </div>

        {/* 4 Pipeline Steps Navigation Grid - 4 Columns Always Visible */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          {pipelineSteps.map((step, idx) => {
            const isActive = activeStepIdx === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIdx(idx)}
                className={`step-nav-card text-left cursor-pointer rounded-xl p-3.5 border transition-all duration-200 flex flex-col justify-between group ${
                  isActive
                    ? "bg-[#26201A] border-[#FF7A30] ring-1 ring-[#FF7A30]/50 shadow-xl"
                    : "bg-[#1D1712] hover:bg-[#26201A] border-[#E8DCC8]/15 hover:border-[#FF7A30]/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-headline text-lg font-bold font-mono text-[#FF7A30]">
                      {step.num}
                    </span>
                    <span
                      className={`font-mono text-[8px] uppercase px-1.5 py-0.2 rounded border ${
                        isActive
                          ? "bg-[#FF7A30]/20 text-[#FF7A30] border-[#FF7A30]/40 font-semibold"
                          : "bg-[#14100C] text-[#B8AC96] border-[#E8DCC8]/10"
                      }`}
                    >
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="font-headline text-xs sm:text-sm font-bold text-[#E8DCC8] mb-0.5 truncate">
                    {step.title}
                  </h3>
                  <p className="text-[10px] text-[#B8AC96] line-clamp-1 leading-normal font-normal">
                    {step.subtitle}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-[#E8DCC8]/10 flex items-center justify-between font-mono text-[8px] text-[#B8AC96]">
                  <span>STAGE {step.num} / 04</span>
                  <span className={isActive ? "text-[#FF7A30]" : "group-hover:text-[#E8DCC8]"}>
                    {isActive ? "Active View" : "Select →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Interactive Viewport Container */}
        <div className="bg-[#1D1712] border border-[#E8DCC8]/15 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">

          {/* Live Processing Status Banner */}
          {isUploading && (
            <div className="mb-4 p-2.5 rounded-xl bg-[#FF7A30]/10 border border-[#FF7A30]/40 flex items-center gap-2 font-mono text-[10px] text-[#FF7A30]">
              <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
              <span>Uploading to Cloudinary and running neural processing pipeline... please wait</span>
            </div>
          )}
          {!isUploading && processedUrls && (
            <div className="mb-4 p-2.5 rounded-xl bg-green-500/10 border border-green-500/40 flex items-center justify-between gap-2 font-mono text-[10px] text-green-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                Pipeline complete — all 4 stages ready with your image
              </span>
              {sizeSavedPct > 0 && <span className="text-green-300 font-semibold">{sizeSavedPct}% size saved</span>}
            </div>
          )}

          {/* Top Bar for Viewport */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8DCC8]/10 mb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded bg-[#FF7A30] text-[#14100C] font-mono text-xs font-bold flex items-center justify-center">
                {activeStep.num}
              </span>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF7A30] block">
                  ORCHESTRATION PIPELINE • {activeStep.tag}
                </span>
                <h3 className="font-headline text-base sm:text-lg font-bold text-[#E8DCC8]">
                  {activeStep.title}
                </h3>
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                disabled={activeStepIdx === 0}
                onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
                className="px-2.5 py-1 rounded bg-[#26201A] hover:bg-[#FF7A30]/20 text-[#E8DCC8] disabled:opacity-40 border border-[#E8DCC8]/15 font-mono text-[10px] flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>Prev</span>
              </button>
              <button
                disabled={activeStepIdx === pipelineSteps.length - 1}
                onClick={() => setActiveStepIdx((prev) => Math.min(pipelineSteps.length - 1, prev + 1))}
                className="px-2.5 py-1 rounded bg-[#FF7A30] text-[#14100C] hover:bg-[#FF7A30]/80 disabled:opacity-40 font-mono text-[10px] font-semibold flex items-center gap-1 transition-all"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* DYNAMIC STAGE CONTENT VIEWER */}

          {/* STAGE 01: INGESTION */}
          {activeStepIdx === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-5 flex flex-col gap-3.5">
                <div>
                  <h4 className="font-headline text-sm font-bold text-[#E8DCC8] mb-1">
                    Multi-Source RAW Ingestion Engine
                  </h4>
                  <p className="text-xs text-[#B8AC96] leading-relaxed">
                    {activeStep.description}
                  </p>
                </div>

                {/* Interactive Dropzone */}
                <label className="border border-dashed border-[#FF7A30]/40 rounded-xl p-3 bg-[#14100C]/60 flex flex-col items-center text-center group hover:border-[#FF7A30] transition-colors cursor-pointer relative overflow-hidden">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                  <div className="w-8 h-8 bg-[#26201A] text-[#FF7A30] flex items-center justify-center mb-1.5 border border-[#E8DCC8]/10 group-hover:scale-105 transition-transform">
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                  </div>
                  <span className="font-headline text-xs font-semibold text-[#E8DCC8]">
                    {isUploading ? "Uploading & Processing..." : "Click to Upload Photo"}
                  </span>
                  <span className="font-mono text-[9px] text-[#B8AC96] mt-0.5">
                    Supports up to 10MB (JPEG, PNG, HEIC, WebP)
                  </span>
                </label>

                {/* Simulated EXIF Telemetry Card */}
                <div className="bg-[#26201A] border border-[#E8DCC8]/10 rounded-xl p-2.5 font-mono text-xs flex flex-col gap-1">
                  <span className="text-[8px] text-[#FF7A30] uppercase block">
                    CAMERA EXIF TELEMETRY DETECTED
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-[#B8AC96] text-[10px]">
                    <div>
                      <span>Sensor: </span>
                      <strong className="text-[#E8DCC8]">{uploadMetadata?.cameraModel || "Full Frame CMOS"}</strong>
                    </div>
                    <div>
                      <span>Lens: </span>
                      <strong className="text-[#E8DCC8]">{uploadMetadata?.lens || "50mm f/1.8 Prime"}</strong>
                    </div>
                    <div>
                      <span>Resolution: </span>
                      <strong className="text-[#E8DCC8]">{uploadMetadata?.resolution || "6000 x 4000"}</strong>
                    </div>
                    <div>
                      <span>File Format: </span>
                      <strong className="text-[#FF7A30]">{uploadMetadata?.format || "CR3 RAW"} ({uploadMetadata?.bytes ? (uploadMetadata.bytes / 1024 / 1024).toFixed(1) : "42.8"}MB)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 1 Right: Visual Ingest Preview */}
              <div className="lg:col-span-7">
                <div className="bg-[#14100C] border border-[#E8DCC8]/15 rounded-xl p-3.5 shadow-2xl relative">
                  <div className="flex items-center justify-between pb-1.5 text-[10px] font-mono text-[#B8AC96] border-b border-[#E8DCC8]/10 mb-2.5">
                    <span>IMAGE ANALYZER || INGESTED RAW FILE</span>
                    <span className="text-[#FF7A30]">STATUS: SCANNED</span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rawImageUrl} alt="Raw Input Capture" className="absolute left-0 top-0 h-full w-full object-cover filter brightness-95" />

                    {/* Scan Line Animation Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FF7A30]/20 via-transparent to-transparent h-8 w-full animate-pulse border-b border-[#FF7A30]" />

                    {/* Telemetry Tag */}
                    <div className="absolute bottom-2 left-2 bg-[#14100C]/85 backdrop-blur-md px-2 py-0.5 rounded border border-[#E8DCC8]/20 font-mono text-[8px] text-[#E8DCC8] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-yellow-400 animate-ping" />
                      <span>Cluttered outdoor trail detected • Matting Pass queued</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 02: NEURAL CALIBRATION */}
          {activeStepIdx === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-5 flex flex-col gap-3.5">
                <div>
                  <h4 className="font-headline text-sm font-bold text-[#E8DCC8] mb-1">
                    Neural Matting & Layer Segmentation
                  </h4>
                  <p className="text-xs text-[#B8AC96] leading-relaxed">
                    Toggle individual neural processing layers below to inspect how ListingLab builds studio depth.
                  </p>
                </div>

                {/* Layer Control Toggles */}
                <div className="flex flex-col gap-1.5 font-mono text-[10px]">
                  <div
                    onClick={() => setShowAlphaMask(!showAlphaMask)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                      showAlphaMask
                        ? "bg-[#26201A] border-[#FF7A30] text-[#FF7A30]"
                        : "bg-[#14100C] border-[#E8DCC8]/15 text-[#B8AC96]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Eye className="w-3 h-3" />
                      <span>Layer 1: Sub-Pixel Alpha Matting Mask</span>
                    </div>
                    <span className="text-[8px] px-1.5 py-0.2 rounded bg-[#14100C]">
                      {showAlphaMask ? "ON" : "OFF"}
                    </span>
                  </div>

                  <div
                    onClick={() => setShowContactShadow(!showContactShadow)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                      showContactShadow
                        ? "bg-[#26201A] border-[#FF7A30] text-[#FF7A30]"
                        : "bg-[#14100C] border-[#E8DCC8]/15 text-[#B8AC96]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3 h-3" />
                      <span>Layer 2: Ground Contact Shadow Synthesis</span>
                    </div>
                    <span className="text-[8px] px-1.5 py-0.2 rounded bg-[#14100C]">
                      {showContactShadow ? "ON" : "OFF"}
                    </span>
                  </div>

                  <div
                    onClick={() => setShowRelighting(!showRelighting)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                      showRelighting
                        ? "bg-[#26201A] border-[#FF7A30] text-[#FF7A30]"
                        : "bg-[#14100C] border-[#E8DCC8]/15 text-[#B8AC96]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3 h-3" />
                      <span>Layer 3: Studio Softbox Rim Relighting</span>
                    </div>
                    <span className="text-[8px] px-1.5 py-0.2 rounded bg-[#14100C]">
                      {showRelighting ? "ON" : "OFF"}
                    </span>
                  </div>
                </div>

                <div className="bg-[#26201A] p-2.5 rounded-xl border border-[#E8DCC8]/10 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#B8AC96]">Neural Edge Confidence</span>
                  <span className="text-[#FF7A30] font-bold">99.82% Confidence</span>
                </div>
              </div>

              {/* Stage 2 Right: Layered Output Viewport */}
              <div className="lg:col-span-7">
                <div className="bg-[#14100C] border border-[#E8DCC8]/15 rounded-xl p-3.5 shadow-2xl relative">
                  <div className="flex items-center justify-between pb-1.5 text-[10px] font-mono text-[#B8AC96] border-b border-[#E8DCC8]/10 mb-2.5">
                    <span>LAYER COMPOSITOR VIEWPORT</span>
                    <span className="text-[#FF7A30]">CALIBRATED</span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-white flex items-center justify-center p-3">
                    {/* Optional Alpha Mask Wireframe indicator */}
                    {showAlphaMask && (
                      <div className="absolute inset-0 border-2 border-dashed border-[#FF7A30] m-2.5 pointer-events-none rounded-lg z-20 opacity-70">
                        <span className="absolute top-1.5 left-1.5 bg-[#FF7A30] text-[#14100C] font-mono text-[8px] px-1 py-0.2 font-bold rounded">
                          SUB-PIXEL ALPHA CONTOUR
                        </span>
                      </div>
                    )}

                    {/* Contact Shadow Simulation Layer */}
                    {showContactShadow && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full bg-black/40 blur-lg pointer-events-none" />
                    )}

                    {/* Processed Studio Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={processedUrls?.optimized || rawImageUrl} alt="Calibrated Studio Output" className={`w-full h-full object-contain relative z-10 transition-all ${showRelighting ? "brightness-105 contrast-105" : ""}`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 03: MARKETPLACE COMPLIANCE */}
          {activeStepIdx === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-5 flex flex-col gap-3.5">
                <div>
                  <h4 className="font-headline text-sm font-bold text-[#E8DCC8] mb-1">
                    Multi-Channel Marketplace Compliance
                  </h4>
                  <p className="text-xs text-[#B8AC96] leading-relaxed">
                    Select a target storefront standard below to inspect automatic rule enforcement.
                  </p>
                </div>

                {/* Platform Spec Tabs */}
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setSelectedPlatform("amazon")}
                    className={`py-1.5 px-1 rounded font-mono text-[10px] text-center border transition-all ${
                      selectedPlatform === "amazon"
                        ? "bg-[#FF7A30] text-[#14100C] border-[#FF7A30] font-bold"
                        : "bg-[#26201A] text-[#B8AC96] border-[#E8DCC8]/15 hover:text-[#E8DCC8]"
                    }`}
                  >
                    Amazon Pure
                  </button>
                  <button
                    onClick={() => setSelectedPlatform("shopify")}
                    className={`py-1.5 px-1 rounded font-mono text-[10px] text-center border transition-all ${
                      selectedPlatform === "shopify"
                        ? "bg-[#FF7A30] text-[#14100C] border-[#FF7A30] font-bold"
                        : "bg-[#26201A] text-[#B8AC96] border-[#E8DCC8]/15 hover:text-[#E8DCC8]"
                    }`}
                  >
                    Shopify Plus
                  </button>
                  <button
                    onClick={() => setSelectedPlatform("chrono24")}
                    className={`py-1.5 px-1 rounded font-mono text-[10px] text-center border transition-all ${
                      selectedPlatform === "chrono24"
                        ? "bg-[#FF7A30] text-[#14100C] border-[#FF7A30] font-bold"
                        : "bg-[#26201A] text-[#B8AC96] border-[#E8DCC8]/15 hover:text-[#E8DCC8]"
                    }`}
                  >
                    Chrono24 / Luxury
                  </button>
                </div>

                {/* Live Compliance Checklist */}
                <div className="bg-[#26201A] border border-[#E8DCC8]/10 rounded-xl p-3 flex flex-col gap-1.5 font-mono text-[10px]">
                  <span className="text-[8px] text-[#FF7A30] uppercase font-semibold">
                    SPECS CHECKLIST FOR {selectedPlatform.toUpperCase()}
                  </span>

                  <div className="flex items-center justify-between text-[#E8DCC8]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span>Background Color Standards</span>
                    </span>
                    <span className="text-[#B8AC96] text-[9px]">
                      {selectedPlatform === "amazon"
                        ? "Pure White #FFFFFF"
                        : selectedPlatform === "shopify"
                        ? "Studio Soft Neutral"
                        : "Obsidian Dark"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#E8DCC8]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span>Product Frame Coverage</span>
                    </span>
                    <span className="text-[#B8AC96] text-[9px]">
                      {selectedPlatform === "amazon" ? "85% Target Ratio" : "80% Square Fit"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#E8DCC8]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span>Minimum Dimension Boundary</span>
                    </span>
                    <span className="text-[#B8AC96] text-[9px]">2000 x 2000 px</span>
                  </div>
                </div>
              </div>

              {/* Stage 3 Right: Spec Framing Output */}
              <div className="lg:col-span-7">
                <div className="bg-[#14100C] border border-[#E8DCC8]/15 rounded-xl p-3.5 shadow-2xl relative">
                  <div className="flex items-center justify-between pb-1.5 text-[10px] font-mono text-[#B8AC96] border-b border-[#E8DCC8]/10 mb-2.5">
                    <span>SPECIFICATION VALIDATION FRAME</span>
                    <span className="text-green-400 font-semibold">100% COMPLIANT</span>
                  </div>

                  <div
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border flex items-center justify-center p-3 ${
                      selectedPlatform === "amazon"
                        ? "bg-white text-black border-gray-200"
                        : selectedPlatform === "shopify"
                        ? "bg-[#F4F1EA] text-black border-[#E8DCC8]"
                        : "bg-[#14100C] text-white border-[#FF7A30]/30"
                    }`}
                  >
                    {/* Bounding box guide overlay */}
                    <div className="absolute inset-0 border border-dashed border-[#FF7A30]/60 m-3 flex items-center justify-center pointer-events-none">
                      <span className="absolute top-1 left-2 bg-[#FF7A30] text-[#14100C] text-[8px] font-mono font-bold px-1.5 py-0.2 rounded">
                        85% MARGIN CHECK
                      </span>
                    </div>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedPlatform === "amazon" ? (processedUrls?.marketplace || rawImageUrl) : selectedPlatform === "shopify" ? (processedUrls?.feed || rawImageUrl) : (processedUrls?.instagram || rawImageUrl)} alt="Marketplace Compliant Product" className="w-4/5 h-4/5 object-contain relative z-10" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 04: CATALOG DELIVERY */}
          {activeStepIdx === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-6 flex flex-col gap-3.5">
                <div>
                  <h4 className="font-headline text-sm font-bold text-[#E8DCC8] mb-1">
                    Developer API Payload & Direct Export
                  </h4>
                  <p className="text-xs text-[#B8AC96] leading-relaxed">
                    ListingLab dispatches instant Webhooks and dispatches optimized 4K WebP and AVIF assets directly to your store CDN.
                  </p>
                </div>

                {/* API Code Snippet Inspector */}
                <div className="bg-[#14100C] border border-[#E8DCC8]/15 rounded-xl p-3 font-mono text-[10px] relative">
                  <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-[#E8DCC8]/10 text-[#B8AC96]">
                    <span className="flex items-center gap-1">
                      <FileCode className="w-3 h-3 text-[#FF7A30]" />
                      <span>REST API PAYLOAD RESPONSE</span>
                    </span>
                    <button
                      onClick={handleCopyApi}
                      className="flex items-center gap-1 text-[#FF7A30] hover:text-[#E8DCC8] transition-colors text-[9px]"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? "Copied" : "Copy cURL"}</span>
                    </button>
                  </div>

                  <pre className="text-[9px] text-[#E8DCC8] overflow-x-auto leading-relaxed whitespace-pre-wrap">
{JSON.stringify({
  status: "published",
  publicId: uploadedImageId || "sample-id",
  urls: processedUrls || {
    original: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    optimized: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample",
    marketplace: "https://res.cloudinary.com/demo/image/upload/w_2000,h_2000,c_pad,b_white/sample",
  },
}, null, 2)}
                  </pre>
                </div>

                {/* Webhook Log */}
                <div className="bg-[#26201A] p-2 rounded-xl border border-[#E8DCC8]/10 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#B8AC96] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span>Webhook Status:</span>
                  </span>
                  <span className="text-green-400 font-bold">200 OK • Shopify Synced</span>
                </div>
              </div>

              {/* Stage 4 Right: Direct Asset Package Export */}
              <div className="lg:col-span-6">
                <div className="bg-[#14100C] border border-[#E8DCC8]/15 rounded-xl p-3.5 shadow-2xl flex flex-col gap-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#E8DCC8]/10 font-mono text-[10px]">
                    <span className="text-[#E8DCC8] font-bold">CATALOG EXPORT PACKAGE</span>
                    <span className="text-[#FF7A30]">READY</span>
                  </div>

                  {/* Asset Format 1 */}
                  <div className="p-2.5 rounded-lg bg-[#1D1712] border border-[#E8DCC8]/10 flex items-center justify-between">
                    <div>
                      <span className="font-headline text-xs font-semibold text-[#E8DCC8] block">
                        4K Lossless AVIF Archive
                      </span>
                      <span className="font-mono text-[9px] text-[#B8AC96]">
                        118 KB • RGB 255 Verified
                      </span>
                    </div>
                    <a href={processedUrls?.marketplace || "#"} download target="_blank" rel="noreferrer" className="px-2 py-1 rounded bg-[#FF7A30] text-[#14100C] font-mono text-[9px] font-semibold flex items-center gap-1 transition-all">
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </a>
                  </div>

                  {/* Asset Format 2 */}
                  <div className="p-2.5 rounded-lg bg-[#1D1712] border border-[#E8DCC8]/10 flex items-center justify-between">
                    <div>
                      <span className="font-headline text-xs font-semibold text-[#E8DCC8] block">
                        Transparent PNG Matting Mask
                      </span>
                      <span className="font-mono text-[9px] text-[#B8AC96]">
                        380 KB • Sub-Pixel Alpha
                      </span>
                    </div>
                    <a href={processedUrls?.optimized || "#"} download target="_blank" rel="noreferrer" className="px-2 py-1 rounded bg-[#26201A] text-[#E8DCC8] border border-[#E8DCC8]/15 font-mono text-[9px] flex items-center gap-1 transition-all">
                      <Download className="w-3 h-3 text-[#FF7A30]" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};