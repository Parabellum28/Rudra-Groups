import { motion, useInView } from "framer-motion";
import { Search, FileText, Rocket, TrendingUp } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Search,
    title: "Understand Your Vision",
    description:
      "We immerse ourselves in your business ecosystem—analyzing market dynamics, understanding your unique challenges, and identifying untapped opportunities.",
  },
  {
    icon: FileText,
    title: "Strategic Planning",
    description:
      "Transform insights into action with a comprehensive strategy tailored to your vision. We craft detailed roadmaps with clear milestones and success metrics.",
  },
  {
    icon: Rocket,
    title: "Execution",
    description:
      "Our expert teams bring your strategy to life with agile execution. We maintain close collaboration and ensure every deliverable exceeds expectations.",
  },
  {
    icon: TrendingUp,
    title: "Optimization",
    description:
      "Leverage data-driven optimization to amplify results. We continuously refine processes and build systems that support your long-term vision.",
  },
];

const ProcessTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="py-20 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Animated connecting line background */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2
            className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            How We Work
          </motion.h2>
          <motion.p
            className="font-body text-xl text-muted-foreground leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A clear, step-by-step process designed to deliver measurable results at every stage
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="text-center relative"
            >
              {/* Animated number badge */}
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2 + 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2,
                }}
              >
                {index + 1}
              </motion.div>
              
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 mt-4"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.15,
                  backgroundColor: "hsl(var(--primary) / 0.2)",
                }}
                transition={{ duration: 0.5 }}
              >
                <step.icon className="w-8 h-8 text-primary" />
              </motion.div>
              
              <motion.h3
                className="font-display text-xl font-bold text-foreground mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                whileHover={{ x: 5 }}
              >
                {step.title}
              </motion.h3>
              
              <motion.p
                className="font-body text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
              >
                {step.description}
              </motion.p>
              
              {/* Animated progress indicator */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProcessTimeline;
