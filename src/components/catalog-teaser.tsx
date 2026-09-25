"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { asset } from "@/lib/asset";
import { useSwipeToClose } from "@/hooks/use-swipe-to-close";

const WA_CONSULT =
  "https://wa.me/77781200084?text=" +
  encodeURIComponent(
    "Здравствуйте! Нужна бесплатная консультация по утеплителям / наполнителям.",
  );

const CATEGORIES = [
  { id: "teksulate", label: "Teksulate" },
  { id: "unifiber", label: "UniFiber" },
  { id: "quilt", label: "Стёжка" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const BRAND_IMAGES: Record<CategoryId, string> = {
  teksulate: asset("/images/products/teksulate-p.png"),
  unifiber: asset("/images/products/unifiber.jpg"),
  quilt: asset("/images/products/quilt.jpg"),
};

interface CatalogLine {
  id: string;
  brand: CategoryId;
  brandLabel: string;
  name: string;
  use: string;
  material: string;
  highlights: string[];
  image?: string;
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
    image: asset("/images/products/teksulate-p.png"),
    highlights: [
      "Базовая линейка для зимней спецодежды",
      "Своё производство в Шымкенте",
      "Подходит для фабрик и серийного пошива",
    ],
  },
  {
    id: "teksulate-lp",
    brand: "teksulate",
    brandLabel: "Teksulate",
    name: "Teksulate-LP",
    use: "Более тонкая подкладка на базе линейки P",
    material:
      "Полиэфирные микроволокна от 1,5 Den + легкоплавкое П/Э. Легче и мягче базовой марки P.",
    image: asset("/images/products/teksulate-lp.png"),
    highlights: [
      "Легче и мягче Teksulate-P",
      "Для изделий, где важен тонкий слой",
      "Та же база волокон, другой профиль плотности",
    ],
  },
  {
    id: "teksulate-ft",
    brand: "teksulate",
    brandLabel: "Teksulate",
    name: "FT-Fire walls",
    use: "Огнестойкая подкладка для зимней экипировки",
    material:
      "ПЭ + микроволокно + легкоплавкое П/Э с огнестойкими волокнами. Для задач с повышенными требованиями безопасности.",
    image: asset("/images/products/teksulate-ft.png"),
    highlights: [
      "Огнестойкие волокна в составе",
      "Для спецэкипировки и повышенных требований",
      "Линейка Teksulate с усиленной безопасностью",
    ],
  },
  {
    id: "unifiber-x",
    brand: "unifiber",
    brandLabel: "UniFiber",
    name: "Grade X",
    use: "Подкладка для зимней экипировки",
    material:
      "Тонкое 100% полиэфирное волокно и легкоплавкое П/Э. Своё производство нетканых материалов в Казахстане.",
    highlights: [
      "100% полиэфирная основа",
      "Для зимней экипировки и формы",
      "Производство в Казахстане",
    ],
  },
  {
    id: "unifiber-alfatex",
    brand: "unifiber",
    brandLabel: "UniFiber",
    name: "Alfatex-SH",
    use: "Подкладка с добавлением шерсти",
    material:
      "Тонкое полиэфирное волокно + легкоплавкое П/Э + шерсть. Теплее и мягче на ощупь.",
    highlights: [
      "Добавление шерсти в состав",
      "Теплее и мягче на ощупь",
      "Для комфортной зимней одежды",
    ],
  },
  {
    id: "unifiber-type3",
    brand: "unifiber",
    brandLabel: "UniFiber",
    name: "Type-3",
    use: "Подкладка из полого высокоизвитого волокна",
    material:
      "100% ПЭ волокно «Канжугейт» кольцеобразного сечения. Держит объём и тепло при пошиве.",
    highlights: [
      "Полое высокоизвитое волокно",
      "Держит объём при пошиве",
      "Хорошая теплоизоляция",
    ],
  },
  {
    id: "unifiber-fg",
    brand: "unifiber",
    brandLabel: "UniFiber",
    name: "FG-Fire walls",
    use: "Огнестойкая подкладка UniFiber",
    material:
      "ПЭ микроволокно + легкоплавкое П/Э + огнестойкие волокна. Для форменной и спецэкипировки.",
    highlights: [
      "Огнестойкая формула UniFiber",
      "Для формы и спецэкипировки",
      "Повышенные требования к безопасности",
    ],
  },
  {
    id: "quilt",
    brand: "quilt",
    brandLabel: "Стёжка",
    name: "Стёганый утеплитель",
    use: "Стёжка утеплителя с тканью или спанбондом",
    material:
      "Стёжка на своём оборудовании: ромб, квадрат, волна и рисунки под задачу. Утеплитель не сбивается и держит форму.",
    highlights: [
      "Стёжка на своём оборудовании",
      "Ромб, квадрат, волна и рисунки под задачу",
      "Утеплитель не сбивается и держит форму",
    ],
  },
];

function countItems(categoryId: CategoryId) {
  return lines.filter((line) => line.brand === categoryId).length;
}

function lineImage(line: CatalogLine) {
  return line.image ?? BRAND_IMAGES[line.brand];
}

function waForLine(name: string) {
  return (
    "https://wa.me/77781200084?text=" +
    encodeURIComponent(
      `Здравствуйте! Интересует материал ${name}. Нужна консультация и образец.`,
    )
  );
}

export function CatalogTeaser() {
  const [filter, setFilter] = useState<CategoryId>("teksulate");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [panelSettled, setPanelSettled] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  const filtered = useMemo(
    () => lines.filter((line) => line.brand === filter),
    [filter],
  );

  const active = useMemo(
    () => lines.find((line) => line.id === activeId) ?? null,
    [activeId],
  );

  const openLine = (id: string) => {
    setPanelSettled(false);
    setImageZoomed(false);
    setActiveId(id);
  };

  const closeLine = () => {
    setActiveId(null);
    setPanelSettled(false);
    setImageZoomed(false);
  };

  const {
    panelRef,
    handlers: swipeHandlers,
    style: swipeStyle,
  } = useSwipeToClose({
    onClose: closeLine,
    enabled: Boolean(active) && !imageZoomed,
  });

  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (imageZoomed) setImageZoomed(false);
      else closeLine();
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, imageZoomed]);

  return (
    <section
      id="catalog"
      className="relative overflow-hidden bg-surface px-4 py-14 text-ink sm:px-[30px] sm:py-20"
    >
      <div
        aria-hidden
        className="accent-veil pointer-events-none absolute inset-x-0 top-0 h-56"
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
                    ? "shadow-accent-btn inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-white"
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

        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-9 sm:gap-4 lg:grid-cols-3">
          {filtered.map((line, index) => (
            <button
              key={line.id}
              type="button"
              onClick={() => openLine(line.id)}
              aria-label={`Подробнее: ${line.name}`}
              className="shadow-accent-card hover:shadow-accent-card-hover group flex flex-col overflow-hidden rounded-[16px] bg-raised text-left ring-1 ring-black/[0.04] transition-[transform,box-shadow] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-wash">
                <Image
                  src={lineImage(line)}
                  alt={line.name}
                  fill
                  className="rounded-[10px] object-cover object-[center_12%] transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 45vw, 280px"
                  priority={index < 3}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 p-3 sm:p-3.5">
                <div>
                  <h3 className="text-[14px] font-semibold tracking-[-0.02em] text-ink sm:text-[15px]">
                    {line.name}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-accent sm:text-[12px]">
                    {line.use}
                  </p>
                </div>

                <span className="shadow-accent-btn mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-2 text-[12px] font-semibold text-white transition-opacity group-hover:opacity-95">
                  Подробнее
                  <span aria-hidden>→</span>
                </span>
              </div>
            </button>
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

      {active ? (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
        >
          <button
            type="button"
            aria-label="Закрыть"
            className="absolute inset-0 bg-black/40"
            onClick={closeLine}
          />

          <div
            ref={panelRef}
            {...swipeHandlers}
            style={swipeStyle}
            className={`panel-slide-in absolute top-0 right-0 bottom-0 z-[1] flex max-h-[100dvh] w-[82%] max-w-[380px] flex-col bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.12)] sm:w-full sm:max-w-[400px]${panelSettled ? " panel-slide-in--settled" : ""}`}
            onAnimationEnd={() => setPanelSettled(true)}
          >
            <header className="flex shrink-0 items-start justify-between gap-3 border-b border-black/[0.06] px-4 py-3 sm:px-5 sm:py-3.5">
              <div className="min-w-0 pt-0.5">
                <p className="text-[12px] font-medium text-accent">
                  {active.brandLabel}
                </p>
                <h3 className="mt-0.5 text-[16px] font-semibold tracking-[-0.02em] text-ink sm:text-[17px]">
                  {active.name}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-muted">
                  {active.use}
                </p>
              </div>

              <button
                type="button"
                onClick={closeLine}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[20px] leading-none text-white"
                aria-label="Закрыть"
              >
                ×
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-scroll overscroll-y-contain px-4 py-3 [-webkit-overflow-scrolling:touch] [touch-action:pan-y] sm:px-5 sm:py-4">
              <button
                type="button"
                onClick={() => setImageZoomed(true)}
                aria-label={`Увеличить фото: ${active.name}`}
                className="relative mx-auto block h-[min(26vh,180px)] w-full max-w-[180px] overflow-hidden rounded-lg bg-wash ring-1 ring-black/[0.06] transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <Image
                  src={lineImage(active)}
                  alt={active.name}
                  fill
                  className="object-contain object-center"
                  sizes="180px"
                  quality={75}
                  priority
                />
                <span className="absolute right-2 bottom-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white">
                  Увеличить
                </span>
              </button>

              <div className="mt-4">
                <h4 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
                  Состав и производство
                </h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-[14px]">
                  {active.material}
                </p>
              </div>

              <ul className="mt-4 space-y-2 pb-2">
                {active.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] leading-snug text-ink/85"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 shrink-0 border-t border-black/[0.06] bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:px-5 sm:pb-4">
              <a
                href={waForLine(active.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-accent-btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-95"
              >
                Получить образец
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {imageZoomed ? (
            <div
              className="fixed inset-0 z-[60] bg-black"
              role="dialog"
              aria-modal="true"
              aria-label={`${active.name} — фото`}
              onClick={() => setImageZoomed(false)}
            >
              <Image
                src={lineImage(active)}
                alt={active.name}
                fill
                className="object-contain object-center"
                sizes="100vw"
                quality={90}
                priority
                onClick={(event) => event.stopPropagation()}
              />

              <button
                type="button"
                onClick={() => setImageZoomed(false)}
                className="absolute top-3 right-3 z-10 flex size-11 items-center justify-center rounded-full bg-white text-[22px] leading-none text-ink sm:top-5 sm:right-5"
                aria-label="Закрыть фото"
              >
                ×
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
