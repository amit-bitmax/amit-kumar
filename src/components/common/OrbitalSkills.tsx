"use client";

import React from "react";
import { motion } from "framer-motion";

const ROW_1 = [
  { id: "figma", name: "Figma", icon: "https://api.iconify.design/logos:figma.svg", x: 260 },
  { id: "react", name: "React", icon: "https://api.iconify.design/logos:react.svg", x: 310 },
  { id: "cpp", name: "C++", icon: "https://api.iconify.design/logos:c-plusplus.svg", x: 360 },
  { id: "node", name: "Node", icon: "https://api.iconify.design/logos:nodejs-icon.svg", x: 410 },
  { id: "redux", name: "Redux", icon: "https://api.iconify.design/logos:redux.svg", x: 460 },
  { id: "js", name: "JS", icon: "https://api.iconify.design/logos:javascript.svg", x: 510 },
  { id: "css", name: "CSS", icon: "https://api.iconify.design/logos:css-3.svg", x: 560 },
];

const ROW_2 = [
  { id: "xd", name: "Adobe XD", icon: "https://api.iconify.design/logos:adobe-xd.svg", x: 285 },
  { id: "nextjs", name: "Next.js", icon: "https://api.iconify.design/logos:nextjs-icon.svg", x: 335 },
  { id: "gatsby", name: "Gatsby", icon: "https://api.iconify.design/logos:gatsby.svg", x: 385 },
  { id: "ai", name: "Illustrator", icon: "https://api.iconify.design/logos:adobe-illustrator.svg", x: 435 },
  { id: "express", name: "Express", icon: "https://api.iconify.design/logos:express.svg", x: 485 },
  { id: "mongodb", name: "MongoDB", icon: "https://api.iconify.design/logos:mongodb-icon.svg", x: 535 },
];

const ALL_SKILLS = [...ROW_1.map(s => ({ ...s, y: 60 })), ...ROW_2.map(s => ({ ...s, y: 120 }))];

const ORBITAL_TECHS = [
  { id: "li", icon: "https://api.iconify.design/logos:linkedin-icon.svg", orbit: 220, duration: 20, delay: 0 },
  { id: "gatsby-orb", icon: "https://api.iconify.design/logos:gatsby.svg", orbit: 320, duration: 30, delay: 5 },
  { id: "js-orb", icon: "https://api.iconify.design/logos:javascript.svg", orbit: 160, duration: 15, delay: 2 },
  { id: "css-orb", icon: "https://api.iconify.design/logos:css-3.svg", orbit: 220, duration: 25, delay: 10 },
  { id: "figma-orb", icon: "https://api.iconify.design/logos:figma.svg", orbit: 320, duration: 35, delay: 15 },
];

export default function OrbitalSkills() {
  const centerX = 410;
  const centerY = 400;

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible">
      {/* ── Background Glow ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[40%] rounded-[100%] bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[20%] w-[60%] h-[20%] rounded-[100%] bg-indigo-500/20 blur-[80px]" />
      </div>

      {/* ── Central Icon ('Z') ── */}
      <div className="relative z-20 mt-32">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-32 h-32 rounded-full bg-indigo-600/30 backdrop-blur-xl flex items-center justify-center border border-indigo-400/20 shadow-[0_0_80px_rgba(99,102,241,0.6)]"
        >
          {/* Stylized 'Z' Logo */}
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_10px_white]">
            <path d="M20 20 H80 L20 80 H80" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border-2 border-indigo-300/30"
          />
        </motion.div>
      </div>

      {/* ── SVG Layer for Orbits and Connections ── */}
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible"
        viewBox="0 0 820 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(99,102,241,0)" />
            <stop offset="60%" stopColor="rgba(124,58,237,0.3)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.6)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connection Paths (Curved from top icons to center) */}
        {ALL_SKILLS.map((skill, i) => (
          <motion.path
            key={`line-${skill.id}`}
            d={`M ${skill.x} ${skill.y} Q ${skill.x + (centerX - skill.x) * 0.4} ${centerY - (centerY - skill.y) * 0.6} ${centerX} ${centerY}`}
            fill="none"
            stroke="url(#curve-gradient)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2.5, delay: i * 0.05, ease: "easeInOut" }}
            filter="url(#glow)"
          />
        ))}

        {/* Orbital Rings (Ellipses) */}
        <ellipse
          cx={centerX} cy={centerY} rx="260" ry="100"
          fill="none" stroke="rgba(139,92,246,0.4)" strokeWidth="1"
          transform={`rotate(-5 ${centerX} ${centerY})`}
        />
        <ellipse
          cx={centerX} cy={centerY} rx="360" ry="140"
          fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1"
          transform={`rotate(2 ${centerX} ${centerY})`}
        />
        <ellipse
          cx={centerX} cy={centerY} rx="160" ry="60"
          fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth="1"
          transform={`rotate(-2 ${centerX} ${centerY})`}
        />
      </svg>

      {/* ── Top Skill Icons ── */}
      <div className="absolute inset-x-0 top-0 h-[300px] pointer-events-none z-30">
        {ALL_SKILLS.map((skill, i) => (
          <motion.div
            key={`skill-${skill.id}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -5, 0] }}
            transition={{
              scale: { duration: 0.6, delay: i * 0.05 },
              opacity: { duration: 0.6, delay: i * 0.05 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }
            }}
            style={{
              position: "absolute",
              left: `${(skill.x / 820) * 100}%`,
              top: `${(skill.y / 600) * 100}%`,
              transform: "translate(-50%, -50%)"
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900/60 border border-slate-400/20 p-2 shadow-2xl backdrop-blur-sm group pointer-events-auto"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>

      {/* ── Animated Orbital Technologies ── */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-visible flex items-center justify-center">
        {ORBITAL_TECHS.map((tech, i) => (
          <div
            key={`orbit-${tech.id}`}
            className="absolute inset-0 flex items-center justify-center scale-y-[0.4]"
            style={{ paddingBottom: '160px' }} // Offset for centering
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: tech.duration,
                repeat: Infinity,
                ease: "linear",
                delay: tech.delay
              }}
              style={{ width: tech.orbit * 2, height: tech.orbit * 2 }}
              className="relative rounded-full pointer-events-none"
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: 'translateX(-50%) translateY(-50%) scaleY(2.5)' }} // Counter-squash
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 h-8 rounded-full bg-indigo-900/40 backdrop-blur-sm border border-indigo-400/20 p-1.5 shadow-xl flex items-center justify-center"
                >
                  <img src={tech.icon} alt="tech" className="w-full h-full object-contain opacity-80" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
