import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const SocialMediaBar = () => {
  const isMobile = useIsMobile();
  
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/rudra___groups?igsh=djc4cjA1NzRlanFj", // Update with actual Instagram URL
      color: "hover:text-pink-500",
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      url: "https://twitter.com", // Update with actual X/Twitter URL
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com", // Update with actual LinkedIn URL
      color: "hover:text-blue-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={`fixed z-50 flex flex-col ${
        isMobile 
          ? 'bottom-4 left-4 gap-2' // Smaller spacing and positioning on mobile
          : 'bottom-6 left-6 gap-4'   // Original spacing on desktop
      }`}
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`
            rounded-full 
            bg-background/90 backdrop-blur-sm
            border border-border
            flex items-center justify-center
            text-muted-foreground
            ${social.color}
            shadow-lg hover:shadow-xl
            transition-all duration-300
            group
            ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} // Smaller on mobile
          `}
          aria-label={`Visit our ${social.name} page`}
        >
          <social.icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} group-hover:scale-110 transition-transform`} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialMediaBar;

