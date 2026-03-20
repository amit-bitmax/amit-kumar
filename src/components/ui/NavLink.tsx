import React from 'react';
import { cn } from "@/lib/cn";
import type { NavItem } from "@/types";

export interface NavLinkProps extends NavItem {
  className?: string;
  mobile?: boolean;
}

export function NavLink({ label, hasDropdown, className, mobile }: NavLinkProps) {
  if (mobile) {
    return (
      <button
        className={cn(
          "text-left px-6 py-4 text-[13px] font-medium text-[#ccc] hover:text-white hover:bg-[#1a1a1a] transition-colors border-b border-[#1c1c1c] w-full",
          className
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      className={cn(
        "nav-link flex items-center gap-1 text-[13px] font-medium text-[#cccccc] hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 tracking-wide transition-all duration-300 group",
        className
      )}
      aria-label={label}
    >
      {label}
      {hasDropdown && (
        <svg
          className="w-3 h-3 mt-0.5 text-[#666] group-hover:text-white transition-colors"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
