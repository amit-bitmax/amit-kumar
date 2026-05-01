"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const services = [
  {
    title: "Branding Design &\nIdentity",
    description:
      "Crafting engaging and functional digital solutions, tailored to enhance user interaction.",
    bgColor: "bg-[#d9f95d]",
    textColor: "text-black",
    // Placeholder 3D asset - replace with actual transparent PNG
    assetUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    isDark: false,
    id: 1,
  },
  {
    title: "Website & Digital\nDesign",
    description:
      "Crafting engaging and functional digital solutions, tailored to enhance user interaction.",
    bgColor: "bg-white",
    textColor: "text-black",
    assetUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2564&auto=format&fit=crop",
    isDark: false,
    id: 2,
  },
  {
    title: "Strategy & Bold\nConsulting",
    description:
      "Crafting engaging and functional digital solutions, tailored to enhance user interaction.",
    bgColor: "bg-[#1a1a1a]",
    textColor: "text-white",
    assetUrl: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=2564&auto=format&fit=crop",
    isDark: true,
    id: 3,
  },
];

const ServiceCard = ({
  service,
}: {
  service: typeof services[0];
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth transiton
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform rotations (inverse relation for natural tilt)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  // Transform values for the floating object inside
  const objTranslateX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const objTranslateY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[500px]"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.02 : 1,
          transformStyle: "preserve-3d",
        }}
        className={`w-full h-full rounded-[2rem] p-10 flex flex-col justify-between overflow-hidden group shadow-2xl transition-all duration-[200ms] ease-out will-change-transform ${service.bgColor} ${service.textColor}`}
      >
        <div className="relative z-10 w-full md:w-4/5" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-3xl md:text-4xl font-medium leading-tight whitespace-pre-line tracking-tight mb-6">
            {service.title}
          </h3>
          <p className={`text-sm md:text-base leading-relaxed max-w-[90%] opacity-80 ${service.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {service.description}
          </p>
        </div>

        <div className="relative z-10 mt-auto flex items-center gap-4" style={{ transform: "translateZ(40px)" }}>
          <span className="text-sm font-semibold tracking-wider font-['Inter',sans-serif]">
            KNOW MORE
          </span>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${service.isDark ? 'bg-white text-black' : 'bg-black/10 text-black'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bubble — top-left (small, faded) */}
        <motion.div
          style={{ x: objTranslateX, y: objTranslateY }}
          className={`absolute -top-8 -left-8 w-36 h-36 md:w-44 md:h-44 pointer-events-none z-0 ${service.isDark ? 'mix-blend-screen opacity-40' : 'mix-blend-multiply opacity-30'}`}
        >
          <div
            className="w-full h-full bg-cover bg-center rounded-full filter blur-[3px]"
            style={{ backgroundImage: `url(${service.assetUrl})` }}
          />
        </motion.div>

        {/* Bubble — bottom-right (large, main) */}
        <motion.div
          style={{ x: objTranslateX, y: objTranslateY }}
          className={`absolute -bottom-10 -right-10 w-64 h-64 md:w-80 md:h-80 pointer-events-none z-0 ${service.isDark ? 'mix-blend-screen opacity-80' : 'mix-blend-multiply'}`}
        >
          <div
            className="w-full h-full bg-cover bg-center rounded-full opacity-60 filter blur-[2px]"
            style={{ backgroundImage: `url(${service.assetUrl})` }}
          />
        </motion.div>

        {/* Subtle Glare Effect overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at ${isHovered ? (mouseX.get() + 0.5) * 100 : 50}% ${isHovered ? (mouseY.get() + 0.5) * 100 : 50}%, 
              rgba(255,255,255,0.2) 0%, 
              rgba(255,255,255,0) 60%
            )`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default function ServicesSection() {
  return (
    <section className="bg-[#0d0d0d] text-white py-24 px-6 lg:px-12 border-t border-white/10 relative z-10 overflow-hidden">

      {/* ── Lightning / Bijli Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dark base */}
        <div className="absolute inset-0 bg-[#07080f]" />

        {/* Electric glow halos behind lightning */}
        <div className="absolute top-[10%] left-[15%] w-[300px] h-[600px] bg-yellow-300/10 blur-[80px] rotate-[-20deg]" />
        <div className="absolute top-[20%] right-[10%] w-[200px] h-[500px] bg-violet-400/10 blur-[60px] rotate-[15deg]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/10 blur-[80px]" />

        {/* SVG Lightning Bolts */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 700"
        >
          <defs>
            {/* Outer glow filter */}
            <filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="14" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="lightning-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main left lightning bolt — bright yellow-white */}
          <polyline
            filter="url(#lightning-glow)"
            points="220,0 180,140 230,140 140,320 200,320 80,700"
            fill="none"
            stroke="rgba(255,240,100,0.85)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Thin branch from main bolt */}
          <polyline
            filter="url(#lightning-glow-soft)"
            points="180,140 230,220 210,220 260,310"
            fill="none"
            stroke="rgba(255,255,180,0.5)"
            strokeWidth="1.2"
          />

          {/* Right side bolt — violet-blue tone */}
          <polyline
            filter="url(#lightning-glow)"
            points="1260,0 1300,160 1240,160 1320,400 1260,400 1380,700"
            fill="none"
            stroke="rgba(180,140,255,0.75)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Right branch */}
          <polyline
            filter="url(#lightning-glow-soft)"
            points="1300,160 1350,260 1320,260 1370,360"
            fill="none"
            stroke="rgba(200,180,255,0.4)"
            strokeWidth="1"
          />

          {/* Center faint distant bolt */}
          <polyline
            filter="url(#lightning-glow-soft)"
            points="700,0 680,100 720,100 660,250 700,250 630,480"
            fill="none"
            stroke="rgba(150,200,255,0.25)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="flex gap-4 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-white mt-2" />
            <span className="text-sm font-bold tracking-widest uppercase">
              Services
            </span>
          </div>

          <div className="flex-1 md:pl-20">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-none">
              <span className="text-white/60">OUR</span>
              <br />
              <span>CAPABILITIES.</span>
            </h2>
          </div>

          <button className="flex items-center gap-4 group">
            <span className="text-sm font-bold tracking-widest uppercase group-hover:text-white/80 transition-colors">
              See Pricing
            </span>
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
