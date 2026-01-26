import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const stats = [
  { number: 45, suffix: "+", label: "Projects Delivered", description: "Successful implementations" },
  { number: 98, suffix: "%", label: "Client Satisfaction", description: "Positive feedback rate" },
  { number: 2, suffix: "+", label: "Years Experience", description: "Industry expertise" },
  { number: 50, suffix: "+", label: "Industry Experts", description: "Dedicated professionals" },
];

const AnimatedCounter = ({ 
  value, 
  suffix, 
  inView 
}: { 
  value: number; 
  suffix: string; 
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // If already animated, show the final value immediately
    if (hasAnimated) {
      setCount(value);
      return;
    }

    // If in view, start animation
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
    }
    
    // Fallback: if element is visible but animation hasn't started, show value after a delay
    if (inView && count === 0) {
      const fallbackTimer = setTimeout(() => {
        if (count === 0) {
          setCount(value);
          setHasAnimated(true);
        }
      }, 500);
      return () => clearTimeout(fallbackTimer);
    }
  }, [inView, value, hasAnimated, count]);

  return (
    <span className="tabular-nums" style={{ minWidth: '1ch', display: 'inline-block' }}>
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  // Use less aggressive margin on mobile to ensure visibility detection works
  const isInView = useInView(ref, { once: false, margin: isMobile ? "-50px" : "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: isMobile ? 20 : 30, scale: isMobile ? 0.95 : 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={
        isMobile
          ? {
              duration: 0.4, // Faster on mobile
              ease: [0.16, 1, 0.3, 1],
            }
          : {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
            }
      }
      className="py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: isMobile ? 0.3 : 0.6, // Faster on mobile
                delay: isMobile ? index * 0.05 : index * 0.1, // Less delay on mobile
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group"
            >
              <div className="glass-card-hover rounded-2xl p-6 lg:p-8 text-center h-full">
                <div className="relative z-10">
                  {/* Number */}
                  <div className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-2">
                    <span className="text-gradient">
                    <AnimatedCounter 
                      value={stat.number} 
                      suffix={stat.suffix} 
                      inView={isInView} 
                    />
                    </span>
                  </div>
                  
                  {/* Label */}
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-body text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
                
                {/* Decorative line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-glow-primary/50 to-transparent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;