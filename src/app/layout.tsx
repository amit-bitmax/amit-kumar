import type { Metadata } from "next";
import { Satisfy } from "next/font/google";
import "./globals.css";

import DockMenu from "@/components/DockMenu";
import Footer from "@/components/Footer";

const satisfy = Satisfy({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-satisfy" 
});

export const metadata: Metadata = {
  title: "Amit kumar",
  description: "Software Engineer",
};

import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${satisfy.variable} bg-[#0d0d0d] text-white antialiased`}>
        <Script 
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js" 
          strategy="beforeInteractive"
        />
        {children}
        <Footer />
        <DockMenu />
      </body>
    </html>
  );
}
