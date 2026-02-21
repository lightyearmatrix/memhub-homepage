import { motion } from "framer-motion";

import stepChooseExpert from "@/assets/step-choose-expert.webp";
import stepConnectContext from "@/assets/step-connect-context.webp";
import stepAgentWork from "@/assets/step-agent-work.webp";
import expertKnowledge from "@/assets/expert-knowledge.webp";

interface ProductShowcaseSectionProps {
  variant: "client" | "expert";
}

const ProductShowcaseSection = ({ variant }: ProductShowcaseSectionProps) => {
  const isClient = variant === "client";

  const clientShowcase = [
    { image: stepChooseExpert, title: "Expert Marketplace", description: "Browse and hire from a network of verified experts" },
    { image: stepConnectContext, title: "Seamless Integrations", description: "Connect your favorite tools in one click" },
    { image: stepAgentWork, title: "Real-time Progress", description: "Track your agents working in real-time" },
  ];

  const expertShowcase = [
    { image: stepConnectContext, title: "Connect Your Knowledge", description: "Integrate all your data sources" },
    { image: expertKnowledge, title: "AI-Powered Insights", description: "Your expertise, automatically extracted" },
    { image: stepAgentWork, title: "Multi-Client Dashboard", description: "Manage all clients from one place" },
  ];

  const showcase = isClient ? clientShowcase : expertShowcase;

  return (
    <section className="py-20" style={{ backgroundColor: 'hsl(195, 50%, 95%)' }}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            {isClient ? (
              <>Powerful tools at your <span className="text-accent">fingertips</span></>
            ) : (
              <>Everything you need to <span className="text-accent">scale</span></>
            )}
          </h2>
        </motion.div>

        {/* Showcase grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {showcase.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card hover:-translate-y-px transition-all duration-150">
                {/* Image */}
                <div className="p-4">
                  <div className="rounded-lg overflow-hidden border border-border/50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="px-5 pb-5 pt-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
