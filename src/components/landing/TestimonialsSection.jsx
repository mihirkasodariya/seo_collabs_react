import React from "react";
    import { motion } from "framer-motion";
    import { Users } from "lucide-react";

    const TestimonialsSection = () => {
      const testimonials = [
        {
          name: "Sarah Johnson",
          role: "Digital Marketing Manager",
          content: "SEO Collabs has transformed our link building strategy. We've found quality partners and seen significant ranking improvements.",
          image_alt: "Sarah Johnson profile picture",
          image_description: "Professional headshot of Sarah Johnson"
        },
        {
          name: "Michael Chen",
          role: "SEO Specialist",
          content: "The platform's ease of use and quality of partners has made our outreach efforts much more efficient.",
          image_alt: "Michael Chen profile picture",
          image_description: "Professional headshot of Michael Chen"
        },
        {
          name: "Emma Davis",
          role: "Website Owner",
          content: "As a small business owner, SEO Collabs has helped me build valuable relationships and improve my site's visibility.",
          image_alt: "Emma Davis profile picture",
          image_description: "Professional headshot of Emma Davis"
        }
      ];

      return (
        <section id="testimonials" className="py-16 md:py-24 bg-[#faffff]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="inline-block p-3 bgbg-[#e4f0ee] rounded-full text-[#077a7d] mb-4"
              >
                <Users className="h-8 w-8" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Success Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See what our users have to say about their experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-card p-6 text-[#077a7d] rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 shrink-0">
                      <img  alt={testimonial.image_alt} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };
    export default TestimonialsSection;