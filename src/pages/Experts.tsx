import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import KeyDifferentiationsSection from "@/components/KeyDifferentiationsSection";
import EvolutionSection from "@/components/EvolutionSection";
import ApplySection from "@/components/ApplySection";
import ExpertWaitlistModal from "@/components/ExpertWaitlistModal";
import Footer from "@/components/Footer";

const Experts = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#e0e5ec' }}>
      {/* Industrial noise texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
      
      <div className="relative z-10">
        <Navigation />
        
        <main>
          <HeroSection 
            variant="expert" 
            onPrimaryClick={() => setIsWaitlistOpen(true)} 
          />
          <HowItWorksSection variant="expert" />
          <ProductShowcaseSection variant="expert" />
          <KeyDifferentiationsSection />
          <EvolutionSection variant="expert" />
          <ApplySection 
            variant="expert" 
            onApply={() => setIsWaitlistOpen(true)} 
          />
        </main>

        <Footer />
      </div>

      <ExpertWaitlistModal 
        open={isWaitlistOpen} 
        onOpenChange={setIsWaitlistOpen} 
      />
    </div>
  );
};

export default Experts;
