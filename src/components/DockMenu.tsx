"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiHome, FiUser, FiActivity, FiBriefcase, FiMessageSquare, FiFileText } from "react-icons/fi";

const DOCK_ICONS = [
  { id: 1, Icon: FiHome, label: "Home" },
  { id: 2, Icon: FiUser, label: "About" },
  { id: 3, Icon: FiActivity, label: "Progress" },
  { id: 4, Icon: FiBriefcase, label: "Projects" },
  { id: 5, Icon: FiMessageSquare, label: "Contact" },
  { id: 6, Icon: FiFileText, label: "Blog" },
];

export default function DockMenu() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-[95vw] flex justify-center">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-14 md:h-16 items-end gap-2 sm:gap-3 md:gap-5 rounded-2xl md:rounded-3xl bg-white/5 px-3 sm:px-4 md:px-6 pb-2 backdrop-blur-sm border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto overflow-x-auto overflow-y-hidden no-scrollbar max-w-full"
      >
        {DOCK_ICONS.map((icon) => (
          <DockIcon key={icon.id} mouseX={mouseX} Icon={icon.Icon} label={icon.label} />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({ mouseX, Icon, label }: { mouseX: any; Icon: React.ElementType; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  // Calculate width based on distance from mouse
  // Base width 44px allows 6 icons + gaps to perfectly fit a 375px mobile screen
  const widthSync = useTransform(distance, [-150, 0, 150], [44, 80, 44]);

  // Apply a spring for smooth animation
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 180,
    damping: 15
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="group relative flex items-center justify-center transition-all cursor-pointer"
    >
      <div className="relative w-full h-full p-2 flex items-center justify-center">
        <Icon className="w-10 h-10 sm:w-10 sm:h-10 md:w-full md:h-full text-white/60 group-hover:text-white drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all duration-300" />
      </div>

      {/* Tooltip */}
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none shadow-xl scale-75 group-hover:scale-100 duration-200">
        {label}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-r border-b border-white/10" />
      </div>
    </motion.div>
  );
}
