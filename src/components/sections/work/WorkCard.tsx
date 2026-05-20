"use client";

import { useRef } from "react";
import Image from "next/image";
import { PortfolioItem } from "@/types/portfolio";
import { getImageUrl, getVideoPosterUrl, getVideoUrl } from "@/lib/cloudinary";

type Props = {
  item: PortfolioItem;
  className?: string;
  onClick: (item: PortfolioItem) => void;
  style?: React.CSSProperties;
};

export function WorkCard({ item, className = "", onClick, style }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (item.type === "video") {
      videoRef.current?.play().catch((err) => console.log("Play failed:", err));
    }
  };

  const handleMouseLeave = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group rounded-lg bg-bg/10 w-full transition-all duration-300 hover:shadow-lg ${className}`}
      onClick={() => onClick(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        aspectRatio: item.aspectRatio || "16/9",
      }}
    >
      {item.type === "image" ? (
        <Image
          src={getImageUrl(item.cloudinaryId, 800, 600)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <>
          <Image
            src={getVideoPosterUrl(item.cloudinaryId, 800, 600)}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <video
            ref={videoRef}
            src={getVideoUrl(item.cloudinaryId)}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </>
      )}

      {/* Play icon badge for video */}
      {item.type === "video" && (
        <div className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent">
          <PlayIcon size={12} className="text-white ml-0.5" />
        </div>
      )}

      {/* Gradient hover caption overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span className="text-[0.6rem] font-semibold tracking-widest uppercase text-accent mb-1">
          {item.category}
        </span>
        <h4 className="font-serif font-bold text-white text-xs leading-snug">
          {item.title}
        </h4>
        {item.type === "video" && item.duration && (
          <span className="text-[0.55rem] text-white/60 mt-1 flex items-center gap-1">
            <PlayIcon size={8} /> Video • {item.duration}
          </span>
        )}
      </div>
    </div>
  );
}

function PlayIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}
