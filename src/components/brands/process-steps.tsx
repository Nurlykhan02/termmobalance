import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { StitchDivider } from "@/components/ui/stitch-divider";
import { PROCESS } from "@/lib/brands-content";

export function ProcessSteps({ index }: { index: string }) {
  return (
    <section id="process" className="section-y bg-background text-ink">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              index={index}
              eyebrow="Процесс"
              title="От брифа до тиража"
              lead="Первая партия — примерно за три недели, повторные — быстрее."
              stacked
            />
          </div>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6">
          {PROCESS.map((step, i) => (
            <li key={step.title}>
              {i > 0 ? <StitchDivider /> : null}
              <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 py-8 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-x-6 sm:py-10">
                <span className="font-mono text-label text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-h3 font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted">{step.text}</p>
                </div>
                <SpecLabel boxed className="col-start-2 justify-self-start sm:col-start-3 sm:justify-self-end">
                  {step.duration}
                </SpecLabel>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
