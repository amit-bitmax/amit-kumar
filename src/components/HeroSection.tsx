"use client";

import React from "react";
import { Pill, CtaButton, CircularBadge } from "@/components/ui";
import { SERVICE_PILLS, BADGE_TEXT, HERO_DESCRIPTION } from "@/lib/constants";
import AnimatedGridPattern from "@/components/common/AnimatedGridPattern";
import OrbitalSkills from "@/components/common/OrbitalSkills";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#0d0d0d]">
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.15}
        duration={2}
        repeatDelay={1}
        className="text-slate-700/20 fill-slate-700/30 [mask-image:linear-gradient(to_bottom,transparent,white_15%,white_80%,transparent)]"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
        {/* ── Left Content ── */}
        <div className="flex flex-col items-start gap-8">
          {/* Headline */}
          <div className="animate-fade-up max-w-4xl">
            <h2 className="text-[clamp(1.8rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
              Blending creativity &amp; strategy to build brands &amp;{" "}
              <span className="font-light text-[#888] underline underline-offset-4 decoration-[#555] italic">
                design websites
              </span>
              .
            </h2>
          </div>

          {/* Pills */}
          <div className="animate-fade-up-delay-1 flex flex-wrap gap-3 mt-4">
            {SERVICE_PILLS.map((p) => (
              <Pill key={p} label={p} />
            ))}
          </div>

          {/* Description + CTA */}
          <div className="animate-fade-up-delay-3 flex flex-col items-start gap-8 max-w-md mt-6">
            <p className="text-[15px] text-[#8a8a8a] leading-relaxed">
              {HERO_DESCRIPTION}
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <CtaButton label="KNOW MORE" />
              {/* Smaller Badge for mobile/aligned layout */}
              <div className="lg:hidden block transform scale-75">
                <CircularBadge text={BADGE_TEXT} imageSrc="/frog.png" size={160} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Visual ── */}
        <div className="hidden lg:flex items-center justify-center relative scale-[1.2] translate-x-12 translate-y-8">
          <OrbitalSkills />
          {/* Floating Badge in the visual area for desktop */}
          {/* <div className="absolute -bottom-16 -left-16 transform -rotate-12 scale-90 z-40">
            <CircularBadge text={BADGE_TEXT} imageSrc="/frog.png" size={180} />
          </div> */}
        </div>
      </div>

      {/* ── Background Gradients & Glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top/Bottom Subtle Gradient Overlays (#4C51BF) */}
        <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-[#4C51BF]/10 to-transparent z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-[#4C51BF]/10 via-transparent to-transparent z-0" />

        {/* ── Diagonal Light Beam Effect (#4C51BF) ── */}
        <div className="absolute top-[20%] -left-[30%] w-[160%] h-[400px] bg-gradient-to-r from-transparent via-[#4C51BF]/15 to-transparent blur-[160px] -rotate-12 z-0" />
        <div className="absolute top-[25%] -left-[20%] w-[140%] h-[150px] bg-gradient-to-r from-transparent via-[#4C51BF]/25 to-transparent blur-[120px] -rotate-12 z-0 opacity-50" />

        {/* Support Glow behind OrbitalSkills */}
        <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4C51BF]/[0.08] blur-[120px]" />

        {/* Bottom Black Fade for grounding */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/90 to-transparent z-10" />
      </div>
    </section>
  );
}
