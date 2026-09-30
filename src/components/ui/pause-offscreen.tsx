"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

/** Pauses CSS animations of its subtree while it is outside the viewport. */
export function PauseOffscreen({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: false,
    rootMargin: "100px 0px",
    threshold: 0,
  });

  return (
    <div ref={ref} data-in-view={inView} className={className}>
      {children}
    </div>
  );
}
