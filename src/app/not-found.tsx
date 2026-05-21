import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg text-text flex flex-col items-center justify-center px-6 relative overflow-hidden select-none">
      {/* Editorial Decorative Brand Header */}
      <div className="absolute top-12 left-12 font-serif text-[0.8rem] tracking-[0.2em] uppercase opacity-40 max-[600px]:hidden">
        Maygift Glory · Executive VA
      </div>

      {/* Subtle background color blobs to match visual system */}
      <div className="absolute -top-[10%] -left-[10%] w-[35vw] h-[35vw] rounded-full bg-rose/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
        {/* Large Stylized Number */}
        <span className="font-serif text-[7.5rem] md:text-[9rem] font-black leading-none text-rose/35 tracking-tighter">
          404
        </span>

        {/* Elegant Heading */}
        <h1 className="font-serif text-[1.8rem] md:text-[2.2rem] font-bold leading-tight tracking-tight mt-4 mb-6">
          Lost in the backend?
        </h1>

        {/* Informative Subtitle */}
        <p className="font-sans text-[0.98rem] font-light leading-[1.7] text-text/70 mb-10 max-w-sm">
          The page you are looking for doesn&apos;t exist or was moved. Let&apos;s get you back to coordinating what matters.
        </p>

        {/* Return Button */}
        <Button href="/" variant="primary" className="shadow-md">
          Return Home
        </Button>
      </div>
    </main>
  );
}
