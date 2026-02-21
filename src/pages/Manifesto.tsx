import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Import manifesto images
import manifestoSaasSas from "@/assets/manifesto-saas-sas.webp";
import manifestoGenerations from "@/assets/manifesto-generations.webp";
import manifestoFrontier from "@/assets/manifesto-frontier.webp";
import manifestoCost from "@/assets/manifesto-cost.webp";
import manifestoProduct from "@/assets/manifesto-product.webp";
import manifestoScalability from "@/assets/manifesto-scalability.webp";
import manifestoCeiling from "@/assets/manifesto-ceiling.webp";
import manifestoGrinder from "@/assets/manifesto-grinder.webp";
import manifestoDemocratized from "@/assets/manifesto-democratized.webp";
import manifestoOutcome from "@/assets/manifesto-outcome.webp";
import manifestoAbundance from "@/assets/manifesto-abundance.webp";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const Manifesto = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Hero */}
          <motion.div className="text-center mb-20" {...fadeIn}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-indigo mb-6 tracking-tight">
              The Service-as-Software Manifesto
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Reclaiming Infinite Expertise
            </p>
          </motion.div>

          {/* Intro */}
          <motion.section className="mb-16" {...fadeIn}>
            <p className="text-lg leading-relaxed text-foreground">
              The three-decade era of Software-as-a-Service (SaaS) is over. We are witnessing a profound structural shift: the birth of <strong>Service-as-Software (SaS)</strong>. We are moving from a world where humans use tools to a world where software is the labor. This is the final frontier of software—the digitalization of human genius.
            </p>
            <div className="mt-8 screenshot-notion">
              <img src={manifestoSaasSas} alt="From SaaS to SaS" className="w-full h-auto" />
            </div>
          </motion.section>

          {/* Section: Three Generations */}
          <motion.section className="mb-16" {...fadeIn}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo mb-4">
              From SaaS to SaS: The Three Generations of Agency
            </h2>
            <p className="text-lg leading-relaxed text-foreground mb-6">
              To understand this revolution, we must look at the evolution of enterprise intelligence:
            </p>
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-muted/50 rounded-xl">
                <h3 className="font-semibold text-indigo mb-1">Generation 1: Systems of Record (1999–2015)</h3>
                <p className="text-muted-foreground">Focused on data centralization. The software was passive; the entire work burden remained on the human.</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <h3 className="font-semibold text-indigo mb-1">Generation 2: Systems of Engagement (2015–2023)</h3>
                <p className="text-muted-foreground">Focused on velocity through automation. It automated the "send" button, but humans still managed the tools.</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <h3 className="font-semibold text-indigo mb-1">Generation 3: Systems of Agency (2024–Present)</h3>
                <p className="text-muted-foreground">Focused on autonomy and outcomes. This is the era of "AI Executives"—software that doesn't wait for a prompt but proactively executes until a goal is achieved.</p>
              </div>
            </div>
            <div className="screenshot-notion">
              <img src={manifestoGenerations} alt="Three Generations of Agency" className="w-full h-auto" />
            </div>
          </motion.section>

          {/* Section: $10 Trillion */}
          <motion.section className="mb-16" {...fadeIn}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo mb-4">
              The $10 Trillion Digital Labor Frontier
            </h2>
            <p className="text-lg leading-relaxed text-foreground mb-6">
              The economic implications are staggering. While traditional SaaS targeted a limited market, Service-as-Software aims to reclaim the $10 trillion+ global labor market. By decoupling growth from headcount, enterprises can scale with near-zero marginal cost. AI agents perform routine interactions at a <strong>90% cost reduction</strong> compared to human labor, operating 24/7 without fatigue. This shift allows the "productization of the person"—where one expert transforms from a "grinder" to a "governor," overseeing fifty clients simultaneously.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="screenshot-notion">
                <img src={manifestoFrontier} alt="$10 Trillion Frontier" className="w-full h-auto" />
              </div>
              <div className="screenshot-notion">
                <img src={manifestoCost} alt="90% Cost Reduction" className="w-full h-auto" />
              </div>
            </div>
          </motion.section>

          {/* Section: Vision */}
          <motion.section className="mb-16" {...fadeIn}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo mb-4">
              The Vision: Everyone is a Super(wo)man
            </h2>
            <p className="text-lg leading-relaxed text-foreground mb-6">
              This paradigm shift democratizes access to elite strategy. In the SaS economy, a rural coffee shop can access the same world-class CFO guidance as a tech unicorn. We are building a marketplace where top experts turn their situational judgment into hireable agents. You are no longer limited by your hours, but only by the depth of your insight.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="screenshot-notion">
                <img src={manifestoScalability} alt="1 Expert : 50 Clients" className="w-full h-auto" />
              </div>
              <div className="screenshot-notion">
                <img src={manifestoDemocratized} alt="Democratized Strategy" className="w-full h-auto" />
              </div>
            </div>
          </motion.section>

          {/* Section: Product */}
          <motion.section className="mb-16" {...fadeIn}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo mb-4">
              The Product: The Engine of Human Genius
            </h2>
            <p className="text-lg leading-relaxed text-foreground mb-6">
              We are building the <strong>SuperMem Expert Context-Graph</strong>. It is the first platform that doesn't just store data—it captures the "Scar Tissue" of the world's greatest minds. Through Best-Human-in-the-Loop (BHITL), the masters teach the apprentices. Our agents don't just guess; they reason using the accumulated judgment and edge-case intuition of elite veterans. We are creating a marketplace of "AI Ray Dalios" that execute with the precision of the top 0.1%.
            </p>
            <div className="screenshot-notion">
              <img src={manifestoProduct} alt="The Expert Context-Graph" className="w-full h-auto" />
            </div>
          </motion.section>

          {/* Section: Ceiling */}
          <motion.section className="mb-16" {...fadeIn}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo mb-4">
              The Ceiling: Why AI Needs Your Best Judgment
            </h2>
            <p className="text-lg leading-relaxed text-foreground mb-6">
              Let's be clear: AI has a ceiling. Generic AI, trained on the average of the internet, is good for routine tasks, but it lacks <strong>Decision Memory</strong>—the strategic reasoning that defines a leader. AI will never replace the soul of a decision or the "Why". Instead, it liberates you from the "grind" so you can focus on "governance". It takes your unique situational judgment and gives it wings.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="screenshot-notion">
                <img src={manifestoCeiling} alt="The Ceiling" className="w-full h-auto" />
              </div>
              <div className="screenshot-notion">
                <img src={manifestoGrinder} alt="From Grinder to Governor" className="w-full h-auto" />
              </div>
            </div>
          </motion.section>

          {/* Section: Future */}
          <motion.section className="mb-16" {...fadeIn}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo mb-4">
              The Future of Work: A World of Infinite Expertise
            </h2>
            <p className="text-lg leading-relaxed text-foreground mb-6">
              By 2030, the "Outcome-Native" company will be the standard. Startups will "install" a world-class executive team instantly, turning payroll into a variable technology cost. This is the end of the 9-to-5 grind and the beginning of the <strong>Age of Abundance</strong>. We are moving toward a world where your potential is infinite. Lead your digital workforce and scale your genius.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="screenshot-notion">
                <img src={manifestoOutcome} alt="Outcome-Native Workflow" className="w-full h-auto" />
              </div>
              <div className="screenshot-notion">
                <img src={manifestoAbundance} alt="The Age of Abundance" className="w-full h-auto" />
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Manifesto;
