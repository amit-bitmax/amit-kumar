import React from 'react';
import { cn } from "@/lib/cn";
import type { CtaButtonProps } from "@/types";

export function CtaButton({ label, onClick, href }: CtaButtonProps) {
  const Component = href ? "a" : "button";
  
  return (
    <Component 
      href={href}
      onClick={onClick}
      className="cta-btn group" 
      aria-label={label}
    >
      <span className="tracking-[0.12em] uppercase">{label}</span>
      <span className="cta-arrow flex items-center justify-center w-9 h-9 rounded-full border border-white group-hover:border-[#0d0d0d] transition-colors">
        <svg
          className="w-4 h-4 text-white group-hover:text-[#0d0d0d] transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
      </span>
    </Component>
  );
}
