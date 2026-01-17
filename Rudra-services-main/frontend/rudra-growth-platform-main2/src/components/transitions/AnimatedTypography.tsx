import { motion } from "framer-motion";

interface AnimatedTypographyProps {
  word: string;
  isVisible: boolean;
}

const AnimatedTypography = ({ word, isVisible }: AnimatedTypographyProps) => {
  const letters = word.split("");

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1
        className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white select-none flex items-center justify-center"
        style={{
          textShadow: "0 0 100px rgba(255, 255, 255, 0.6), 0 0 150px rgba(255, 255, 255, 0.4), 0 0 200px rgba(255, 255, 255, 0.2)",
          letterSpacing: "0.08em",
          fontWeight: 700,
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ 
              opacity: 0,
              y: 120,
              rotateX: -90,
              scale: 0.3,
              filter: "blur(20px)",
            }}
            animate={isVisible ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              filter: "blur(0px)",
            } : {
              opacity: 0,
              y: -120,
              rotateX: 90,
              scale: 0.3,
              filter: "blur(20px)",
            }}
            transition={{
              duration: 1.0,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ 
              display: "inline-block", 
              transformStyle: "preserve-3d",
              willChange: "transform, opacity, filter",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default AnimatedTypography;

