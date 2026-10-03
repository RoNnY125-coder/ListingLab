"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-bg/85 backdrop-blur-xl border-b border-outline">
      <div className="h-16 w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-surface-raised border border-outline-strong flex items-center justify-center text-orange group-hover:border-orange/60 transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-headline text-lg font-bold text-beige tracking-tight flex items-center gap-1.5">
            ListingLab
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-orange/15 text-orange border border-orange/25">
              AI 2.0
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="#features"
            className="text-beige-dim hover:text-beige transition-colors font-medium"
          >
            Features
          </Link>
          <Link
            href="#showcase"
            className="text-beige-dim hover:text-beige transition-colors font-medium"
          >
            Showcase
          </Link>
          <Link
            href="#how-it-works"
            className="text-beige-dim hover:text-beige transition-colors font-medium"
          >
            How it Works
          </Link>
          <Link
            href="#transform"
            className="text-beige-dim hover:text-beige transition-colors font-medium"
          >
            Playground
          </Link>
          <Link
            href="#footer"
            className="text-beige-dim hover:text-beige transition-colors font-medium"
          >
            Docs
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="#transform"
            className="hidden sm:inline-flex items-center text-xs font-mono text-beige-dim hover:text-beige px-3 py-1.5 rounded-lg border border-outline hover:border-outline-strong transition-all"
          >
            Sign In
          </Link>
          <Link
            href="#transform"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-headline font-semibold bg-orange text-bg hover:bg-orange-dim transition-all shadow-glow-orange hover:shadow-glow-orange-lg active:scale-95"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-beige-dim hover:text-beige"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline px-6 py-4 flex flex-col gap-3">
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-beige-dim hover:text-beige py-1.5 font-medium text-sm"
          >
            Features
          </Link>
          <Link
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="text-beige-dim hover:text-beige py-1.5 font-medium text-sm"
          >
            Showcase
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-beige-dim hover:text-beige py-1.5 font-medium text-sm"
          >
            How it Works
          </Link>
          <Link
            href="#transform"
            onClick={() => setMobileMenuOpen(false)}
            className="text-beige-dim hover:text-beige py-1.5 font-medium text-sm"
          >
            Playground
          </Link>
        </div>
      )}
    </header>
  );
};
