import { motion, useInView } from "framer-motion";
import Layout from "@/components/layout/Layout";
import CTASection from "@/components/home/CTASection";
import { useRef } from "react";

const About = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const trustRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const trustInView = useInView(trustRef, { once: true, margin: "-100px" });

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
              About Rudra Groups
            </h1>
            <p className="font-body text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
              Your trusted partner for 360° business consulting and execution
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Two-Column Story Section */}
      <motion.section
        ref={storyRef}
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        animate={storyInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="py-20 lg:py-32 bg-background relative overflow-hidden"
      >
        {/* Subtle animated background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
            >
              <motion.h2
                className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our Story
              </motion.h2>
              <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
                {[
                  "Rudra Groups was founded with a singular vision: to be the partner that businesses can trust for comprehensive growth solutions. Unlike traditional consulting firms that offer advice without accountability, we take ownership of execution.",
                  "Our team brings together decades of experience across industries, combining strategic insight with operational expertise. We understand that every business is unique, which is why we tailor our approach to meet your specific needs and challenges.",
                  "From startups looking to scale to enterprises seeking transformation, we've partnered with organizations at every stage of growth, delivering measurable results that stand the test of time.",
                ].map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3 + index * 0.1 
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Mission & Philosophy */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="space-y-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <motion.p
                  className="font-body text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  To empower businesses with integrated consulting and execution capabilities 
                  that drive sustainable growth. We bridge the gap between strategy and 
                  implementation, ensuring that every recommendation translates into tangible results.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Execution Philosophy
                </h2>
                <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
                  We believe in end-to-end execution. Our approach combines:
                </p>
                <ul className="space-y-4 font-body text-lg text-muted-foreground">
                  {[
                    { title: "Strategic Clarity", desc: "Understanding your vision and market position" },
                    { title: "Precision Planning", desc: "Developing actionable roadmaps with clear milestones" },
                    { title: "Seamless Execution", desc: "Taking ownership from concept to completion" },
                    { title: "Continuous Optimization", desc: "Measuring, refining, and improving outcomes" },
                  ].map((item, index) => (
                    <motion.li
                      key={item.title}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.6 + index * 0.1 
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.span
                        className="text-primary font-bold mt-1"
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      >
                        •
                      </motion.span>
                      <span>
                        <strong className="text-foreground">{item.title}:</strong> {item.desc}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Trust Section */}
      <motion.section
        ref={trustRef}
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        animate={trustInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              Built on Trust, Driven by Results
            </motion.h2>
            <motion.p
              className="font-body text-xl text-muted-foreground leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We've partnered with organizations across industries, from startups to enterprises, 
              delivering measurable growth and transformation. Our commitment to execution 
              excellence and long-term partnership sets us apart.
            </motion.p>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { value: "10+", label: "Years of Experience" },
                { value: "100+", label: "Projects Delivered" },
                { value: "95%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                  }}
                >
                  <motion.div
                    className="text-5xl font-bold text-primary mb-2"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="font-body text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <CTASection />
    </Layout>
  );
};

export default About;
