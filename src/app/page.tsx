import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <ProgressBar />
      <Sidebar />
      <main className="main-canvas" id="mainCanvas">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
