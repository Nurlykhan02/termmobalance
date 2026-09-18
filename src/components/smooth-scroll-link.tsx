"use client";

import type { ReactNode, MouseEvent } from "react";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(element: HTMLElement, duration = 520) {
  const startY = window.scrollY;
  const targetY =
    element.getBoundingClientRect().top + window.scrollY - 12;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

interface SmoothScrollLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function SmoothScrollLink({
  href,
  className,
  children,
}: SmoothScrollLinkProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;

    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      target.scrollIntoView();
    } else {
      smoothScrollTo(target);
    }
    history.pushState(null, "", href);
  };

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
