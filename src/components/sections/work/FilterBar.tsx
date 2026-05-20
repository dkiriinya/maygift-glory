"use client";

import { PortfolioCategory } from "@/types/portfolio";

type Category = "All" | PortfolioCategory;
const categories: Category[] = ["All", "Executive VA", "Admin & Operations", "Creative & Social"];

export function FilterBar({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 text-[0.7rem] font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer rounded-none border
            ${
              active === cat
                ? "bg-text text-bg border-text"
                : "bg-transparent text-text/60 border-text/20 hover:border-rose hover:text-text"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
