"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ZoomGridSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // We start the animation when the top of the container hits the top of the viewport
    // and end it when the bottom of the container hits the bottom of the viewport
    offset: ["start start", "end end"],
  });

  // Scale the entire grid up enormously so the central image fills the screen
  const scale = useTransform(scrollYProgress, [0, 1], [1, 6]);

  // Optionally fade out the adjacent images as we zoom in deeper
  const opacityOut = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  // Images replicating the grid from the reference
  return (
    <div ref={containerRef} className="h-[300vh] relative w-full bg-[#0d0d0d]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        <motion.div
          style={{ scale }}
          className="relative w-full h-full flex items-center justify-center origin-center"
        >
          {/* Main Grid inside the scaling wrapper. We use absolute positioning with relative offsets for perfect centering. */}
          <div className="relative w-[100vw] h-[100vh] flex items-center justify-center">
            
            {/* --- MIDDLE ROW --- */}
            {/* Center Shoe Image (The one that will fill the screen) */}
            <div className="absolute w-[35vw] h-[25vw] md:w-[25vw] md:h-[18vw] rounded-2xl md:rounded-3xl overflow-hidden z-10 flex items-center justify-center border-[8px] md:border-[12px] border-orange-400 bg-sky-200">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop"
                alt="Shoe"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Middle Left (Black Panther) */}
            <motion.div style={{ opacity: opacityOut }} className="absolute -left-[5vw] top-1/2 -translate-y-1/2 -translate-x-full w-[25vw] h-[18vw] rounded-3xl overflow-hidden bg-blue-600">
               <Image
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1500&auto=format&fit=crop"
                alt="Panther"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Middle Right (Starry Person) */}
            <motion.div style={{ opacity: opacityOut }} className="absolute -right-[5vw] top-1/2 -translate-y-1/2 translate-x-full w-[25vw] h-[18vw] rounded-3xl overflow-hidden bg-purple-900">
               <Image
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1500&auto=format&fit=crop"
                alt="Starry"
                fill
                className="object-cover"
              />
            </motion.div>


            {/* --- TOP ROW --- */}
            {/* Top Center (Face) */}
            <motion.div style={{ opacity: opacityOut }} className="absolute -top-[5vw] left-1/2 -translate-x-1/2 -translate-y-full w-[25vw] h-[18vw] rounded-3xl overflow-hidden bg-orange-200">
              <Image
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1500&auto=format&fit=crop"
                alt="Face"
                fill
                className="object-cover object-top"
              />
            </motion.div>
            
            {/* Top Left (Pink GSAP) */}
            <motion.div style={{ opacity: opacityOut }} className="absolute -top-[5vw] -left-[5vw] -translate-x-full -translate-y-full w-[35vw] h-[25vw] md:w-[25vw] md:h-[18vw] rounded-3xl overflow-hidden bg-pink-500 flex items-center justify-center">
               <span className="text-white font-black text-6xl opacity-50 absolute top-4 left-4">GSAP</span>
               <div className="w-[15vw] h-[10vw] bg-pink-300 rounded-xl skew-x-12" />
            </motion.div>

            {/* Top Right (Orange Pattern) */}
            <motion.div style={{ opacity: opacityOut }} className="absolute -top-[5vw] -right-[5vw] translate-x-full -translate-y-full w-[25vw] h-[18vw] rounded-3xl overflow-hidden bg-orange-500">
               <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0.2)_20px)]" />
            </motion.div>


            {/* --- BOTTOM ROW --- */}
            {/* Bottom Center (Keys) */}
            <motion.div style={{ opacity: opacityOut }} className="absolute -bottom-[5vw] left-1/2 -translate-x-1/2 translate-y-full w-[25vw] h-[18vw] rounded-3xl overflow-hidden bg-neutral-900">
              <Image
                src="https://images.unsplash.com/photo-1522851493035-77de613afbce?q=80&w=1500&auto=format&fit=crop"
                alt="Keys"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Bottom Left (Green Shapes) */}
            <motion.div style={{ opacity: opacityOut }} className="absolute -bottom-[5vw] -left-[5vw] -translate-x-full translate-y-full w-[25vw] h-[18vw] rounded-3xl overflow-hidden bg-green-400">
               <div className="w-full h-full flex flex-wrap gap-2 p-4 opacity-50">
                 <div className="w-10 h-10 rounded-full bg-green-200" />
                 <div className="w-10 h-10 bg-green-200" />
                 <div className="w-10 h-10 rounded-full bg-green-200" />
               </div>
            </motion.div>

            {/* Bottom Right (Empty Dark / Abstract) */}
            <motion.div style={{ opacity: opacityOut }} className="absolute -bottom-[5vw] -right-[5vw] translate-x-full translate-y-full w-[25vw] h-[18vw] rounded-3xl overflow-hidden bg-zinc-800">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1500&auto=format&fit=crop"
                alt="Abstract"
                fill
                className="object-cover"
              />
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* The content that appears below when scrolling completes */}
      {/* It's positioned normally in the document flow, so it comes up after the sticky h-[300vh] ends */}
      <div className="w-full bg-[#0d0d0d] min-h-screen relative z-20 px-6 md:px-20 py-24 text-white">
        <div className="max-w-[800px] mx-auto pt-20 border-t border-white/20">
          <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
            Here is some content
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-white/70 leading-relaxed font-light">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
