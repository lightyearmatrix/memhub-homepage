import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ApplySectionProps {
  variant: "client" | "expert";
  onApply: () => void;
}

const ApplySection = ({ variant, onApply }: ApplySectionProps) => {
  const isClient = variant === "client";

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          {/* Status */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Beta Access Open
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {isClient ? (
              <>Get <span className="text-accent">expert-level</span> work done</>
            ) : (
              <>Build your expert <span className="text-accent">agent workforce</span></>
            )}
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            {isClient
              ? "We're onboarding a small group of early teams into our beta."
              : "We're inviting a small group of top operators into our beta."}
          </p>

          {/* CTA */}
          <button
            onClick={onApply}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 hover:-translate-y-px shadow-elevated"
          >
            {isClient ? "Join Waitlist" : "Apply as Expert"}
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Early access pricing
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplySection;
