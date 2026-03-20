"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "AIR STYLE 3D",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop",
    category: "Product Design",
    description: "A high-quality 3D render exploring the intersection of modern materials and footwear aesthetics. This piece focuses on the tactile properties of digital surfaces."
  },
  {
    id: 2,
    title: "FUTURE VISION",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop",
    category: "Futuristic Art",
    description: "Minimalist 3D render exploring the tactile relationship between robotics and ceramic materials. Part of our 'Future Touch' experiment series."
  },
  {
    id: 3,
    title: "CYBER NEON",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop",
    category: "Branding",
    description: "High-fashion artistic portrait utilizing circular neon light structures to emphasize facial geometry and cinematic atmosphere."
  },
  {
    id: 4,
    title: "ORGANIC FLOW",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop",
    category: "Visual Design",
    description: "A macro exploration of natural wood textures and forest moss, highlighting the intricate beauty of organic decay and regrowth."
  },
  {
    id: 5,
    title: "GLASS CORE",
    image: "https://images.unsplash.com/photo-1522851493035-77de613afbce?q=80&w=2000&auto=format&fit=crop",
    category: "UI/UX",
    description: "Experimental glass interface design utilizing glowing data points and particles to create a sense of depth and interactivity."
  },
  {
    id: 6,
    title: "INNER MIND",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    category: "Abstract",
    description: "Translucent 3D visualization of neural structures, rendered with glass-like materials to represent the clarity of organized thought."
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0d0d0d]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Decorative "GSAP" Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
          <span className="text-[25vw] font-black text-white tracking-tighter uppercase leading-none">
            GSAP
          </span>
        </div>

        {/* The Grid Header (Fades out as we scroll deep) */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute top-20 left-0 w-full px-6 md:px-12 lg:px-24 z-10 pointer-events-none"
        >
          <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Our Work</span>
          <h2 className="text-7xl lg:text-9xl font-black text-white tracking-tighter leading-none uppercase">
            GALLERY
          </h2>
        </motion.div>

        {/* Focused Project Display Area */}
        <div className="relative w-full h-full flex flex-col items-center justify-center pt-24">
          {GALLERY_ITEMS.map((item, index) => (
            <ProjectFocalCard 
              key={item.id} 
              item={item} 
              index={index} 
              total={GALLERY_ITEMS.length} 
              progress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectFocalCard({ item, index, total, progress }: { 
  item: typeof GALLERY_ITEMS[0], 
  index: number, 
  total: number,
  progress: any 
}) {
  // Normalize scroll progress calculation to smoothly crossfade between items.
  const distance = 1 / Math.max(1, total - 1);
  const center = index * distance; // e.g., 0, 0.2, 0.4... for 6 items
  const start = center - distance;
  const end = center + distance;

  // Keyframes arrays mapping
  const inputs: number[] = [];
  const scaleOutputs: number[] = [];
  const opacityOutputs: number[] = [];
  const yOutputs: number[] = [];

  // To prevent "Offsets must be monotonically non-decreasing" WAAPI crash under Framer Motion,
  // we must ensure all mapping offsets are between 0 and 1, and strictly increasing.
  if (start >= 0) {
    inputs.push(start);
    scaleOutputs.push(0.8);
    opacityOutputs.push(0);
    yOutputs.push(100);
  }

  inputs.push(center);
  scaleOutputs.push(1);
  opacityOutputs.push(1);
  yOutputs.push(0);

  if (end <= 1) {
    inputs.push(end);
    scaleOutputs.push(0.8);
    opacityOutputs.push(0);
    yOutputs.push(-100);
  }

  const scale = useTransform(progress, inputs, scaleOutputs);
  const opacity = useTransform(progress, inputs, opacityOutputs);
  const y = useTransform(progress, inputs, yOutputs);
  
  // Content Reveal Animations (slightly tighter timing than main item fade)
  const contentFadeDist = distance * 0.6;
  const contentStart = center - contentFadeDist;
  const contentEnd = center + contentFadeDist;

  const contentInputs: number[] = [];
  const contentOpacityOutputs: number[] = [];
  const contentYOutputs: number[] = [];

  if (contentStart >= 0) {
    contentInputs.push(contentStart);
    contentOpacityOutputs.push(0);
    contentYOutputs.push(40);
  }

  contentInputs.push(center);
  contentOpacityOutputs.push(1);
  contentYOutputs.push(0);

  if (contentEnd <= 1) {
    contentInputs.push(contentEnd);
    contentOpacityOutputs.push(0);
    contentYOutputs.push(-40);
  }

  const contentOpacity = useTransform(progress, contentInputs, contentOpacityOutputs);
  const contentY = useTransform(progress, contentInputs, contentYOutputs);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
      {/* Centered Large Item */}
      <motion.div 
        style={{ scale, opacity, y }}
        className="relative w-full max-w-5xl aspect-[16/9] z-20 pointer-events-auto"
      >
        <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10">
          {/* Decorative Orange Wavy Frame effect */}
          <div className="absolute inset-0 z-10 border-[12px] border-orange-500/10 rounded-[3.5rem] pointer-events-none ring-[1px] ring-orange-500/20" />
          
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1200px) 100vw, 80vw"
            priority={index === 0}
          />
        </div>
      </motion.div>

      {/* Two-Column Content Reveal Below Item */}
      <motion.div 
        style={{ opacity: contentOpacity, y: contentY }}
        className="mt-16 w-full max-w-4xl flex flex-col gap-10 z-30 pointer-events-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1 bg-indigo-500 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                {item.category}
              </span>
              <p className="text-white/40 font-bold text-xs tracking-widest uppercase">
                Case Study 00{item.id}
              </p>
            </div>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">
              {item.title}
            </h3>
          </div>
          
          <div className="flex-1 flex flex-col gap-8">
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              {item.description}
            </p>
            <div className="flex gap-6">
               <button className="px-10 py-5 bg-white text-black font-black uppercase text-sm tracking-widest rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 active:scale-95 shadow-2xl">
                Explore Case
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
