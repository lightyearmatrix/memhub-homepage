import { motion } from "framer-motion";
import { Shield, GitBranch, Users } from "lucide-react";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";

const KeyDifferentiationsSection = () => {
  const differentiations = [
    { icon: Shield, title: "Enterprise Sovereignty & Privacy", keyword: "Sovereignty" },
    { icon: GitBranch, title: "High Quality Context Graph", keyword: "Context Graph" },
    { icon: Users, title: "Human–Agent Collaboration", keyword: "Collaboration" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-14 text-foreground"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Why <HandDrawnUnderline><span className="text-accent">SuperMem</span></HandDrawnUnderline>
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {differentiations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                <div className="flex flex-col items-center text-center p-10 rounded-xl border border-border bg-card shadow-soft hover:-translate-y-px transition-all duration-150">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg md:text-xl leading-snug">
                    {item.title.replace(item.keyword, "SPLIT").split("SPLIT").map((part, i) => (
                      <span key={i}>
                        {i > 0 && <HandDrawnUnderline>{item.keyword}</HandDrawnUnderline>}
                        {part}
                      </span>
                    ))}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyDifferentiationsSection;
