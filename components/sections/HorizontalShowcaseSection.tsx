"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryCards } from "./ScrollGallery";

export const HorizontalShowcaseSection: React.FC = () => {
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

        const getDistance = () => track.scrollWidth - window.innerWidth + 200;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            start: "top top",
            end: () => `+=${getDistance() + 600}`,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setOffsets((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleMouseLeave = (id: string) => {
    setOffsets((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  const scrollManual = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -460 : 460;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative w-full h-[100vh] py-8 lg:py-12 bg-[#14100C] text-[#E8DCC8] overflow-hidden flex flex-col justify-center border-t border-[#E8DCC8]/10"
    >
      {/* Background Giant Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-5 select-none z-0">
        <span className="font-headline text-[22vw] font-black text-[#E8DCC8] whitespace-nowrap">
          GALLERY
        </span>
      </div>

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-[#FF7A30] uppercase tracking-widest block mb-2">
            PINNED HORIZONTAL CATALOG
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl font-bold tracking-tight text-[#E8DCC8]">
            Raw to Retail in Real-Time
          </h2>
          <p className="text-sm sm:text-base text-[#B8AC96] mt-2 max-w-xl font-normal">
            Watch unedited seller photos transform across top global marketplace specifications.
          </p>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => scrollManual("left")}
            className="w-10 h-10 bg-[#1D1712] hover:bg-[#26201A] text-[#E8DCC8] border border-[#E8DCC8]/15 flex items-center justify-center transition-all"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollManual("right")}
            className="w-10 h-10 bg-[#1D1712] hover:bg-[#26201A] text-[#E8DCC8] border border-[#E8DCC8]/15 flex items-center justify-center transition-all"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Track */}
      <div className="relative z-10 w-full px-6 lg:px-12">
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
                className="min-w-[320px] sm:min-w-[440px] lg:min-w-[500px] shrink-0 snap-center bg-[#1D1712] border border-[#E8DCC8]/15 hover:border-[#FF7A30]/40 rounded-2xl p-5 shadow-2xl flex flex-col justify-between group transition-all duration-300"
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

                  <div
                    className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden aspect-[16/9] sm:aspect-[2/1] relative border border-[#E8DCC8]/15 transition-transform duration-200"
                    style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
                  >
                    {card.useCustomCrop ? (
                      <>
                        <div className="relative bg-[#1A1510] overflow-hidden flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.imgSrc}
                            alt="Raw photo"
                            className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover object-left group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#14100C]/85 text-[10px] font-mono text-red-400 border border-[#E8DCC8]/20">
                            {card.beforeTag}
                          </span>
                        </div>
                        <div className="relative bg-[#1A1510] overflow-hidden flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.imgSrc}
                            alt="Studio photo"
                            className="absolute right-0 top-0 h-full w-[200%] max-w-none object-cover object-right group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#14100C]/85 text-[10px] font-mono text-[#FF7A30] font-medium border border-[#FF7A30]/30">
                            {card.afterTag}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative bg-[#1A1510] overflow-hidden flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.beforeImg}
                            alt="Raw photo"
                            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#14100C]/85 text-[10px] font-mono text-red-400 border border-[#E8DCC8]/20">
                            {card.beforeTag}
                          </span>
                        </div>
                        <div className="relative bg-[#1A1510] overflow-hidden flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.afterImg}
                            alt="Studio photo"
                            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#14100C]/85 text-[10px] font-mono text-[#FF7A30] font-medium border border-[#FF7A30]/30">
                            {card.afterTag}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-[#E8DCC8]/10">
                  {card.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] px-2 py-0.5 bg-[#26201A] border border-[#FF7A30]/20 text-[#B8AC96]"
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
