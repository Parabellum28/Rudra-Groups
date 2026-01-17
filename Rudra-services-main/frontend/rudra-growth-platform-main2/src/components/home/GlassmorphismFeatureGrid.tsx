import { motion } from "framer-motion";
import { Target, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Strategic Planning",
    description: "Data-driven strategies that align with your vision and market opportunities for sustainable growth.",
    large: true,
  },
  {
    icon: Zap,
    title: "Rapid Execution",
    description: "Agile implementation with precision and speed, ensuring quick time-to-market.",
    large: false,
  },
  {
    icon: TrendingUp,
    title: "Growth Optimization",
    description: "Continuous improvement and scaling strategies that drive measurable results.",
    large: false,
  },
];

const GlassmorphismFeatureGrid = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Core Features
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Delivering excellence through innovative solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Large Vertical Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:row-span-2 glass-card p-8 lg:p-12 rounded-2xl"
          >
            <div className="w-16 h-16 icon-circle rounded-full flex items-center justify-center mb-6">
              {(() => {
                const FirstIcon = features[0].icon;
                return <FirstIcon className="w-8 h-8 text-primary" />;
              })()}
            </div>
            <h3 className="font-display text-3xl font-bold text-foreground mb-4">
              {features[0].title}
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed text-lg">
              {features[0].description}
            </p>
          </motion.div>

          {/* Two Smaller Horizontal Cards */}
          {features.slice(1).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="w-14 h-14 icon-circle rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlassmorphismFeatureGrid;

