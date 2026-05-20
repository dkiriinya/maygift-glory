"use client";

import { useState, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Label } from "@/components/ui/Label";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { FilterBar } from "./work/FilterBar";
import { WorkCard } from "./work/WorkCard";
import { WorkLightbox } from "./work/WorkLightbox";
import { portfolioItems } from "./work/portfolioData";
import { PortfolioItem, PortfolioCategory } from "@/types/portfolio";

type Filter = "All" | PortfolioCategory;

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? portfolioItems
        : portfolioItems.filter((i) => i.category === activeFilter),
    [activeFilter]
  );

  useGSAP(() => {
    if (filtered.length > 0) {
      gsap.fromTo(
        ".work-grid-item",
        { opacity: 0, scale: 0.95, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.03,
          overwrite: "auto",
        }
      );
    }
  }, [filtered]);



  return (
    <section id="work" className="min-h-screen bg-card-bg flex flex-col justify-center px-[6vw] py-16 gap-10">
      {/* Header */}
      <div className="flex justify-between items-end w-full">
        <RevealWrapper>
          <Label>Portfolio</Label>
          <h2
            className="font-serif font-bold text-text leading-[1.1] tracking-tight mt-2"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.6rem)" }}
          >
            Sample <em className="italic text-accent">work</em>
            <br />& showcase.
          </h2>
        </RevealWrapper>
        <RevealWrapper delay={100}>
          <p className="font-sans text-sm text-text/60 max-w-xs text-right leading-relaxed hidden md:block">
            Screenshots, screen recordings &amp; live proof of work.
          </p>
        </RevealWrapper>
      </div>

      {/* Filter bar */}
      <RevealWrapper delay={150}>
        <FilterBar active={activeFilter} onChange={setActiveFilter} />
      </RevealWrapper>

      {/* Grid */}
      <div className="work-grid w-full">
        {filtered.map((item, idx) => (
          <WorkCard
            key={item.id}
            item={item}
            className="work-grid-item"
            onClick={setLightboxItem}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <WorkLightbox
          item={lightboxItem}
          items={filtered}
          onClose={() => setLightboxItem(null)}
          onNavigate={setLightboxItem}
        />
      )}
    </section>
  );
}
