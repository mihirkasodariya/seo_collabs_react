import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { User, Menu, X } from "lucide-react";

const Header = ({ isLandingPage = false, scrollToSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const [openMobile, setOpenMobile] = useState(false);

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  useEffect(() => {
    if (isLandingPage) {
      const handleScroll = () => {
        const sections = ["home", "how-it-works", "features", "testimonials"];
        let currentSection = "home";

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentSection = sectionId;
              break;
            }
          }
        }

        setActiveSection(currentSection);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLandingPage]);

  const handleScrollClick = (sectionId) => {
    if (isLandingPage && scrollToSection) {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
    setOpenMobile(false);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) navigate("/dashboard");
    else navigate("/login");
    setOpenMobile(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur border-b border-border z-50">
      <nav className="container mx-auto px-4 py-4"> 
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-[#077A7D]">
            SEO Collabs
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-[#077A7D]"
            onClick={() => setOpenMobile(!openMobile)}
          >
            {openMobile ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6">
            {isLandingPage ? (
              <>
                <button
                  onClick={() => handleScrollClick("home")}
                  className={`text-muted-foreground hover:text-[#077a7d] transition-colors ${activeSection === 'home' ? 'text-[#077a7d] font-medium' : ''}`}
                    >
                  Home
                </button>

                <button
                  onClick={() => handleScrollClick("how-it-works")}
                   className={`text-muted-foreground hover:text-[#077a7d] transition-colors ${activeSection === 'how-it-works' ? 'text-[#077a7d] font-medium' : ''}`}
                    >
                  How It Works
                </button>

                <button
                  onClick={() => handleScrollClick("features")}
                  className={`transition-all ${activeSection === "features"
                    ? "text-[#077A7D] font-medium"
                    : "text-muted-foreground hover:text-[#077A7D]"}`}
                >
                  Features
                </button>
              </>
            ) : (
              <Link
                to="/#home"
                className={`transition-all ${location.pathname === "/" && location.hash === "#home"
                  ? "text-[#077A7D] font-medium"
                  : "text-muted-foreground hover:text-[#077A7D]"}`}
              >
                Home
              </Link>
            )}

            <Link
              to="/pricing"
              className={`transition-all ${location.pathname === "/pricing"
                ? "text-[#077A7D] font-medium"
                : "text-muted-foreground hover:text-[#077A7D]"}`}
            >
              Pricing
            </Link>

            <a
              href="https://blog.seocollabs.com"
              target="_blank"
              className="text-muted-foreground hover:text-[#077A7D] transition-all"
            >
              Blog
            </a>

            <button
              onClick={() => handleScrollClick("testimonials")}
              className={`transition-all ${activeSection === "testimonials"
                ? "text-[#077A7D] font-medium"
                : "text-muted-foreground hover:text-[#077A7D]"}`}
            >
              Success Stories
            </button>

            <button
              onClick={handleAuthAction}
              className="px-6 py-2 rounded-md border border-[#077A7D] text-[#077A7D] bg-transparent hover:bg-[#077A7D] hover:text-white transition-all"
            >
              {isAuthenticated ? "Dashboard" : "Login"}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {openMobile && (
          <div className="md:hidden mt-4 space-y-4 bg-white p-4 rounded-lg shadow-lg animate-fadeIn">
            {isLandingPage ? (
              <>
                <button
                  onClick={() => handleScrollClick("home")}
                  className="block w-full text-left text-lg text-[#077A7D]"
                >
                  Home
                </button>
                <button
                  onClick={() => handleScrollClick("how-it-works")}
                  className="block w-full text-left text-lg text-[#077A7D]"
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleScrollClick("features")}
                  className="block w-full text-left text-lg text-[#077A7D]"
                >
                  Features
                </button>
              </>
            ) : (
              <Link
                to="/#home"
                className="block w-full text-left text-lg text-[#077A7D]"
                onClick={() => setOpenMobile(false)}
              >
                Home
              </Link>
            )}

            <Link
              to="/pricing"
              className="block w-full text-left text-lg text-[#077A7D]"
              onClick={() => setOpenMobile(false)}
            >
              Pricing
            </Link>

            <a
              href="https://blog.seocollabs.com"
              target="_blank"
              className="block w-full text-left text-lg text-[#077A7D]"
            >
              Blog
            </a>

            <button
              onClick={() => handleScrollClick("testimonials")}
              className="block w-full text-left text-lg text-[#077A7D]"
            >
              Success Stories
            </button>

            <button
              onClick={handleAuthAction}
              className="w-full px-6 py-2 rounded-md border border-[#077A7D] text-[#077A7D] hover:bg-[#077A7D] hover:text-white transition-all"
            >
              {isAuthenticated ? "Dashboard" : "Login"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
