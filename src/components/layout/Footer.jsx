import React from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { Facebook, Twitter, Linkedin, Mail, Globe } from "lucide-react";

    const Footer = ({ isLandingPage = false, scrollToSection }) => {
      const navigate = useNavigate();

      const handleScrollClick = (sectionId) => {
        if (isLandingPage && scrollToSection) {
          scrollToSection(sectionId);
        } else {
          navigate(`/#${sectionId}`);
        }
      };

      return (
        <footer className="bg-background border-t border-border py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">SEO Collabs</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with website owners and build quality backlinks together.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleScrollClick('home')}
                      className="text-muted-foreground hover:text-primary"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleScrollClick('features')}
                      className="text-muted-foreground hover:text-primary"
                    >
                      Features
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/pricing"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://blog.seocollabs.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-of-service"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/refund-policy"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cookie-policy"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-muted-foreground">
                    <Mail className="h-5 w-5 mr-2" />
                    support@seocollabs.com
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Globe className="h-5 w-5 mr-2" />
                    www.seocollabs.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} SEO Collabs. All rights reserved.</p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;