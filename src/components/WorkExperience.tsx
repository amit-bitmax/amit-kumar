"use client";

import React from "react";
import { EXPERIENCE_DATA } from "@/lib/constants";
import { ExperienceCard } from "@/components/ui";

export default function WorkExperience() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">
          Work Experience
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EXPERIENCE_DATA.map((item) => (
            <ExperienceCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
