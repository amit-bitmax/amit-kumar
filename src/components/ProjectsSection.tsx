"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

const PROJECTS = [
  { 
    id: 1, 
    title: "DIGITAL ART", 
    image: "/assets/projects/proj-2.png",
    subtitle: "Brand Identity • 2024"
  },
  { 
    id: 2, 
    title: "FUTURE TECH", 
    image: "/assets/projects/proj-1.png",
    subtitle: "Product Design • 2023"
  },
  { 
    id: 3, 
    title: "NATURE SYNC", 
    image: "/assets/projects/proj-3.png",
    subtitle: "Visual Design • 2024"
  },
  { 
    id: 4, 
    title: "GLASS UI", 
    image: "/assets/projects/proj-4.png",
    subtitle: "Web Experience • 2023"
  },
];

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState<number | null>(2);

  return (
    <section className="py-24 bg-[#0d0d0d] overflow-hidden">
      {/* ── Marquee Section ── */}
      <div className="relative flex whitespace-nowrap overflow-hidden border-y border-white/5 py-12 mb-20">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12 text-[9vw] font-bold tracking-tighter leading-none"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-white uppercase font-black">Freelancer</span>
              <span className="text-white/20 select-none">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </span>
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] uppercase font-black">Digital</span>
              <span className="text-white/20 select-none">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Expanding Projects Accordion ── */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-5 h-[550px] lg:h-[650px] w-full items-stretch">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              layout
              onHoverStart={() => setActiveId(project.id)}
              className={cn(
                "relative overflow-hidden rounded-[3rem] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                activeId === project.id 
                  ? "flex-[3.5] opacity-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]" 
                  : "flex-1 grayscale opacity-40 hover:opacity-100"
              )}
            >
              {/* Project Image */}
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={project.id === 2}
              />
              
              {/* Overlay with Content */}
              <AnimatePresence>
                {activeId === project.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 lg:p-14"
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-end justify-between"
                    >
                      <div>
                        <p className="text-indigo-400 font-bold uppercase tracking-widest text-[12px] mb-3">
                          {project.subtitle}
                        </p>
                        <h3 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tighter">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Interaction Circle */}
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center text-black">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsed Title (Vertical) */}
              <AnimatePresence>
                {activeId !== project.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="rotate-90 text-white/40 font-bold uppercase tracking-widest text-sm whitespace-nowrap">
                      {project.title}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
