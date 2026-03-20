"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden">
      {/* The Gradient Background */}
      <div className="absolute inset-0 bg-[#f5f5f0] z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500/20 to-transparent z-1" />

      <div className="relative z-10 px-6 lg:px-12 pt-32 pb-12">
        {/* Top Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-40">

          {/* Menu */}
          <div className="flex flex-col gap-6">
            <span className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em]">(MENU)</span>
            <div className="flex flex-col gap-3">
              {["Home", "Portfolio", "My process", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-black text-xl font-medium hover:text-blue-600 transition-colors w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-6">
            <span className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em]">(SOCIALS)</span>
            <div className="flex flex-col gap-3">
              {["Instagram", "LinkedIn", "Dribbble"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-black text-xl font-medium hover:text-blue-600 transition-colors w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6 lg:items-end">
            <span className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em] lg:text-right">(SAY "HELLO")</span>
            <a
              href="mailto:hello@amitkumar.dev"
              className="text-black text-xl md:text-2xl font-black hover:text-blue-600 transition-colors break-words"
            >
              hello@amitkumar.dev
            </a>
          </div>
        </div>

        {/* Huge Branding Text */}
        <div className="relative mb-20 pointer-events-none">
          <h2 className="text-[12vw] font-[900] text-black leading-none tracking-[-0.05em] uppercase text-center opacity-90">
            AMIT KUMAR
          </h2>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-black/5 gap-6">
          <p className="text-black/40 text-sm font-bold tracking-tight">
            ©{currentYear} Amit Kumar
          </p>
          <div className="flex items-center gap-2 text-black/40 text-sm font-bold tracking-tight">
            <span>From Delhi with love</span>
            <span className="text-red-500 animate-pulse">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );

}
