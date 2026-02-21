import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Success = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const isExpert = type === "expert";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Success icon */}
            <motion.div
              className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {isExpert ? "Application Received!" : "You're on the Waitlist!"}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {isExpert
                ? "Thank you for applying to become a SuperMem expert. We'll review your profile and reach out with next steps."
                : "Thank you for joining the SuperMem beta waitlist. We'll be in touch soon with early access details."}
            </motion.p>

            {/* What's next */}
            <motion.div
              className="rounded-xl border border-border bg-card p-8 shadow-card mb-10 text-left"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">What happens next?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-semibold text-xs flex-shrink-0 mt-0.5">1</span>
                  <p className="text-muted-foreground">
                    {isExpert
                      ? "Our team reviews your expertise and background"
                      : "Our team reviews your application and use case"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-semibold text-xs flex-shrink-0 mt-0.5">2</span>
                  <p className="text-muted-foreground">
                    {isExpert
                      ? "We'll schedule a brief call to understand your domain"
                      : "We'll send you an invite to early access when your spot opens"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-semibold text-xs flex-shrink-0 mt-0.5">3</span>
                  <p className="text-muted-foreground">
                    {isExpert
                      ? "Start building your expert agent and onboarding clients"
                      : "Get matched with expert agents tailored to your needs"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 hover:-translate-y-px shadow-elevated"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:k@supermem.io"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 transition-all duration-150"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;
