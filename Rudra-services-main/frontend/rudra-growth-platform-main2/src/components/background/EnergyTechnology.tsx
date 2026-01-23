import { motion } from "framer-motion";
import { 
  Zap, 
  Cpu, 
  Database, 
  Cloud,
  Rocket,
  TrendingUp,
  Activity,
  Network,
  Gauge,
  CircuitBoard,
  Power,
  BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";

interface FloatingToy {
  id: number;
  icon: React.ComponentType<any>;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

const EnergyTechnology = () => {
  const [toys, setToys] = useState<FloatingToy[]>([]);

  useEffect(() => {
    const icons = [
      Zap, Cpu, Database, Cloud, Rocket,
      TrendingUp, Activity, Network, Gauge, CircuitBoard, Power, BarChart3
    ];

    const newToys: FloatingToy[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 26 + 14,
      duration: Math.random() * 9 + 5,
      delay: Math.random() * 2.5,
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
        size: Math.random() * 26 + 14,
        duration: Math.random() * 9 + 5,
        delay: 0,
        rotation: Math.random() * 360,
      };
      setToys((prev) => [...prev.slice(-19), newToy]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      {/* Circuit board pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="circuit" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="hsl(var(--primary) / 0.3)" />
              <path d="M 30 0 L 30 30 M 0 30 L 30 30" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Floating tech toys */}
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
              opacity: [0, 0.8, 0.6, 0.8, 0],
              scale: [0, 1.4, 1, 1.1, 0],
              y: toy.y === -10 
                ? [toy.y, toy.y + 110] 
                : [toy.y - 25, toy.y + 25, toy.y - 25],
              x: [toy.x, toy.x + Math.random() * 30 - 15, toy.x],
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
                rotate: [0, 25, -25, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon 
                className="text-primary drop-shadow-lg"
                width={toy.size}
                height={toy.size}
              />
              {/* Energy pulse effect */}
              <motion.div 
                className="absolute inset-0 blur-xl"
                style={{
                  background: `radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)`,
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Energy waves */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0"
          style={{
            top: `${25 + i * 20}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.2, 0],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <svg className="w-full h-20">
            <motion.path
              d={`M 0 40 Q ${100 + i * 50} ${20 + i * 10} ${200 + i * 100} ${40} T ${400 + i * 200} ${40}`}
              fill="none"
              stroke="hsl(var(--primary) / 0.15)"
              strokeWidth="2"
              animate={{
                d: [
                  `M 0 40 Q ${100 + i * 50} ${20 + i * 10} ${200 + i * 100} ${40} T ${400 + i * 200} ${40}`,
                  `M 0 40 Q ${100 + i * 50} ${60 + i * 10} ${200 + i * 100} ${40} T ${400 + i * 200} ${40}`,
                  `M 0 40 Q ${100 + i * 50} ${20 + i * 10} ${200 + i * 100} ${40} T ${400 + i * 200} ${40}`,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      ))}

      {/* Data flow lines */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`dataflow-${i}`}
          className="absolute"
          style={{
            left: `${5 + i * 8}%`,
            top: `${30 + (i % 4) * 15}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        >
          <div className="w-0.5 h-16 bg-gradient-to-b from-primary/40 via-primary/60 to-transparent" />
        </motion.div>
      ))}

      {/* Scaling indicators */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`scale-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 7}%`,
            top: `${50 + (i % 3) * 20}%`,
          }}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        >
          <div className="w-2 h-2 rounded-full bg-primary/50 border-2 border-primary/30" />
        </motion.div>
      ))}

      {/* Energy particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`energy-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-25, 25, -25],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.5, 2, 0.5],
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
  );
};

export default EnergyTechnology;