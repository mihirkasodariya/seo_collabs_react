import React from "react";
    import { useNavigate } from "react-router-dom";
    import Header from "../layout/Header";
    import Footer from "../layout/Footer";
    import HeroSection from "./HeroSection";
    import HowItWorksSection from "./HowItWorksSection";
    import FeaturesSection from "./FeaturesSection";
    import TestimonialsSection from "./TestimonialsSection";
    import BlogSection from "../blog/BlogSection";

    const LandingPage = () => {
      const navigate = useNavigate();

      const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      return (
        <div className="min-h-screen bg-background">
          <Header isLandingPage={true} scrollToSection={scrollToSection} />
          <main>
            <HeroSection navigate={navigate} scrollToSection={scrollToSection} />
            <HowItWorksSection />
            <FeaturesSection />
            <TestimonialsSection />
            <BlogSection />
          </main>
          <Footer isLandingPage={true} scrollToSection={scrollToSection} />
        </div>
      );
    };

    export default LandingPage;