import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

const Contact = () => {
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
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
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

  const handleChange = (
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
          phone: formData.phone.trim(),
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
              Contact Us
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6">
              Let's Build Your Growth Journey Together
            </h1>
            <p className="font-body text-base sm:text-lg md:text-xl text-primary-foreground/80 leading-relaxed px-2">
              Ready to transform your business? We're here to listen, understand, 
              and help you achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-6 sm:mb-8">
                Get in Touch
              </h2>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-foreground mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+919880550827"
                      className="font-body text-lg text-primary hover:underline"
                    >
                      +91 98805 50827
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:operations@rudra-groups.com"
                      className="font-body text-lg text-primary hover:underline break-all"
                    >
                      operations@rudra-groups.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-foreground mb-1">
                      Location
                    </h3>
                    <p className="font-body text-muted-foreground">
                      India
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-foreground mb-1">
                      Business Hours
                    </h3>
                    <p className="font-body text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-12 p-6 bg-muted rounded-xl">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Prefer a Quick Chat?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="flex-1">
                    <a href="tel:+919880550827">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <a href="mailto:operations@rudra-groups.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Us
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-card p-8 lg:p-10 rounded-2xl border border-border shadow-card">
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
                  <>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                      Send Us a Message
                    </h2>
                    <p className="font-body text-muted-foreground mb-8">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="font-body text-sm font-medium text-foreground mb-2 block"
                          >
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={errors.name ? "border-red-500" : ""}
                            disabled={isSubmitting}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="font-body text-sm font-medium text-foreground mb-2 block"
                          >
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className={errors.email ? "border-red-500" : ""}
                            disabled={isSubmitting}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="phone"
                            className="font-body text-sm font-medium text-foreground mb-2 block"
                          >
                            Phone Number *
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={errors.phone ? "border-red-500" : ""}
                            disabled={isSubmitting}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="companyName"
                            className="font-body text-sm font-medium text-foreground mb-2 block"
                          >
                            Company Name *
                          </label>
                          <Input
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Your Company"
                            className={errors.companyName ? "border-red-500" : ""}
                            disabled={isSubmitting}
                          />
                          {errors.companyName && (
                            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                          )}
                        </div>
                      </div>

                      {/* Service Category Dropdown */}
                      <div>
                        <label
                          htmlFor="serviceCategory"
                          className="font-body text-sm font-medium text-foreground mb-2 block"
                        >
                          Service Interest
                        </label>
                        <select
                          id="serviceCategory"
                          name="serviceCategory"
                          value={formData.serviceCategory}
                          onChange={handleChange}
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

                      <div>
                        <label
                          htmlFor="description"
                          className="font-body text-sm font-medium text-foreground mb-2 block"
                        >
                          Your Message *
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Tell us about your project and how we can help..."
                          rows={5}
                          className={errors.description ? "border-red-500" : ""}
                          disabled={isSubmitting}
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto min-w-[200px]"
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
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-primary">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                Ready to Start Your Growth Journey?
              </h2>
              <p className="font-body text-primary-foreground/80">
                Schedule a free consultation with our experts today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="flex-shrink-0"
              >
                <a href="tel:+919880550827">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 98805 50827
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex-shrink-0 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="mailto:operations@rudra-groups.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
