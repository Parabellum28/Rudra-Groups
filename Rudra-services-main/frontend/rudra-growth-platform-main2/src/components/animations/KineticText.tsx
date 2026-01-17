import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface KineticTextProps {
  children: string;
  className?: string;
  delay?: number;
  variant?: "hero" | "section" | "branding" | "edge";
  as?: "h1" | "h2" | "h3" | "span" | "div";
}

/**
 * KineticText - Unique kinetic text animation with character-by-character motion
 * 
 * Variants:
 * - hero: Dramatic entrance with rotation and scale
 * - section: Smooth cascading effect
 * - branding: Elegant reveal with slight rotation
 * - edge: Dynamic pop-in with spring physics
 */
export const KineticText = ({
  children,
  className = "",
  delay = 0,
  variant = "section",
  as: Component = "span",
}: KineticTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Split text into characters, preserving spaces and line breaks
  const characters = children.split("");

  // Variant-specific animation configurations
  const getVariantConfig = () => {
    switch (variant) {
      case "hero":
        return {
          initial: { 
            opacity: 0, 
            y: 50, 
            rotateX: -90, 
            scale: 0.3,
            filter: "blur(10px)"
          },
          animate: { 
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            scale: 1,
            filter: "blur(0px)"
          },
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
          },
        };
      case "section":
        return {
          initial: { 
            opacity: 0, 
            y: 30, 
            rotateZ: -15, 
            scale: 0.8 
          },
          animate: { 
            opacity: 1, 
            y: 0, 
            rotateZ: 0, 
            scale: 1 
          },
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
          },
        };
      case "branding":
        return {
          initial: { 
            opacity: 0, 
            y: 40, 
            rotateY: 45, 
            scale: 0.7,
            x: -20
          },
          animate: { 
            opacity: 1, 
            y: 0, 
            rotateY: 0, 
            scale: 1,
            x: 0
          },
          transition: {
            type: "spring",
            stiffness: 180,
            damping: 18,
          },
        };
      case "edge":
        return {
          initial: { 
            opacity: 0, 
            y: 35, 
            rotateZ: 12, 
            scale: 0.6,
            x: 15
          },
          animate: { 
            opacity: 1, 
            y: 0, 
            rotateZ: 0, 
            scale: 1,
            x: 0
          },
          transition: {
            type: "spring",
            stiffness: 170,
            damping: 16,
          },
        };
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
        };
    }
  };

  const config = getVariantConfig();
  const staggerDelay = variant === "hero" ? 0.03 : variant === "branding" ? 0.04 : 0.025;

  return (
    <Component ref={ref} className={className}>
      {characters.map((char, index) => {
        // Skip animation for spaces (but keep them in the DOM)
        if (char === " ") {
          return <span key={index}>&nbsp;</span>;
        }
        if (char === "\n") {
          return <br key={index} />;
        }

        return (
          <motion.span
            key={index}
            className="inline-block"
            initial={config.initial}
            animate={isInView ? config.animate : config.initial}
            transition={{
              ...config.transition,
              delay: delay + index * staggerDelay,
            }}
            whileHover={
              variant === "hero"
                ? { 
                    scale: 1.2, 
                    rotateZ: [0, -5, 5, -5, 0],
                    y: -5,
                    transition: { duration: 0.3 }
                  }
                : variant === "section"
                ? { 
                    scale: 1.15, 
                    rotateZ: 8,
                    y: -3,
                    transition: { duration: 0.2 }
                  }
                : variant === "branding"
                ? { 
                    scale: 1.1, 
                    rotateY: 15,
                    x: 3,
                    transition: { duration: 0.25 }
                  }
                : { 
                    scale: 1.12, 
                    rotateZ: -8,
                    y: -2,
                    transition: { duration: 0.2 }
                  }
            }
            style={{
              transformOrigin: "center center",
              display: "inline-block",
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </Component>
  );
};

export default KineticText;


