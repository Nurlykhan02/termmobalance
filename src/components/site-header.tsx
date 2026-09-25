"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";

type HeaderLink = {
  label: string;
  href: string;
};

const HOME_LINKS: HeaderLink[] = [
  { label: "Спецодежда", href: "#apparel" },
  { label: "Материалы", href: "#catalog" },
  { label: "Доставка", href: "#about" },
  { label: "Контакты", href: "#contact" },
];

const HOME_CTA: HeaderLink = {
  label: "Бесплатная консультация",
  href: "#contact",
};

function NavItem({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (href.startsWith("#")) {
    return (
      <SmoothScrollLink href={href} className={className} onClick={onClick}>
        {children}
      </SmoothScrollLink>
    );
  }

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function BrandMark() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="size-[28px] shrink-0 rounded-full border-[1.5px] border-accent"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[11px] font-bold tracking-[0.14em] text-ink uppercase">
          Termmo
        </span>
        <span className="text-[11px] font-bold tracking-[0.14em] text-ink uppercase">
          Balance
        </span>
      </span>
    </span>
  );
}

export function SiteHeader({
  links = HOME_LINKS,
  logoHref = "/",
  cta = HOME_CTA,
  whatsappHref = "https://wa.me/77781200084",
}: {
  links?: HeaderLink[];
  logoHref?: string;
  cta?: HeaderLink;
  whatsappHref?: string;
} = {}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-[30px] sm:pt-6">
      <div className="pointer-events-auto mx-auto flex max-w-[1380px] items-center justify-between gap-3 lg:hidden">
        <Link
          href={logoHref}
          aria-label="Termmo Balance"
          className="inline-flex shrink-0 items-center rounded-[12px] bg-surface px-3.5 py-2.5"
        >
          <BrandMark />
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-surface text-ink"
        >
          <span className="flex w-[18px] flex-col gap-[5px]">
            <span
              className={`block h-px w-full origin-center bg-ink transition-transform ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-full bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-full origin-center bg-ink transition-transform ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div className="pointer-events-auto mx-auto hidden max-w-[1380px] items-center justify-center lg:flex">
        <div className="flex min-w-[820px] items-center justify-between rounded-[12px] bg-surface py-[9px] pr-2 pl-5">
          <div className="flex items-center gap-5">
            <Link href={logoHref} aria-label="Termmo Balance" className="shrink-0">
              <BrandMark />
            </Link>

            <span aria-hidden className="h-[25px] w-px bg-ink/10" />

            <nav className="flex items-center gap-5">
              {links.map((link) => (
                <NavItem
                  key={link.href}
                  href={link.href}
                  className="text-[12px] font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </NavItem>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-ink/15 px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink/5"
            >
              WhatsApp
            </a>

            <NavItem
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
            >
              {cta.label}
              <Image
                src={asset("/images/arrow.svg")}
                alt=""
                width={16}
                height={16}
                className="brightness-0 invert"
              />
            </NavItem>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="pointer-events-auto mx-auto mt-3 max-w-[1380px] lg:hidden">
          <nav className="overflow-hidden rounded-[16px] bg-surface shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <div className="px-1 py-1">
              {links.map((link) => (
                <NavItem
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center rounded-[12px] px-4 text-[14px] font-medium tracking-[-0.01em] text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink active:bg-ink/5"
                >
                  {link.label}
                </NavItem>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-t border-ink/8 px-4 py-3.5">
              <NavItem
                href={cta.href}
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-ink px-4 text-[13px] font-medium text-white"
              >
                {cta.label}
                <Image
                  src={asset("/images/arrow.svg")}
                  alt=""
                  width={14}
                  height={14}
                  className="brightness-0 invert"
                />
              </NavItem>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-ink/12 px-4 text-[13px] font-medium text-ink"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
