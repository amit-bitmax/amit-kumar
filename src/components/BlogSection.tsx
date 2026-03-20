"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const blogs = [
  {
    id: 1,
    title: "How to furnish and decorate a creative agency",
    category: "Design",
    date: "25 Aug 2024",
    image: "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?q=80&w=2564&auto=format&fit=crop", // creative agency
  },
  {
    id: 2,
    title: "The top Digital Marketing for business growth",
    category: "Design",
    date: "25 Aug 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2564&auto=format&fit=crop", // digital marketing
  },
  {
    id: 3,
    title: "Simple tips for effective social media marketing",
    category: "Design",
    date: "25 Aug 2024",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2564&auto=format&fit=crop", // social media
  },
];

const BlogCard = ({ blog }: { blog: typeof blogs[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth transiton
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform rotations (inverse relation for natural tilt)
  // When mouse is top (-0.5), we rotateX positive so it tilts up.
  // When mouse is right (+0.5), we rotateY positive so it tilts right.
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

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
    <div className="flex flex-col gap-6 group cursor-pointer w-full">
      {/* 3D Image Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full aspect-[4/3] relative rounded-[2rem] overflow-visible"
        style={{ perspective: 1200 }} // Key for 3D effect
      >
        <motion.div
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            scale: isHovered ? 1.02 : 1,
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-[200ms] ease-out will-change-transform"
        >
          {/* Inner Image */}
          <div className="absolute inset-0 bg-neutral-900" />
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle Glare Effect overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(
                circle at ${isHovered ? (mouseX.get() + 0.5) * 100 : 50}% ${isHovered ? (mouseY.get() + 0.5) * 100 : 50}%, 
                rgba(255,255,255,0.15) 0%, 
                rgba(255,255,255,0) 50%
              )`,
            }}
          />
        </motion.div>
      </div>

      {/* Meta Text */}
      <div className="flex flex-col gap-3 px-1 md:px-0">
        <div className="flex items-center gap-3 text-white/50 text-xs md:text-sm font-medium tracking-wide">
          <span>{blog.category}</span>
          <span>|</span>
          <span>{blog.date}</span>
        </div>
        <h3 className="text-2xl md:text-[28px] font-medium leading-snug text-white transition-colors group-hover:text-white/80">
          {blog.title}
        </h3>
      </div>
    </div>
  );
};

export default function BlogSection() {
  return (
    <section className="bg-[#0d0d0d] text-white py-24 px-4 md:px-8 xl:px-16 relative z-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center">
        {/* Header Label */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 mb-10">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-sm font-medium">Our Blog</span>
        </div>

        {/* Main Title */}
        <h2 className="text-center text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight mb-20">
          Latest creative
          <br className="hidden md:block" />
          thinking journals.
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-16 w-full">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
