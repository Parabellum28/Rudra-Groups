import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
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
            <ul className="space-y-3 font-body text-sm mb-6">
              <li>
                <a
                  href="tel:+919187500287"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 91875 00287
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
            
            {/* Social Media */}
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61587451671976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500/50 active:scale-95 transition-all duration-300 touch-manipulation"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="w-5 h-5 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.instagram.com/rudra___groups?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-pink-500 hover:border-pink-500/50 active:scale-95 transition-all duration-300 touch-manipulation"
                  aria-label="Visit our Instagram page"
                >
                  <Instagram className="w-5 h-5 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-blue-400 hover:border-blue-400/50 active:scale-95 transition-all duration-300 touch-manipulation"
                  aria-label="Visit our Twitter page"
                >
                  <Twitter className="w-5 h-5 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:border-blue-600/50 active:scale-95 transition-all duration-300 touch-manipulation"
                  aria-label="Visit our LinkedIn page"
                >
                  <Linkedin className="w-5 h-5 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
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
