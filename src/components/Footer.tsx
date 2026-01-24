import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";

const audienceLinks = [
  { label: "For Corporates", href: "/for-corporates" },
  { label: "For Schools", href: "/for-schools" },
  { label: "For Mentors", href: "/for-mentors" },
  { label: "For Students", href: "/for-students" }
];

const aboutLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Our Impact", href: "/#impact" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" }
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "FAQ", href: "/faq" },
  { label: "Resources", href: "/resources" }
];

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "Twitter", icon: Twitter, href: "https://twitter.com" }
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Gen-Connect
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Connecting relatable STEM mentors with the next generation
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            
            <p className="text-xs text-muted-foreground">
              © 2026 Gen-Connect
            </p>
          </div>

          {/* Column 2: For Audiences */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Audiences</h4>
            <ul className="space-y-3">
              {audienceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">About Us</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal & Resources</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-xs text-muted-foreground">
            Committed to authentic social mobility and D&I impact
          </p>
        </div>
      </div>
    </footer>
  );
}
