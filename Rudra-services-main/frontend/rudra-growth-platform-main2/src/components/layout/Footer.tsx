import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import logo from "../../rudra-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Rudra Groups" className="h-10 object-contain" />
            </Link>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for 360° business consulting and execution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/approach" className="text-muted-foreground hover:text-foreground transition-colors">
                  Approach
                </Link>
              </li>
              <li>
                <Link to="/branding-execution" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Strategic Consulting
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Marketing & Branding
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Expansion Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <a
                  href="tel:+919880550827"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 98805 50827
                </a>
              </li>
              <li>
                <a
                  href="mailto:operations@rudra-groups.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  operations@rudra-groups.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-muted-foreground">
            © {currentYear} Rudra Groups. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
