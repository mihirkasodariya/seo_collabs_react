import React from "react";
    import { motion } from "framer-motion";
    import { Link2, Users, MessageCircle, Shield, BarChart, Filter, Star } from "lucide-react";

    const FeaturesSection = () => {
      const features = [
        {
          icon: <Users className="h-8 w-8" />,
          title: "Connect with Partners",
          description: "Find and connect with website owners in your niche"
        },
        {
          icon: <Link2 className="h-8 w-8" />,
          title: "Exchange Links",
          description: "Build quality backlinks through mutual exchanges"
        },
        {
          icon: <MessageCircle className="h-8 w-8" />,
          title: "Direct Communication",
          description: "Chat directly with potential link partners"
        },
        {
          icon: <Shield className="h-8 w-8" />,
          title: "Secure Platform",
          description: "Verified websites and secure link exchanges"
        },
        {
          icon: <BarChart className="h-8 w-8" />,
          title: "Track Progress",
          description: "Monitor your link building success"
        },
        {
          icon: <Filter className="h-8 w-8" />,
          title: "Smart Filtering",
          description: "Find the most relevant websites for your niche"
        }
      ];

      return (
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="inline-block p-3 bg-[#e4f0ee] rounded-full text-[#077a7d] mb-4"
              >
                <Star className="h-8 w-8" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to build quality backlinks and grow your website
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-[#077a7d] rounded-lg"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4  bg-[#e4f0ee]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };
    export default FeaturesSection;