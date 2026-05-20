import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

export function AboutSection() {
  return (
    <section
      id="about"
      className="px-[6vw] bg-text flex-col justify-center items-start gap-0 min-h-screen flex"
    >
      <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-[6vw] w-full items-center">
        <div>
          <RevealWrapper>
            <Label className="text-rose">About Maygift</Label>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3.6rem)] font-bold leading-[1.1] text-bg mb-[1.8rem] tracking-[-0.02em]">
              Vibrant energy.
              <br />
              <em className="italic text-rose not-italic">Proactive</em> precision.
            </h2>
          </RevealWrapper>
          <RevealWrapper delay={200}>
            <p className="font-sans text-[1rem] font-light leading-[1.8] text-[rgba(242,226,226,0.7)] mb-[2.5rem]">
              Hi, I&apos;m Maygift. I bring a genuine, happy, and vibrant energy to my work,
              combined with an intense, proactive work ethic. I don&apos;t just check off tasks — I
              anticipate, strategize, and deliver with care.
            </p>
          </RevealWrapper>
          <RevealWrapper delay={300}>
            <Button href="https://calendly.com/maygiftgloryvirtualassistance" external variant="primary">
              Work With Me
            </Button>
          </RevealWrapper>
        </div>

        <div>
          <RevealWrapper delay={200}>
            <div
              className="border-l-[3px] border-rose py-8 pl-10 pr-8 bg-[rgba(209,152,168,0.07)] relative
                before:content-['§'] before:absolute before:top-6 before:right-6 before:font-serif before:text-[3rem] before:text-rose before:opacity-15 before:leading-none"
            >
              <p className="font-serif text-[1.1rem] font-bold text-rose tracking-[0.05em] uppercase mb-4">
                The Legal Advantage
              </p>
              <p className="font-sans text-[0.9rem] leading-[1.8] text-[rgba(242,226,226,0.7)] font-light">
                I am a current <strong className="text-bg font-medium">Law Student</strong>. This
                training means I don&apos;t just complete tasks — I think like a lawyer. I am uniquely
                trained to <strong className="text-bg font-medium">analyze deeply</strong>,{" "}
                <strong className="text-bg font-medium">anticipate operational conflicts</strong>{" "}
                before they happen, and communicate with{" "}
                <strong className="text-bg font-medium">absolute strategic precision</strong>. This
                quality of thinking makes me exceptionally efficient.
              </p>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
