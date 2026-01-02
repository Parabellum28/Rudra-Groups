import { motion } from "framer-motion";
import { Users, Award, Lightbulb, Heart, GraduationCap, Globe } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import CTASection from "@/components/home/CTASection";

const culturePoints = [
  {
    icon: Users,
    title: "Collaborative Spirit",
    description:
      "We believe the best solutions emerge when diverse perspectives come together. Our teams work seamlessly across disciplines to deliver holistic outcomes.",
  },
  {
    icon: Award,
    title: "Excellence as Standard",
    description:
      "Mediocrity has no place here. Every team member is driven by a commitment to deliver exceptional quality in everything we do.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "The business landscape evolves rapidly. We invest in continuous development to stay ahead of trends and bring fresh insights to our clients.",
  },
  {
    icon: Heart,
    title: "Client-First Mindset",
    description:
      "Our success is measured by our clients' success. Every decision, every action is guided by what's best for the businesses we serve.",
  },
];

const expertiseAreas = [
  {
    icon: GraduationCap,
    title: "Industry Veterans",
    description:
      "Our leadership team brings decades of experience from leading consulting firms, multinational corporations, and successful startups.",
  },
  {
    icon: Globe,
    title: "Cross-Industry Expertise",
    description:
      "From manufacturing to technology, retail to healthcare—our diverse experience enables us to bring best practices across sectors.",
  },
];

const Team = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-primary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center px-4"
          >
            <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-foreground/70 mb-4 block">
              Our Team
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6">
              People Who Drive Results
            </h1>
            <p className="font-body text-base sm:text-lg md:text-xl text-primary-foreground/80 leading-relaxed px-2">
              Fueling every success story is an unstoppable force
              of thinkers, builders, & dreamers. We don't just have
              a team - we have a movement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background border-b border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center px-4"
          >
            <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-relaxed">
              You might not know their names yet
              <br />
              <span className="text-gradient">but you'll definitely know their work.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="container">
          <SectionHeading
            label="Our Culture"
            title="Built on Shared Values"
            description="Culture isn't just words on a wall—it's how we work every day. These principles guide our interactions with clients and each other."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {culturePoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 p-8 bg-muted rounded-xl"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                  <point.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {point.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                label="Our Expertise"
                title="Deep Knowledge, Broad Experience"
                align="left"
              />
              <p className="font-body text-muted-foreground leading-relaxed mt-6 mb-6">
                Our team comprises seasoned professionals who have walked in our 
                clients' shoes. We understand the challenges of building and scaling 
                businesses because we've lived them ourselves.
              </p>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8 p-6 bg-card border border-border rounded-xl"
              >
                <p className="font-display text-lg md:text-xl font-medium text-foreground leading-relaxed">
                  They are strategists, innovators, & problem-solvers
                  <br />
                  who bring ideas to life, all working passionately behind
                  <br />
                  the scenes to power our growth.
                </p>
              </motion.div>

              <div className="space-y-6">
                {expertiseAreas.map((area, index) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <area.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-semibold text-foreground mb-1">
                        {area.title}
                      </h4>
                      <p className="font-body text-sm text-muted-foreground">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-primary rounded-2xl p-8 lg:p-12"
            >
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-6">
                Join Our Team
              </h3>
              <p className="font-body text-primary-foreground/80 leading-relaxed mb-8">
                We're always looking for talented individuals who share our passion 
                for excellence and client success. If you're driven, collaborative, 
                and eager to make an impact, we'd love to hear from you.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "50+", label: "Team Members" },
                  { number: "12+", label: "Countries Served" },
                  { number: "25+", label: "Industries Covered" },
                  { number: "100%", label: "Passion for Excellence" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-2xl lg:text-3xl font-bold text-primary-foreground mb-1">
                      {stat.number}
                    </div>
                    <div className="font-body text-xs text-primary-foreground/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <SectionHeading
              label="How We Collaborate"
              title="Your Extended Team"
              description="When you work with Rudra Groups, you're not hiring a vendor—you're gaining partners who integrate seamlessly with your organization and are fully invested in your success."
            />

            <div className="mt-12 grid sm:grid-cols-3 gap-8">
              {[
                {
                  title: "Dedicated Teams",
                  description:
                    "Every client gets a dedicated team that understands your business inside and out.",
                },
                {
                  title: "Transparent Communication",
                  description:
                    "Regular updates, clear reporting, and open dialogue keep everyone aligned.",
                },
                {
                  title: "Knowledge Transfer",
                  description:
                    "We build your internal capabilities, ensuring lasting value beyond our engagement.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-muted rounded-xl"
                >
                  <h4 className="font-display text-lg font-semibold text-foreground mb-3">
                    {item.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Team;
