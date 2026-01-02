import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  Megaphone,
  TrendingUp,
  Calendar,
  Building2,
  Bot,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card3D, FloatingElement, MorphingShape } from "@/components/animations/3DAnimations";
import { useRef } from "react";

const services = [
  {
    icon: Target,
    title: "Strategic Consulting",
    description:
      "Business strategy, market analysis, and growth roadmaps tailored to your unique goals.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Branding",
    description:
      "Brand development, digital marketing, and customer acquisition strategies that deliver results.",
  },
  {
    icon: TrendingUp,
    title: "Expansion Services",
    description:
      "Market entry, geographic expansion, and scaling support for ambitious businesses.",
  },
  {
    icon: Calendar,
    title: "Events & PR",
    description:
      "Corporate events, media relations, and reputation management to elevate your brand.",
  },
  {
    icon: Building2,
    title: "Infrastructure Support",
    description:
      "Operational excellence, process optimization, and resource management solutions.",
  },
  {
    icon: Bot,
    title: "Automation & AI",
    description:
      "Intelligent automation, AI integration, and digital transformation initiatives.",
  },
];

const WhatWeDoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background relative overflow-hidden perspective-2000">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement duration={12} y={30} x={10} rotate={5} className="absolute top-20 left-10">
          <MorphingShape className="w-32 h-32" color="hsl(var(--glow-primary) / 0.08)" duration={10} />
        </FloatingElement>
        <FloatingElement duration={15} y={25} x={15} delay={2} className="absolute bottom-20 right-20">
          <MorphingShape className="w-48 h-48" color="hsl(var(--glow-cyan) / 0.06)" duration={12} />
        </FloatingElement>
        <FloatingElement duration={10} y={20} delay={4} className="absolute top-1/2 right-10">
          <div className="w-20 h-20 rounded-2xl border border-glow-primary/20 bg-gradient-to-br from-glow-primary/5 to-transparent rotate-45" />
        </FloatingElement>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-primary/8 rounded-full blur-[180px] pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <SectionHeading
            label="What We Do"
            title="Comprehensive Business Solutions"
            description="From strategy to execution, we provide end-to-end services that drive sustainable growth for your business."
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card3D intensity={8} glareEnabled={true}>
                <div className="group relative glass-card rounded-2xl p-8 h-full border border-glow-primary/10 hover:border-glow-primary/30 transition-all duration-500">
                  {/* 3D Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-glow-primary/10 via-transparent to-glow-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-glow-primary/20 to-glow-cyan/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                  
                  <div className="relative z-10">
                    {/* 3D Icon */}
                    <motion.div 
                      className="icon-circle-glow mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ transform: "translateZ(30px)" }}
                      whileHover={{ 
                        rotateY: 15,
                        rotateX: -10,
                      }}
                    >
                      <service.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    
                    {/* Content */}
                    <h3 
                      className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-gradient transition-all duration-300"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="font-body text-muted-foreground leading-relaxed mb-4"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      {service.description}
                    </p>
                    
                    {/* Link */}
                    <Link 
                      to="/services" 
                      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group/link"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      Learn More 
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;