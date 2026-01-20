import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, MouseEvent, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glareEnabled?: boolean;
}

export const Card3D = ({ 
  children, 
  className = "", 
  intensity = 15,
  glareEnabled = true 
}: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(0)" }}>
        {children}
      </div>
      
      {glareEnabled && (
        <motion.div
          className="absolute top-6 left-0 right-0 bottom-0 rounded-inherit pointer-events-none lg:top-6"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, hsl(var(--glow-light) / 0.15), transparent 50%)`,
            borderRadius: "inherit",
          }}
        />
      )}
    </motion.div>
  );
};

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  y?: number;
  x?: number;
  rotate?: number;
}

export const FloatingElement = ({
  children,
  className = "",
  duration = 6,
  delay = 0,
  y = 20,
  x = 0,
  rotate = 0,
}: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [-y/2, y/2, -y/2],
        x: [-x/2, x/2, -x/2],
        rotate: [-rotate, rotate, -rotate],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export const ParallaxLayer = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const rafId = useRef<number | null>(null);
  const ticking = useRef(false);
  const isMobile = useIsMobile();
  const cachedRect = useRef<DOMRect | null>(null);
  const lastScrollY = useRef<number>(0);
  const rectUpdateTimeout = useRef<number | null>(null);

  const handleScroll = () => {
    // Disable parallax on mobile
    if (isMobile || !ref.current || ticking.current) return;
    
    ticking.current = true;
    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) {
        ticking.current = false;
        return;
      }
      
      // Cache rect and only update when scroll position changes significantly
      const currentScrollY = window.scrollY;
      if (!cachedRect.current || Math.abs(currentScrollY - lastScrollY.current) > 50) {
        cachedRect.current = ref.current.getBoundingClientRect();
        lastScrollY.current = currentScrollY;
      }

      if (!cachedRect.current) {
        cachedRect.current = ref.current.getBoundingClientRect();
      }

      const rect = cachedRect.current;
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (scrollProgress - 0.5) * 100 * speed;
      y.set(direction === "up" ? -offset : offset);
      ticking.current = false;
    });
  };

  useEffect(() => {
    // Periodically update cached rect to account for layout changes
    let rectUpdateInterval: NodeJS.Timeout | null = null;
    
    if (!isMobile && ref.current) {
      cachedRect.current = ref.current.getBoundingClientRect();
      lastScrollY.current = window.scrollY;
      
      rectUpdateInterval = setInterval(() => {
        if (rectUpdateTimeout.current) {
          cancelAnimationFrame(rectUpdateTimeout.current);
        }
        rectUpdateTimeout.current = requestAnimationFrame(() => {
          if (ref.current) {
            cachedRect.current = ref.current.getBoundingClientRect();
          }
        });
      }, 200);
    }

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (rectUpdateTimeout.current) {
        cancelAnimationFrame(rectUpdateTimeout.current);
      }
      if (rectUpdateInterval) {
        clearInterval(rectUpdateInterval);
      }
    };
  }, [isMobile]);

  // On mobile, render without parallax
  if (isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: 'transform' }}
      className={className}
      onViewportEnter={() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
      }}
      onViewportLeave={() => {
        window.removeEventListener("scroll", handleScroll);
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        ticking.current = false;
      }}
    >
      {children}
    </motion.div>
  );
};

interface Depth3DTextProps {
  text: string;
  className?: string;
  depth?: number;
  color?: string;
}

export const Depth3DText = ({
  text,
  className = "",
  depth = 8,
  color = "hsl(var(--glow-primary) / 0.1)",
}: Depth3DTextProps) => {
  const layers = Array.from({ length: depth }, (_, i) => i);
  
  return (
    <span className={`relative inline-block ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {layers.map((i) => (
        <span
          key={i}
          className="absolute inset-0"
          style={{
            transform: `translateZ(${-i * 2}px)`,
            color: i === 0 ? undefined : color,
            opacity: i === 0 ? 1 : 1 - (i / depth) * 0.8,
          }}
          aria-hidden={i !== 0}
        >
          {text}
        </span>
      ))}
      <span className="relative">{text}</span>
    </span>
  );
};

interface OrbitingElementProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
}

export const OrbitingElement = ({
  children,
  className = "",
  radius = 100,
  duration = 20,
  delay = 0,
  reverse = false,
}: OrbitingElementProps) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        rotate: reverse ? -360 : 360,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: `center center`,
      }}
    >
      <motion.div
        style={{
          transform: `translateX(${radius}px)`,
        }}
        animate={{
          rotate: reverse ? 360 : -360,
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

interface MorphingShapeProps {
  className?: string;
  color?: string;
  duration?: number;
}

export const MorphingShape = ({
  className = "",
  color = "hsl(var(--glow-primary) / 0.2)",
  duration = 8,
}: MorphingShapeProps) => {
  return (
    <motion.div
      className={`${className}`}
      style={{ backgroundColor: color }}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        scale: [1, 1.05, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default Card3D;