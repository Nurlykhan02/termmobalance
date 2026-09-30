"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

/**
 * Observe an outer wrapper without clip-path. Chromium treats clip-path as
 * zero intersection, so putting the observer on the clipped node deadlocks
 * the reveal (photos stay blank forever).
 */
export function Reveal({
  children,
  variant = "fade",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: "fade" | "clip";
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={className}>
      <div
        data-shown={inView}
        className={
          variant === "clip" ? "reveal-clip h-full w-full" : "reveal"
        }
        style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
