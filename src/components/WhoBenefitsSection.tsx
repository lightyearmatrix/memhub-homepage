import { motion } from "framer-motion";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";

import benefitStartups from "@/assets/benefit-startups.png";
import benefitTeams from "@/assets/benefit-teams.png";
import benefitBuilders from "@/assets/benefit-builders.png";
import benefitAiNative from "@/assets/benefit-ai-native.png";

const benefits = [
  { image: benefitStartups, title: "Startups", description: "Who want to hire the best people — without the headcount.", keyword: "Startups" },
  { image: benefitTeams, title: "Teams", description: "Which have high standards and refuse to compromise on quality.", keyword: "Teams" },
  { image: benefitBuilders, title: "Builders", description: "Who want to become a one-person unicorn with expert-level output.", keyword: "Builders" },
  { image: benefitAiNative, title: "Companies", description: "Transitioning to an AI-native organization structure.", keyword: "Companies" },
];

const WhoBenefitsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
            Who'd Benefit Most from <HandDrawnUnderline><span className="text-accent">SuperMem</span></HandDrawnUnderline>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card hover:-translate-y-px transition-all duration-150 h-full text-center p-6">
                <div className="w-28 h-28 mx-auto mb-5">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-1.5">
                  <HandDrawnUnderline>{item.keyword}</HandDrawnUnderline>
                </h3>
                <p className="text-base text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoBenefitsSection;
