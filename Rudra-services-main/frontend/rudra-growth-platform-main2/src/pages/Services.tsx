import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  Megaphone,
  TrendingUp,
  Calendar,
  Building2,
  Bot,
  ArrowRight,
  Send,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import CTASection from "@/components/home/CTASection";

// Service categories for the dropdown
const SERVICE_CATEGORIES = [
  { value: "", label: "Select a service (optional)" },
  { value: "Strategic Consulting", label: "Strategic Consulting" },
  { value: "Marketing Solutions", label: "Marketing Solutions" },
  { value: "Business Expansion", label: "Business Expansion" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Automation", label: "Automation" },
  { value: "Other", label: "Other" },
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  description?: string;
}

const services = [
  {
    icon: Target,
    title: "Strategic Consulting",
    description:
      "Transform your business with data-driven strategies that align with your vision and market opportunities.",
    features: [
      "Business Strategy Development",
      "Market Analysis & Research",
      "Growth Roadmap Planning",
      "Competitive Positioning",
      "Financial Planning & Forecasting",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing & Branding",
    description:
      "Build a powerful brand presence and connect with your target audience through integrated marketing solutions.",
    features: [
      "Brand Identity Development",
      "Digital Marketing Strategy",
      "Content Marketing",
      "Social Media Management",
      "Performance Marketing",
    ],
  },
  {
    icon: TrendingUp,
    title: "Expansion Services",
    description:
      "Scale your business confidently with strategic market entry and geographic expansion support.",
    features: [
      "Market Entry Strategy",
      "Geographic Expansion",
      "Partnership Development",
      "Distribution Channel Setup",
      "Localization Support",
    ],
  },
  {
    icon: Calendar,
    title: "Events & PR",
    description:
      "Elevate your brand visibility through strategic events, media relations, and reputation management.",
    features: [
      "Corporate Event Management",
      "Media Relations",
      "Press Release & Communications",
      "Crisis Management",
      "Stakeholder Engagement",
    ],
  },
  {
    icon: Building2,
    title: "Infrastructure Support",
    description:
      "Build a solid operational foundation with optimized processes and efficient resource management.",
    features: [
      "Process Optimization",
      "Operational Excellence",
      "Resource Management",
      "Supply Chain Advisory",
      "Facility Planning",
    ],
  },
  {
    icon: Bot,
    title: "Automation & AI",
    description:
      "Future-proof your business with intelligent automation and cutting-edge AI solutions.",
    features: [
      "Business Process Automation",
      "AI Strategy & Implementation",
      "Digital Transformation",
      "Data Analytics & Insights",
      "Technology Advisory",
    ],
  },
];

const Services = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    serviceCategory: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.companyName.trim() || formData.companyName.trim().length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters";
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Please check your input",
        description: "Some fields need to be corrected.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get API URL from environment variable or use default
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      
      const response = await fetch(`${apiUrl}/api/leads/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || "",
          companyName: formData.companyName.trim(),
          serviceCategory: formData.serviceCategory || "",
          description: formData.description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from server
        if (data.errors) {
          const serverErrors: FormErrors = {};
          for (const [field, messages] of Object.entries(data.errors)) {
            if (Array.isArray(messages) && messages.length > 0) {
              serverErrors[field as keyof FormErrors] = messages[0];
            }
          }
          setErrors(serverErrors);
        }
        throw new Error(data.message || "Failed to submit form. Please try again.");
      }

      // Success!
      setIsSuccess(true);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. Our team will contact you within 24 hours.",
      });

      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          companyName: "",
          serviceCategory: "",
          description: "",
        });
        setIsSuccess(false);
      }, 3000);

    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Our Services
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6">
              Comprehensive Business Solutions
            </h1>
            <p className="font-body text-base sm:text-lg md:text-xl text-primary-foreground/80 leading-relaxed px-2">
              From strategy to execution, we provide end-to-end services designed 
              to accelerate your growth and drive sustainable success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 lg:p-10 rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 font-body text-sm text-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Not sure which service you need?
              </h2>
              <p className="font-body text-muted-foreground">
                Let's discuss your challenges and find the right solution together.
              </p>
            </div>
            <Button asChild size="lg" className="group flex-shrink-0">
              <Link to="/contact">
                Get a Free Consultation
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Connect With Us Form */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <SectionHeading
                label="Get In Touch"
                title="Connect With Us"
                description="Fill out the form below and we'll get back to you within 24 hours."
                align="center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card p-8 lg:p-12 rounded-xl border border-border shadow-card"
            >
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Thank You!
                  </h2>
                  <p className="font-body text-muted-foreground">
                    Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-body font-medium text-foreground">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={`bg-background border-border focus:border-primary ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-body font-medium text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={`bg-background border-border focus:border-primary ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-body font-medium text-foreground">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98805 50827"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={`bg-background border-border focus:border-primary ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="font-body font-medium text-foreground">
                        Company Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="Your Company"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={`bg-background border-border focus:border-primary ${
                          errors.companyName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Category Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="serviceCategory" className="font-body font-medium text-foreground">
                      Service Interest
                    </Label>
                    <select
                      id="serviceCategory"
                      name="serviceCategory"
                      value={formData.serviceCategory}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {SERVICE_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="font-body font-medium text-foreground">
                      Your Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell us about your project or inquiry..."
                      required
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`bg-background border-border focus:border-primary resize-none ${
                        errors.description ? "border-red-500" : ""
                      }`}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto group min-w-[200px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Services;
