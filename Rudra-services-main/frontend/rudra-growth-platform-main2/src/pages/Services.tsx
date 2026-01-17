import { motion, useInView } from "framer-motion";
import {
  Target,
  Megaphone,
  TrendingUp,
  Calendar,
  Building2,
  Bot,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import CTASection from "@/components/home/CTASection";
import { useRef } from "react";
import prImage from "@/assets/pr.png";
import deImage from "@/assets/de.png";
import esImage from "@/assets/es.png";
import evImage from "@/assets/ev.png";
import isImage from "@/assets/is.png";
import yzImage from "@/assets/yz.png";

const services = [
  {
    icon: Target,
    title: "Strategic Consulting",
    description:
      "Transform your business with data-driven strategies that align with your vision and market opportunities. We develop comprehensive roadmaps for sustainable growth.",
    image: prImage,
  },
  {
    icon: Megaphone,
    title: "Marketing & Branding",
    description:
      "Build a powerful brand presence and connect with your target audience through integrated marketing solutions that drive engagement and conversion.",
    image: deImage,
  },
  {
    icon: TrendingUp,
    title: "Expansion Services",
    description:
      "Scale your business confidently with strategic market entry and geographic expansion support, from planning to execution.",
    image: esImage,
  },
  {
    icon: Calendar,
    title: "Events & PR",
    description:
      "Elevate your brand visibility through strategic events, media relations, and reputation management that strengthens your market position.",
    image: evImage,
  },
  {
    icon: Building2,
    title: "Infrastructure Support",
    description:
      "Build a solid operational foundation with optimized processes and efficient resource management that scales with your growth.",
    image: isImage,
  },
  {
    icon: Bot,
    title: "Automation & AI",
    description:
      "Future-proof your business with intelligent automation and cutting-edge AI solutions that enhance efficiency and decision-making.",
    image: yzImage,
  },
];

const Services = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-background"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Our Services
            </h1>
            <p className="font-body text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
              Comprehensive solutions designed to accelerate your growth and drive sustainable success
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid - Card Based */}
      <motion.section
        ref={servicesRef}
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        animate={servicesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="py-20 lg:py-32 bg-background relative overflow-hidden"
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group bg-card p-8 rounded-lg border border-border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <motion.h3
                  className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="font-body text-muted-foreground leading-relaxed mb-6"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {service.description}
                </motion.p>
                
                {/* Single Image Tile */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <motion.div
                    className="relative aspect-video rounded-lg overflow-hidden bg-muted/30 border border-border/20"
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/20 pointer-events-none" />
                  </motion.div>
                </motion.div>
                
                {/* Animated underline on hover */}
                <motion.div
                  className="mt-4 h-0.5 bg-primary/0"
                  whileHover={{ 
                    backgroundColor: "hsl(var(--primary) / 0.3)",
                    width: "100%",
                  }}
                  initial={{ width: 0 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <CTASection />
    </Layout>
  );
};

export default Services;
