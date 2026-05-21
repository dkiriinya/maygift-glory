import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://maygiftglory.com";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Maygift Glory — Executive Virtual Assistant",
  description: "Premium Virtual & Executive Assistant services for founders, CEOs, and busy leaders. Calendar, inbox, travel, administrative, and social media management to reclaim 10+ hours weekly.",
  keywords: [
    "Executive Virtual Assistant",
    "Virtual Assistant",
    "Administrative Assistant",
    "Calendar Management",
    "Inbox Management",
    "SMM VA",
    "Social Media Management",
    "Executive Support",
    "Operations Management",
    "Maygift Glory",
    "Freelance Virtual Assistant",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Maygift Glory — Executive Virtual Assistant",
    description: "Premium Virtual & Executive Assistant services. Streamline calendar, inbox, and operations to reclaim 10+ hours weekly.",
    url: appUrl,
    siteName: "Maygift Glory",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph.webp",
        width: 1200,
        height: 630,
        alt: "Maygift Glory — Executive Virtual Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maygift Glory — Executive Virtual Assistant",
    description: "Premium Virtual & Executive Assistant services. Streamline operations & reclaim 10+ hours weekly.",
    images: ["/opengraph.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full font-sans bg-bg text-text selection:bg-rose selection:text-white">
        {children}
      </body>
    </html>
  );
}
