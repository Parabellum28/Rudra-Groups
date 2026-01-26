import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KineticText } from "@/components/animations/KineticText";
import { FloatingElement, OrbitingElement, MorphingShape } from "@/components/animations/3DAnimations";
import { useIsMobile } from "@/hooks/use-mobile";

const Interactive3DHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  
  // Mouse tracking for 3D parallax - disabled on mobile for better performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Reduced spring stiffness for better performance, even more on mobile
  const springX = useSpring(mouseX, { stiffness: isMobile ? 50 : 100, damping: isMobile ? 30 : 20 });
  const springY = useSpring(mouseY, { stiffness: isMobile ? 50 : 100, damping: isMobile ? 30 : 20 });
  
  // Transform mouse position to rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  
  // Parallax layers
  const layer1X = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const layer1Y = useTransform(springY, [-0.5, 0.5], [-30, 30]);
  const layer2X = useTransform(springX, [-0.5, 0.5], [-50, 50]);
  const layer2Y = useTransform(springY, [-0.5, 0.5], [-50, 50]);
  const layer3X = useTransform(springX, [-0.5, 0.5], [-80, 80]);
  const layer3Y = useTransform(springY, [-0.5, 0.5], [-80, 80]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable mouse parallax on mobile for better performance
    if (isMobile) return;
    
    if (!containerRef.current) return;
    
    // Throttle mouse move for better scroll performance - more aggressive on mobile
    if (mouseMoveTimeoutRef.current) return;
    
    const throttleDelay = isMobile ? 32 : 16; // 30fps on mobile, 60fps on desktop
    mouseMoveTimeoutRef.current = setTimeout(() => {
      mouseMoveTimeoutRef.current = null;
    }, throttleDelay);
    
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXValue = (e.clientX - rect.left) / width - 0.5;
    const mouseYValue = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(mouseXValue);
    mouseY.set(mouseYValue);
  };
  
  useEffect(() => {
    return () => {
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Generate small bubbles - MANY MORE
  const [smallBubbles] = useState(() => {
    const count = isMobile ? 150 : 300;
    return Array.from({ length: count }, (_, i) => ({
      id: `small-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2, // 2-6px
      duration: Math.random() * 6 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  });

  // Generate medium bubbles - MANY MORE
  const [mediumBubbles] = useState(() => {
    const count = isMobile ? 80 : 150;
    return Array.from({ length: count }, (_, i) => ({
      id: `medium-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10, // 10-30px
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.25 + 0.1,
    }));
  });

  // Generate large bubbles - MANY MORE
  const [largeBubbles] = useState(() => {
    const count = isMobile ? 40 : 80;
    return Array.from({ length: count }, (_, i) => ({
      id: `large-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40, // 40-100px
      duration: Math.random() * 10 + 6,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.15 + 0.05,
    }));
  });

  // Generate extra large floating orbs/bubbles - MORE
  const [floatingOrbs] = useState(() => {
    const orbCount = isMobile ? 12 : 25;
    return Array.from({ length: orbCount }, (_, i) => ({
      id: `orb-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 250 + 150, // 150-400px
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.1 + 0.03,
    }));
  });
  
  // Throttle mouse move events for better performance - more aggressive on mobile
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative overflow-hidden bg-background min-h-[100vh] flex items-center perspective-2000"
      style={{ 
        transformStyle: "preserve-3d",
        willChange: 'transform',
        transform: 'translateZ(0)', // GPU acceleration
      }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 z-[1]" />
      
      {/* Animated gradient background with parallax - simplified on mobile */}
      {!isMobile ? (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5 z-[2]"
          style={{
            x: layer1X,
            y: layer1Y,
            transformStyle: "preserve-3d",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5 z-[2]" />
      )}

      {/* Extra large floating orbs/bubbles */}
      {floatingOrbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-primary/20 blur-3xl z-[2] pointer-events-none"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            marginLeft: `-${orb.size / 2}px`,
            marginTop: `-${orb.size / 2}px`,
            opacity: orb.opacity,
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 80 - 40, 0],
            opacity: [orb.opacity, orb.opacity * 1.5, orb.opacity],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Large bubbles */}
      {largeBubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-primary/25 blur-md z-[2] pointer-events-none"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            marginLeft: `-${bubble.size / 2}px`,
            marginTop: `-${bubble.size / 2}px`,
            opacity: bubble.opacity,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.4, 1],
            opacity: [bubble.opacity * 0.6, bubble.opacity, bubble.opacity * 0.6],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Medium bubbles */}
      {mediumBubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-primary/30 blur-sm z-[2] pointer-events-none"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            marginLeft: `-${bubble.size / 2}px`,
            marginTop: `-${bubble.size / 2}px`,
            opacity: bubble.opacity,
          }}
          animate={{
            y: [0, -45, 0],
            x: [0, Math.random() * 35 - 17.5, 0],
            scale: [1, 1.5, 1],
            opacity: [bubble.opacity * 0.5, bubble.opacity, bubble.opacity * 0.5],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Small bubbles */}
      {smallBubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-primary/40 z-[2] pointer-events-none"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: bubble.opacity,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.6, 1],
            opacity: [bubble.opacity * 0.4, bubble.opacity, bubble.opacity * 0.4],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 3D Floating Shapes - disabled on mobile for better performance */}
      {!isMobile && (
        <>
          <FloatingElement duration={12} y={40} x={20} className="absolute top-20 left-10 w-32 h-32 opacity-20 z-[2]">
            <MorphingShape className="w-full h-full" color="hsl(var(--glow-primary) / 0.15)" duration={15} />
          </FloatingElement>
          
          <FloatingElement duration={15} y={35} x={-15} delay={2} className="absolute bottom-20 right-10 w-40 h-40 opacity-15 z-[2]">
            <MorphingShape className="w-full h-full" color="hsl(var(--glow-cyan) / 0.12)" duration={18} />
          </FloatingElement>
        </>
      )}

      {/* Orbiting elements - disabled on mobile */}
      {!isMobile && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[2]">
        <OrbitingElement radius={200} duration={30}>
          <div className="w-3 h-3 rounded-full bg-glow-primary/30 shadow-glow-sm" />
        </OrbitingElement>
        <OrbitingElement radius={300} duration={40} reverse delay={5}>
          <div className="w-2 h-2 rounded-full bg-glow-cyan/25" />
        </OrbitingElement>
        <OrbitingElement radius={150} duration={25} delay={10}>
          <div className="w-1.5 h-1.5 rounded-full bg-glow-light/30" />
        </OrbitingElement>
      </div>
      )}

      {/* Ambient glows with parallax - simplified on mobile */}
      {!isMobile ? (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-primary/10 rounded-full blur-[200px] pointer-events-none z-[2]"
          style={{
            x: layer3X,
            y: layer3Y,
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-primary/5 rounded-full blur-[150px] pointer-events-none z-[2]" />
      )}

      {/* Main content with 3D transform */}
      <div className="container relative z-10 py-20 lg:py-32">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Headline with kinetic text animation */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: "translateZ(50px)" }}
          >
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 leading-[1.15] sm:leading-[1.1] md:leading-[1.05] tracking-tight px-2 sm:px-4" style={{ wordBreak: 'normal', overflowWrap: 'normal' }}>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-1.5 sm:gap-2 md:gap-3">
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
                    delay={0.5}
                    className="inline-block"
                  >
                    End-to-End Execution
                  </KineticText>
                </span>
              </div>
            </h1>
          </motion.div>
          
          {/* Supporting Sub-text with 3D depth */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transform: "translateZ(30px)" }}
            className="font-body text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light text-center px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Rudra Groups delivers strategy, branding, expansion, infrastructure, and automation solutions 
            with clarity and confidence. Your trusted partner for complete business transformation.
          </motion.p>

          {/* CTAs with 3D hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transform: "translateZ(40px)" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                z: 20,
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Connect With Us
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                rotateY: -5,
                z: 20,
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary/20 hover:border-primary/40 bg-transparent hover:bg-primary/5 text-foreground px-8 py-6 text-lg font-medium rounded-md transition-all duration-300"
              >
                <Link to="/branding-execution">View Our Work</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with 3D effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ transform: "translateZ(20px)" }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Interactive3DHero;
