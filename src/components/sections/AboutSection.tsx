import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

export function AboutSection() {
  return (
    <section
      id="about"
      className="px-[6vw] bg-text flex-col justify-center items-start gap-0 min-h-screen py-24 flex"
    >
      <div className="grid grid-cols-[1.1fr_1fr] max-[1024px]:grid-cols-1 gap-[6vw] w-full items-start">
        <div>
          <RevealWrapper>
            <Label className="text-rose">About Maygift</Label>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <h2 className="font-serif text-[clamp(2.2rem,3.8vw,3.6rem)] font-bold leading-[1.15] text-bg mb-[1.8rem] tracking-[-0.02em]">
              Hi there! I&apos;m Maygift 😊
            </h2>
          </RevealWrapper>
          <RevealWrapper delay={200}>
            <p className="font-sans text-[1.05rem] font-light leading-[1.8] text-[rgba(242,226,226,0.75)] mb-[1.5rem]">
              I&apos;m a Virtual & Executive Assistant with vast experience in supporting CEOs, founders, and high-level professionals who need more than just &ldquo;assistance&rdquo;&mdash;they need someone who can think, move, and execute like an extension of themselves.
            </p>
            <p className="font-sans text-[1.05rem] font-light leading-[1.8] text-[rgba(242,226,226,0.75)] mb-[2rem]">
              My approach is simple: I go above and beyond until everything feels effortless on your side.
            </p>
            <div className="border-t border-[rgba(242,226,226,0.15)] pt-6 mb-[2.5rem]">
              <p className="font-serif text-[1.2rem] font-medium text-rose tracking-wide leading-[1.5] mb-2">
                Ready to work smarter, not harder?
              </p>
              <p className="font-sans text-[1rem] font-light text-[rgba(242,226,226,0.7)]">
                Let&apos;s connect! Let&apos;s save you more hours this week.
              </p>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={300}>
            <Button href="https://calendly.com/maygiftgloryvirtualassistance" external variant="primary">
              Work With Me
            </Button>
          </RevealWrapper>
        </div>

        <div className="flex flex-col gap-8 w-full">
          <RevealWrapper delay={200}>
            <div
              className="border-l-[3px] border-rose py-8 pl-10 pr-8 bg-[rgba(209,152,168,0.07)] relative
                before:content-['§'] before:absolute before:top-6 before:right-6 before:font-serif before:text-[3rem] before:text-rose before:opacity-15 before:leading-none"
            >
              <p className="font-serif text-[1.1rem] font-bold text-rose tracking-[0.05em] uppercase mb-4">
                The Legal Advantage
              </p>
              <p className="font-sans text-[0.95rem] leading-[1.8] text-[rgba(242,226,226,0.75)] font-light">
                With a background in law school, I bring a strong sense of discipline, precision, and critical thinking into everything I do. I&apos;m trained to analyze details deeply, spot gaps quickly, and ensure everything is airtight, whether it&apos;s an inbox, a schedule, or an entire workflow.
              </p>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={300}>
            <div className="p-8 bg-[rgba(242,226,226,0.03)] border border-[rgba(242,226,226,0.08)]">
              <h3 className="font-serif text-[1.2rem] font-bold text-bg mb-6 tracking-wide flex items-center gap-2">
                <span className="text-rose">✨</span> What I handle seamlessly:
              </h3>
              <ul className="flex flex-col gap-5">
                {[
                  {
                    title: "Inbox & calendar management",
                    desc: "structured, prioritized, always under control",
                  },
                  {
                    title: "Complex travel planning & coordination",
                    desc: "no last-minute chaos left unmanaged",
                  },
                  {
                    title: "Research, documentation & admin support",
                    desc: "with accuracy and depth",
                  },
                  {
                    title: "Project coordination",
                    desc: "keeps everything moving—even when things shift",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-rose mt-1 select-none text-[0.9rem] flex-shrink-0">
                      •
                    </span>
                    <p className="font-sans text-[0.95rem] leading-[1.5] text-[rgba(242,226,226,0.7)] font-light">
                      <strong className="text-bg font-semibold font-serif block sm:inline mr-1">
                        {item.title}
                      </strong>
                      <span className="opacity-90">({item.desc})</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
