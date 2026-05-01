import type { Metadata } from "next";
import { Satisfy } from "next/font/google";
import "./globals.css";

// import DockMenu from "@/components/DockMenu";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${satisfy.variable} bg-[#0d0d0d] text-white antialiased`}>
        {children}
        <Footer />
        {/* <DockMenu /> */}
      </body>
    </html>
  );
}
