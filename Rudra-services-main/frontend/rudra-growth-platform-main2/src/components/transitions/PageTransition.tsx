import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousPathname = useRef<string>(location.pathname);
  const isInitialMount = useRef<boolean>(true);

  useEffect(() => {
    // Skip transition on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousPathname.current = location.pathname;
      return;
    }

    // Only trigger if pathname actually changed
    if (previousPathname.current === location.pathname) {
      return;
    }

    // Start transition
    setIsTransitioning(true);

    // Update previous pathname after transition completes (fade out + fade in)
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      previousPathname.current = location.pathname;
    }, 800); // Total transition duration (400ms fade out + 400ms fade in)

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Transition Overlay - Cross-dissolve effect */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
            className="fixed inset-0 z-[10000] pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                hsl(var(--background) / 0.15) 0%,
                hsl(var(--background) / 0.4) 20%,
                hsl(var(--background) / 0.7) 40%,
                hsl(var(--background) / 0.85) 50%,
                hsl(var(--background) / 0.7) 60%,
                hsl(var(--background) / 0.4) 80%,
                hsl(var(--background) / 0.15) 100%
              )`,
              backdropFilter: "blur(10px)",
              willChange: "opacity",
            }}
          >
            {/* Subtle light ray effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(
                  ellipse 100% 40% at 50% 50%,
                  hsl(var(--primary) / 0.1) 0%,
                  transparent 60%
                )`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content with smooth fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: isInitialMount.current ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: isInitialMount.current ? 0.6 : 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            willChange: "opacity",
            minHeight: "100vh",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransition;

