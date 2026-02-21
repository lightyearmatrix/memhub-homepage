import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const companies = [
    { name: "Meta AI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png" },
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png" },
    { name: "Palantir", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Palantir_Technologies_logo.svg/800px-Palantir_Technologies_logo.svg.png" },
    { name: "ByteDance", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/ByteDance_logo_English.svg/800px-ByteDance_logo_English.svg.png" },
    { name: "Georgia Tech", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Georgia_Tech_seal.svg/800px-Georgia_Tech_seal.svg.png" },
  ];

  const careers = [
    {
      title: "AI Engineer",
      subtitle: "RAG & Agentic Intelligence",
      tasks: [
        "Build high-fidelity GraphRAG architectures",
        "Solve connected context problems",
        "Develop MemTrust TEE-protected memory layers",
      ],
    },
    {
      title: "UI/UX Designer",
      subtitle: "The Notion Architect",
      tasks: [
        "Design control loops for BHITL",
        "Make AI logic transparent & auditable",
        "Master minimalist Notion-style visuals",
      ],
    },
    {
      title: "Forward-Deployed Engineer",
      subtitle: "Knowledge Capture Specialist",
      tasks: [
        "Shadow experts to capture tribal knowledge",
        "Extract situational judgment patterns",
        "Bridge insight and implementation",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        {/* Hero Statement */}
        <section className="container mx-auto px-6 mb-24">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Our Story
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 text-foreground">
              Bridging human-AI trust through{" "}
              <span className="text-accent">expert judgment</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              SuperMem is the Service-as-Software marketplace bridging human-AI
              trust via Best-Human-in-the-Loop control to unlock a new labor
              market of specialized agents and fractional elite expertise.
            </p>
          </motion.div>
        </section>

        {/* Philosophy */}
        <section className="py-20 cream-panel">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Why AI Needs Your{" "}
                <span className="text-accent">Governance & Judgment</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                AI has an expertise ceiling; it can't capture expert
                decision-making in edge cases. AI will never replace the soul of
                a decision or the "Why".
              </p>
              <p className="text-muted-foreground leading-relaxed">
                SaS liberates you from being a{" "}
                <span className="font-semibold text-foreground">"grinder"</span>{" "}
                so you can become a{" "}
                <span className="font-semibold text-foreground">
                  "governor"
                </span>
                , leading a digital workforce that executes your unique
                situational judgment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About the Team */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-center">
                About <span className="text-accent">Us</span>
              </h2>

              <div className="space-y-5 text-muted-foreground leading-relaxed mb-12">
                <p>
                  We are a collective of dreamers, builders, and engineers based
                  in the heart of the{" "}
                  <span className="font-semibold text-foreground">
                    San Francisco Bay Area
                  </span>
                  —the birthplace of the digital revolution. Our mission is
                  audacious yet simple: to democratize access to world-class
                  expertise through the power of AI.
                </p>
                <p>
                  Our team is forged from the world's most influential technology
                  companies and institutions. We bring together veterans from{" "}
                  <span className="font-medium text-foreground">Meta AI</span>,{" "}
                  <span className="font-medium text-foreground">Google</span>,{" "}
                  <span className="font-medium text-foreground">Palantir</span>,{" "}
                  <span className="font-medium text-foreground">
                    ByteDance
                  </span>
                  , and{" "}
                  <span className="font-medium text-foreground">
                    Georgia Tech
                  </span>
                  .
                </p>
                <p>
                  We have a shared dream: to bridge the gap between insight and
                  action. We believe that every person, regardless of their
                  resources or connections, deserves access to the strategic
                  wisdom that was once reserved for the elite few.
                </p>
              </div>

              {/* Company logos */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="flex flex-wrap justify-center items-center gap-8">
                  {companies.map((company) => (
                    <img
                      key={company.name}
                      src={company.logo}
                      alt={company.name}
                      className="h-8 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Careers */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                Join the <span className="text-accent">Team</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We're looking for exceptional people to help build the future of
                expert-powered AI.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {careers.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card hover:-translate-y-px transition-all duration-150 h-full p-6">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <span className="text-sm font-bold text-secondary">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {job.title}
                    </h3>
                    <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-4">
                      {job.subtitle}
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                      {job.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent mt-0.5">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150">
                      Apply Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values & Future */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
                Values & Future of Work
              </h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-6">
                By 2030, startups will "install" a world-class executive team
                instantly, turning payroll into variable technology costs.
              </p>
              <p className="text-xl font-medium text-accent">
                In the Age of Abundance, your potential is limited only by your
                depth of insight.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-xl mx-auto text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Contact <span className="text-accent">Us</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Have questions or want to learn more? Reach out to us.
              </p>
              <a
                href="mailto:k@supermem.io"
                className="text-lg font-medium text-secondary hover:text-accent transition-colors duration-150"
              >
                k@supermem.io
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
