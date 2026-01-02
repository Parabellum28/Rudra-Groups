import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import OurEdgeSection from "@/components/home/OurEdgeSection";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <WhatWeDoSection />
      <OurEdgeSection />
      <ProcessTimeline />
      <CTASection />
    </Layout>
  );
};

export default Index;