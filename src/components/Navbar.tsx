"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-500",
        scrolled
          ? "bg-white/10 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-purple-900/10"
          : "bg-transparent border-none py-6"
      )}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 cursor-pointer select-none group"
      >
        {/* Logo dot accent */}
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 shadow-[0_0_12px_rgba(139,92,246,0.8)] group-hover:scale-125 transition-transform duration-300" />
        <span className="text-[#1a0533] font-black text-xl tracking-tight">
          Amit<span className="text-violet-600">Kumar</span>
        </span>
      </motion.div>

      {/* Desktop Nav - Floating Pill */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="hidden md:flex items-center gap-1 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-full px-4 py-1.5 shadow-[0_8px_32px_rgba(109,40,217,0.15)]"
      >
        {NAV_ITEMS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative px-4 py-1.5 text-[13px] font-semibold text-[#1a0533]/80 hover:text-[#1a0533] rounded-full hover:bg-white/40 transition-all duration-200 group"
          >
            {link.label}
            {/* Hover dot indicator */}
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-0 group-hover:scale-100" />
          </a>
        ))}
      </motion.nav>

      {/* Right Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        {/* CTA Button */}
        <a
          href="/contact"
          className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[13px] font-bold shadow-[0_4px_20px_rgba(109,40,217,0.4)] hover:shadow-[0_4px_28px_rgba(109,40,217,0.6)] hover:scale-[1.03] transition-all duration-300"
        >
          Hire Me
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex flex-col gap-1.5 items-center justify-center rounded-full bg-white/20 border border-white/30 backdrop-blur-md"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-4 h-0.5 bg-[#1a0533] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-4 h-0.5 bg-[#1a0533] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-4 h-0.5 bg-[#1a0533] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 bg-white/80 backdrop-blur-2xl border border-white/40 rounded-2xl flex flex-col shadow-[0_20px_60px_rgba(109,40,217,0.2)] overflow-hidden md:hidden"
          >
            {NAV_ITEMS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3.5 text-[14px] font-semibold text-[#1a0533]/80 hover:text-violet-700 hover:bg-violet-50/60 border-b border-violet-100/50 last:border-0 transition-all"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="p-4">
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[13px] font-bold shadow-md"
              >
                Hire Me ✦
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
