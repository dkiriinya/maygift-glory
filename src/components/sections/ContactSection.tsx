import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="px-[6vw] bg-text flex flex-col justify-center items-center min-h-[85vh] py-24 text-center"
    >
      <div className="max-w-3xl w-full flex flex-col items-center">
        <RevealWrapper>
          <Label className="text-rose mb-3">Get In Touch</Label>
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <h2
            className="font-serif font-bold text-bg leading-[1.15] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
          >
            Let&apos;s build something <em className="text-rose italic">seamless</em> together.
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={150}>
          <p className="font-sans text-base text-[rgba(242,226,226,0.7)] max-w-lg mb-12 leading-relaxed">
            Ready to work smarter? Skip the back-and-forth email chains and schedule a direct consultation call to see how we can align.
          </p>
        </RevealWrapper>

        {/* Focused CTA Card */}
        <RevealWrapper delay={200} className="w-full max-w-xl">
          <div className="p-8 md:p-10 bg-[rgba(86,132,166,0.08)] border border-[rgba(86,132,166,0.2)] rounded-xl flex flex-col items-center gap-6 backdrop-blur-sm shadow-xl">
            <p className="font-serif text-[1.25rem] font-light italic text-rose/95 leading-relaxed text-center">
              &ldquo;Let&apos;s streamline your business. Ready to reclaim your time?&rdquo;
            </p>

            <Button
              href="https://calendly.com/maygiftgloryvirtualassistance"
              external
              variant="primary"
              className="mt-2 scale-105 hover:scale-110 transition-transform duration-300 px-8 py-4 text-sm font-semibold tracking-wide"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 mr-2 inline-block align-text-bottom"
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

        {/* Quick Contact Links */}
        <RevealWrapper delay={250} className="w-full max-w-xl">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12 border-t border-[rgba(242,226,226,0.1)] pt-8 w-full">
            <a
              href="mailto:maygiftglory64@gmail.com"
              className="flex items-center gap-2.5 text-[0.88rem] text-[rgba(242,226,226,0.6)] hover:text-rose transition-colors duration-200 font-sans"
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
            <a
              href="https://www.linkedin.com/in/maygift-glory-a113973b5/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[0.88rem] text-[rgba(242,226,226,0.6)] hover:text-rose transition-colors duration-200 font-sans"
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
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
