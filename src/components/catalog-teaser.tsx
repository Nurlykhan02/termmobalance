"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { asset } from "@/lib/asset";

const WA_CONSULT =
  "https://wa.me/77781200084?text=" +
  encodeURIComponent(
    "Здравствуйте! Нужна бесплатная консультация по утеплителям / наполнителям.",
  );

const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "teksulate", label: "Teksulate" },
  { id: "unifiber", label: "UniFiber" },
  { id: "quilt", label: "Стёжка" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const DEFAULT_PRODUCT_IMAGE = asset("/images/products/quilt.jpg");

interface CatalogLine {
  id: string;
  brand: Exclude<CategoryId, "all">;
  brandLabel: string;
  name: string;
  use: string;
  material: string;
}

const lines: CatalogLine[] = [
  {
    id: "teksulate-p",
    brand: "teksulate",
    brandLabel: "Teksulate",
    name: "Teksulate-P",
    use: "Подкладка для зимней экипировки и спецодежды",
    material:
      "Смесь полиэфирных волокон от 1,5 Den и легкоплавкого П/Э волокна. Производим на своём заводе в Шымкенте.",
  },
  {
    id: "teksulate-lp",
    brand: "teksulate",
    brandLabel: "Teksulate",
    name: "Teksulate-LP",
    use: "Более тонкая подкладка на базе линейки P",
    material:
      "Полиэфирные микроволокна от 1,5 Den + легкоплавкое П/Э. Легче и мягче базовой марки P.",
  },
  {
    id: "teksulate-ft",
    brand: "teksulate",
    brandLabel: "Teksulate",
    name: "FT-Fire walls",
    use: "Огнестойкая подкладка для зимней экипировки",
    material:
      "ПЭ + микроволокно + легкоплавкое П/Э с огнестойкими волокнами. Для задач с повышенными требованиями безопасности.",
  },
  {
    id: "unifiber-x",
    brand: "unifiber",
    brandLabel: "UniFiber",
    name: "Grade X",
    use: "Подкладка для зимней экипировки",
    material:
      "Тонкое 100% полиэфирное волокно и легкоплавкое П/Э. Своё производство нетканых материалов в Казахстане.",
  },
  {
    id: "unifiber-alfatex",
    brand: "unifiber",
    brandLabel: "UniFiber",
    name: "Alfatex-SH",
    use: "Подкладка с добавлением шерсти",
    material:
      "Тонкое полиэфирное волокно + легкоплавкое П/Э + шерсть. Теплее и мягче на ощупь.",
  },
  {
    id: "unifiber-type3",
    brand: "unifiber",
    brandLabel: "UniFiber",
    name: "Type-3",
    use: "Подкладка из полого высокоизвитого волокна",
    material:
      "100% ПЭ волокно «Канжугейт» кольцеобразного сечения. Держит объём и тепло при пошиве.",
  },
  {
    id: "unifiber-fg",
    brand: "unifiber",
    brandLabel: "UniFiber",
    name: "FG-Fire walls",
    use: "Огнестойкая подкладка UniFiber",
    material:
      "ПЭ микроволокно + легкоплавкое П/Э + огнестойкие волокна. Для форменной и спецэкипировки.",
  },
  {
    id: "quilt",
    brand: "quilt",
    brandLabel: "Стёжка",
    name: "Стёганый утеплитель",
    use: "Стёжка утеплителя с тканью или спанбондом",
    material:
      "Стёжка на своём оборудовании: ромб, квадрат, волна и рисунки под задачу. Утеплитель не сбивается и держит форму.",
  },
];

function countItems(categoryId: CategoryId) {
  if (categoryId === "all") return lines.length;
  return lines.filter((line) => line.brand === categoryId).length;
}

export function CatalogTeaser() {
  const [filter, setFilter] = useState<CategoryId>("all");

  const filtered = useMemo(
    () =>
      filter === "all" ? lines : lines.filter((line) => line.brand === filter),
    [filter],
  );

  return (
    <section
      id="catalog"
      className="relative overflow-hidden bg-[#f7f5f0] px-4 py-14 text-ink sm:px-[30px] sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_50%_0%,rgba(31,158,150,0.1),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
            Линейки утеплителей с нашего завода
          </h2>

          <p className="mt-3 text-[14px] leading-relaxed text-muted sm:text-[16px]">
            Производим в Шымкенте с 2008 года из полиэфирных волокон и
            легкоплавкого П/Э. Материалы идут на спецодежду, форму и зимнюю
            экипировку — напрямую со швейными фабриками Казахстана.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Фильтр линеек"
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10"
        >
          {CATEGORIES.map((category) => {
            const isActive = filter === category.id;
            const count = countItems(category.id);
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(category.id)}
                className={
                  isActive
                    ? "inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-white shadow-[0_6px_18px_rgba(31,158,150,0.28)]"
                    : "inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-medium text-ink/65 shadow-[0_2px_8px_rgba(33,14,3,0.04)] transition-colors hover:border-accent/35 hover:text-ink"
                }
              >
                {category.label}
                <span
                  className={
                    isActive
                      ? "rounded-full bg-white/20 px-1.5 py-0.5 text-[11px] tabular-nums text-white/90"
                      : "rounded-full bg-accent/10 px-1.5 py-0.5 text-[11px] tabular-nums text-accent"
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((line, index) => (
            <article
              key={line.id}
              className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_6px_rgba(33,14,3,0.03),0_12px_32px_rgba(31,158,150,0.08)] ring-1 ring-black/[0.04] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_12px_rgba(33,14,3,0.04),0_18px_40px_rgba(31,158,150,0.14)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e4dc]">
                <Image
                  src={DEFAULT_PRODUCT_IMAGE}
                  alt={line.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                />
                <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-white shadow-[0_4px_12px_rgba(31,158,150,0.3)]">
                  {line.brandLabel}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-ink sm:text-[18px]">
                    {line.name}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-accent">
                    {line.use}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {line.material}
                  </p>
                </div>

                <a
                  href={WA_CONSULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_18px_rgba(31,158,150,0.25)] transition-opacity hover:opacity-90 sm:w-fit"
                >
                  Бесплатная консультация
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-between">
          <p className="text-[13px] text-muted">
            Показано {filtered.length} из {lines.length} линеек · завод в
            Шымкенте
          </p>
          <a
            href={WA_CONSULT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-accent underline-offset-4 hover:underline"
          >
            Написать в WhatsApp
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
