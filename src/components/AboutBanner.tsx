"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";

// Declare global for canvas-confetti loaded via CDN
declare global {
  interface Window {
    confetti: any;
  }
}

export default function AboutBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Trigger Celebration Function using canvas-confetti
  const triggerCelebration = useCallback(() => {
    if (typeof window !== "undefined" && window.confetti) {
      // First burst from bottom-left aiming top-middle
      window.confetti({
        particleCount: 150,
        spread: 40,
        origin: { x: 0, y: 1.0 },
        colors: ["#f57451", "#ffffff", "#c3e64b", "#3b82f6"],
        angle: 45, // Aim up-right
        gravity: 0.4,
        scalar: 0.9,
        startVelocity: 100,
        ticks: 200
      });

      // Second burst from bottom-right aiming top-middle
      window.confetti({
        particleCount: 150,
        spread: 40,
        origin: { x: 1, y: 1.0 },
        colors: ["#f57451", "#ffffff", "#c3e64b", "#3b82f6"],
        angle: 135, // Aim up-left
        gravity: 0.4,
        scalar: 0.9,
        startVelocity: 100,
        ticks: 200
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative h-[120vh]">
      {/* Sticky Content Layer */}
      <div className="sticky top-0 h-screen w-full bg-[#f5f5f0] flex flex-col items-center justify-center overflow-hidden">

        {/* Main Heading Background Layer (PROCESS) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none px-4">
          <motion.h1
            style={{ opacity, scale }}
            className="text-[22vw] font-[900] text-black leading-none tracking-[-0.08em] text-center uppercase"
          >
            PROCESS
          </motion.h1>
        </div>

        {/* The Portrait (Centered Silhouette) */}
        <motion.div
          style={{ opacity, scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.1]) }}
          className="relative z-10 w-[70%] md:w-[40%] aspect-[3/4] max-w-lg mt-20"
        >
          {/* Vibrant Orange Gradient Overlay from ref */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 z-20 bg-gradient-to-t from-[#f57451] to-transparent opacity-100" />

          <div className="relative w-full h-full grayscale brightness-50 rounded-b-full overflow-hidden border-b-8 border-[#f57451]">
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
              alt="About Portrait"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* "my" Text Overlay (Clickable Trigger) */}
          <motion.button
            onClick={triggerCelebration}
            initial={{ rotate: -15, scale: 0.5, opacity: 0 }}
            whileInView={{ rotate: -15, scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="absolute top-1/2 -left-16 md:-left-32 z-30 cursor-pointer outline-none"
            aria-label="Celebrate"
          >
            <span className="text-[12vw] font-['Satisfy'] text-[#f57451] drop-shadow-[0_10px_30px_rgba(245,116,81,0.5)]">
              my
            </span>
          </motion.button>
        </motion.div>

        {/* Footer Text Layer */}
        <div className="absolute bottom-12 left-10 md:left-20 lg:left-32 right-10 md:right-20 lg:right-32 flex justify-between items-end z-30">
          <motion.div style={{ opacity }} className="max-w-[320px]">
            <p className="text-black/80 text-lg font-black leading-tight uppercase tracking-tight">
              Your website either communicates your expertise or it doesn't.
            </p>
            <p className="text-black/60 text-sm mt-4 font-medium italic">
              I build websites that make your value obvious and "yes" inevitable.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity }}
            className="flex flex-col items-end gap-2"
          >
            <span className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em]">
              (SCROLL TO MY SYSTEM)
            </span>
            <div className="w-12 h-[2px] bg-black/40" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
