import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../rudra-logo.png";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Approach", path: "/approach" },
  { name: "Branding Execution", path: "/branding-execution" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-muted border-b border-border py-2">
        <div className="container flex justify-end items-center gap-6 text-sm font-body">
          <a
            href="tel:+919880550827"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            +91 98805 50827
          </a>
          <a
            href="mailto:operations@rudra-groups.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" />
            operations@rudra-groups.com
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-glow-sm"
            : "bg-background border-b border-transparent"
        }`}
      >
        <nav className="container flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group transition-transform hover:scale-105">
            <img src={logo} alt="Rudra Groups - Home" className="h-12 sm:h-14 md:h-16 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm font-medium transition-colors hover:text-primary relative group ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm hover:shadow-glow-md transition-all text-sm">
              <Link to="/contact">Get a Free Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-card border-t border-border"
            >
              <div className="container py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-body text-base font-medium py-2 transition-colors ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border flex flex-col gap-3">
                  <a
                    href="tel:+919880550827"
                    className="flex items-center gap-2 text-muted-foreground font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    +91 98805 50827
                  </a>
                  <a
                    href="mailto:operations@rudra-groups.com"
                    className="flex items-center gap-2 text-muted-foreground font-medium"
                  >
                    <Mail className="w-4 h-4" />
                    operations@rudra-groups.com
                  </a>
                </div>
                <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/contact">Get a Free Consultation</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
