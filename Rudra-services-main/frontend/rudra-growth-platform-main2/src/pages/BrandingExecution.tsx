import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Type, Layers, CheckCircle, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/home/CTASection";
import { KineticText } from "@/components/animations/KineticText";
import { SectionWrapper } from "@/components/animations/SectionWrapper";

// Import branding images
import logoBrandMark from "@/assets/sogadu-logo.png";
import colorPalette from "@/assets/sogadu-colors.png";
import businessCards from "@/assets/sogadu-bussiness-cards.png";
import letterheads from "@/assets/sogadu-letterheads.png";
import chefJackets from "@/assets/sogadu-chef-jackets.png";
import poloShirts from "@/assets/sogadu-polo-shirts.png";
import caps from "@/assets/sogadu-caps.png";
import bathrobes from "@/assets/sogadu-bathrobes.png";
import toiletries from "@/assets/sogadu-toiletries.png";
import slippers from "@/assets/sogadu-slippers.png";
import towels from "@/assets/sogadu-towels.png";


const BrandingExecution = () => {
  return (
    <Layout>
      <div data-page="branding-execution">
      {/* Hero Section */}
      <SectionWrapper as="section" className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Branding Execution</span>
            </div>
            <h1
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2 sm:px-4"
              style={{ wordBreak: "keep-all" }}
            >
              <div className="block">
                <KineticText variant="branding" delay={0.2} className="block">
                  Strategic Branding That
                </KineticText>
                <KineticText variant="branding" delay={0.6} className="text-gradient block">
                  Transforms Vision Into Reality
                </KineticText>
              </div>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              See how Rudra Groups transformed a cultural hospitality vision into a complete, 
              market-ready brand system. Transforms Vision Into Reality through strategic thinking, storytelling, and precision execution.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Project Overview */}
      <SectionWrapper as="section" className="py-20 lg:py-28 relative" delay={0.1}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                label="Case Study"
                title="Sogadu Samskruti Resort"
                description="A complete brand transformation from concept to execution"
                align="left"
              />
              <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  This project demonstrates Rudra Groups' approach to strategic branding—not 
                  surface-level design, but comprehensive brand development built to attract customers, 
                  elevate perception, and scale with the business.
                </p>
                <p>
                  We positioned ourselves as a strategic branding and execution partner, combining 
                  strategy, storytelling, and precision execution to transform a cultural hospitality 
                  vision into a cohesive, high-impact brand system.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-8 lg:p-12"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Project Highlights
              </h3>
              <div className="space-y-4">
                {[
                  "End-to-end brand development",
                  "Logo concept creation with cultural inspiration",
                  "Strategic color palette development",
                  "Typography system design",
                  "Complete touchpoint execution",
                  "Physical and experiential branding"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Brand Strategy Section */}
      <SectionWrapper as="section" className="py-20 lg:py-28 bg-card/30 relative" delay={0.2}>
        <div className="container">
          <SectionHeading
            label="Strategic Approach"
            title="Beyond Design: Building Brands That Work"
            description="Every design decision was backed by strategic thinking and market understanding"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Logo Concept */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="icon-circle-glow mb-6">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Logo Concept Creation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Inspired by traditional rural architecture and nature symbolism, the logo seamlessly 
                blends cultural heritage with modern sophistication. The design tells a story of 
                simplicity, authenticity, and connection to nature.
              </p>
            </motion.div>

            {/* Color Palette */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="icon-circle-glow mb-6">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Strategic Color Palette
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A carefully crafted palette reflecting earthiness, calm luxury, and authenticity:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0D4A3C] border border-border"></div>
                  <span className="text-sm text-foreground">Deep Teal - Trust & Stability</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4A574] border border-border"></div>
                  <span className="text-sm text-foreground">Warm Gold - Luxury & Heritage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5F5DC] border border-border"></div>
                  <span className="text-sm text-foreground">Cream - Calm & Sophistication</span>
                </div>
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="icon-circle-glow mb-6">
                <Type className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Typography System
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A refined typography system balancing heritage aesthetics with modern readability. 
                Serif fonts for elegance and tradition, paired with clean sans-serif for clarity 
                and contemporary appeal.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Execution Touchpoints */}
      <SectionWrapper as="section" className="py-20 lg:py-28 relative" delay={0.3}>
        <div className="container">
          <SectionHeading
            label="Execution Excellence"
            title="Every Touchpoint, Every Experience"
            description="Branding executed consistently across all physical and experiential touchpoints"
            align="center"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { title: "Stationery", items: ["Letterheads", "Business Cards", "Envelopes", "Folders"] },
              { title: "Staff Uniforms", items: ["Chef Wear", "Service Attire", "Caps", "Polo Shirts"] },
              { title: "Guest Experience", items: ["Bathrobes", "Slippers", "In-Room Amenities", "Toiletries"] },
              { title: "Branded Items", items: ["Accessories", "Merchandise", "Packaging", "Signage"] }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 glass-card rounded-3xl p-8 lg:p-12 text-center"
          >
            <p className="text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
              This comprehensive execution ensures a seamless and premium guest experience at every 
              interaction point. Every design decision was translated into real-world applications 
              that reinforce trust, recognition, and brand recall—proving that strategic branding 
              is not just about aesthetics, but about building a brand that works.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Visual Showcase Section */}
      <SectionWrapper as="section" className="py-20 lg:py-28 bg-card/30 relative" delay={0.4}>
        <div className="container">
          <SectionHeading
            label="Execution Proof"
            title="From Concept to Reality"
            description="See how every design decision was translated into tangible brand applications"
            align="center"
          />

          <div className="mt-16 space-y-12">
            {/* Brand Identity Visuals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-8 lg:p-12"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Complete Brand Identity System
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The logo, color palette, and typography work together to create a cohesive brand 
                identity that communicates the resort's values of simplicity, authenticity, and 
                cultural richness.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video bg-muted rounded-xl overflow-hidden shadow-lg"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img src={logoBrandMark} alt="Sogadu Samskruti Logo & Brand Mark" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video bg-muted rounded-xl overflow-hidden shadow-lg"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img src={colorPalette} alt="Color Palette Application" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>

            {/* Stationery & Business Materials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-3xl p-8 lg:p-12"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Stationery & Business Materials
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Professional stationery suite including letterheads and business cards—all maintaining consistent brand application.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-[3/4] bg-muted rounded-xl overflow-hidden shadow-lg"
                >
                  <img src={businessCards} alt="Business Cards" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-[3/4] bg-muted rounded-xl overflow-hidden shadow-lg"
                >
                  <img src={letterheads} alt="Letterheads" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>

            {/* Staff Uniforms & Apparel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-3xl p-8 lg:p-12"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Staff Uniforms & Apparel
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Complete uniform system from chef wear to service staff attire, ensuring brand 
                consistency across all team interactions.
              </p>
              <div className="grid sm:grid-cols-4 gap-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-muted rounded-xl overflow-hidden shadow-lg"
                  style={{ 
                    aspectRatio: '611/450',
                    maxWidth: '611px',
                    width: '100%'
                  }}
                >
                  <img 
                    src={chefJackets} 
                    alt="Chef Jackets" 
                    className="w-full h-full object-cover" 
                    width="611"
                    height="450"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotateZ: -5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square bg-muted rounded-xl overflow-hidden shadow-lg"
                >
                  <img src={poloShirts} alt="Polo Shirts" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square bg-muted rounded-xl overflow-hidden shadow-lg"
                >
                  <img src={caps} alt="Caps" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotateZ: -5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square bg-muted rounded-xl overflow-hidden shadow-lg"
                >
                  <img src={bathrobes} alt="Bathrobes" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>

            {/* Guest Amenities & Toiletries */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-3xl p-8 lg:p-12"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Guest Amenities & Toiletries
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Premium in-room amenities and toiletries that extend the brand experience into 
                every guest interaction, from arrival to departure.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square bg-muted rounded-xl overflow-hidden shadow-lg"
                >
                  <img src={toiletries} alt="Toiletries" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotateZ: -5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square bg-muted rounded-xl overflow-hidden shadow-lg"
                >
                  <img src={slippers} alt="Slippers" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square bg-muted rounded-xl overflow-hidden shadow-lg"
                >
                  <img src={towels} alt="Towels" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Value Proposition */}
      <SectionWrapper as="section" className="py-20 lg:py-28 relative" delay={0.5}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-8 lg:p-12 text-center"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Strategic Branding Built to Scale
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                This is not surface-level design. It's strategic branding built to attract customers, 
                elevate perception, and scale with your business. Every element—from logo to 
                toiletries—works together to create a cohesive brand experience that guests remember 
                and return to.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mt-12">
                {[
                  { title: "Attract", desc: "Design that draws customers" },
                  { title: "Elevate", desc: "Perception that commands respect" },
                  { title: "Scale", desc: "Branding that grows with you" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{item.title}</div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper as="section" className="py-20 lg:py-28 relative" delay={0.6}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Turn Your Vision Into a Cohesive, High-Impact Brand
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Partner with Rudra Groups to transform your business vision into a complete brand 
              system. We combine strategic thinking, cultural understanding, and precision execution 
              to create brands that work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/contact">
                  Start Your Brand Transformation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-glow-primary/30">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <CTASection />
      </div>
    </Layout>
  );
};

export default BrandingExecution;

