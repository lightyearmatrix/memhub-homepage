import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";

import usecaseResearch from "@/assets/usecase-research.webp";
import usecaseGrowth from "@/assets/usecase-growth.webp";
import usecaseContent from "@/assets/usecase-content.webp";
import usecaseFundraising from "@/assets/usecase-fundraising.webp";
import usecaseAccounting from "@/assets/usecase-accounting.webp";

const useCases = [
  { image: usecaseResearch, title: "Research Agent", subtitle: "Trained by Top Consultants", description: "Deep market research, competitor analysis, and strategic insights — powered by how the best consultants think.", keyword: "Research" },
  { image: usecaseGrowth, title: "Growth Agent", subtitle: "Trained by Top CMOs", description: "Data-driven growth strategies, campaign optimization, and channel analysis from elite marketing minds.", keyword: "Growth" },
  { image: usecaseContent, title: "Content Agent", subtitle: "Trained by Best Storytellers", description: "Compelling narratives, brand voice consistency, and content strategy guided by master storytellers.", keyword: "Content" },
  { image: usecaseFundraising, title: "Fundraising Agent", subtitle: "Trained by Top Investors", description: "Pitch optimization, investor outreach, and due diligence preparation from seasoned investors.", keyword: "Fundraising" },
  { image: usecaseAccounting, title: "Accounting / Tax Agent", subtitle: "Trained by Top CFOs", description: "Financial planning, tax optimization, and compliance — informed by elite CFO judgment.", keyword: "Accounting" },
];

const UseCasesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth / 3;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Use <HandDrawnUnderline>Cases</HandDrawnUnderline>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Expert-trained AI agents for every function of your business.
          </p>
        </motion.div>

        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-border bg-card shadow-card flex items-center justify-center transition-opacity duration-150 disabled:opacity-0"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {useCases.map((uc, index) => (
              <motion.div
                key={uc.title}
                className="min-w-[320px] max-w-[320px] flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card hover:-translate-y-px transition-all duration-150 h-full flex flex-col">
                  <div className="p-4">
                    <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/30 aspect-[3/2]">
                      <img src={uc.image} alt={uc.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="px-5 pb-6 pt-2 flex-1">
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      <HandDrawnUnderline>{uc.keyword}</HandDrawnUnderline> Agent
                    </h3>
                    <p className="text-sm font-medium text-secondary mb-2">{uc.subtitle}</p>
                    <p className="text-base text-muted-foreground leading-relaxed">{uc.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-border bg-card shadow-card flex items-center justify-center transition-opacity duration-150 disabled:opacity-0"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
