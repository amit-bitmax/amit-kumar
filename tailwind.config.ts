import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "#0d0d0d",
          surface: "#141414",
          border: "#2a2a2a",
          muted: "#8a8a8a",
          accent: "#ffffff",
        },
      },
      keyframes: {
        spin_slow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        fade_up: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        spin_slow: "spin_slow 12s linear infinite",
        fade_up: "fade_up 0.8s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
