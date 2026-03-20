import React from 'react';
import Image from "next/image";
import type { CircularBadgeProps } from "@/types";

export function CircularBadge({ 
  text, 
  imageSrc, 
  imageAlt = "Mascot", 
  size = 220 
}: CircularBadgeProps) {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
      {/* Spinning ring with text */}
      <div 
        className="badge-ring" 
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <defs>
            <path
              id="circle-path"
              d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            />
          </defs>
          {/* Ring borders */}
          <circle cx="100" cy="100" r="92" fill="none" stroke="#2a2a2a" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
          
          {/* Circular text */}
          <text
            fill="#aaaaaa"
            fontSize="11.5"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
            letterSpacing="3"
          >
            <textPath href="#circle-path">
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Mascot at center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[50%] h-[50%]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
