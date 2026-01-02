import { motion } from "framer-motion";

const AnimatedPeople = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Person 1 - Walking figure on left */}
      <motion.svg
        className="absolute left-[5%] bottom-[20%] w-16 h-24"
        viewBox="0 0 64 96"
        fill="none"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {/* Head */}
        <circle cx="32" cy="12" r="10" className="fill-primary/40" />
        {/* Body */}
        <motion.path
          d="M32 22 L32 50 M32 30 L20 45 M32 30 L44 45 M32 50 L22 80 M32 50 L42 80"
          className="stroke-primary/40"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ 
            d: [
              "M32 22 L32 50 M32 30 L20 45 M32 30 L44 45 M32 50 L22 80 M32 50 L42 80",
              "M32 22 L32 50 M32 30 L18 42 M32 30 L46 42 M32 50 L20 82 M32 50 L44 78"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.svg>

      {/* Person 2 - Sitting figure */}
      <motion.svg
        className="absolute right-[15%] bottom-[25%] w-20 h-28"
        viewBox="0 0 80 112"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Head */}
        <circle cx="40" cy="14" r="12" className="fill-glow-cyan/30" />
        {/* Body sitting */}
        <path
          d="M40 26 L40 55 M40 35 L25 50 M40 35 L55 50 M40 55 L25 55 L25 85 M40 55 L55 55 L55 85"
          className="stroke-glow-cyan/30"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Laptop */}
        <motion.rect
          x="20" y="50" width="40" height="25"
          rx="2"
          className="fill-glow-blue/20 stroke-glow-blue/30"
          strokeWidth="1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.svg>

      {/* Person 3 - Standing with arms up (presenting) */}
      <motion.svg
        className="absolute left-[25%] top-[30%] w-14 h-20"
        viewBox="0 0 56 80"
        fill="none"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head */}
        <circle cx="28" cy="10" r="8" className="fill-glow-purple/30" />
        {/* Body with raised arm */}
        <motion.path
          d="M28 18 L28 45 M28 25 L15 35 M28 25 L41 20 M28 45 L20 70 M28 45 L36 70"
          className="stroke-glow-purple/30"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ 
            d: [
              "M28 18 L28 45 M28 25 L15 35 M28 25 L41 20 M28 45 L20 70 M28 45 L36 70",
              "M28 18 L28 45 M28 25 L15 20 M28 25 L41 35 M28 45 L20 70 M28 45 L36 70"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.svg>

      {/* Person 4 - Two people talking */}
      <motion.svg
        className="absolute right-[30%] top-[20%] w-24 h-20"
        viewBox="0 0 96 80"
        fill="none"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        {/* Person A */}
        <circle cx="25" cy="12" r="9" className="fill-primary/25" />
        <path
          d="M25 21 L25 45 M25 28 L15 40 M25 28 L35 40 M25 45 L18 65 M25 45 L32 65"
          className="stroke-primary/25"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Person B */}
        <circle cx="65" cy="12" r="9" className="fill-glow-cyan/25" />
        <path
          d="M65 21 L65 45 M65 28 L55 40 M65 28 L75 40 M65 45 L58 65 M65 45 L72 65"
          className="stroke-glow-cyan/25"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Speech bubbles */}
        <motion.ellipse
          cx="40" cy="8" rx="8" ry="5"
          className="fill-glow-blue/20"
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.ellipse
          cx="50" cy="15" rx="6" ry="4"
          className="fill-glow-purple/20"
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.svg>

      {/* Person 5 - Walking business figure on right */}
      <motion.svg
        className="absolute right-[5%] top-[40%] w-12 h-20"
        viewBox="0 0 48 80"
        fill="none"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head */}
        <circle cx="24" cy="10" r="8" className="fill-glow-blue/30" />
        {/* Body */}
        <path
          d="M24 18 L24 42 M24 24 L16 38 M24 24 L32 38 M24 42 L18 65 M24 42 L30 65"
          className="stroke-glow-blue/30"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Briefcase */}
        <motion.rect
          x="30" y="35" width="10" height="8"
          rx="1"
          className="fill-primary/20 stroke-primary/30"
          strokeWidth="1"
        />
      </motion.svg>

      {/* Handshake symbol */}
      <motion.svg
        className="absolute left-[45%] bottom-[15%] w-16 h-12"
        viewBox="0 0 64 48"
        fill="none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Hand 1 */}
        <path
          d="M5 25 L20 25 L25 20 L35 25 L40 25"
          className="stroke-primary/30"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Hand 2 */}
        <path
          d="M60 25 L45 25 L40 30 L30 25 L25 25"
          className="stroke-glow-cyan/30"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Floating connection dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          style={{
            left: `${15 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Connection lines between dots */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 150 200 Q 300 150 450 250 T 750 200"
          className="stroke-primary/10"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, 50] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 100 350 Q 250 300 400 400 T 700 350"
          className="stroke-glow-cyan/10"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

export default AnimatedPeople;
