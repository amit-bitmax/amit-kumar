"use client";

import React from "react";
import { Pill, CtaButton, CircularBadge } from "@/components/ui";
import { SERVICE_PILLS, BADGE_TEXT, HERO_DESCRIPTION } from "@/lib/constants";
import AnimatedGridPattern from "@/components/common/AnimatedGridPattern";
import OrbitalSkills from "@/components/common/OrbitalSkills";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 lg:px-12 overflow-hidden">
      {/* Premium gradient: pearl white → soft lavender → deep indigo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f5ff] via-[#c4b5fd]/70 to-[#3b0764] z-0" />

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
            <h2 className="text-[clamp(1.8rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#0f172a]">
              Hi, I’m Amit Transforming Ideas into
              <span className="font-light text-[#1e3a8a] underline-offset-4 decoration-[#3b82f6] italic">
                Powerful Web Experiences
              </span>
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
            <p className="text-[15px] text-white/80 leading-relaxed">
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


    </section>
  );
}
