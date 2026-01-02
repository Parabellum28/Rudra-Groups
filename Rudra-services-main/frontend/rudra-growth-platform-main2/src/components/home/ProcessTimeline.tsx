import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, FileText, Rocket, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card3D, FloatingElement, MorphingShape } from "@/components/animations/3DAnimations";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Understand",
    shortDesc: "Deep Discovery",
    fullDesc: "We immerse ourselves in your business ecosystem—analyzing market dynamics, understanding your unique challenges, and identifying untapped opportunities that drive sustainable growth.",
    highlights: ["Stakeholder interviews", "Market analysis", "Competitive landscape", "Opportunity mapping"],
    color: "from-glow-primary to-glow-cyan",
  },
  {
    id: 2,
    icon: FileText,
    title: "Plan",
    shortDesc: "Strategic Roadmap",
    fullDesc: "Transform insights into action with a comprehensive strategy tailored to your vision. We craft detailed roadmaps with clear milestones, resource allocation, and success metrics.",
    highlights: ["Custom strategy design", "Resource planning", "Timeline development", "KPI framework"],
    color: "from-glow-cyan to-glow-light",
  },
  {
    id: 3,
    icon: Rocket,
    title: "Execute",
    shortDesc: "Precision Implementation",
    fullDesc: "Our expert teams bring your strategy to life with agile execution. We maintain close collaboration, adapt to challenges, and ensure every deliverable exceeds expectations.",
    highlights: ["Agile methodology", "Cross-functional teams", "Quality assurance", "Progress tracking"],
    color: "from-glow-light to-glow-primary",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Scale",
    shortDesc: "Sustained Growth",
    fullDesc: "Leverage data-driven optimization to amplify results. We continuously refine processes, expand successful initiatives, and build systems that support your long-term vision.",
    highlights: ["Performance analytics", "Process optimization", "Growth acceleration", "Long-term partnership"],
    color: "from-glow-primary to-glow-cyan",
  },
];

