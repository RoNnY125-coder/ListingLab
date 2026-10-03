"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  {
    value: "68%",
    label: "Smaller Files",
    description: "Lossless visual fidelity via AVIF & WebP compression",
    highlight: "AVIF / WebP",
  },
  {
    value: "5.2x",
    label: "Faster Listings",
    description: "From raw smartphone snap to live catalog in <2 min",
    highlight: "<2 min turnaround",
  },
  {
    value: "+41%",
    label: "Higher CTR",
    description: "A/B tested across 240,000 marketplace listings",
    highlight: "240k Listings",
  },
  {
    value: "14.8M",
    label: "Photos Polished",
    description: "Trusted by 12,000+ power sellers & top retail brands",
    highlight: "12,000+ Brands",
  },
];

export const StatsStrip: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-surface-dim border-y border-outline py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-outline">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-item flex flex-col items-center sm:items-start text-center sm:text-left ${
                index !== 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-8" : ""
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-beige tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[11px] text-orange uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange/10 border border-orange/20">
                  {stat.highlight}
                </span>
              </div>
              <span className="font-headline text-lg font-semibold text-orange mt-2">
                {stat.label}
              </span>
              <p className="text-xs sm:text-sm text-beige-dim mt-1 max-w-xs leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
