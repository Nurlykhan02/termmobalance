import type { ReactNode } from "react";

export function SpecLabel({
  children,
  boxed = false,
  className = "",
}: {
  children: ReactNode;
  boxed?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-label text-muted uppercase ${
        boxed ? "border border-line px-2 py-1" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
