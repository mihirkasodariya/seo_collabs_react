import React from "react";
import { motion } from "framer-motion";
import { Building2, Users, MessageSquare, CheckCircle2, Rocket } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Building2 className="h-12 w-12" />,
      title: "Add Your Website",
      description: "Register and add your website details"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Find Partners",
      description: "Connect with relevant website owners"
    },
    {
      icon: <MessageSquare className="h-12 w-12" />,
      title: "Communicate",
      description: "Discuss link exchange opportunities"
    },
    {
      icon: <CheckCircle2 className="h-12 w-12" />,
      title: "Exchange Links",
      description: "Complete the link exchange process"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#faffff]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block p-3 bg-[#e4f0ee] rounded-full text-[#077a7d] mb-4"
          >
            <Rocket className="h-8 w-8" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start building quality backlinks in four simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-card p-6 text-[#077a7d] rounded-lg text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4 bg-[#e4f0ee]">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;