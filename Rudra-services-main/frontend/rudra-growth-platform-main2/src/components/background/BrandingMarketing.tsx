import { motion } from "framer-motion";
import { 
  Megaphone, 
  Target, 
  TrendingUp, 
  Share2,
  Sparkles,
  Star,
  Zap,
  Award,
  Rocket,
  Heart,
  ThumbsUp,
  MessageCircle
} from "lucide-react";
import { useState, useEffect } from "react";

interface FloatingToy {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

const BrandingMarketing = () => {
  const [toys, setToys] = useState<FloatingToy[]>([]);

  useEffect(() => {
    const icons = [
      Megaphone, Target, TrendingUp, Share2, Sparkles,
      Star, Zap, Award, Rocket, Heart, ThumbsUp, MessageCircle
    ];

    const newToys: FloatingToy[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 28 + 14,
      duration: Math.random() * 7 + 5,
      delay: Math.random() * 2,
      rotation: Math.random() * 360,
    }));

    setToys(newToys);

    // Continuously add new toys
    const interval = setInterval(() => {
      const newToy: FloatingToy = {
        id: Date.now(),
        icon: icons[Math.floor(Math.random() * icons.length)],
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 28 + 14,
        duration: Math.random() * 7 + 5,
        delay: 0,
        rotation: Math.random() * 360,
      };
      setToys((prev) => [...prev.slice(-17), newToy]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      {/* Background wave pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[...Array(3)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${100 + i * 50} Q ${200 + i * 100} ${80 + i * 50} ${400 + i * 200} ${100 + i * 50} T ${800 + i * 400} ${100 + i * 50}`}
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="2"
              animate={{ d: [
                `M 0 ${100 + i * 50} Q ${200 + i * 100} ${80 + i * 50} ${400 + i * 200} ${100 + i * 50} T ${800 + i * 400} ${100 + i * 50}`,
                `M 0 ${100 + i * 50} Q ${200 + i * 100} ${120 + i * 50} ${400 + i * 200} ${100 + i * 50} T ${800 + i * 400} ${100 + i * 50}`,
                `M 0 ${100 + i * 50} Q ${200 + i * 100} ${80 + i * 50} ${400 + i * 200} ${100 + i * 50} T ${800 + i * 400} ${100 + i * 50}`,
              ] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Floating marketing toys */}
      {toys.map((toy) => {
        const Icon = toy.icon;
        return (
          <motion.div
            key={toy.id}
            className="absolute"
            style={{
              left: `${toy.x}%`,
              top: `${toy.y}%`,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              y: toy.y === -10 ? -20 : 0,
            }}
            animate={{
              opacity: [0, 0.7, 0.5, 0.7, 0],
              scale: [0, 1.3, 1, 0.9, 0],
              y: toy.y === -10 
                ? [toy.y, toy.y + 110] 
                : [toy.y - 15, toy.y + 15, toy.y - 15],
              x: [toy.x, toy.x + Math.random() * 25 - 12.5, toy.x],
              rotate: [toy.rotation, toy.rotation + 360],
            }}
            transition={{
              duration: toy.duration,
              delay: toy.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 20, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon 
                className="text-primary drop-shadow-lg"
                style={{ width: toy.size, height: toy.size }}
              />
              {/* Pulsing glow effect */}
              <motion.div 
                className="absolute inset-0 blur-lg"
                style={{
                  background: `radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)`,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Social media engagement indicators */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`engagement-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        >
          <div className="w-3 h-3 rounded-full bg-primary/40" />
        </motion.div>
      ))}

      {/* Trending arrows */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`arrow-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            top: `${40 + (i % 2) * 30}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <TrendingUp 
            className="text-primary/30"
            style={{ width: 20, height: 20 }}
          />
        </motion.div>
      ))}

      {/* Sparkle particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 180, 360],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          <Sparkles 
            className="text-primary/40"
            style={{ width: 12, height: 12 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default BrandingMarketing;

