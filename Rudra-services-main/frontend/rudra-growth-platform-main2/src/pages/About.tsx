import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import CTASection from "@/components/home/CTASection";

const values = [
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We operate with complete transparency and honesty in all our partnerships.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for exceptional quality in everything we deliver.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace new ideas and technologies to drive meaningful change.",
  },
  {
    icon: Eye,
    title: "Partnership",
    description:
      "We succeed when our clients succeed—their growth is our measure.",
  },
];

const About = () => {
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
              About Rudra Groups
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Your 360° Business Growth Partner
            </h1>
            <p className="font-body text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              We are a full-service business consulting and execution firm that helps 
              organizations unlock their potential through integrated strategy, 
              marketing, expansion, infrastructure, and automation solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                label="Who We Are"
                title="Built on Experience, Driven by Results"
                align="left"
              />
              <div className="mt-8 space-y-6 font-body text-muted-foreground leading-relaxed">
                <p>
                  Rudra Groups was founded with a singular vision: to be the partner 
                  that businesses can trust for comprehensive growth solutions. Unlike 
                  traditional consulting firms that offer advice without accountability, 
                  we take ownership of execution.
                </p>
                <p>
                  Our team brings together decades of experience across industries, 
                  combining strategic insight with operational expertise. We understand 
                  that every business is unique, which is why we tailor our approach to 
                  meet your specific needs and challenges.
                </p>
                <p>
                  From startups looking to scale to enterprises seeking transformation, 
                  we've partnered with organizations at every stage of growth, delivering 
                  measurable results that stand the test of time.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-muted rounded-2xl p-8 lg:p-12"
            >
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: "15+", label: "Years of Experience" },
                  { number: "500+", label: "Projects Completed" },
                  { number: "50+", label: "Industry Experts" },
                  { number: "98%", label: "Client Retention" },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-3xl lg:text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="font-body text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card p-8 lg:p-12 rounded-xl shadow-card"
            >
              <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Our Mission
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                To empower businesses with integrated consulting and execution 
                services that drive sustainable growth, operational excellence, 
                and lasting competitive advantage in their respective markets.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-primary p-8 lg:p-12 rounded-xl"
            >
              <div className="w-14 h-14 bg-primary-foreground/20 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-4">
                Our Vision
              </h3>
              <p className="font-body text-primary-foreground/80 leading-relaxed">
                To be the most trusted 360° business growth partner globally, 
                recognized for our commitment to excellence, innovation, and the 
                transformative impact we create for our clients and their stakeholders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <SectionHeading
            label="Our Values"
            title="Principles That Guide Us"
            description="Our core values define who we are and how we work with every client, every day."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {value.description}
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

export default About;
