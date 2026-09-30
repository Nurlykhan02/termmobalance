import type { ReactNode } from "react";
import { SpecLabel } from "@/components/ui/spec-label";

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  id,
  stacked = false,
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  /** Label above the title instead of in its own column on desktop. */
  stacked?: boolean;
  className?: string;
}) {
  return (
    <header
      className={`grid gap-y-5 ${
        stacked ? "" : "lg:grid-cols-12 lg:gap-x-6"
      } ${className}`}
    >
      <div className={stacked ? "" : "lg:col-span-3"}>
        <SpecLabel>
          {index ? <span className="text-accent">({index})</span> : null}
          {eyebrow}
        </SpecLabel>
      </div>
      <div className={stacked ? "" : "lg:col-span-9"}>
        <h2
          id={id}
          className="font-display text-h2 font-semibold text-balance text-ink"
        >
          {title}
        </h2>
        {lead ? (
          <p className="mt-5 max-w-[58ch] text-lead text-muted">{lead}</p>
        ) : null}
      </div>
    </header>
  );
}
