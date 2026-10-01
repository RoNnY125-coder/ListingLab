"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowRight } from "lucide-react";

const HeroSculptureDynamic = dynamic(
  () => import("@/components/3d/HeroSculpture"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] flex items-center justify-center">
        <div className="w-48 h-48 bg-[#FF7A30]/20 blur-2xl animate-pulse" />
      </div>
    ),
  }
);

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#14100C] text-[#E8DCC8] p-3 sm:p-6 lg:p-8 flex items-center justify-center overflow-hidden">
      {/* Outer Studio Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[1000px] h-[750px] bg-radial-gradient from-[#FF7A30]/20 via-[#FF7A30]/10 to-transparent blur-[160px] opacity-60" />
      </div>

      {/* Framed Canvas Blueprint Container */}
      <div className="relative z-10 w-full max-w-[1560px] min-h-[92vh] bg-[#E8DCC8] text-[#14100C] rounded-2xl shadow-2xl border border-[#14100C]/15 flex flex-col justify-between overflow-hidden">
        {/* Top Blueprint Grid Header */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 border-b border-[#14100C]/15 text-[11px] font-mono uppercase tracking-widest">
          {/* Brand */}
          <div className="p-4 sm:p-6 border-r border-[#14100C]/15 flex items-center justify-between">
            <Link href="#" className="font-bold text-sm tracking-tight text-[#14100C] font-headline">
              LISTINGLAB
            </Link>
          </div>

          {/* Abilities */}
          <div className="hidden md:flex p-4 sm:p-6 border-r border-[#14100C]/15 items-center justify-between">
            <Link href="#abilities" className="hover:text-[#FF7A30] transition-colors">
              ABILITIES
            </Link>
          </div>

          {/* How It Works */}
          <div className="hidden md:flex p-4 sm:p-6 border-r border-[#14100C]/15 items-center justify-between">
            <Link href="#how-it-works" className="hover:text-[#FF7A30] transition-colors">
              HOW IT WORKS
            </Link>
          </div>

          {/* Contacts */}
          <div className="p-4 sm:p-6 flex items-center justify-between col-span-1">
            <Link
              href="#contact"
              className="font-medium text-[#14100C] hover:text-[#FF7A30] transition-colors flex items-center gap-2"
            >
              <span>CONTACTS</span>
              <span className="w-1.5 h-1.5 bg-[#FF7A30]" />
            </Link>
          </div>
        </div>

        {/* Middle Main Viewport with Blueprint Quadrants */}
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          {/* Left Side: 3D Parametric Sculpture + Vertical Label */}
          <div className="lg:col-span-6 relative border-b lg:border-b-0 lg:border-r border-[#14100C]/15 flex flex-col justify-between p-6 sm:p-8">
            <div className="text-[10px] font-mono tracking-widest text-[#14100C]/60 uppercase">
              CREATIVITY POWERED BY CODE
            </div>

            {/* Central 3D Sculpture */}
            <div className="my-auto w-full h-[360px] sm:h-[440px] flex items-center justify-center">
              <HeroSculptureDynamic />
            </div>

            {/* Bottom Brand Title */}
            <div className="mt-4">
              <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-[#14100C] leading-[0.9]">
                Meet ListingLab
              </h1>
            </div>
          </div>

          {/* Right Side: Editorial Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative">
            {/* Top Right Scroll Ticker */}
            <div className="flex justify-end items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#14100C]/60">
              <span>SCROLL DOWN</span>
              <ArrowDown className="w-3 h-3 animate-bounce text-[#FF7A30]" />
            </div>

            {/* Center Editorial Manifesto */}
            <div className="my-auto max-w-xl">
              <p className="font-headline text-2xl sm:text-3xl lg:text-4xl text-[#14100C] font-normal leading-[1.25] tracking-tight">
                ListingLab leverages <strong className="font-semibold text-[#FF7A30]">Design-as-Code</strong>, transforming raw photos into adaptable, studio-grade assets for global commerce.
              </p>
              <p className="font-body text-sm sm:text-base text-[#14100C]/70 mt-6 leading-relaxed">
                Online brands waste hours per week retouching catalog photos. Our intelligent pipeline harmonizes dynamic lighting, clean isolation, and strict platform guidelines — unlocking <strong className="text-[#FF7A30]">your revenue potential</strong>.
              </p>

              {/* Action Buttons - Minimalist Rectangular Design */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="#before-after-fullscreen"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#14100C] text-[#E8DCC8] text-xs font-mono uppercase tracking-wider hover:bg-[#FF7A30] hover:text-[#14100C] transition-all duration-300 shadow-md border border-[#14100C]"
                >
                  <span>Explore Transformation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-5 py-3 border border-[#14100C]/30 text-[#14100C] text-xs font-mono uppercase tracking-wider hover:border-[#14100C] transition-all"
                >
                  <span>Start Free Trial</span>
                </Link>
              </div>
            </div>

            <div className="border-t border-[#14100C]/15 pt-4 text-[10px] font-mono text-[#14100C]/50 uppercase flex justify-between">
              <span>DESIGN-AS-CODE</span>
              <span>STUDIO QUALITY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
