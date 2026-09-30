"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";
import { Icon } from "@/components/ui/icon";

type HeaderLink = {
  label: string;
  href: string;
};

const HOME_LINKS: HeaderLink[] = [
  { label: "Спецодежда", href: "#apparel" },
  { label: "Материалы", href: "#catalog" },
  { label: "Доставка", href: "#about" },
  { label: "Пошив для брендов", href: "/brands/" },
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

function BrandMark({ light }: { light: boolean }) {
  return (
    <Image
      src={asset("/images/logo.png")}
      alt="Termmo Balance"
      width={1024}
      height={252}
      preload
      className={`h-[22px] w-auto transition-[filter] duration-300 sm:h-[24px] ${
        light ? "brightness-0 invert-[0.92]" : ""
      }`}
    />
  );
}

function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

/**
 * Fixed bar, clear over the full-bleed hero and solid after scroll.
 * `studio` sits on a dark page, so its text stays light in both states;
 * the factory page turns dark-on-paper once solid.
 */
export function SiteHeader({
  links = HOME_LINKS,
  logoHref = "/",
  cta = HOME_CTA,
  whatsappHref = "https://wa.me/77781200084",
  variant = "default",
}: {
  links?: HeaderLink[];
  logoHref?: string;
  cta?: HeaderLink;
  whatsappHref?: string;
  variant?: "default" | "studio";
} = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const solid = scrolled || menuOpen;
  const studio = variant === "studio";
  const light = studio || !solid;

  const text = light ? "text-white" : "text-ink";
  const navText = light
    ? "text-white/75 hover:text-white"
    : "text-ink/70 hover:text-ink";
  const ctaClass = light
    ? "cursor-pointer bg-[#f4f0ea] text-[#0e0d0c] shadow-[0_1px_0_rgb(0_0_0/0.06)] transition-[color,background-color,transform,box-shadow] duration-200 hover:bg-white hover:shadow-[0_10px_28px_-14px] hover:shadow-black/45 active:scale-[0.97] active:bg-[#e8e2d8]"
    : "cursor-pointer bg-ink text-surface shadow-[0_1px_0_rgb(0_0_0/0.08)] transition-[color,background-color,transform,box-shadow] duration-200 hover:bg-ink/88 hover:shadow-[0_10px_28px_-14px] hover:shadow-ink/50 active:scale-[0.97]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? `border-line backdrop-blur-md ${studio ? "bg-background/90" : "bg-surface/92"}`
          : "border-transparent bg-transparent"
      }`}
    >
      <div className={`container-x flex h-16 items-center justify-between gap-6 ${text}`}>
        <Link href={logoHref} aria-label="Termmo Balance" className="flex h-11 shrink-0 items-center">
          <BrandMark light={light} />
        </Link>

        <nav aria-label="Разделы" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              className={`flex h-11 items-center text-[14px] transition-colors ${navText}`}
            >
              {link.label}
            </NavItem>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {studio ? null : (
            <NavItem
              href={whatsappHref}
              className={`hidden h-11 items-center px-3 text-[13px] font-medium transition-colors xl:inline-flex ${navText}`}
            >
              WhatsApp
            </NavItem>
          )}
          <NavItem
            href={cta.href}
            className={`hidden h-11 items-center gap-2 rounded-[var(--radius)] px-4 text-[13px] font-medium transition-colors sm:inline-flex ${ctaClass}`}
          >
            {cta.label}
            <Icon name="arrow-up-right" className="size-4" />
          </NavItem>
          <button
            type="button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-11 cursor-pointer items-center justify-center transition-transform duration-200 active:scale-95 lg:hidden"
          >
            <Icon name={menuOpen ? "close" : "plus"} className="size-6" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          aria-label="Меню"
          className="container-x max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line pt-2 pb-6 lg:hidden"
        >
          {links.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center border-b border-line font-display text-h3 font-semibold text-ink"
            >
              {link.label}
            </NavItem>
          ))}
          <NavItem
            href={cta.href}
            onClick={() => setMenuOpen(false)}
            className={`mt-6 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius)] bg-ink text-[14px] font-medium text-surface transition-[background-color,transform] duration-200 hover:bg-ink/88 active:scale-[0.97]`}
          >
            {cta.label}
            <Icon name="arrow-up-right" className="size-4" />
          </NavItem>
          {studio ? null : (
            <NavItem
              href={whatsappHref}
              onClick={() => setMenuOpen(false)}
              className="mt-3 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-[var(--radius)] border border-line text-[14px] font-medium text-ink transition-[background-color,transform] duration-200 hover:bg-ink/5 active:scale-[0.97]"
            >
              WhatsApp
            </NavItem>
          )}
        </nav>
      ) : null}
    </header>
  );
}
