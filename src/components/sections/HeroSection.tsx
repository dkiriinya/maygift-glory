import Image from "next/image";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

export function HeroSection() {
  return (
    <section
      id="home"
      className="px-[6vw] gap-[4vw] justify-between items-center bg-bg min-h-screen flex relative overflow-hidden"
    >
      <div className="max-w-[620px] flex-1">
        <RevealWrapper>
          <Label>Virtual & Executive Assistant</Label>
        </RevealWrapper>
        <RevealWrapper delay={100}>
          <h1 className="font-serif text-[clamp(2.6rem,5vw,5rem)] font-black leading-[1.05] text-text tracking-[-0.02em] mb-8">
            I run the backend of leaders who don&apos;t have time to{" "}
            <em className="italic text-accent not-italic">run it themselves.</em>
          </h1>
        </RevealWrapper>
        <RevealWrapper delay={200}>
          <p className="font-sans text-[1.05rem] font-light leading-[1.7] text-text opacity-75 max-w-[440px] mb-12">
            Ensuring a seamless flow of operations so you can reclaim 10+ hours every single week.
          </p>
        </RevealWrapper>
        <RevealWrapper delay={300}>
          <div className="flex gap-4 flex-wrap">
            <Button href="https://calendly.com/maygiftgloryvirtualassistance" external variant="primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book a Discovery Call
            </Button>
            <Button href="#about" variant="outline">
              Meet Maygift
            </Button>
          </div>
        </RevealWrapper>
      </div>

      <div className="flex-[0_0_380px] relative self-stretch flex items-center max-[900px]:hidden">
        <RevealWrapper delay={200} className="relative w-[320px] h-[420px]">
          <div className="absolute inset-[18px_-18px_-18px_18px] bg-rose opacity-60 z-0" />
          <div className="relative z-10 w-full h-full bg-card-bg overflow-hidden">
            <Image
              src="/images/maygift-headshot.png"
              alt="Maygift Glory, Executive Virtual Assistant"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 900px) 0px, 320px"
            />
          </div>
        </RevealWrapper>
        <div className="absolute top-1/2 -right-[4vw] w-px h-[200px] bg-gradient-to-b from-transparent via-rose to-transparent -translate-y-1/2" />
      </div>
    </section>
  );
}
