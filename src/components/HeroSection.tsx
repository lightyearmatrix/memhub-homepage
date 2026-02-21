import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import superMemUiDemo from "@/assets/supermem-ui-demo.webp";

interface HeroSectionProps {
  variant: "client" | "expert";
  onPrimaryClick: () => void;
}

const HeroSection = ({ variant, onPrimaryClick }: HeroSectionProps) => {
  const isClient = variant === "client";

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Status pill */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Now in Beta
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 text-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {isClient ? (
              <>
                Hire Digital Employees with Expert Judgment and{" "}
                <span className="text-accent">Expert-in-the-loop</span>.
              </>
            ) : (
              <>
                Scale your judgment to{" "}
                <span className="text-accent">50 clients</span>
                {" "}— without lowering standards.
              </>
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {isClient
              ? "SuperMem gives you AI agents powered by real expert judgment — with humans approving what matters."
              : "Turn how you think into expert agents you supervise — not replace. You stay the final decision-maker."}
          </motion.p>

          {/* CTA */}
          <motion.div 
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <button
              onClick={onPrimaryClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 hover:-translate-y-px shadow-elevated"
            >
              {isClient ? "Join Waitlist" : "Join as Expert"}
              <ArrowRight className="w-4 h-4" />
            </button>
            {!isClient && (
              <span className="text-sm text-muted-foreground">
                Limited spots available
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Product screenshot */}
        <motion.div 
          className="mt-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="rounded-xl border border-border overflow-hidden shadow-elevated bg-card">
            <img
              src={superMemUiDemo}
              alt="SuperMem Expert Agent Network"
              className="w-full h-auto relative md:-left-8"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
