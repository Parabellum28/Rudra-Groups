import { useEffect, useRef, ReactNode } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const directionVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
};

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={directionVariants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const TextReveal = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.02,
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export const Parallax = ({
  children,
  offset = 50,
  className = "",
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const cachedRect = useRef<DOMRect | null>(null);
  const lastScrollY = useRef<number>(0);
  const rectUpdateTimeout = useRef<number | null>(null);

  useEffect(() => {
    // Disable parallax on mobile for better performance
    if (isMobile) return;

    let ticking = false;
    const throttleDelay = 16; // 60fps on desktop

    // Cache rect and only update when scroll position changes significantly
    const updateCachedRect = () => {
      if (!ref.current) return;
      cachedRect.current = ref.current.getBoundingClientRect();
    };

    const updateTransform = () => {
      if (!ref.current) return;
      
      // Only recalculate rect if scroll position changed significantly (>50px)
      const currentScrollY = window.scrollY;
      if (!cachedRect.current || Math.abs(currentScrollY - lastScrollY.current) > 50) {
        updateCachedRect();
        lastScrollY.current = currentScrollY;
      }

      if (!cachedRect.current) {
        updateCachedRect();
      }

      const rect = cachedRect.current!;
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      const translateY = (clampedProgress - 0.5) * offset;
      
      // Use transform for better performance
      ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    // Initial rect cache
    updateCachedRect();
    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Periodically update cached rect (every 200ms) to account for layout changes
    const rectUpdateInterval = setInterval(() => {
      if (rectUpdateTimeout.current) {
        cancelAnimationFrame(rectUpdateTimeout.current);
      }
      rectUpdateTimeout.current = requestAnimationFrame(updateCachedRect);
    }, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (rectUpdateTimeout.current) {
        cancelAnimationFrame(rectUpdateTimeout.current);
      }
      clearInterval(rectUpdateInterval);
    };
  }, [offset, isMobile]);

  // On mobile, render without parallax effects
  if (isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
};

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export const StaggerChildren = ({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerChildrenProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

export default ScrollReveal;