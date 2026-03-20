import React from 'react';
import { cn } from "@/lib/cn";
import type { PillProps } from "@/types";

export function Pill({ label, className }: PillProps) {
  return (
    <span className={cn("pill", className)}>
      {label}
    </span>
  );
}
