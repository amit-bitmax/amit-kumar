// ─── Navigation ─────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

// ─── Badge ──────────────────────────────────────────────────────────────────
export interface CircularBadgeProps {
  /** Text that repeats around the ring */
  text: string;
  /** Image shown at the centre of the ring */
  imageSrc: string;
  imageAlt?: string;
  /** Diameter of the ring in px (default 220) */
  size?: number;
  /** CSS animation duration, e.g. "14s" */
  spinDuration?: string;
}

// ─── Button ─────────────────────────────────────────────────────────────────
export interface CtaButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

// ─── Pill ───────────────────────────────────────────────────────────────────
export interface PillProps {
  label: string;
  className?: string;
}
// ─── Experience ─────────────────────────────────────────────────────────────
export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}
