import type { NavItem } from "@/types";

// ─── Navigation ─────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "HOME",       href: "/",        hasDropdown: true  },
  { label: "PAGES",      href: "/pages",   hasDropdown: true  },
  { label: "WORKS",      href: "/works",   hasDropdown: true  },
  { label: "BLOGS",      href: "/blogs",   hasDropdown: true  },
  { label: "CONTACT US", href: "/contact", hasDropdown: false },
];

// ─── Hero ────────────────────────────────────────────────────────────────────
export const SERVICE_PILLS = [
  "UI/UX Design",
  "Development",
  "SEO & SMM",
  "Marketing",
] as const;

export const BADGE_TEXT =
  "MARKETING · TRENING · BRANDING · MARKETING · TRENING ·";

export const HERO_DESCRIPTION =
  "We build brands that shape places and move people. We partner with bold thinkers who see design as a catalyst for change — visionaries who shape places and redefine spaces.";

// ─── Experience ─────────────────────────────────────────────────────────────
export const EXPERIENCE_DATA = [
  {
    id: "1",
    title: "CIB on the Mobile",
    description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
    imageSrc: "/assets/icons/3d-bookmark.png",
  },
  {
    id: "2",
    title: "CIB on the Mobile",
    description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
    imageSrc: "/assets/icons/3d-lightbulb.png",
  },
  {
    id: "3",
    title: "CIB on the Mobile",
    description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
    imageSrc: "/assets/icons/3d-coffee.png",
  },
  {
    id: "4",
    title: "CIB on the Mobile",
    description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
    imageSrc: "/assets/icons/3d-dropper.png",
  },
];