const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background relative overflow-hidden perspective-2000">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement duration={15} y={40} x={20} rotate={10} className="absolute top-20 left-20">
          <MorphingShape className="w-40 h-40" color="hsl(var(--glow-primary) / 0.06)" duration={12} />
        </FloatingElement>
        <FloatingElement duration={18} y={30} x={15} delay={3} className="absolute bottom-40 right-10">
          <MorphingShape className="w-56 h-56" color="hsl(var(--glow-cyan) / 0.05)" duration={15} />
        </FloatingElement>
        
        {/* 3D Grid */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--glow-primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--glow-primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center top',
          }}
        />
      </div>

      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-glow-primary/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-glow-cyan/6 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <SectionHeading
            label="Our Journey Together"
            title="How We Transform Your Vision"
            description="A strategic methodology designed to deliver measurable results at every stage of your growth journey."
          />
        </motion.div>

        <div className="mt-16 lg:mt-24">
          {/* 3D Timeline Navigation */}
          <div className="relative mb-12 lg:mb-20">
            {/* Progress Line with 3D effect */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1.5 bg-secondary -translate-y-1/2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-glow-primary via-glow-cyan to-glow-light rounded-full shadow-glow-md"
                initial={{ width: "0%" }}
                animate={{ width: `${((activeStep - 1) / 3) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* 3D Step Indicators */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
              {steps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  initial={{ opacity: 0, y: 30, rotateX: 20 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 30,
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`relative flex items-center gap-4 lg:flex-col lg:gap-3 p-4 lg:p-0 rounded-xl lg:rounded-none transition-all duration-300 ${
                    activeStep === step.id 
                      ? "bg-glow-primary/10 lg:bg-transparent" 
                      : "hover:bg-muted/50 lg:hover:bg-transparent"
                  }`}
                >
                  {/* 3D Step Circle */}
                  <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                    <motion.div
                      className={`w-14 h-14 lg:w-18 lg:h-18 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        activeStep === step.id
                          ? `bg-gradient-to-br ${step.color} shadow-glow-lg`
                          : step.id < activeStep
                          ? "bg-glow-primary/20 border-2 border-glow-primary shadow-glow-sm"
                          : "glass-card border border-border"
                      }`}
                      animate={activeStep === step.id ? { 
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{ 
                        rotateY: { duration: 1, ease: "easeOut" },
                        scale: { duration: 0.5 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {step.id < activeStep ? (
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      ) : (
                        <step.icon className={`w-6 h-6 ${activeStep === step.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      )}
                    </motion.div>
                    
                    {/* Step Number Badge */}
                    <motion.div 
                      className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-all ${
                        activeStep === step.id
                          ? "bg-gradient-to-br from-glow-primary to-glow-cyan text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                      animate={activeStep === step.id ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {step.id}
                    </motion.div>
                  </div>

                  {/* Step Label */}
                  <div className="text-left lg:text-center" style={{ transform: "translateZ(10px)" }}>
                    <h4 className={`font-display text-lg font-semibold transition-colors ${
                      activeStep === step.id ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm transition-colors ${
                      activeStep === step.id ? "text-primary" : "text-muted-foreground/70"
                    }`}>
                      {step.shortDesc}
                    </p>
                  </div>

                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden sm:block lg:hidden absolute right-4 w-5 h-5 text-muted-foreground" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* 3D Active Step Content */}
          <AnimatePresence mode="wait">
            {steps.map((step) => 
              activeStep === step.id && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40, rotateX: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, rotateX: -10, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card3D intensity={6} glareEnabled={true}>
                    <div className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                      {/* 3D Gradient layers */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5`}
                        animate={{ opacity: [0.05, 0.1, 0.05] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div 
                        className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-glow-primary/15 to-transparent rounded-full blur-3xl"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          x: [0, 30, 0],
                          y: [0, -20, 0]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                      
                      <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Content */}
                        <div>
                          <motion.div 
                            className="flex items-center gap-4 mb-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ transform: "translateZ(30px)" }}
                          >
                            <motion.div 
                              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-glow-md`}
                              whileHover={{ rotateY: 180, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              <step.icon className="w-7 h-7 text-primary-foreground" />
                            </motion.div>
                            <div>
                              <span className="text-sm text-primary font-medium">Phase {step.id}</span>
                              <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                                {step.title}
                              </h3>
                            </div>
                          </motion.div>
                          
                          <motion.p 
                            className="font-body text-muted-foreground leading-relaxed text-lg mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{ transform: "translateZ(15px)" }}
                          >
                            {step.fullDesc}
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{ transform: "translateZ(20px)" }}
                          >
                            <Link 
                              to="/approach" 
                              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group"
                            >
                              Learn More About Our Approach
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </motion.div>
                        </div>

                        {/* 3D Highlights */}
                        <div className="grid grid-cols-2 gap-4" style={{ transform: "translateZ(25px)" }}>
                          {step.highlights.map((highlight, idx) => (
                            <motion.div
                              key={highlight}
                              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              whileHover={{ 
                                scale: 1.05,
                                rotateY: 10,
                                z: 20,
                              }}
                              style={{ transformStyle: "preserve-3d" }}
                              className="glass rounded-xl p-4 border border-glow-primary/20 hover:border-glow-primary/50 hover:shadow-glow-sm transition-all group cursor-default"
                            >
                              <div className="flex items-center gap-3">
                                <motion.div 
                                  className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${step.color} shadow-glow-sm`}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                                />
                                <span className="font-body text-sm text-foreground group-hover:text-primary transition-colors">
                                  {highlight}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Step Progress */}
                      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between" style={{ transform: "translateZ(10px)" }}>
                        <div className="flex gap-2">
                          {steps.map((s) => (
                            <motion.button
                              key={s.id}
                              onClick={() => setActiveStep(s.id)}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className={`h-3 rounded-full transition-all ${
                                s.id === activeStep 
                                  ? "w-10 bg-gradient-to-r from-glow-primary to-glow-cyan shadow-glow-sm" 
                                  : s.id < activeStep 
                                  ? "w-3 bg-glow-primary/50" 
                                  : "w-3 bg-secondary"
                              }`}
                            />
                          ))}
                        </div>
                        
                        <div className="flex gap-3">
                          <motion.button
                            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                            disabled={activeStep === 1}
                            whileHover={{ scale: 1.1, rotateY: -15 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-xl border border-border hover:border-glow-primary/50 hover:shadow-glow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <ArrowRight className="w-4 h-4 rotate-180 text-muted-foreground" />
                          </motion.button>
                          <motion.button
                            onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
                            disabled={activeStep === 4}
                            whileHover={{ scale: 1.1, rotateY: 15 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-xl border border-border hover:border-glow-primary/50 hover:shadow-glow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;