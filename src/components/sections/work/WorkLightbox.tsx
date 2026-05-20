"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { PortfolioItem } from "@/types/portfolio";
import { getImageUrl, getVideoUrl } from "@/lib/cloudinary";

type Props = {
  item: PortfolioItem;
  items: PortfolioItem[]; // current filtered set for prev/next
  onClose: () => void;
  onNavigate: (item: PortfolioItem) => void;
};

export function WorkLightbox({ item, items, onClose, onNavigate }: Props) {
  const currentIndex = items.findIndex((i) => i.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(items[currentIndex - 1]);
      if (e.key === "ArrowRight" && hasNext) onNavigate(items[currentIndex + 1]);
    },
    [currentIndex, items, hasPrev, hasNext, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{ background: "rgba(58,42,42,.95)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center gap-6 max-w-[90vw] w-full px-4"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "lightboxIn .2s ease forwards" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-bg/60 hover:text-bg text-2xl transition-colors cursor-pointer border-none bg-transparent outline-none p-2"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Media */}
        <div className="w-full flex justify-center" style={{ maxHeight: "75vh" }}>
          {item.type === "image" ? (
            <div className="relative w-full" style={{ maxHeight: "75vh", height: "65vh", aspectRatio: item.aspectRatio }}>
              <Image
                src={getImageUrl(item.cloudinaryId, 1600, 1200)}
                alt={item.title}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          ) : (
            <video
              src={getVideoUrl(item.cloudinaryId)}
              controls
              autoPlay
              className="w-full max-h-[65vh] object-contain rounded bg-black"
            />
          )}
        </div>

        {/* Caption */}
        <div className="text-center max-w-xl">
          <span className="inline-block bg-accent text-white text-[0.65rem] font-semibold tracking-widest uppercase px-2.5 py-1 mb-3">
            {item.category}
          </span>
          <h3 className="font-serif font-bold text-bg text-xl mb-2">{item.title}</h3>
          {item.description && (
            <p className="font-sans text-bg/60 text-sm leading-relaxed">{item.description}</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-6">
          <button
            onClick={() => hasPrev && onNavigate(items[currentIndex - 1])}
            disabled={!hasPrev}
            className="text-bg/40 hover:text-bg text-2xl transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer border-none bg-transparent outline-none p-2"
          >
            ←
          </button>
          <span className="text-bg/30 text-sm font-sans self-center">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            onClick={() => hasNext && onNavigate(items[currentIndex + 1])}
            disabled={!hasNext}
            className="text-bg/40 hover:text-bg text-2xl transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer border-none bg-transparent outline-none p-2"
          >
            →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
