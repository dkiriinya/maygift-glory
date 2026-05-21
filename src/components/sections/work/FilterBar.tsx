"use client";

import { useState, useRef, useEffect } from "react";
import { PortfolioCategory } from "@/types/portfolio";

type Category = "All" | PortfolioCategory;

const categories: Category[] = [
  "All",
  "Calendar Management",
  "Inbox Management",
  "Travel Management",
  "Expense Report",
  "Social Media Management"
];

export function FilterBar({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cat: Category) => {
    onChange(cat);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="w-full relative z-30">
      {/* Mobile Dropdown View */}
      <div className="md:hidden w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-[0.75rem] font-semibold tracking-widest uppercase bg-transparent text-text border border-text/20 hover:border-rose hover:text-text transition-all duration-200 cursor-pointer"
        >
          <span>{active === "All" ? "Filter by Category" : active}</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 text-text/60 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-text/10 shadow-2xl z-50 py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelect(cat)}
                className={`w-full text-left px-5 py-3 text-[0.7rem] font-semibold tracking-widest uppercase transition-all duration-150 cursor-pointer block
                  ${
                    active === cat
                      ? "bg-text text-bg"
                      : "text-text/70 hover:bg-text/5 hover:text-text"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Buttons View */}
      <div className="hidden md:flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 py-1.5 text-[0.7rem] font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer rounded-none border shrink-0
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
    </div>
  );
}
