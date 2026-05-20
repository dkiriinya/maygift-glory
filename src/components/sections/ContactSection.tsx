import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="px-[6vw] bg-text flex-col justify-center items-start gap-0 min-h-screen flex"
    >
      <div className="grid grid-cols-[1.1fr_1fr] max-[900px]:grid-cols-1 gap-[6vw] w-full items-start">
        <div>
          <RevealWrapper>
            <Label className="text-rose">Get In Touch</Label>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3.6rem)] font-bold text-bg leading-[1.1] tracking-[-0.02em] mb-8">
              Let&apos;s build something <em className="italic text-rose not-italic">seamless</em>{" "}
              together.
            </h2>
          </RevealWrapper>

          <div className="flex flex-col gap-4 mb-10">
            <RevealWrapper delay={200}>
              <a
                href="mailto:maygiftglory64@gmail.com"
                className="flex items-center gap-3 text-[0.88rem] text-[rgba(242,226,226,0.6)] hover:text-rose transition-colors duration-250 font-sans"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-[18px] h-[18px] flex-shrink-0"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                maygiftglory64@gmail.com
              </a>
            </RevealWrapper>
            <RevealWrapper delay={250}>
              <a
                href="https://www.linkedin.com/in/maygift-glory-a113973b5/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[0.88rem] text-[rgba(242,226,226,0.6)] hover:text-rose transition-colors duration-250 font-sans"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-[18px] h-[18px] flex-shrink-0"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                Connect on LinkedIn
              </a>
            </RevealWrapper>
          </div>

          <RevealWrapper delay={300}>
            <div className="mt-10 p-[2rem_2.5rem] bg-[rgba(86,132,166,0.12)] border border-[rgba(86,132,166,0.3)] flex flex-col gap-4">
              <p className="font-serif text-[1.1rem] font-light italic text-bg leading-[1.5]">
                &ldquo;Let&apos;s streamline your business. Ready to reclaim your time?&rdquo;
              </p>
              <Button href="https://calendly.com/maygiftgloryvirtualassistance" external variant="primary" className="self-start">
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
                Book a Calendly Call
              </Button>
            </div>
          </RevealWrapper>
        </div>

        <div>
          <RevealWrapper delay={200}>
            <ContactForm />
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
