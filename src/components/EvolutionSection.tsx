import { motion } from "framer-motion";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";

import evolutionToday from "@/assets/evolution-today.webp";
import evolutionFuture from "@/assets/evolution-future.webp";

interface EvolutionSectionProps {
  variant: "client" | "expert";
}

const EvolutionSection = ({ variant }: EvolutionSectionProps) => {
  const isClient = variant === "client";

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {isClient ? (
              <>The <span className="text-accent">evolution</span> of work</>
            ) : (
              <>The <span className="text-accent">future</span> of expertise</>
            )}
          </h2>
        </motion.div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Today */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-xl border border-border bg-card p-6 h-full shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Today
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Today
              </h3>
              <p className="text-[hsl(160,40%,25%)] leading-relaxed mb-6">
                {isClient
                  ? "AI today can write and summarize. But it doesn't understand responsibility, tradeoffs, or consequences."
                  : "Today, experts are limited by time. More clients means less depth — or burnout."}
              </p>
              
              <div className="rounded-lg overflow-hidden border border-border/50">
                <img src={evolutionToday} alt="Today's AI limitations" className="w-full h-auto" />
              </div>
            </div>
          </motion.div>

          {/* Future */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="rounded-xl border border-accent/30 bg-card p-6 h-full shadow-card relative overflow-hidden">
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center gap-2 mb-4 relative">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                  SuperMem
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-accent relative">
                <HandDrawnUnderline color="hsl(var(--foreground))">The Future</HandDrawnUnderline>
              </h3>
              <p className="text-[hsl(160,40%,25%)] leading-relaxed mb-6 relative">
                {isClient
                  ? "The future isn't AI replacing experts. It's AI amplifying experts — turning one expert into a fractional workforce."
                  : "Tomorrow, experts lead agent workforces. Your judgment scales. Your standards stay intact."}
              </p>
              
              <div className="rounded-lg overflow-hidden border border-border/50 relative">
                <img src={evolutionFuture} alt="The future of AI collaboration" className="w-full h-auto" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EvolutionSection;
