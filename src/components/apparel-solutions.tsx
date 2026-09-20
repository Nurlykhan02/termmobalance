"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { asset } from "@/lib/asset";
import { useSwipeToClose } from "@/hooks/use-swipe-to-close";

const WA_EMBROIDERY =
  "https://wa.me/77781200084?text=" +
  encodeURIComponent(
    "Здравствуйте! Нужна бесплатная консультация по вышивке на спецодежде.",
  );

const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "jackets", label: "Куртки" },
  { id: "vests", label: "Жилеты" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

interface GalleryItem {
  id: string;
  title: string;
  place: string;
  category: Exclude<CategoryId, "all">;
  categoryLabel: string;
  folder: string;
  photos: string[];
}

function photoPath(folder: string, file: string) {
  return asset(`/images/apparel/${folder}/${file}`);
}

function numberedPhotos(count: number) {
  return Array.from(
    { length: count },
    (_, i) => `${String(i + 1).padStart(2, "0")}.jpg`,
  );
}

const gallery: GalleryItem[] = [
  {
    id: "kurtki-v1",
    title: "Куртка 1",
    place: "Утеплённый комплект с вышивкой и шевронами",
    category: "jackets",
    categoryLabel: "Куртки",
    folder: "kurtki/variant-1",
    photos: numberedPhotos(5),
  },
  {
    id: "kurtki-v2",
    title: "Куртка 2",
    place: "Зимняя куртка — серия фото с вышивкой",
    category: "jackets",
    categoryLabel: "Куртки",
    folder: "kurtki/variant-2",
    photos: numberedPhotos(7),
  },
  {
    id: "zhilety-v1",
    title: "Жилет 1",
    place: "Флис / жилет с вышивкой под бренд",
    category: "vests",
    categoryLabel: "Жилеты",
    folder: "zhilety/variant-1",
    photos: numberedPhotos(3),
  },
  {
    id: "zhilety-v2",
    title: "Жилет 2",
    place: "Жилет — вышивка и нашивки",
    category: "vests",
    categoryLabel: "Жилеты",
    folder: "zhilety/variant-2",
    photos: numberedPhotos(4),
  },
];

function coverOf(item: GalleryItem) {
  return photoPath(item.folder, item.photos[0]);
}

function countItems(categoryId: CategoryId) {
  if (categoryId === "all") return gallery.length;
  return gallery.filter((item) => item.category === categoryId).length;
}

export function ApparelSolutions() {
  const [filter, setFilter] = useState<CategoryId>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? gallery
        : gallery.filter((item) => item.category === filter),
    [filter],
  );

  const active = useMemo(
    () => gallery.find((item) => item.id === activeId) ?? null,
    [activeId],
  );

  const openItem = (id: string) => {
    setActiveId(id);
    setLightboxIndex(null);
  };

  const closeAll = () => {
    setActiveId(null);
    setLightboxIndex(null);
  };

  const {
    panelRef,
    handlers: swipeHandlers,
    style: swipeStyle,
  } = useSwipeToClose({
    onClose: closeAll,
    enabled: Boolean(active) && lightboxIndex === null,
  });

  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else closeAll();
        return;
      }

      if (lightboxIndex === null || active.photos.length < 2) return;

      if (event.key === "ArrowRight") {
        setLightboxIndex((i) => ((i ?? 0) + 1) % active.photos.length);
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex(
          (i) => ((i ?? 0) - 1 + active.photos.length) % active.photos.length,
        );
      }
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, lightboxIndex]);

  return (
    <section
      id="apparel"
      className="relative overflow-hidden bg-[#f7f5f0] px-4 py-14 text-ink sm:px-[30px] sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_50%_0%,rgba(31,158,150,0.08),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display max-w-[720px] text-[clamp(1.7rem,4.2vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-ink">
            Наши работы по вышивке спецодежды
          </h2>

          <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-muted sm:text-[16px]">
            Шьём любые спецодежды под ваш запрос — куртки, жилеты, комплекты и
            другие изделия. Любые дизайны, вышивка и шевроны под бренд или
            задачу. Ниже — примеры наших работ.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Фильтр работ"
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

        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openItem(item.id)}
              aria-label={`Смотреть все: ${item.title}`}
              className="group overflow-hidden rounded-[16px] bg-white text-left shadow-[0_4px_6px_rgba(33,14,3,0.03),0_10px_28px_rgba(31,158,150,0.10)] ring-1 ring-black/[0.04] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_8px_12px_rgba(33,14,3,0.04),0_18px_40px_rgba(31,158,150,0.16)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:rounded-[18px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#eaf6f4]">
                <Image
                  src={coverOf(item)}
                  alt={item.title}
                  fill
                  className="object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority={index < 4}
                  quality={85}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/35 to-transparent"
                />
                <span className="absolute top-2 left-2 z-[1] rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-white shadow-[0_4px_12px_rgba(31,158,150,0.35)] sm:top-2.5 sm:left-2.5 sm:px-2.5 sm:py-1 sm:text-[11px]">
                  {item.categoryLabel}
                </span>
                <span className="absolute top-2 right-2 z-[1] flex items-center gap-1.5 rounded-[10px] bg-white/95 px-1.5 py-1 shadow-[0_4px_14px_rgba(33,14,3,0.12)] backdrop-blur-sm sm:top-2.5 sm:right-2.5 sm:gap-2 sm:rounded-[12px] sm:px-2 sm:py-1.5">
                  <span
                    aria-hidden
                    className="size-[14px] shrink-0 rounded-full border border-accent sm:size-[16px] sm:border-[1.5px]"
                  />
                  <span className="flex flex-col leading-none">
                    <span className="text-[8px] font-bold tracking-[0.12em] text-ink uppercase sm:text-[9px]">
                      Termmo
                    </span>
                    <span className="text-[8px] font-bold tracking-[0.12em] text-ink uppercase sm:text-[9px]">
                      Balance
                    </span>
                  </span>
                </span>
              </div>

              <div className="flex flex-col gap-2 border-t border-accent/10 bg-gradient-to-b from-[#f3faf8] to-white p-2.5 sm:gap-2.5 sm:p-3.5">
                <div>
                  <h3 className="text-[14px] leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-[16px]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted sm:text-[12px]">
                    {item.place}
                  </p>
                </div>

                <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-2.5 py-2 text-[11px] font-semibold text-white shadow-[0_5px_14px_rgba(31,158,150,0.28)] sm:gap-2 sm:px-3 sm:text-[12px]">
                  Смотреть все
                  <span className="tabular-nums text-white/75">
                    {item.photos.length}
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-between">
          <p className="text-[13px] text-muted">
            Показано {filtered.length} из {gallery.length} работ
          </p>
          <a
            href={WA_EMBROIDERY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-accent underline-offset-4 transition-opacity hover:underline"
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
          aria-label={active.title}
        >
          <button
            type="button"
            aria-label="Закрыть"
            className="absolute inset-0 bg-black/40"
            onClick={closeAll}
          />

          <div
            ref={panelRef}
            {...swipeHandlers}
            style={swipeStyle}
            className="panel-slide-in absolute inset-y-0 right-0 z-[1] flex h-[100dvh] w-[82%] max-w-[380px] flex-col bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.12)] sm:w-full sm:max-w-[400px]"
          >
            <header className="flex shrink-0 items-start justify-between gap-3 border-b border-black/[0.06] px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="min-w-0 pt-0.5">
                <h3 className="truncate text-[16px] font-semibold tracking-[-0.02em] text-ink sm:text-[18px]">
                  {active.title}
                </h3>
                <p className="mt-0.5 text-[12px] text-muted sm:text-[13px]">
                  {active.photos.length} фото · {active.place}
                </p>
              </div>

              <button
                type="button"
                onClick={closeAll}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[20px] leading-none text-white sm:size-10"
                aria-label="Закрыть"
              >
                ×
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-scroll overscroll-y-contain px-3 py-3 [-webkit-overflow-scrolling:touch] [touch-action:pan-y] sm:px-4 sm:py-4">
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {active.photos.map((file, index) => (
                  <button
                    key={file}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#eaf6f4] shadow-[0_2px_8px_rgba(31,158,150,0.1)] ring-1 ring-black/[0.04] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(31,158,150,0.18)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <Image
                      src={photoPath(active.folder, file)}
                      alt={`${active.title} ${index + 1}`}
                      fill
                      className="object-cover object-[center_18%]"
                      sizes="120px"
                      quality={70}
                      priority={index < 6}
                    />
                    <span className="absolute top-1 left-1 rounded-full bg-accent px-1.5 py-0.5 text-[8px] font-medium text-white tabular-nums shadow-[0_2px_8px_rgba(31,158,150,0.35)]">
                      {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {lightboxIndex !== null ? (
            <div
              className="fixed inset-0 z-[60] bg-black"
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} — фото ${lightboxIndex + 1}`}
              onClick={() => setLightboxIndex(null)}
            >
              <Image
                key={active.photos[lightboxIndex]}
                src={photoPath(active.folder, active.photos[lightboxIndex])}
                alt={`${active.title} ${lightboxIndex + 1}`}
                fill
                className="object-contain object-center"
                sizes="100vw"
                quality={95}
                priority
                onClick={(event) => event.stopPropagation()}
              />

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(null);
                }}
                className="absolute top-3 right-3 z-10 flex size-11 items-center justify-center rounded-full bg-white text-[22px] leading-none text-ink shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:top-5 sm:right-5 sm:size-12"
                aria-label="Закрыть фото"
              >
                ×
              </button>

              {active.photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Предыдущее фото"
                    onClick={(event) => {
                      event.stopPropagation();
                      setLightboxIndex(
                        (lightboxIndex - 1 + active.photos.length) %
                          active.photos.length,
                      );
                    }}
                    className="absolute top-1/2 left-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-[28px] leading-none text-white transition-colors hover:bg-black/65 sm:left-5 sm:size-12"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Следующее фото"
                    onClick={(event) => {
                      event.stopPropagation();
                      setLightboxIndex(
                        (lightboxIndex + 1) % active.photos.length,
                      );
                    }}
                    className="absolute top-1/2 right-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-[28px] leading-none text-white transition-colors hover:bg-black/65 sm:right-5 sm:size-12"
                  >
                    ›
                  </button>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
