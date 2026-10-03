"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative w-full min-h-screen py-16 bg-[#14100C] text-[#14100C] p-4 sm:p-8 flex items-center justify-center border-t border-[#E8DCC8]/10" id="contact">
      <div className="w-full max-w-[1560px] bg-[#E8DCC8] rounded-2xl p-8 sm:p-14 lg:p-20 shadow-2xl border border-[#14100C]/15 relative overflow-hidden flex flex-col justify-between min-h-[85vh]">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-[#14100C]/15 pb-6 text-xs font-mono uppercase tracking-widest text-[#14100C]/60">
          <span className="font-bold text-[#14100C] font-headline text-sm">LISTINGLAB || ONBOARDING</span>
          <span>50 FREE EXPORTS INCLUDED</span>
        </div>

        {/* Main Grid: Left Title + Right Minimalist Underlined Inputs */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end py-8">
          {/* Left Title */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-[#FF7A30] font-semibold tracking-wider block mb-3">
                • INSTANT DEPLOYMENT
              </span>
              <h2 className="font-headline text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-[#14100C] leading-[0.95]">
                Contact <br />
                <span className="text-[#FF7A30]">Us.</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#14100C]/70 mt-8 max-w-md leading-relaxed font-body">
              Connect your Shopify, Amazon, or custom S3 catalog. Ingest tens of thousands of RAW SKUs with enterprise SLA.
            </p>
          </div>

          {/* Right Form with Minimal Underlines */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-10 bg-[#14100C] text-[#E8DCC8] flex flex-col items-center text-center border border-[#14100C]">
                <CheckCircle2 className="w-12 h-12 text-[#FF7A30] mb-4" />
                <h3 className="font-headline text-2xl font-bold">Workspace Provisioned</h3>
                <p className="text-sm text-[#B8AC96] mt-2 max-w-sm">
                  Your sandbox keys and 50 complimentary 8K commercial credits have been activated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label className="text-xs font-mono text-[#14100C]/70 uppercase mb-2">First Name*</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane"
                      className="bg-transparent border-b border-[#14100C]/30 focus:border-[#FF7A30] text-sm text-[#14100C] py-2 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-mono text-[#14100C]/70 uppercase mb-2">Last Name*</label>
                    <input
                      required
                      type="text"
                      placeholder="Doe"
                      className="bg-transparent border-b border-[#14100C]/30 focus:border-[#FF7A30] text-sm text-[#14100C] py-2 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label className="text-xs font-mono text-[#14100C]/70 uppercase mb-2">Company Name*</label>
                    <input
                      required
                      type="text"
                      placeholder="Acme Studio"
                      className="bg-transparent border-b border-[#14100C]/30 focus:border-[#FF7A30] text-sm text-[#14100C] py-2 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-mono text-[#14100C]/70 uppercase mb-2">Position / Storefront*</label>
                    <input
                      required
                      type="text"
                      placeholder="Creative Director / Shopify Plus"
                      className="bg-transparent border-b border-[#14100C]/30 focus:border-[#FF7A30] text-sm text-[#14100C] py-2 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label className="text-xs font-mono text-[#14100C]/70 uppercase mb-2">Work Email*</label>
                    <input
                      required
                      type="email"
                      placeholder="jane@company.com"
                      className="bg-transparent border-b border-[#14100C]/30 focus:border-[#FF7A30] text-sm text-[#14100C] py-2 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-mono text-[#14100C]/70 uppercase mb-2">Monthly SKU Volume</label>
                    <input
                      type="text"
                      placeholder="5,000+ items / month"
                      className="bg-transparent border-b border-[#14100C]/30 focus:border-[#FF7A30] text-sm text-[#14100C] py-2 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-mono text-[#14100C]/70 uppercase mb-2">Message*</label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your visual staging requirements..."
                    className="bg-transparent border-b border-[#14100C]/30 focus:border-[#FF7A30] text-sm text-[#14100C] py-2 focus:outline-none resize-none transition-colors"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#14100C] text-[#E8DCC8] hover:bg-[#FF7A30] hover:text-[#14100C] font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group cursor-pointer"
                  >
                    <span>• SUBMIT INQUIRY</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#14100C]/15 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#14100C]/60">
          <span>© 2026 LISTINGLAB ARCHIVAL SYSTEMS</span>
          <span>ENCRYPTED END-TO-END || AES-256</span>
        </div>
      </div>
    </section>
  );
};
