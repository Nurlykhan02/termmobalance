"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";
import type { ComparePair } from "@/lib/brands-content";

function CompareSlider({ pair }: { pair: ComparePair }) {
  const id = useId();
  const [split, setSplit] = useState(50);

  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden bg-raised select-none">
        <Image
          src={asset(pair.look.src)}
          alt={pair.look.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{ objectPosition: pair.look.focus }}
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        >
          <Image
            src={asset(pair.detail.src)}
            alt={pair.detail.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: pair.detail.focus }}
          />
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-[#ede6da]"
          style={{ left: `${split}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/50 font-mono text-[11px] text-[#ede6da] backdrop-blur-sm">
            ⟷
          </span>
        </span>
        <SpecLabel className="absolute top-3 left-3 bg-black/60 px-2 py-1 text-[#ede6da]">
          Деталь
        </SpecLabel>
        <SpecLabel className="absolute top-3 right-3 bg-black/60 px-2 py-1 text-[#ede6da]">
          Образ
        </SpecLabel>
        <label htmlFor={id} className="sr-only">
          Граница между крупным планом и образом
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(event) => setSplit(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3">
        <SpecLabel>{pair.label}</SpecLabel>
      </figcaption>
    </figure>
  );
}

export function FactoryFashionCompare({
  index,
  pairs,
}: {
  index: string;
  pairs: ComparePair[];
}) {
  return (
    <section id="compare" className="section-y bg-background text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Деталь ↔ образ"
          title="Крупный план нанесения и то же изделие на съёмке"
          lead="Потяните границу, чтобы сравнить принт вблизи и вещь в образе."
        />
        <div className="mt-14 grid gap-12 sm:mt-20 md:grid-cols-2 md:gap-4 lg:gap-5">
          {pairs.map((pair) => (
            <CompareSlider key={pair.label} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  );
}
