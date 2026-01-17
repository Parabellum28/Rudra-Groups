import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionTransitionProps {
  sections: React.RefObject<HTMLElement>[];
  enabled?: boolean;
}

const SectionTransition = ({ sections, enabled = true }: SectionTransitionProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const previousSectionIndex = useRef<number>(-1);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || sections.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const sectionVisibility = new Map<number, number>(); // Track visibility ratio for each section

    // Track scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Function to determine the most visible section
    const updateActiveSection = () => {
      let mostVisibleIndex = -1;
      let maxVisibility = 0;

      sectionVisibility.forEach((visibility, index) => {
        if (visibility > maxVisibility && visibility >= 0.35) {
          maxVisibility = visibility;
          mostVisibleIndex = index;
        }
      });

      if (mostVisibleIndex !== -1 && mostVisibleIndex !== previousSectionIndex.current) {
        const oldIndex = previousSectionIndex.current;
        
        // Only trigger transition if moving to a different section (not initial load)
        if (oldIndex !== -1 && oldIndex !== mostVisibleIndex) {
          // Debounce rapid section changes
          if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
          }
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }

          // Start transition with smooth progress animation
          setIsTransitioning(true);
          setTransitionProgress(0);

          // Animate progress from 0 to 1
          const startTime = performance.now();
          const duration = 600; // 600ms for smooth cross-dissolve

          const animateProgress = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing curve (ease-in-out-cubic)
            const easedProgress = progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            setTransitionProgress(easedProgress);

            if (progress < 1) {
              animationFrameRef.current = requestAnimationFrame(animateProgress);
            } else {
              // Transition complete
              setIsTransitioning(false);
              setTransitionProgress(0);
              previousSectionIndex.current = mostVisibleIndex;
            }
          };

          animationFrameRef.current = requestAnimationFrame(animateProgress);
        } else if (oldIndex === -1) {
          // Initial load - set without transition
          previousSectionIndex.current = mostVisibleIndex;
        }
      }
    };

    // Create intersection observers for each section
    sections.forEach((sectionRef, index) => {
      if (!sectionRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Track visibility ratio for this section
            if (entry.isIntersecting) {
              sectionVisibility.set(index, entry.intersectionRatio);
            } else {
              sectionVisibility.delete(index);
            }
            
            // Update active section after a small delay to batch updates
            requestAnimationFrame(updateActiveSection);
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds for smooth tracking
          rootMargin: "-20% 0px -20% 0px", // Only trigger when section is in middle portion of viewport
        }
      );

      observer.observe(sectionRef.current);
      observers.push(observer);
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((observer) => observer.disconnect());
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [sections, enabled]);

  // Calculate overlay opacity based on progress
  const overlayOpacity = transitionProgress * 0.95;
  const blurAmount = transitionProgress * 15;
  const scaleAmount = 1 + transitionProgress * 0.02; // Subtle scale effect

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="section-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          style={{
            willChange: "opacity, transform",
          }}
        >
          {/* Main Cross-Dissolve Overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                ${scrollDirection === "down" ? "to bottom" : "to top"},
                hsl(var(--background) / 0) 0%,
                hsl(var(--background) / ${overlayOpacity * 0.3}) 10%,
                hsl(var(--background) / ${overlayOpacity * 0.6}) 25%,
                hsl(var(--background) / ${overlayOpacity * 0.85}) 40%,
                hsl(var(--background) / ${overlayOpacity}) 50%,
                hsl(var(--background) / ${overlayOpacity * 0.85}) 60%,
                hsl(var(--background) / ${overlayOpacity * 0.6}) 75%,
                hsl(var(--background) / ${overlayOpacity * 0.3}) 90%,
                hsl(var(--background) / 0) 100%
              )`,
              backdropFilter: `blur(${blurAmount}px)`,
              transform: `scale(${scaleAmount})`,
              transformOrigin: scrollDirection === "down" ? "top center" : "bottom center",
            }}
          />

          {/* Secondary Light Ray Effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                ellipse 80% 50% at ${scrollDirection === "down" ? "50% 0%" : "50% 100%"},
                hsl(var(--primary) / ${overlayOpacity * 0.15}) 0%,
                hsl(var(--primary) / ${overlayOpacity * 0.08}) 30%,
                transparent 70%
              )`,
              opacity: overlayOpacity,
            }}
          />

          {/* Subtle Edge Glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                ${scrollDirection === "down" ? "to bottom" : "to top"},
                hsl(var(--primary) / ${overlayOpacity * 0.2}) 0%,
                transparent 15%,
                transparent 85%,
                hsl(var(--primary) / ${overlayOpacity * 0.2}) 100%
              )`,
              opacity: overlayOpacity * 0.5,
            }}
          />

          {/* Animated Particles/Noise Effect for texture */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: scrollDirection === "down" 
                ? ["0% 0%", "0% 100%"] 
                : ["0% 100%", "0% 0%"],
            }}
            transition={{
              duration: 0.6,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
              mixBlendMode: "overlay",
              opacity: overlayOpacity * 0.15,
            }}
          />

          {/* Smooth Fade Edge for seamless blend */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                ${scrollDirection === "down" ? "to bottom" : "to top"},
                transparent 0%,
                hsl(var(--background) / ${overlayOpacity * 0.1}) 5%,
                transparent 10%,
                transparent 90%,
                hsl(var(--background) / ${overlayOpacity * 0.1}) 95%,
                transparent 100%
              )`,
              opacity: overlayOpacity,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionTransition;

