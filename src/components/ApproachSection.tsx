"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const APPROACH_STEPS = [
  {
    title: "Innovative Creativity",
    description: "We merge art and technology to create digital experiences that don't just work—they inspire and engage your audience at every touchpoint.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    theme: "dark",
  },
  {
    title: "Collaborative Partnership",
    description: "Your vision is our blueprint. We work as an extension of your team, ensuring every pixel aligns with your strategic goals and brand identity.",
    icon: (
      <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    theme: "light",
  },
  {
    title: "Future Ready",
    description: "We build with scalability in mind, using cutting-edge stacks that ensure your digital presence remains fast, secure, and relevant as you grow.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    theme: "blue",
  },
];

export default function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0d0d0d]">
      {/* Sticky Heading Background */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.h2 
          style={{ opacity: headingOpacity, scale: headingScale }}
          className="text-[20vw] font-[900] text-white/5 tracking-[-0.05em] uppercase select-none leading-none"
        >
          APPROACH
        </motion.h2>
      </div>

      {/* Scrolling Cards Overlay */}
      <div className="relative z-10 -mt-[100vh] pb-[50vh]">
        <div className="flex flex-col items-center gap-[60vh] px-6">
          {APPROACH_STEPS.map((step, index) => (
            <ApproachCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachCard({ step, index }: { step: typeof APPROACH_STEPS[0]; index: number }) {
  const isLight = step.theme === "light";
  const isBlue = step.theme === "blue";

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: false, margin: "-10%" }}
      className={`
        relative w-full max-w-md p-10 rounded-3xl backdrop-blur-xl border
        ${isLight ? "bg-white text-black border-white/20" : isBlue ? "bg-blue-600 text-white border-blue-500/50" : "bg-white/5 text-white border-white/10"}
        shadow-2xl flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-500
      `}
    >
      <div className={`p-4 rounded-2xl w-fit ${isLight ? "bg-black/5" : "bg-white/10"}`}>
        {step.icon}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-3xl font-black tracking-tight leading-tight">
          {step.title}
        </h3>
        <p className={`text-lg leading-relaxed ${isLight ? "text-black/60" : "text-white/60"}`}>
          {step.description}
        </p>
      </div>

      {/* Decorative Index */}
      <span className={`absolute top-10 right-10 text-6xl font-black opacity-10 ${isLight ? "text-black" : "text-white"}`}>
        0{index + 1}
      </span>
    </motion.div>
  );
}
