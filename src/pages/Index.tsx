import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import UseCasesSection from "@/components/UseCasesSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import KeyDifferentiationsSection from "@/components/KeyDifferentiationsSection";
import WhoBenefitsSection from "@/components/WhoBenefitsSection";
import EvolutionSection from "@/components/EvolutionSection";
import ApplySection from "@/components/ApplySection";
import ClientWaitlistModal from "@/components/ClientWaitlistModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Open modal if navigated with ?join=true
    if (searchParams.get("join") === "true") {
      setIsWaitlistOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    // Listen for custom event from Navigation button
    const handler = () => setIsWaitlistOpen(true);
    window.addEventListener("open-waitlist", handler);
    return () => window.removeEventListener("open-waitlist", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <HeroSection
          variant="client"
          onPrimaryClick={() => setIsWaitlistOpen(true)}
        />
        <HowItWorksSection variant="client" />
        <UseCasesSection />
        <ProductShowcaseSection variant="client" />
        <KeyDifferentiationsSection />
        <WhoBenefitsSection />
        <EvolutionSection variant="client" />
        <ApplySection
          variant="client"
          onApply={() => setIsWaitlistOpen(true)}
        />
      </main>

      <Footer />

      <ClientWaitlistModal
        open={isWaitlistOpen}
        onOpenChange={setIsWaitlistOpen}
      />
    </div>
  );
};

export default Index;
