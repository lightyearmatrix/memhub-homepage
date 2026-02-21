import { motion, type Variants } from "framer-motion";
import { Users, Link, FileText, Shield, Brain, Eye, Scale, CheckCircle } from "lucide-react";

import stepChooseExpert from "@/assets/step-choose-expert.webp";
import stepConnectContext from "@/assets/step-connect-context.webp";
import stepAgentWork from "@/assets/step-agent-work.webp";
import stepApproval from "@/assets/step-approval.webp";
import expertKnowledge from "@/assets/expert-knowledge.webp";

interface HowItWorksSectionProps {
  variant: "client" | "expert";
}

const HowItWorksSection = ({ variant }: HowItWorksSectionProps) => {
  const isClient = variant === "client";

  const clientSteps = [
    { icon: Users, title: "Choose an Expert, or Their Agent", description: "Agents trained by top operators in growth, fundraising, legal, ops, and more.", image: stepChooseExpert, imageAlt: "Expert Agent Network" },
    { icon: Link, title: "Connect Your Context", description: "Meetings, documents, tools — your agent learns how your work actually runs.", image: stepConnectContext, imageAlt: "Connect your tools" },
    { icon: FileText, title: "Agent Produces Real Work", description: "Plans, drafts, analysis, workflows — not just suggestions.", image: stepAgentWork, imageAlt: "Agent working" },
    { icon: Shield, title: "Human Approval Where It Counts", description: "Experts and you approve key decisions before anything goes live.", image: stepApproval, imageAlt: "Human approval" },
  ];

  const expertSteps = [
    { icon: Brain, title: "Train Your Agent", description: "Share your principles, workflows, and past decisions, through connecting your notes and meetings with your agents.", image: stepConnectContext, imageAlt: "Connect integrations" },
    { icon: FileText, title: "Your Agent Handles First Pass", description: "Drafts, analysis, structured outputs for multiple clients.", image: stepAgentWork, imageAlt: "Agent first pass" },
    { icon: Eye, title: "You Supervise Edge Cases", description: "Approve, refine, or redirect high-impact decisions.", image: stepApproval, imageAlt: "Supervise edge cases" },
    { icon: Scale, title: "Scale Without Dilution", description: "Your expertise reaches more clients — without sacrificing quality.", image: expertKnowledge, imageAlt: "Scale expertise" },
  ];

  const steps = isClient ? clientSteps : expertSteps;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {isClient ? (
              <>How <span className="text-accent">SuperMem</span> works</>
            ) : (
              <>How experts work with <span className="text-accent">SuperMem</span></>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {isClient
              ? "Get expert-level work done in four simple steps"
              : "From doing all the work → to guiding the work"}
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div 
          className="space-y-20 lg:space-y-28"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const Icon = step.icon;
            
            return (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}
              >
                {/* Content */}
                <div className={`space-y-5 ${isEven ? "lg:pr-4" : "lg:pl-4 lg:col-start-2"}`}>
                  <div className="inline-flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent font-semibold text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      Step {index + 1}
                    </span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Screenshot */}
                <div className={`${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}>
                  <div className="rounded-xl border border-border overflow-hidden shadow-card bg-card">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer badge */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-muted/50">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              {isClient
                ? "AI does the heavy lifting. Humans keep the judgment."
                : "Your agents will never leave you."}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
