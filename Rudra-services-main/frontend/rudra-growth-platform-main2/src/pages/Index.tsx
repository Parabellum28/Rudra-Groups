import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import IntroSequence from "@/components/IntroSequence";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import OurEdgeSection from "@/components/home/OurEdgeSection";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  // Check if intro has been shown before (using sessionStorage)
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("rudra-intro-shown");
    if (hasSeenIntro === "true") {
      setShowIntro(false);
      setShowContent(true);
    } else {
      // Mark as seen after intro completes
      const timer = setTimeout(() => {
        sessionStorage.setItem("rudra-intro-shown", "true");
      }, 8000); // After intro sequence completes
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}
      {showContent && (
        <Layout>
          <HeroSection />
          <StatsSection />
          <WhatWeDoSection />
          <OurEdgeSection />
          <ProcessTimeline />
          <CTASection />
        </Layout>
      )}
    </>
  );
};

export default Index;
