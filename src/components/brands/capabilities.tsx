"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { useInView } from "@/hooks/use-in-view";
import { CAPABILITIES } from "@/lib/brands-content";

const COUNT_MS = 1600;

function CountUp({ value, run }: { value: string; run: boolean }) {
  const match = value.match(/^(\d(?:[\d\s]*\d)?)(.*)$/);
  const target = match ? Number(match[1].replace(/\s/g, "")) : 0;
  const suffix = match ? match[2] : "";
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!run || !target) return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : COUNT_MS;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = duration ? Math.min((now - start) / duration, 1) : 1;
      setShown(Math.round(target * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, target]);

  if (!match) return <>{value}</>;
  return (
    <>
      {shown.toLocaleString("ru-RU")}
      {suffix}
    </>
  );
}

export function Capabilities({ index }: { index: string }) {
  const { ref: numbersRef, inView: numbersInView } =
    useInView<HTMLDListElement>();
  const { ref: flowRef, inView: flowInView } = useInView<HTMLOListElement>({
    threshold: 0.3,
  });

  return (
    <section id="production" className="section-y bg-background text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Производство"
          title={CAPABILITIES.title}
          lead={CAPABILITIES.lead}
        />

        <dl
          ref={numbersRef}
          className="mt-14 grid grid-cols-2 gap-px border-y border-line bg-line sm:mt-20 lg:grid-cols-4"
        >
          {CAPABILITIES.numbers.map((item) => (
            <div
              key={item.label}
              className="bg-background py-7 pr-4 even:pl-5 sm:py-9 lg:px-6 lg:first:pl-0"
            >
              <dt className="font-mono text-label text-muted uppercase">
                {item.label}
              </dt>
              <dd className="mt-3 font-display text-[clamp(2rem,4.4vw,4rem)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap text-accent tabular-nums">
                <CountUp value={item.value} run={numbersInView} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 flex flex-col gap-2 sm:mt-24 sm:flex-row sm:items-baseline sm:justify-between">
          <SpecLabel className="text-accent">
            Путь изделия · одна площадка
          </SpecLabel>
          <SpecLabel>{CAPABILITIES.area}</SpecLabel>
        </div>

        <ol
          ref={flowRef}
          data-on={flowInView}
          className="relative mt-10 flex flex-col gap-10 lg:mt-14 lg:grid lg:grid-cols-6 lg:gap-6"
        >
          <span aria-hidden className="flow-track">
            <span className="flow-fill" />
            <span className="flow-dot" />
          </span>

          {CAPABILITIES.stages.map((stage, i) => (
            <li
              key={stage.label}
              className="relative pl-16 lg:pt-16 lg:pl-0"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="flow-node absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-line bg-background font-mono text-[12px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flow-body md:grid md:grid-cols-[minmax(0,15rem)_1fr] md:gap-x-10 lg:block">
                <h3 className="font-display text-h3 font-semibold md:pt-1.5 lg:pt-0">
                  {stage.label}
                </h3>
                <div>
                  <p className="mt-2 max-w-[36ch] text-[15px] leading-relaxed text-muted md:mt-1.5 lg:mt-2">
                    {stage.text}
                  </p>
                  <SpecLabel boxed className="mt-4">
                    {stage.source}
                  </SpecLabel>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
