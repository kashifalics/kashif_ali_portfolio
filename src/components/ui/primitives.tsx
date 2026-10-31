import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/site";
import { Animate } from "./Animate";

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

/**
 * A section opens with its title on the left and, on wide screens, one short
 * line of context on the right, sitting on a single rule.
 */
export function SectionHeading({
  id,
  title,
  intro,
  className,
  align = "left",
}: {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  if (align === "center") {
    return (
      <div className={cn("mx-auto max-w-2xl text-center", className)}>
        <Animate effect="zoomIn">
          <h2 id={id} className="text-4xl leading-[1.05] font-semibold text-fg sm:text-5xl">
            {title}
          </h2>
        </Animate>
        {intro && (
          <Animate delay={0.3}>
            <p className="prose-body mt-5">{intro}</p>
          </Animate>
        )}
      </div>
    );
  }
  return (
    <div className={cn("grid gap-5 border-t border-line pt-8 md:grid-cols-[1fr_minmax(0,24rem)] md:items-end md:gap-12", className)}>
      <Animate effect="fadeInLeft">
        <h2 id={id} className="max-w-3xl text-4xl leading-[1.02] font-semibold text-fg sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h2>
      </Animate>
      {intro && (
        <Animate delay={0.3}>
          <p className="text-[15px] leading-relaxed text-fg-2 md:pb-2">{intro}</p>
        </Animate>
      )}
    </div>
  );
}

const buttonStyles = {
  primary: "bg-blue text-white hover:bg-[#1d4ed8]",
  secondary: "border border-line-strong text-fg hover:border-cyan hover:text-cyan",
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
        "group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-200",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
