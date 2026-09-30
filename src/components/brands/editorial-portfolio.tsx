"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { FilterTabs, type FilterTab } from "@/components/ui/filter-tabs";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";
import {
  CAPSULES,
  type CapsuleId,
  type LookbookShot,
} from "@/lib/brands-content";

type Filter = "all" | CapsuleId;

/** Every 7th frame becomes a 2×2 feature tile; the grid backfills around it. */
function isFeature(position: number) {
  return position % 7 === 0;
}

export function EditorialPortfolio({
  index,
  shots,
}: {
  index: string;
  shots: LookbookShot[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "all" ? shots : shots.filter((item) => item.capsule === filter),
    [filter, shots],
  );

  const items: LightboxItem[] = useMemo(
    () =>
      visible.map((shot) => ({
        src: asset(shot.src),
        alt: shot.alt,
        caption: shot.caption,
      })),
    [visible],
  );

  const close = useCallback(() => setOpen(null), []);

  const filters: FilterTab<Filter>[] = [
    { id: "all", label: "Все", count: shots.length },
    ...CAPSULES.map((item) => ({
      id: item.id,
      label: item.label,
      count: shots.filter((shot) => shot.capsule === item.id).length,
    })),
  ];

  return (
    <section id="work" className="section-y bg-surface text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Портфолио"
          title="Лукбук 2EASY"
          lead="Три капсулы, отснятые ночью. Нажмите на кадр, чтобы открыть его на весь экран."
        />

        <FilterTabs
          label="Капсулы"
          tabs={filters}
          value={filter}
          onChange={setFilter}
          className="mt-12 sm:mt-16"
        />

        <ul className="mt-8 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((shot, position) => {
            const feature = isFeature(position);
            return (
              <li
                key={shot.n}
                className={feature ? "col-span-2 row-span-2" : undefined}
              >
                <button
                  type="button"
                  onClick={() => setOpen(position)}
                  aria-label={`Открыть кадр ${shot.n}: ${shot.alt}`}
                  className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span className="relative block aspect-[4/5] overflow-hidden bg-raised">
                    <Image
                      src={asset(shot.src)}
                      alt={shot.alt}
                      fill
                      sizes={
                        feature
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 768px) 50vw, 25vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                      style={{ objectPosition: shot.focus }}
                    />
                  </span>
                  <span className="mt-2 flex items-baseline justify-between gap-3">
                    <SpecLabel>
                      No. {String(shot.n).padStart(2, "0")}
                    </SpecLabel>
                    <SpecLabel className="truncate">{shot.caption}</SpecLabel>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {open !== null ? (
        <Lightbox
          items={items}
          index={open}
          onIndexChange={setOpen}
          onClose={close}
        />
      ) : null}
    </section>
  );
}
