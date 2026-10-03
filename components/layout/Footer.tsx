import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#14100C] border-t border-[#E8DCC8]/10 py-16 lg:py-20 text-[#E8DCC8]" id="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="#" className="font-headline text-xl font-bold tracking-tight text-[#E8DCC8]">
              ListingLab
            </Link>
            <p className="text-xs sm:text-sm text-[#B8AC96] max-w-sm leading-relaxed font-body">
              Automated commercial photography engine for modern online brands, catalog power sellers, and studios.
            </p>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-3 text-xs font-mono">
            <span className="font-semibold uppercase tracking-wider text-[#E8DCC8] mb-1">
              Product
            </span>
            <Link href="#abilities" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Abilities
            </Link>
            <Link href="#showcase" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Showcase
            </Link>
            <Link href="#how-it-works" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Workflow
            </Link>
            <Link href="#contact" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Get Started
            </Link>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3 text-xs font-mono">
            <span className="font-semibold uppercase tracking-wider text-[#E8DCC8] mb-1">
              Company
            </span>
            <Link href="#" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              About
            </Link>
            <Link href="#" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Changelog
            </Link>
            <Link href="#" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Careers
            </Link>
            <Link href="#contact" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Contact
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3 text-xs font-mono">
            <span className="font-semibold uppercase tracking-wider text-[#E8DCC8] mb-1">
              Legal
            </span>
            <Link href="#" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-[#B8AC96] hover:text-[#E8DCC8] transition-colors">
              Security
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E8DCC8]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#B8AC96]">
          <p>© 2026 ListingLab. All rights reserved.</p>
          <p className="text-[#B8AC96]/60">Design-as-Code Engine</p>
        </div>
      </div>
    </footer>
  );
};