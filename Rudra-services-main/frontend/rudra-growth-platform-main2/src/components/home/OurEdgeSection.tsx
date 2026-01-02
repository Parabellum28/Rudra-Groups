import { motion, useInView } from "framer-motion";
import { Shield, Users, Zap, Award, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card3D, FloatingElement, OrbitingElement } from "@/components/animations/3DAnimations";
import { useRef } from "react";

const edges = [
  {
    icon: Shield,
    title: "Trusted Partner",
    description:
      "We build long-term relationships based on trust, transparency, and mutual success.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Industry veterans with deep expertise across consulting, marketing, and technology.",
  },
  {
    icon: Zap,
    title: "Execution Focus",
    description:
      "We don't just advise—we execute. Real results, not just recommendations.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description:
      "Track record of delivering measurable outcomes for enterprises and startups alike.",
  },
];

const OurEdgeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden perspective-2000">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement duration={14} y={25} x={8} className="absolute top-10 right-1/4">
          <div className="w-24 h-24 rounded-full border border-glow-cyan/20 bg-gradient-to-br from-glow-cyan/5 to-transparent" />
        </FloatingElement>
        
        {/* Orbiting elements */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2">
          <OrbitingElement radius={120} duration={25}>
            <div className="w-3 h-3 rounded-full bg-glow-primary/40 shadow-glow-sm" />
          </OrbitingElement>
          <OrbitingElement radius={180} duration={35} reverse>
            <div className="w-2 h-2 rounded-full bg-glow-cyan/30" />
          </OrbitingElement>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-primary/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-glow-cyan/6 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <SectionHeading
              label="Our Edge"
              title="Why Clients Choose Rudra Groups"
              description="We combine strategic thinking with hands-on execution to deliver comprehensive solutions that truly transform businesses."
              align="left"
            />

            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {edges.map((edge, index) => (
                <motion.div
                  key={edge.title}
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    z: 20,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-card/50 transition-all duration-300 cursor-default"
                >
                  <motion.div 
                    className="icon-circle-glow flex-shrink-0"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <edge.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div style={{ transform: "translateZ(10px)" }}>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {edge.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {edge.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative"
          >
            <Card3D intensity={12} glareEnabled={true}>
              <div className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                {/* 3D Background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-glow-primary/10 via-transparent to-glow-cyan/10 rounded-3xl" />
                <motion.div 
                  className="absolute -top-20 -right-20 w-40 h-40 bg-glow-primary/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="icon-circle-glow mb-8"
                    style={{ transform: "translateZ(40px)" }}
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Quote className="w-6 h-6 text-primary" />
                  </motion.div>
                  
                  <blockquote 
                    className="font-display text-xl lg:text-2xl text-foreground font-medium leading-relaxed mb-8"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    "Rudra Groups transformed our operations and helped us achieve 
                    3x growth in just 18 months. They're not just consultants—they're 
                    true partners in our success."
                  </blockquote>
                  
                  <div 
                    className="flex items-center gap-4"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-glow-primary to-glow-cyan flex items-center justify-center shadow-glow-md"
                      whileHover={{ scale: 1.1, rotateZ: 10 }}
                    >
                      <span className="font-display font-bold text-lg text-primary-foreground">BL</span>
                    </motion.div>
                    <div>
                      <div className="font-body font-semibold text-foreground">
                        Business Leader
                      </div>
                      <div className="font-body text-sm text-muted-foreground">
                        Enterprise Client
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative 3D elements */}
                <FloatingElement duration={8} y={15} className="absolute bottom-4 right-4">
                  <div className="w-16 h-16 rounded-xl border border-glow-primary/20 bg-glow-primary/5 rotate-12" />
                </FloatingElement>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurEdgeSection;