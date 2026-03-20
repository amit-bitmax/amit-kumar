import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkExperience from "@/components/WorkExperience";
import ProjectsSection from "@/components/ProjectsSection";
import StackedCards from "@/components/StackedCards";
import Gallery from "@/components/Gallery";
import AboutBanner from "@/components/AboutBanner";
import ApproachSection from "@/components/ApproachSection";
import ServicesSection from "@/components/ServicesSection";
import BlogSection from "@/components/BlogSection";
import ZoomGridSection from "@/components/ZoomGridSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      <HeroSection />
      
      {/* Sticky Reveal Section */}
      <AboutBanner />

      {/* Following sections cover the banner as they scroll up */}
      <div className="relative z-10 bg-[#0d0d0d] shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <ServicesSection />
        <WorkExperience />
        <ProjectsSection />
        <StackedCards />
        <Gallery />
        <ApproachSection />
        <BlogSection />
        <ZoomGridSection />
      </div>
    </main>
  );
}
