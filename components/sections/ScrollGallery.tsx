"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

export const galleryCards = [
  {
    id: "sneakers",
    title: "Streetwear & Footwear",
    badge: "Shopify Ready",
    useCustomCrop: true,
    imgSrc: "/images/trailblazer.jpg",
    beforeTag: "Muddy Trail RAW",
    afterTag: "Studio Staged",
    chips: ["Smart Alpha Mask", "AI Pedestal Gen", "q_auto:95"],
  },
  {
    id: "watches",
    title: "Horology & Fine Watches",
    badge: "Chrono24 Pass",
    beforeImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyBQmbF6fcABo3MvQw696FvPSL6QWGDZGTqGfx5On8XJRE5HMnJwo5ahM8Hj59PMUgaGcSRe6IMoSUWt0LHk6-9KpeCW1b1Li0a7_ADQgm3-FIcGtpex8OkaPYXM_18518eka3vA8Vmt5sDCQgMB5MQ3fGpFw492Nmuxqp5KvAq3F7qnNzo4ABd5XYBvX8IAKHcjWO3R_--s4Fxbtyh_PYYuRgK_PSa4GGDPaWzoeelPidSl6MVoWi",
    afterImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBboKy_HRfzp-jtWq11x566_t6XJD0v5TcVemtfHGMlf_3z_nWmKwK6KjmOeMXUjxLCUUMO_1B1CBcC8u2cWCdLYVK-PApujOEpYw-F4bXrFKzptw57LVbqSROPE69LCEuEua8A5kO2c0iOsavf5UL9bH-IHzTYkbr_tslQxl6Kmz2YL4DXYhK6Lpd_WT_cQ4NkoAtcBCKECkzqhmLQbdiImYJbJwZ26yAUXZkleNSWnSLFwgMyXw8C",
    beforeTag: "Harsh Desk Glare",
    afterTag: "Obsidian Pedestal",
    chips: ["Dial Specular Polish", "4K Micro Detail", "Zero Halo"],
  },
  {
    id: "handbags",
    title: "Leather Goods & Bags",
    badge: "Amazon RGB 255",
    beforeImg:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    beforeTag: "Flat Storage Snap",
    afterTag: "Studio Pure White",
    chips: ["Amazon White Spec", "Hardware Highlight", "Strap Detangling"],
  },
  {
    id: "jewelry",
    title: "Fine Jewelry & Gemstones",
    badge: "Etsy Trending",
    beforeImg:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    beforeTag: "Low-Light Phone Snap",
    afterTag: "Macro Sparkle Stack",
    chips: ["Prism Dispersion", "Macro Focus Stacking", "Blemish Removal"],
  },
  {
    id: "electronics",
    title: "Consumer Electronics",
    badge: "eBay Top Rated",
    beforeImg:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    beforeTag: "Scuffed Desk Snapshot",
    afterTag: "Matte Studio Relight",
    chips: ["Dust & Scuff Wipe", "Matte Finish Uniform", "Batch Sync"],
  },
];

export const ScrollGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const getScrollDistance = () => {
          return track.scrollWidth - window.innerWidth + 160;
        };

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollDistance() + 400}`,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setOffsets((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleMouseLeave = (id: string) => {
    setOffsets((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  const scrollManual = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -440 : 440;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full h-[100vh] py-8 lg:py-12 bg-[#14100C] overflow-hidden relative flex flex-col justify-center text-[#E8DCC8]"
      id="showcase"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-[#FF7A30] uppercase tracking-widest block mb-2">
            PARALLAX SHOWCASE
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8DCC8] tracking-tight">
            Raw to Retail in Real-Time
          </h2>
          <p className="text-sm sm:text-base text-[#B8AC96] mt-2 max-w-xl leading-relaxed font-normal">
            Watch unedited seller photos transform across top global marketplace standards.
          </p>
        </div>

        {/* Manual swipe buttons for mobile / tablet */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => scrollManual("left")}
            className="w-10 h-10 bg-[#1D1712] hover:bg-[#26201A] text-[#E8DCC8] border border-[#E8DCC8]/15 flex items-center justify-center transition-all active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollManual("right")}
            className="w-10 h-10 bg-[#1D1712] hover:bg-[#26201A] text-[#E8DCC8] border border-[#E8DCC8]/15 flex items-center justify-center transition-all active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 scrollbar-none snap-x snap-mandatory lg:snap-none will-change-transform"
        >
          {galleryCards.map((card) => {
            const offset = offsets[card.id] || { x: 0, y: 0 };

            return (
              <div
                key={card.id}
                onMouseMove={(e) => handleMouseMove(e, card.id)}
                onMouseLeave={() => handleMouseLeave(card.id)}
                className="gallery-card min-w-[320px] sm:min-w-[440px] lg:min-w-[500px] shrink-0 snap-center bg-[#1D1712] border border-[#E8DCC8]/15 hover:border-[#FF7A30]/40 rounded-2xl p-5 shadow-2xl flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-headline text-lg sm:text-xl font-bold text-[#E8DCC8]">
                      {card.title}
                    </span>
                    <span className="font-mono text-[10px] px-2.5 py-1 bg-[#26201A] border border-[#FF7A30]/30 text-[#FF7A30]">
                      {card.badge}
                    </span>
                  </div>

                  {/* Card Visual with Cursor Parallax - REAL PHOTOS ONLY */}
                  <div
                    className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden aspect-[4/3] relative border border-[#E8DCC8]/15 transition-transform duration-200 ease-out"
                    style={{
                      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
                    }}
                  >
                    {card.useCustomCrop ? (
                      <>
                        <div className="relative bg-[#14100C] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.imgSrc}
                            alt="Raw photo"
                            className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover object-left group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#14100C]/85 backdrop-blur-md text-[10px] font-mono text-red-400 border border-[#E8DCC8]/20">
                            {card.beforeTag}
                          </span>
                        </div>
                        <div className="relative bg-[#14100C] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.imgSrc}
                            alt="Studio photograph"
                            className="absolute right-0 top-0 h-full w-[200%] max-w-none object-cover object-right group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#14100C]/85 backdrop-blur-md text-[10px] font-mono text-[#FF7A30] border border-[#FF7A30]/40 font-medium">
                            {card.afterTag}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative bg-[#14100C] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.beforeImg}
                            alt="Raw photo"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#14100C]/85 backdrop-blur-md text-[10px] font-mono text-red-400 border border-[#E8DCC8]/20">
                            {card.beforeTag}
                          </span>
                        </div>
                        <div className="relative bg-[#14100C] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.afterImg}
                            alt="Studio photograph"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#14100C]/85 backdrop-blur-md text-[10px] font-mono text-[#FF7A30] border border-[#FF7A30]/40 font-medium">
                            {card.afterTag}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Tag Chips - Clean non-pill tags */}
                <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-[#E8DCC8]/10">
                  {card.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] px-2 py-0.5 bg-[#26201A] border border-[#FF7A30]/20 text-[#B8AC96] hover:text-[#E8DCC8] hover:border-[#FF7A30]/50 transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};