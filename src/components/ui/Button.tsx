import { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "outline";
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  external?: boolean;
};

export function Button({
  variant = "primary",
  href,
  children,
  onClick,
  type = "button",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2.5 font-sans text-[0.8rem] font-semibold tracking-widest uppercase px-8 py-3.5 transition-all duration-300 ease-spring cursor-pointer rounded-none select-none";

  const styles = {
    primary: "bg-accent text-white hover:bg-text hover:-translate-y-0.5 hover:shadow-lg",
    outline: "bg-transparent text-text border-[1.5px] border-text hover:bg-text hover:text-white",
  };

  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
