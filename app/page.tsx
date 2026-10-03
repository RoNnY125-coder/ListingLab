"use client";

import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FullscreenBeforeAfterScroll } from "@/components/sections/FullscreenBeforeAfterScroll";
import { NeuralInspectorSection } from "@/components/sections/NeuralInspectorSection";

import { ParametricVortexSection } from "@/components/sections/ParametricVortexSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#14100C] text-[#E8DCC8] overflow-x-hidden">
      {/* 1. Blueprint Grid Framed Hero with 3D Parametric Sculpture */}
      <HeroSection />

      {/* 2. Fullscreen Expanding Before vs After Scroll Section */}
      <FullscreenBeforeAfterScroll />

      {/* 3. Dark Canvas with Giant Watermark & Floating Tool Palettes */}
      <NeuralInspectorSection />


      {/* 5. Parametric Aperture Spiral Vortex Transition */}
      <ParametricVortexSection />

      {/* 6. Core Architecture Features Grid */}
      <FeaturesSection />

      {/* 7. 4-Stage Orchestration Pipeline */}
      <HowItWorksSection />

      {/* 8. Minimalist Editorial Contact & Free Trial Onboarding */}
      <ContactSection />

      {/* 9. Archival Footer */}
      <Footer />
    </main>
  );
}
