import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";


const HeroSection = ({ navigate, scrollToSection }) => {
  const stats = [
    { number: "1000+", label: "Active Users" },
    { number: "5000+", label: "Links Exchanged" },
    { number: "2000+", label: "Websites" },
  ];

  return (
    <section id="home" className="pb-14 md:pb-20 pt-30 md:pt-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">

          {/* HERO TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl w-full"
          >
            <h1
              className="
                text-3xl 
                sm:text-4xl 
                md:text-5xl 
                lg:text-6xl 
                font-bold 
                mb-4 
                md:mb-6 
                text-[#077A7D]"
            >
              Build Your Network & Exchange Links with Trusted Partners
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8 px-2">
              Connect with like-minded website owners, build quality backlinks, and boost your SEO rankings together
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 w-full px-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary text-white w-full sm:w-auto"
                onClick={() => navigate("/login")}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-md border border-[#077A7D] hover:bg-[#8cecf0]"
                onClick={() => scrollToSection("how-it-works")}
              >
                See How It Works
              </Button>
            </div>

            {/* STATS GRID */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="
                    glass-card 
                    p-4 sm:p-6 
                    rounded-lg 
                    shadow-md 
                    text-[#077A7D]
                    backdrop-blur-sm 
                    border border-[#077A7D]
                  "
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
