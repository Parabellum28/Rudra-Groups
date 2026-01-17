import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import rudraLogo from "@/assets/rudra-logo.png";

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const steps = [
      { duration: 1500 }, // Logo reveal
      { duration: 2000 }, // Company name
      { duration: 2000 }, // Tagline
      { duration: 1500 }, // Final reveal
    ];

    const timers: NodeJS.Timeout[] = [];

    steps.forEach((step, index) => {
      const timer = setTimeout(() => {
        if (index < steps.length - 1) {
          setCurrentStep(index + 1);
        } else {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
      }, steps.slice(0, index + 1).reduce((acc, s) => acc + s.duration, 0));

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Animated background with depth */}
          <div className="absolute inset-0">
            {/* Gradient layers */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Floating orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -80, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Particle field */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Step 0: Logo reveal with dramatic entrance */}
            <AnimatePresence mode="wait">
              {currentStep >= 0 && (
                <motion.div
                  key="logo"
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 1.2,
                  }}
                  className="relative"
                >
                  <motion.img
                    src={rudraLogo}
                    alt="Rudra Groups"
                    className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-2xl"
                    animate={{
                      filter: [
                        "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))",
                        "drop-shadow(0 0 40px hsl(var(--primary) / 0.5))",
                        "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Pulsing glow rings */}
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute inset-0 border-2 border-primary/30 rounded-full"
                      style={{
                        scale: ring * 0.3 + 0.7,
                      }}
                      animate={{
                        scale: [ring * 0.3 + 0.7, ring * 0.3 + 1.1, ring * 0.3 + 0.7],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2 + ring * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: ring * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 1: Company name reveal */}
            <AnimatePresence mode="wait">
              {currentStep >= 1 && (
                <motion.div
                  key="company-name"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <motion.h1
                    className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      RUDRA
                    </motion.span>
                    <motion.span
                      className="inline-block ml-3 text-primary"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      GROUPS
                    </motion.span>
                  </motion.h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 2: Tagline reveal */}
            <AnimatePresence mode="wait">
              {currentStep >= 2 && (
                <motion.div
                  key="tagline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center max-w-2xl mx-auto px-4"
                >
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <motion.p
                      className="font-display text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      360° Business Consulting
                    </motion.p>
                    <motion.p
                      className="font-body text-base sm:text-lg text-muted-foreground/80"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      End-to-End Execution
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Final flourish */}
            {currentStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  className="w-screen h-screen border-4 border-primary/20"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </motion.div>
            )}
          </div>

          {/* Progress indicator (subtle) */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentStep >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  className="w-2 h-2 rounded-full bg-primary/30"
                  animate={{
                    scale: currentStep >= step ? 1.2 : 1,
                    backgroundColor:
                      currentStep >= step
                        ? "hsl(var(--primary) / 0.8)"
                        : "hsl(var(--primary) / 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroSequence;

