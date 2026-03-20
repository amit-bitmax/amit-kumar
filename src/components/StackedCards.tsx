"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

const CARDS = [
  {
    id: "001",
    title: "Digital Marketing",
    description: "Maximise your online presence with our performance-driven digital marketing services. We combine data-backed strategies with creative execution to ensure your brand stands out in the digital landscape.",
    bg: "bg-[#0d0d0d]",
    text: "text-white",
    image: "/assets/cards/card-marketing.png",
    tags: ["SEO & SEM", "Social Strategy", "PPC Campaigns"]
  },
  {
    id: "002",
    title: "Product design",
    description: "We merge art and technology to create digital experiences that don't just work—they inspire and engage your audience at every touchpoint. From UX research to pixel-perfect prototypes.",
    bg: "bg-[#c3e64b]", // Lime green from reference
    text: "text-black",
    image: "/assets/cards/card-brain.png",
    tags: ["UX/UI Design", "Prototyping", "User Research"]
  },
  {
    id: "003",
    title: "Expert Development",
    description: "We build with scalability in mind, using cutting-edge stacks that ensure your digital presence remains fast, secure, and relevant as you grow. Clean code, robust architecture.",
    bg: "bg-white",
    text: "text-black",
    image: "/assets/cards/card-branding.png",
    tags: ["Fullstack Dev", "API Integration", "Cloud Native"]
  }
];

export default function StackedCards() {
  return (
    <section className="relative px-6 md:px-12 lg:px-24 bg-[#0d0d0d] pb-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {CARDS.map((card, i) => (
          <Card key={card.id} card={card} index={i} total={CARDS.length} />
        ))}
      </div>
    </section>
  );
}

function Card({ card, index, total }: { card: typeof CARDS[0], index: number, total: number }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  // As the next card covers this one, it should scale down slightly
  // We use another scroll trigger for the *exit* of the card (when it's being covered)
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(exitProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(exitProgress, [0, 1], [1, 0.8]);

  return (
    <div 
      ref={containerRef}
      className="sticky top-24 pt-10"
      style={{ top: `${96 + (index * 24)}px` }} // Incremental offset for stacking effect
    >
      <motion.div
        style={{ scale, opacity }}
        className={cn(
          "relative min-h-[500px] lg:min-h-[600px] w-full rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row items-center p-10 lg:p-16 shadow-2xl border border-black/5",
          card.bg,
          card.text
        )}
      >
        {/* Left Content */}
        <div className="flex-[1.2] flex flex-col items-start gap-8 z-10 w-full lg:w-auto">
          <span className="text-sm font-bold opacity-60 uppercase tracking-widest">{card.id}</span>
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05]">
            {card.title.split(' ')[0]} <br />
            <span className="font-light italic">{card.title.split(' ')[1]}</span>
          </h2>
          <p className="text-lg lg:text-xl opacity-70 max-w-md leading-relaxed font-medium">
            {card.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            {card.tags.map(tag => (
              <span key={tag} className="px-6 py-2.5 rounded-full border border-black/10 text-sm font-bold hover:bg-black/5 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right 3D Illustration */}
        <div className="flex-1 relative w-full h-[300px] lg:h-[500px] flex items-center justify-center mt-8 lg:mt-0">
           <motion.div
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="relative w-full h-full flex items-center justify-center"
           >
              <Image 
                src={card.image} 
                alt={card.title} 
                width={550} 
                height={550} 
                className="object-contain drop-shadow-2xl"
                priority={index === 0}
              />
           </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-10">
           <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
           </svg>
        </div>
      </motion.div>
    </div>
  );
}
