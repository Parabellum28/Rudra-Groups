import { motion } from "framer-motion";
import { 
  Building2, 
  Hammer, 
  Wrench, 
  HardHat, 
  Construction,
  Layers,
  Boxes,
  Building,
  Ruler,
  Cog
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

const ConstructionInfrastructure = () => {
  const [toys, setToys] = useState<FloatingToy[]>([]);

  useEffect(() => {
    const icons = [
      Building2, Hammer, Wrench, HardHat, Construction,
      Layers, Boxes, Building, Ruler, Cog
    ];

    const newToys: FloatingToy[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 24 + 16,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 3,
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
        size: Math.random() * 24 + 16,
        duration: Math.random() * 8 + 6,
        delay: 0,
        rotation: Math.random() * 360,
      };
      setToys((prev) => [...prev.slice(-14), newToy]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating construction toys */}
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
              opacity: [0, 0.6, 0.4, 0.6, 0],
              scale: [0, 1.2, 1, 0.8, 0],
              y: toy.y === -10 
                ? [toy.y, toy.y + 110] 
                : [toy.y - 20, toy.y + 20, toy.y - 20],
              x: [toy.x, toy.x + Math.random() * 20 - 10, toy.x],
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
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon 
                className="text-primary drop-shadow-lg"
                style={{ width: toy.size, height: toy.size }}
              />
              {/* Glow effect */}
              <div 
                className="absolute inset-0 blur-md opacity-30"
                style={{
                  background: `radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Construction blueprint lines */}
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            width: "200px",
            height: "150px",
          }}
          viewBox="0 0 200 150"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          <motion.path
            d="M 20 20 L 180 20 L 180 130 L 20 130 Z M 40 40 L 160 40 M 40 60 L 160 60 M 40 80 L 160 80"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            animate={{ strokeDashoffset: [0, 20] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.svg>
      ))}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ConstructionInfrastructure;

