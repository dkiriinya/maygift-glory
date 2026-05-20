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
  const [isOpen, setIsOpen] = useState(false);

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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
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
    <>
      {/* Desktop Navigation Side Bar */}
      <nav
        className="fixed left-0 top-0 w-[var(--sidebar-w)] h-screen bg-text flex flex-col justify-between p-12 z-[100] max-[900px]:hidden"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <div className="font-serif font-bold text-bg leading-tight select-none text-[1rem] tracking-[0.01em]">
          Maygift
          <br /> Glory
          <span className="block font-sans font-light text-[0.68rem] text-rose tracking-[0.12em] uppercase mt-1">
            Executive VA
          </span>
        </div>

        {/* Nav List */}
        <ul className="flex flex-col gap-[0.2rem] list-none">
          {navItems.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-3 text-[0.78rem] font-medium tracking-[0.1em] uppercase py-2.5 transition-colors duration-250 w-full text-left cursor-pointer border-none bg-transparent outline-none
                  ${active === id ? "text-bg" : "text-[rgba(242,226,226,0.45)] hover:text-bg"}
                `}
              >
                <span
                  className={`h-px bg-rose transition-all duration-300 flex-shrink-0 ${
                    active === id ? "w-5" : "w-0"
                  }`}
                />
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Socials / Contact */}
        <div className="flex flex-col gap-2">
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

      {/* Mobile Top Bar */}
      <header className="sticky top-0 left-0 right-0 h-16 bg-text border-b border-white/5 flex items-center justify-between px-6 z-[100] min-[901px]:hidden shadow-sm">
        {/* Logo */}
        <div className="font-serif font-bold text-bg leading-tight select-none text-[0.95rem]">
          Maygift Glory
          <span className="block font-sans font-light text-[0.55rem] text-rose tracking-[0.1em] uppercase">
            Executive VA
          </span>
        </div>

        {/* Hamburger menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-bg hover:text-rose transition-colors p-2 -mr-2 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Sliding Drawer & Overlay */}
      <div
        className={`fixed inset-0 z-[99] min-[901px]:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Semi-transparent backdrop overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Drawer container (slides from right) */}
        <nav
          className={`absolute top-0 right-0 bottom-0 w-[75vw] max-w-[300px] bg-text shadow-2xl border-l border-white/5 flex flex-col justify-between p-8 pt-24 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          {/* Vertical Menu Links */}
          <ul className="flex flex-col gap-4 list-none">
            {navItems.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`text-[1.1rem] font-serif font-bold tracking-[0.05em] py-2 transition-colors duration-250 w-full text-left cursor-pointer border-none bg-transparent outline-none
                    ${active === id ? "text-rose" : "text-bg/80 hover:text-rose"}
                  `}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Socials / Contact Links at bottom of drawer */}
          <div className="flex flex-col gap-3.5 border-t border-white/10 pt-6">
            <a
              href="mailto:maygiftglory64@gmail.com"
              className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-bg/60 hover:text-rose transition-colors duration-250 flex items-center gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-4 h-4 text-rose"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/maygift-glory-a113973b5/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-bg/60 hover:text-rose transition-colors duration-250 flex items-center gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-4 h-4 text-rose"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://calendly.com/maygiftgloryvirtualassistance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-bg/60 hover:text-rose transition-colors duration-250 flex items-center gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-4 h-4 text-rose"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Calendly
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
