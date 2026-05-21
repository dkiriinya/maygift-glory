import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import Image from "next/image";

export default function Home() {
  return (
    <SmoothScroll>
      <ProgressBar />
      <Sidebar />
      <main className="main-canvas" id="mainCanvas">
        {/* Sticky background wrapper for Hero & About sections on mobile */}
        <div className="relative">
          {/* Mobile Sticky Background (visible only on screens <= 900px) */}
          <div className="sticky top-0 left-0 w-full h-screen z-0 min-[901px]:hidden pointer-events-none overflow-hidden bg-[#261A1A]">
            <Image
              src="https://res.cloudinary.com/dm8lfxxwl/image/upload/v1779307936/maygift-glory/WhatsApp_Image_2026-05-20_at_22.58.25_fg3gyh.jpg"
              alt="Maygift Glory, Executive Virtual Assistant"
              fill
              priority
              className="object-cover object-top opacity-55"
              sizes="100vw"
            />
            {/* Soft, dark gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#261A1A]/30 via-[#261A1A]/70 to-[#261A1A]/90 backdrop-blur-[0.5px]" />
          </div>

          {/* Section contents wrapper (pulled up on mobile to overlay the sticky background) */}
          <div className="relative z-10 max-[900px]:-mt-[100vh]">
            <HeroSection />
            <AboutSection />
          </div>
        </div>

        <ServicesSection />
        <WorkSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

