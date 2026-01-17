import { useState, useEffect, lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import IntroSequence from "@/components/IntroSequence";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";

// Lazy load sections below the fold for better initial load performance
const WhatWeDoSection = lazy(() => import("@/components/home/WhatWeDoSection"));
const OurEdgeSection = lazy(() => import("@/components/home/OurEdgeSection"));
const ProcessTimeline = lazy(() => import("@/components/home/ProcessTimeline"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

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
      // Mark as seen after intro completes - reduced time for faster loading
      const timer = setTimeout(() => {
        sessionStorage.setItem("rudra-intro-shown", "true");
      }, 5000); // Reduced from 8000ms for faster initial load
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
          <Suspense fallback={<div className="min-h-screen" />}>
            <WhatWeDoSection />
            <OurEdgeSection />
            <ProcessTimeline />
            <CTASection />
          </Suspense>
        </Layout>
      )}
    </>
  );
};

export default Index;
