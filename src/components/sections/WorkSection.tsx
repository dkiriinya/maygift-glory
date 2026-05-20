"use client";

import { useState, useMemo } from "react";
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

  const featured = filtered.find((i) => i.featured) ?? filtered[0];
  const rest = filtered.filter((i) => i.id !== featured?.id);

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
        {featured && (
          <WorkCard
            item={featured}
            className="work-grid__item--feature min-h-[320px]"
            onClick={setLightboxItem}
          />
        )}
        {rest.slice(0, 3).map((item, i) => (
          <WorkCard
            key={item.id}
            item={item}
            className="min-h-[180px]"
            onClick={setLightboxItem}
            style={{ transitionDelay: `${(i + 1) * 60}ms` }}
          />
        ))}
        {rest.slice(3, 4).map((item) => (
          <WorkCard key={item.id} item={item} className="work-grid__item--strip" onClick={setLightboxItem} />
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
