"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ExperienceItem } from "@/types";

export function ExperienceCard({ title, description, imageSrc }: ExperienceItem) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex items-center gap-8 p-8 rounded-[2rem] bg-[#111111] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/10"
    >
      {/* Background Gradient Glow (appears on hover) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#4C51BF]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* 3D Icon Container */}
      <div className="relative z-10 w-28 h-28 flex-shrink-0">
        <motion.div
           animate={{ y: [0, -8, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="w-full h-full transition-transform duration-500 group-hover:scale-110"
        >
          <Image 
            src={imageSrc} 
            alt={title} 
            width={112} 
            height={112} 
            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-2">
        <h3 className="text-[22px] font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{title}</h3>
        <p className="text-[13px] text-[#8a8a8a] leading-relaxed line-clamp-2 max-w-[260px]">
          {description}
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 rounded-full border border-white/10 text-[11px] font-bold text-white uppercase tracking-widest hover:bg-white/5 hover:border-white/20 transition-all"
        >
          LEARN MORE
        </motion.button>
      </div>

      {/* Atmospheric Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
         <div className="absolute top-1/4 left-[85%] w-1 h-1 bg-white rounded-full blur-[1px]" />
         <div className="absolute top-3/4 left-[90%] w-1.5 h-1.5 bg-white/50 rounded-full blur-[2px]" />
         <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-indigo-400/30 rounded-full blur-[1px]" />
      </div>
    </motion.div>
  );
}
