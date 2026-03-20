"use client";

import React, { useState, useEffect } from "react";
import { NavLink, MoonIcon, SunIcon } from "@/components/ui";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
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
          ? "bg-black/40 backdrop-blur-sm border-b border-white/5 py-3"
          : "bg-transparent border-none py-6"
      )}
    >
      {/* Logo */}
      <div className="text-white font-bold text-2xl tracking-tight select-none cursor-pointer">
        mivon
      </div>

      {/* Desktop Nav - Glass Pill Style */}
      <nav className="hidden md:flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
        {NAV_ITEMS.map((link) => (
          <NavLink key={link.label} {...link} />
        ))}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center hover:border-[#555] transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? <MoonIcon className="w-4 h-4 text-[#aaa]" /> : <SunIcon className="w-4 h-4 text-[#aaa]" />}
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#111] border-t border-[#1c1c1c] flex flex-col gap-0 md:hidden">
          {NAV_ITEMS.map((link) => (
            <NavLink key={link.label} {...link} mobile />
          ))}
        </div>
      )}

      {/* Dot accent */}
      <div className="hidden md:block absolute left-1/3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white opacity-50" />
    </header>
  );
}
