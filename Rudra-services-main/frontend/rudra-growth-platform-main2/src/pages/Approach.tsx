import { motion, useInView } from "framer-motion";
import {
  Search,
  FileText,
  Rocket,
  TrendingUp,
  Handshake,
  BarChart,
  RefreshCw,
  HeartHandshake,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import CTASection from "@/components/home/CTASection";
import AnimatedPeople from "@/components/background/AnimatedPeople";
import SectionTransition from "@/components/transitions/SectionTransition";
import { useRef } from "react";

const processSteps = [
  {
    icon: Search,
    phase: "Phase 1",
    title: "Understand",
    description:
      "We begin by deeply understanding your business, challenges, goals, and market landscape. Through comprehensive discovery sessions and stakeholder interviews, we gain insights that inform our strategy.",
    activities: [
      "Business Assessment",
      "Stakeholder Interviews",
      "Market Analysis",
      "Gap Identification",
    ],
  },
  {
    icon: FileText,
    phase: "Phase 2",
    title: "Plan",
    description:
      "Based on our findings, we develop a tailored strategy and detailed roadmap. Every recommendation is backed by data and aligned with your specific objectives and resources.",
    activities: [
      "Strategy Development",
      "Roadmap Creation",
      "Resource Planning",
      "KPI Definition",
    ],
  },
  {
    icon: Rocket,
    phase: "Phase 3",
    title: "Execute",
    description:
      "We don't just advise—we execute. Our team works alongside yours to implement solutions with precision, ensuring every initiative delivers measurable outcomes.",
    activities: [
      "Implementation",
      "Project Management",
      "Quality Assurance",
      "Progress Tracking",
    ],
  },
  {
    icon: TrendingUp,
    phase: "Phase 4",
    title: "Scale",
    description:
      "With foundations in place, we help you optimize and scale. Continuous monitoring and iterative improvements ensure sustained growth and competitive advantage.",
    activities: [
      "Performance Optimization",
      "Scaling Support",
      "Continuous Improvement",
      "Long-term Partnership",
    ],
  },
];

const commitments = [
  {
    icon: Handshake,
    title: "Partnership Mindset",
    description:
      "We see ourselves as an extension of your team, invested in your success as if it were our own.",
  },
  {
    icon: BarChart,
    title: "Results-Driven",
    description:
      "Every initiative is measured against clear KPIs. We're accountable for delivering real outcomes.",
  },
  {
    icon: RefreshCw,
    title: "Agile Approach",
    description:
      "Business moves fast. Our methodologies are flexible, allowing us to adapt as your needs evolve.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term Commitment",
    description:
      "We build lasting relationships. Many of our clients have been with us for years, growing together.",
  },
];

const Approach = () => {
  const heroRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const commitmentsRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const commitmentsInView = useInView(commitmentsRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      <SectionTransition sections={[heroRef, processRef, commitmentsRef]} />
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
        className="py-20 lg:py-28 bg-primary relative overflow-hidden"
      >
        {/* Background with people working together */}
        <div className="absolute inset-0">
          <AnimatedPeople />
        </div>
        
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-[2px]" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground/70 mb-4 block">
              Our Approach
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              How We Work With You
            </h1>
            <p className="font-body text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              A proven methodology built on understanding, strategic planning, 
              precise execution, and sustainable scaling—tailored to your unique journey.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Process Steps */}
      <motion.section
        ref={processRef}
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        animate={processInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="py-20 lg:py-28 bg-background"
      >
        <div className="container">
          <SectionHeading
            label="Our Process"
            title="From Vision to Reality"
            description="Our four-phase approach ensures thorough understanding, careful planning, precise execution, and sustainable growth."
          />

          <div className="mt-16 space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className={`flex flex-col lg:flex-row gap-8 p-8 lg:p-12 rounded-2xl card-gradient-glow ${
                  index % 2 === 0 ? "bg-muted" : "bg-card border border-border"
                }`}
              >
                <div className="lg:w-1/3">
                  <motion.div
                    className="flex items-center gap-4 mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                  >
                    <motion.div
                      className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <motion.span
                        className="font-body text-sm font-semibold text-primary uppercase tracking-wider block"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                      >
                        {step.phase}
                      </motion.span>
                      <motion.h3
                        className="font-display text-2xl font-bold text-foreground"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                      >
                        {step.title}
                      </motion.h3>
                    </div>
                  </motion.div>
                </div>

                <div className="lg:w-2/3">
                  <motion.p
                    className="font-body text-muted-foreground leading-relaxed mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
                  >
                    {step.description}
                  </motion.p>
                  <div className="flex flex-wrap gap-3">
                    {step.activities.map((activity, actIndex) => (
                      <motion.span
                        key={activity}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full font-body text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.15 + 0.6 + actIndex * 0.1 
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "hsl(var(--primary) / 0.2)",
                        }}
                      >
                        {activity}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Commitments */}
      <motion.section
        ref={commitmentsRef}
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        animate={commitmentsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="py-20 lg:py-28 bg-muted"
      >
        <div className="container">
          <SectionHeading
            label="Our Commitment"
            title="What You Can Expect"
            description="When you partner with Rudra Groups, you're not just getting a service provider—you're gaining a dedicated ally committed to your success."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {commitments.map((commitment, index) => (
              <motion.div
                key={commitment.title}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="bg-card card-gradient-glow p-8 rounded-xl shadow-card text-center"
              >
                <motion.div
                  className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2,
                    backgroundColor: "hsl(var(--primary) / 0.2)",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <commitment.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <motion.h3
                  className="font-display text-xl font-semibold text-foreground mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                >
                  {commitment.title}
                </motion.h3>
                <motion.p
                  className="font-body text-sm text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                >
                  {commitment.description}
                </motion.p>
              </motion.div>
              ))}
          </div>
        </div>
      </motion.section>

      <CTASection />
    </Layout>
  );
};

export default Approach;
