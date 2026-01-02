import { motion } from "framer-motion";
import { 
  Target, 
  Zap, 
  TrendingUp, 
  Layers, 
  Globe,
  Cpu 
} from "lucide-react";

const floatingIcons = [
  { Icon: Target, delay: 0, x: 80, y: -60, size: 24 },
  { Icon: Zap, delay: 0.5, x: -40, y: 40, size: 20 },
  { Icon: TrendingUp, delay: 1, x: 100, y: 80, size: 22 },
  { Icon: Globe, delay: 1.5, x: -80, y: -40, size: 18 },
  { Icon: Cpu, delay: 2, x: 40, y: 120, size: 20 },
];

const Hero3DElement = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] perspective-2000">
      {/* Central 3D Orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* Outer glow rings */}
        <div className="absolute -inset-20 rounded-full bg-gradient-to-r from-glow-primary/20 via-glow-cyan/10 to-transparent blur-3xl animate-glow-pulse" />
        <div className="absolute -inset-32 rounded-full bg-gradient-to-r from-glow-cyan/10 via-transparent to-glow-primary/10 blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Orbiting rings */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-16 rounded-full border border-glow-primary/20"
        />
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-24 rounded-full border border-glow-cyan/15"
        />
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-32 rounded-full border border-glow-light/10"
        />
        
        {/* Orbiting dots */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-16"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-glow-primary rounded-full shadow-glow-sm" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-24"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-glow-cyan rounded-full shadow-glow-sm" />
        </motion.div>
        
        {/* Main 3D sphere */}
        <div className="relative w-40 h-40 lg:w-52 lg:h-52">
          {/* Morphing background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-glow-primary/40 via-glow-cyan/30 to-glow-light/20 animate-morph"
            style={{ filter: 'blur(2px)' }}
          />
          
          {/* Inner sphere */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-card via-secondary to-card border border-glow-primary/30 shadow-inner-glow overflow-hidden">
            {/* Shine effect */}
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-glow-light/20 via-transparent to-transparent rounded-full" />
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--glow-primary) / 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--glow-primary) / 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Layers className="w-12 h-12 lg:w-16 lg:h-16 text-glow-primary/80" />
            </div>
          </div>
          
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full border-2 border-glow-primary/30 animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full border-2 border-glow-cyan/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-0 rounded-full border-2 border-glow-light/10 animate-pulse-ring" style={{ animationDelay: '1s' }} />
        </div>
      </motion.div>

      {/* Floating Icon Cards */}
      {floatingIcons.map(({ Icon, delay, x, y, size }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x, 
            y,
          }}
          transition={{ 
            duration: 0.8, 
            delay: delay + 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute top-1/2 left-1/2"
          style={{ marginLeft: -20, marginTop: -20 }}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 4 + index, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: delay
            }}
            className="glass-card p-3 rounded-xl shadow-glow-sm hover:shadow-glow-md transition-shadow duration-300"
          >
            <Icon 
              className="text-glow-primary" 
              style={{ width: size, height: size }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Background floating shapes */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          x: [0, 15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-glow-primary/10 to-transparent border border-glow-primary/20 backdrop-blur-sm"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, -10, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-10 w-16 h-16 rounded-xl bg-gradient-to-br from-glow-cyan/10 to-transparent border border-glow-cyan/20 backdrop-blur-sm"
      />
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-0 w-12 h-12 rounded-lg bg-gradient-to-br from-glow-light/10 to-transparent border border-glow-light/20 backdrop-blur-sm"
      />

      {/* Particle dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{
            y: [0, -20 - i * 5, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          className="absolute w-1 h-1 bg-glow-primary rounded-full"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 15}%`,
          }}
        />
      ))}
    </div>
  );
};

export default Hero3DElement;