import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  margin?: string;
  once?: boolean;
  as?: "section" | "div";
}

/**
 * SectionWrapper - Provides a consistent pop-in entrance animation for sections
 * 
 * Animation features:
 * - Scale from 0.85 to 1 (pop-in effect)
 * - Opacity fade from 0 to 1
 * - Slight upward movement (y: 30 to 0)
 * - Spring-like easing for smooth bounce
 */
export const SectionWrapper = ({
  children,
  className = "",
  delay = 0,
  margin = "-100px",
  once = true,
  as = "div",
}: SectionWrapperProps) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  // Use less aggressive margin on mobile
  const adjustedMargin = isMobile ? "-50px" : margin;
  const isInView = useInView(ref, { once, margin: adjustedMargin });

  const MotionComponent = as === "section" ? motion.section : motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial={{ opacity: 0, y: isMobile ? 20 : 30, scale: isMobile ? 0.95 : 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={
        isMobile
          ? {
              duration: 0.4, // Faster, simpler animation on mobile
              delay,
              ease: [0.16, 1, 0.3, 1],
            }
          : {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom easing for smooth pop-in
        type: "spring",
        stiffness: 100,
        damping: 15,
            }
      }
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default SectionWrapper;

