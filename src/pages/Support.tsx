import { motion } from "framer-motion";
import { Mail, MessageSquare, Lightbulb, Clock, Wifi, RefreshCw, UserCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const Support = () => {
  const commonIssues = [
    {
      icon: Wifi,
      title: "Connection Problems",
      description: "Issues connecting to third-party services (Zoom, Notion, Slack, etc.):",
      items: [
        "Ensure you have authorized the necessary permissions",
        "Try disconnecting and reconnecting the service",
        "Check that your account has the required access level",
      ],
    },
    {
      icon: RefreshCw,
      title: "Data Sync Issues",
      description: "If your data isn't syncing properly:",
      items: [
        "Verify your internet connection is stable",
        "Check that the connected service is accessible",
        "Wait a few minutes and refresh the application",
      ],
    },
    {
      icon: UserCircle,
      title: "Account Issues",
      description: "For account-related problems such as login issues or account recovery, please contact us directly.",
      items: [],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <motion.div className="text-center mb-16" {...fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Help Center
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
              Support
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              We're here to help you get the most out of SuperMem
            </p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div className="grid md:grid-cols-2 gap-6 mb-16" {...fadeIn}>
            <div className="rounded-xl border border-border bg-card p-8 shadow-card hover:-translate-y-px transition-all duration-150">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">For general inquiries and technical support</p>
              <a
                href="mailto:business@supermem.io"
                className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-150"
              >
                business@supermem.io
              </a>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 shadow-card hover:-translate-y-px transition-all duration-150">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Business Inquiries</h3>
              <p className="text-muted-foreground mb-4">For partnerships and business-related questions</p>
              <a
                href="mailto:business@supermem.io"
                className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-150"
              >
                business@supermem.io
              </a>
            </div>
          </motion.div>

          {/* Common Issues */}
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Common <span className="text-accent">Issues</span>
            </h2>

            <div className="space-y-6 mb-16">
              {commonIssues.map((issue, index) => {
                const Icon = issue.icon;
                return (
                  <motion.div
                    key={issue.title}
                    className="rounded-xl border border-border bg-card p-8 shadow-card"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{issue.title}</h3>
                        <p className="text-muted-foreground mb-3">{issue.description}</p>
                        {issue.items.length > 0 && (
                          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                            {issue.items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                        {issue.items.length === 0 && (
                          <a
                            href="mailto:business@supermem.io"
                            className="text-foreground font-medium hover:text-accent transition-colors duration-150"
                          >
                            business@supermem.io
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Feature Requests */}
          <motion.div
            className="rounded-xl border border-border bg-card p-8 shadow-card mb-16"
            {...fadeIn}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Feature Requests</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We value your feedback! If you have suggestions for new features or improvements, please send them to{" "}
                  <a
                    href="mailto:business@supermem.io"
                    className="text-foreground font-medium hover:text-accent transition-colors duration-150"
                  >
                    business@supermem.io
                  </a>
                  . We review all submissions and use them to guide our product development.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Support Hours */}
          <motion.div
            className="rounded-xl border border-border bg-muted/50 p-8 text-center"
            {...fadeIn}
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Support Hours</h3>
            <p className="text-muted-foreground mb-2">
              Our team typically responds within 24-48 hours during business days.
            </p>
            <p className="text-muted-foreground">
              For urgent issues, please include <strong className="text-foreground">"URGENT"</strong> in your email subject line.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
