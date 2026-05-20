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
      className={`relative overflow-hidden cursor-pointer group bg-card-bg ${className}`}
      onClick={() => onClick(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {/* Media */}
      {item.type === "image" ? (
        <Image
          src={getImageUrl(item.cloudinaryId, 800, 600)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <>
          <Image
            src={getVideoPosterUrl(item.cloudinaryId, 800, 600)}
            alt={item.title}
            fill
            className="object-cover"
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Category tag */}
      <span className="absolute top-3 left-3 z-10 bg-accent text-white text-[0.65rem] font-semibold tracking-widest uppercase px-2.5 py-1">
        {item.category}
      </span>

      {/* Video duration badge */}
      {item.type === "video" && item.duration && (
        <span className="absolute top-3 right-3 z-10 bg-text/70 text-white text-[0.65rem] font-medium px-2 py-1 flex items-center gap-1">
          <PlayIcon size={10} /> {item.duration}
        </span>
      )}

      {/* Play button — video only */}
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full border border-white/50 bg-white/15 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <PlayIcon size={20} className="text-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Title — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-spring">
        <p className="font-serif font-bold text-white text-sm leading-snug">{item.title}</p>
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
