import { ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
  className?: string;
};

export function Label({ children, className = "" }: LabelProps) {
  return (
    <span
      className={`block font-sans text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-rose mb-5 ${className}`}
    >
      {children}
    </span>
  );
}
