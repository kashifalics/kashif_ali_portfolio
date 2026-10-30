import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/site";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 md:py-28", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  id,
  label,
  title,
  intro,
  className,
  align = "left",
}: {
  id?: string;
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {label && <p className="label mb-4">{label}</p>}
      <h2 id={id} className="text-3xl leading-[1.1] font-semibold text-fg sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {intro && <p className="prose-body mt-5">{intro}</p>}
    </div>
  );
}

const buttonStyles = {
  primary:
    "bg-blue text-white hover:bg-[#1d4ed8] shadow-[0_8px_30px_-10px_rgba(37,99,235,0.7)]",
  secondary: "border border-line-strong bg-card/60 text-fg hover:border-cyan hover:text-cyan",
  ghost: "text-fg-2 hover:text-cyan",
} as const;

type ButtonProps = {
  variant?: keyof typeof buttonStyles;
  className?: string;
  children: ReactNode;
} & ComponentProps<typeof Link>;

export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors duration-200",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-bg-2/70 px-2 py-1 font-mono text-[11px] text-fg-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
