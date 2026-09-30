import Link from "next/link";
import type { ReactNode } from "react";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";
import { Icon, type IconName } from "@/components/ui/icon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "text"
  | "light"
  | "outline-light";

const BASE =
  "group inline-flex cursor-pointer items-center justify-center gap-3 text-[14px] font-medium tracking-[-0.01em] transition-[color,background-color,border-color,transform,box-shadow,opacity] duration-200 ease-out-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.97]";

const BOX = "h-12 rounded-[var(--radius)] px-5";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: `${BOX} bg-ink text-surface shadow-[0_1px_0_rgb(0_0_0/0.08)] hover:bg-ink/88 hover:shadow-[0_10px_28px_-14px] hover:shadow-ink/50`,
  secondary: `${BOX} border border-ink/25 text-ink hover:border-ink hover:bg-ink/5 active:bg-ink/10`,
  text: "min-h-11 px-0 text-ink underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink active:opacity-70",
  light: `${BOX} bg-[#f4f0ea] text-[#0e0d0c] shadow-[0_1px_0_rgb(0_0_0/0.06)] hover:bg-white hover:shadow-[0_10px_28px_-14px] hover:shadow-black/45 active:bg-[#e8e2d8]`,
  "outline-light": `${BOX} border border-white/40 text-white hover:border-white hover:bg-white/12 active:bg-white/18`,
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = variant === "text" ? undefined : "arrow-right",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: IconName;
  className?: string;
  onClick?: () => void;
}) {
  const external = href.startsWith("http");
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <Icon
          name={external && icon === "arrow-right" ? "arrow-up-right" : icon}
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (href.startsWith("#")) {
    return (
      <SmoothScrollLink href={href} className={classes} onClick={onClick}>
        {content}
      </SmoothScrollLink>
    );
  }

  if (/^(tel|mailto):/.test(href)) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
