"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { FilterTabs, type FilterTab } from "@/components/ui/filter-tabs";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { SidePanel } from "@/components/ui/side-panel";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";

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

const TABS: FilterTab<CategoryId>[] = CATEGORIES.map((category) => ({
  ...category,
  count:
    category.id === "all"
      ? gallery.length
      : gallery.filter((item) => item.category === category.id).length,
}));

function WorkCard({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Смотреть все фото: ${item.title}`}
      className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span className="relative block aspect-[3/4] overflow-hidden bg-wash">
        <Image
          src={photoPath(item.folder, item.photos[0])}
          alt={item.title}
          fill
          className="object-cover object-[center_18%] transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      </span>
      <SpecLabel className="mt-4">
        {item.categoryLabel} · {item.photos.length} фото
      </SpecLabel>
      <span className="mt-2 flex items-baseline justify-between gap-3">
        <span className="font-display text-h3 font-semibold text-ink">
          {item.title}
        </span>
        <span
          aria-hidden
          className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
        >
          →
        </span>
      </span>
      <span className="mt-1 line-clamp-2 block text-sm text-muted">
        {item.place}
      </span>
    </button>
  );
}

export function ApparelSolutions({ index }: { index?: string } = {}) {
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

  const active = gallery.find((item) => item.id === activeId) ?? null;

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      active
        ? active.photos.map((file, i) => ({
            src: photoPath(active.folder, file),
            alt: `${active.title}, фото ${i + 1}`,
            caption: active.title,
          }))
        : [],
    [active],
  );

  const closePanel = useCallback(() => {
    setActiveId(null);
    setLightboxIndex(null);
  }, []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <section id="apparel" className="section-y bg-surface text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Спецодежда"
          title="Наши работы по вышивке спецодежды"
          lead="Шьём любые спецодежды под ваш запрос — куртки, жилеты, комплекты и другие изделия. Любые дизайны, вышивка и шевроны под бренд или задачу."
        />

        <FilterTabs
          label="Фильтр работ"
          tabs={TABS}
          value={filter}
          onChange={setFilter}
          className="mt-12 sm:mt-16"
        />

        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-6">
          {filtered.map((item) => (
            <li key={item.id}>
              <WorkCard item={item} onOpen={() => setActiveId(item.id)} />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <SpecLabel>
            Показано {filtered.length} из {gallery.length} работ
          </SpecLabel>
          <ButtonLink href={WA_EMBROIDERY} variant="text">
            Бесплатная консультация в WhatsApp
          </ButtonLink>
        </div>
      </div>

      {active ? (
        <SidePanel
          eyebrow={active.categoryLabel}
          title={active.title}
          meta={`${active.photos.length} фото · ${active.place}`}
          onClose={closePanel}
          locked={lightboxIndex !== null}
          footer={
            <ButtonLink href={WA_EMBROIDERY} className="w-full">
              Обсудить похожее изделие
            </ButtonLink>
          }
        >
          <ul className="grid grid-cols-2 gap-2">
            {active.photos.map((file, i) => (
              <li key={file}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Открыть фото ${i + 1}`}
                  className="group relative block aspect-[3/4] w-full overflow-hidden bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Image
                    src={photoPath(active.folder, file)}
                    alt={`${active.title}, фото ${i + 1}`}
                    fill
                    className="object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="200px"
                  />
                  <span className="absolute top-2 left-2 bg-surface/90 px-1.5 py-0.5 font-mono text-[10px] text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </SidePanel>
      ) : null}

      {active && lightboxIndex !== null ? (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={closeLightbox}
        />
      ) : null}
    </section>
  );
}
