import React, { useState } from "react";
    import { motion } from "framer-motion";
    import { Button } from "../ui/button";
    import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
    import { useToast } from "../ui/use-toast";
    import {
      Crown,
      Check,
      X,
      Building2,
      Users,
      MessageSquare,
      BarChart,
      Globe,
      Shield,
      Zap,
      Clock,
      ArrowRight,
      Star,
      Infinity,
      Mail,
      MessageCircle,
      Filter,
      FileBarChart,
      Building,
      UserPlus,
      Rocket,
      BadgeCheck,
      HelpCircle
    } from "lucide-react";

    const PricingContent = () => {
      const { toast } = useToast();
      const [selectedPlan, setSelectedPlan] = useState(null);

      const plans = [
        {
          name: "Free",
          subtitle: "Best for Individuals",
          price: "Free",
          features: [
            { text: "Add up to 2 websites", icon: Globe },
            { text: "View up to 5 websites for link exchange", icon: Check },
            { text: "No Filter to view Websites", icon: X },
            { text: "Connect with up to 5 peoples", icon: Users },
            { text: "Send 50 messages daily", icon: MessageSquare },
            { text: "Create Individual profiles only", icon: Users },
            { text: "Can't interact with Premium Members", icon: X },
            { text: "Access to email support only", icon: Mail },
            { text: "No live chat or priority support", icon: X },
            { text: "Basic Link Tracking Report", icon: BarChart },
            { text: "Create a Backlink tracking Report for the current month", icon: FileBarChart },
            { text: "May see Advertisements", icon: X }
          ],
          recommended: false,
          color: "bg-gray-50 dark:bg-gray-200/50",
          borderColor: "border-gray-300 dark:border-gray-200"
        },
        {
          name: "Pro",
          subtitle: "Best for Small Company",
          price: "9.99",
          features: [
            { text: "Add up to 10 Website Management", icon: Globe },
            { text: "Unlimited Messaging", icon: Infinity },
            { text: "Advance Filter to view Websites", icon: Filter },
            { text: "Live chat or priority support", icon: MessageCircle },
            { text: "Create one company profile", icon: Building },
            { text: "Add up to 5 members as team access", icon: UserPlus },
            { text: "Advance Link Tracking Report Access", icon: BarChart },
            { text: "Create a Backlink tracking Report for the last 3 months", icon: FileBarChart },
            { text: "No Advertisements", icon: Check }
          ],
          recommended: true,
          color: "bg-blue-300 dark:bg-blue-300/20",
          borderColor: "border-blue-200 dark:border-blue-200"
        },
        {
          name: "Enterprise",
          subtitle: "Best for Enterprise",
          price: "49.99",
          features: [
            { text: "Unlimited Website Management", icon: Globe },
            { text: "Unlimited Messaging", icon: Infinity },
            { text: "Advance Filter to view Websites", icon: Filter },
            { text: "Live chat or priority support", icon: MessageCircle },
            { text: "Create 3 company profiles", icon: Building2 },
            { text: "Add up to 10 members as team access", icon: UserPlus },
            { text: "Advance Link Tracking Report Access", icon: BarChart },
            { text: "Create a Backlink tracking Report for the last 6 months", icon: FileBarChart },
            { text: "No Advertisements", icon: Check }
          ],
          recommended: false,
          color: "bg-purple-50 dark:bg-purple-300/20",
          borderColor: "border-purple-200 dark:border-purple-200"
        },
        {
          name: "One-Time Purchase",
          subtitle: "Best for Big Agencies",
          price: "299.99",
          oneTime: true,
          features: [
            { text: "Unlimited Website Management", icon: Globe },
            { text: "Unlimited Messaging", icon: Infinity },
            { text: "Advance Filter to view Websites", icon: Filter },
            { text: "Live chat or priority support", icon: MessageCircle },
            { text: "Create unlimited company profiles", icon: Building2 },
            { text: "Add up to 10 members as team access", icon: UserPlus },
            { text: "Advance Link Tracking Report Access", icon: BarChart },
            { text: "Create a Backlink tracking Report for the last 12 months", icon: FileBarChart },
            { text: "No Advertisements", icon: Check },
            { text: "Access to Future Tools", icon: Rocket }
          ],
          recommended: false,
          color: "bg-green-50 dark:bg-green-200/20",
          borderColor: "border-green-200 dark:border-green-200"
        }
      ];

      const faqs = [
        {
          question: "What is the difference between each plan?",
          answer: "Each plan is tailored for different needs. Free plan is perfect for individuals starting out, Pro plan for small companies needing more features, Enterprise plan for larger organizations, and One-Time Purchase for agencies requiring unlimited access."
        },
        {
          question: "Can I upgrade or downgrade my plan at any time?",
          answer: "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated amount for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
        },
        {
          question: "Is there a free trial available for the Pro or Enterprise plans?",
          answer: "Yes, we offer a 14-day free trial for both Pro and Enterprise plans. You can explore all features during this period with no commitment required."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions."
        },
        {
          question: "How can I cancel my subscription?",
          answer: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period."
        }
      ];

      const handleUpgrade = (plan) => {
        setSelectedPlan(plan);
        toast({
          title: "Plan Selected",
          description: `You've selected the ${plan.name} plan. Proceeding to checkout...`,
        });
        // Add Stripe checkout logic here later
      };

      return (
        <main>
          {/* Header Section */}
          <section className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block p-3 bg-bg-[#e4f0ee] rounded-full text-[#077a7d] mb-6">
                <Crown className="h-12 w-12" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Perfect Plan</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Select the plan that best fits your needs and start building your link network today
              </p>
            </motion.div>
          </section>

          {/* Pricing Plans */}
          <section className="container mx-auto px-4 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className={`h-full border-2 ${plan.recommended ? 'border-primary' : plan.borderColor} ${plan.color}`}>
                    {plan.recommended && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-[#077a7d] text-white foreground text-sm px-4 py-1 rounded-full">
                          Recommended
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">
                          {plan.price === "Free" ? "Free" : `$${plan.price}`}
                        </span>
                        {!plan.oneTime && plan.price !== "Free" && (
                          <span className="text-muted-foreground ml-1">/month</span>
                        )}
                         {plan.oneTime && (
                          <span className="text-muted-foreground ml-1">/one-time</span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {plan.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center"
                          >
                            <feature.icon className={`h-5 w-5 mr-2 text-[#077a7d] shrink-0 ${
                              feature.icon === X ? 'text-destructive' : 'text-primary'
                            }`} />
                            <span className="text-sm">{feature.text}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6"
                      >
                        <Button
                          className="w-full rounded-md border border-[#077A7D] hover:bg-[#8cecf0]"
                          variant={plan.recommended ? "default" : "outline"}
                          onClick={() => handleUpgrade(plan)}
                        >
                          {plan.price === "Free" ? "Get Started" : "Upgrade Now"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="inline-block p-3 bg-[#e4f0ee] rounded-full text-[#077a7d] mb-6"
              >
                <HelpCircle className="h-8 w-8" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our pricing plans
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6"
                >
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      );
    };

    export default PricingContent;