"use client";

import { useEffect, useState } from "react";

export function ProgressBar() {
  const [scaleX, setScaleX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setScaleX(pct);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 right-0 h-[2px] bg-rose origin-left z-[200] transition-transform duration-100 ease-linear"
      style={{
        transform: `scaleX(${scaleX})`,
        left: "var(--sidebar-w)",
      }}
    />
  );
}
