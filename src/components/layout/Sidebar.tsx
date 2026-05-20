"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Sample Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export function Sidebar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className="fixed left-0 top-0 w-[var(--sidebar-w)] h-screen bg-text flex flex-col justify-between p-12 z-[100] max-[900px]:w-full max-[900px]:h-auto max-[900px]:flex-row max-[900px]:p-[1rem_1.5rem] max-[900px]:sticky max-[900px]:top-0"
      aria-label="Primary navigation"
    >
      {/* Logo */}
      <div className="font-serif font-bold text-bg leading-tight select-none text-[1rem] tracking-[0.01em]">
        Maygift
        <br className="max-[900px]:hidden" /> Glory
        <span className="block font-sans font-light text-[0.68rem] text-rose tracking-[0.12em] uppercase mt-1 max-[900px]:hidden">
          Executive VA
        </span>
      </div>

      {/* Nav List */}
      <ul className="flex flex-col gap-[0.2rem] max-[900px]:flex-row max-[900px]:gap-0 list-none">
        {navItems.map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`flex items-center gap-3 text-[0.78rem] font-medium tracking-[0.1em] uppercase py-2.5 max-[900px]:py-[0.4rem] max-[900px]:px-[0.5rem] max-[900px]:text-[0.65rem] transition-colors duration-250 w-full text-left cursor-pointer border-none bg-transparent outline-none
                ${active === id ? "text-bg" : "text-[rgba(242,226,226,0.45)] hover:text-bg"}
              `}
            >
              <span
                className={`h-px bg-rose transition-all duration-300 flex-shrink-0 max-[900px]:hidden ${
                  active === id ? "w-5" : "w-0"
                }`}
              />
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Socials / Contact */}
      <div className="flex flex-col gap-2 max-[900px]:hidden">
        <a
          href="mailto:maygiftglory64@gmail.com"
          className="text-[0.68rem] font-medium tracking-[0.08em] uppercase text-[rgba(242,226,226,0.35)] hover:text-rose transition-colors duration-250"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/maygift-glory-a113973b5/?skipRedirect=true"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.68rem] font-medium tracking-[0.08em] uppercase text-[rgba(242,226,226,0.35)] hover:text-rose transition-colors duration-250"
        >
          LinkedIn
        </a>
        <a
          href="https://calendly.com/maygiftgloryvirtualassistance"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.68rem] font-medium tracking-[0.08em] uppercase text-[rgba(242,226,226,0.35)] hover:text-rose transition-colors duration-250"
        >
          Calendly
        </a>
      </div>
    </nav>
  );
}
