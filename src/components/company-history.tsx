import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { COMPANY_HISTORY } from "@/lib/company-history";

export function CompanyHistory({ index }: { index?: string }) {
  return (
    <section id="history" className="section-y bg-surface text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="С 2008 года"
          title="История компании"
          lead="От первой линии утеплителей до полного цикла — материалы, стёжка и пошив."
        />

        <ol className="mt-14 grid gap-px border-y border-line bg-line sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY_HISTORY.map((period, i) => (
            <li key={period.year} className="bg-surface py-8 sm:p-8">
              <Reveal delay={(i % 4) * 80}>
                <SpecLabel>
                  <span className="text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {period.label}
                </SpecLabel>
                <p className="mt-3 font-display text-h3 font-semibold text-ink">
                  {period.year}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {period.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
