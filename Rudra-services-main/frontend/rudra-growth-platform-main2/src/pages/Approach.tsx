import { motion } from "framer-motion";
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
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container">
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
      </section>

      {/* Process Steps */}
      <section className="py-20 lg:py-28 bg-background">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row gap-8 p-8 lg:p-12 rounded-2xl ${
                  index % 2 === 0 ? "bg-muted" : "bg-card border border-border"
                }`}
              >
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">
                        {step.phase}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="lg:w-2/3">
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {step.activities.map((activity) => (
                      <span
                        key={activity}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full font-body text-sm font-medium"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-20 lg:py-28 bg-muted">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-xl shadow-card text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <commitment.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {commitment.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {commitment.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Approach;
