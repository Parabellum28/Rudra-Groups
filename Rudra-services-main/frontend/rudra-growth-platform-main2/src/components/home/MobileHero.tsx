import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KineticText } from "@/components/animations/KineticText";
import bgVid2Webm from "@/assets/bg-vid2.webm";

const MobileHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background min-h-screen flex items-center"
      style={{
        width: "100vw",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Background video - only loads on mobile */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          objectPosition: "center center",
          width: "100%",
          height: "100%",
        }}
      >
        <source src={bgVid2Webm} type="video/webm" />
      </video>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/75 to-background/70 z-[1]" />
      
      {/* Simple gradient overlay - no parallax */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5 z-[2]" />

      {/* Simple ambient glow - lightweight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-primary/5 rounded-full blur-[150px] pointer-events-none z-[2]" />

      {/* Main content - centered and optimized */}
      <div className="container relative z-10 py-20 w-full max-w-full px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full max-w-full mx-auto text-center"
        >
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight px-2">
              <div className="flex flex-col items-center gap-2">
                <KineticText
                  variant="hero"
                  delay={0.2}
                  className="inline-block whitespace-nowrap text-center"
                >
                  360° Business Consulting
                </KineticText>
                <span className="inline-block whitespace-nowrap text-center" style={{ color: '#00d4ff' }}>
                  <KineticText
                    variant="hero"
                    delay={0.4}
                    className="inline-block"
                  >
                    End-to-End Execution
                  </KineticText>
                </span>
              </div>
            </h1>
          </motion.div>
          
          {/* Supporting Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-base sm:text-lg text-white mb-8 max-w-full mx-auto leading-relaxed font-light text-center px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
          >
            Rudra Groups delivers strategy, branding, expansion, infrastructure, and automation solutions 
            with clarity and confidence. Your trusted partner for complete business transformation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col gap-4 justify-center items-center w-full px-2"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-5 text-base font-medium rounded-md shadow-lg w-full max-w-sm"
            >
              <Link to="/contact" className="flex items-center justify-center gap-2">
                Connect With Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary/20 hover:border-primary/40 bg-transparent hover:bg-primary/5 text-foreground px-6 py-5 text-base font-medium rounded-md w-full max-w-sm"
            >
              <Link to="/branding-execution">View Our Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 bg-primary rounded-full mt-1.5"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MobileHero;


