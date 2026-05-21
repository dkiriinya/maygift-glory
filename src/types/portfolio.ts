// src/types/portfolio.ts

export type MediaType = "image" | "video";

export type PortfolioCategory =
  | "Calendar Management"
  | "Inbox Management"
  | "Travel Management"
  | "Expense Report"
  | "Social Media Management";

export type PortfolioItem = {
  id: string; // Cloudinary public_id
  type: MediaType;
  category: PortfolioCategory;
  title: string; // e.g. "Multi-timezone Calendar Setup"
  description?: string; // 1–2 sentence caption shown in lightbox
  cloudinaryId: string; // Cloudinary public_id, used to build URLs
  aspectRatio: "16/9" | "4/3" | "1/1" | "9/16"; // drives grid sizing
  featured?: boolean; // if true, item gets the large feature slot
  duration?: string; // for videos only, e.g. "1:24"
};
