import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card3D, FloatingElement, MorphingShape, OrbitingElement } from "@/components/animations/3DAnimations";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden perspective-2000">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement duration={12} y={30} x={15} className="absolute top-20 left-10">
          <MorphingShape className="w-32 h-32" color="hsl(var(--glow-primary) / 0.08)" duration={10} />
        </FloatingElement>
        <FloatingElement duration={16} y={25} delay={2} className="absolute bottom-20 right-20">
          <MorphingShape className="w-40 h-40" color="hsl(var(--glow-cyan) / 0.06)" duration={12} />
        </FloatingElement>
        
        {/* 3D Floating shapes */}
        <FloatingElement duration={10} y={20} x={10} rotate={15} delay={1} className="absolute top-1/3 left-1/4">
          <div className="w-16 h-16 rounded-xl border border-glow-primary/20 bg-gradient-to-br from-glow-primary/5 to-transparent rotate-45" />
        </FloatingElement>
        <FloatingElement duration={14} y={25} x={8} rotate={-10} delay={3} className="absolute bottom-1/3 right-1/4">
          <div className="w-20 h-20 rounded-2xl border border-glow-cyan/20 bg-gradient-to-br from-glow-cyan/5 to-transparent -rotate-12" />
        </FloatingElement>

        {/* Orbiting elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <OrbitingElement radius={250} duration={30}>
            <div className="w-4 h-4 rounded-full bg-glow-primary/30 shadow-glow-sm" />
          </OrbitingElement>
          <OrbitingElement radius={350} duration={40} reverse delay={5}>
            <div className="w-3 h-3 rounded-full bg-glow-cyan/25" />
          </OrbitingElement>
          <OrbitingElement radius={180} duration={25} delay={10}>
            <div className="w-2 h-2 rounded-full bg-glow-light/30" />
          </OrbitingElement>
        </div>
      </div>

      {/* Ambient Glows */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-glow-primary/8 rounded-full blur-[200px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-glow-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card3D intensity={8} glareEnabled={true}>
            <div className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
              {/* 3D Background effects inside card */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-glow-primary/10 via-transparent to-glow-cyan/10"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -top-40 -right-40 w-80 h-80 bg-glow-primary/20 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  x: [0, 40, 0],
                  y: [0, -30, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-40 -left-40 w-72 h-72 bg-glow-cyan/15 rounded-full blur-3xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  x: [0, -30, 0],
                  y: [0, 20, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, delay: 2 }}
              />

              <div className="relative z-10">
                <motion.span 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-glow-primary/30 font-body text-sm font-medium text-primary mb-8 shimmer"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <Sparkles className="w-4 h-4" />
                  Ready to Grow?
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
                  style={{ transform: "translateZ(30px)" }}
                >
                  Let's Build Your{" "}
                  <span className="text-gradient">Growth Journey</span>{" "}
                  Together
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="font-body text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
                  style={{ transform: "translateZ(20px)" }}
                >
                  Whether you're looking to scale, expand, or transform your business, 
                  our team is ready to help you achieve your goals.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      asChild 
                      size="lg" 
                      className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-lg hover:shadow-glow-xl transition-all duration-500"
                    >
                      <Link to="/contact">
                        <span className="relative z-10 flex items-center">
                          Get a Free Consultation
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <motion.span 
                          className="absolute inset-0 bg-gradient-to-r from-glow-primary via-glow-cyan to-glow-primary"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, rotateY: -5 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      asChild 
                      size="lg" 
                      variant="outline" 
                      className="border-glow-primary/30 bg-card/50 hover:bg-card hover:border-glow-primary/60 hover:shadow-glow-sm text-foreground transition-all duration-300"
                    >
                      <Link to="/services">Explore Our Services</Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* 3D Contact Info */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 border-t border-border"
                  style={{ transform: "translateZ(15px)" }}
                >
                  <motion.a
                    href="tel:+919880550827"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium transition-colors group"
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className="p-2 rounded-lg bg-glow-primary/10 group-hover:bg-glow-primary/20 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </motion.div>
                    +91 98805 50827
                  </motion.a>
                  <span className="hidden sm:block w-2 h-2 bg-glow-primary/30 rounded-full" />
                  <motion.a
                    href="mailto:operations@rudra-groups.com"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium transition-colors group"
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <motion.div
                      whileHover={{ rotate: -15 }}
                      className="p-2 rounded-lg bg-glow-primary/10 group-hover:bg-glow-primary/20 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.div>
                    operations@rudra-groups.com
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;