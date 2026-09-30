"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { FilterTabs, type FilterTab } from "@/components/ui/filter-tabs";
import { Icon } from "@/components/ui/icon";
import { Lightbox } from "@/components/ui/lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { SidePanel } from "@/components/ui/side-panel";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";

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

const TABS: FilterTab<CategoryId>[] = CATEGORIES.map((category) => ({
  ...category,
  count: lines.filter((line) => line.brand === category.id).length,
}));

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

function LineCard({
  line,
  onOpen,
}: {
  line: CatalogLine;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Подробнее: ${line.name}`}
      className="group block w-full cursor-pointer text-left transition-transform duration-200 ease-out-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.985]"
    >
      <span className="relative block aspect-[4/5] overflow-hidden bg-wash sm:aspect-[3/4]">
        <Image
          src={lineImage(line)}
          alt={line.name}
          fill
          className="object-cover object-[center_12%] transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent sm:from-ink/0 sm:group-hover:from-ink/40 sm:group-hover:via-ink/10"
        />
        <span className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-accent text-surface shadow-[0_8px_20px_-10px] shadow-ink/50 transition-transform duration-300 ease-out-soft group-hover:rotate-45 sm:top-4 sm:right-4">
          <Icon name="arrow-up-right" className="size-4" />
        </span>
        <span className="absolute inset-x-3 bottom-3 flex min-h-11 items-center justify-between gap-2 bg-accent px-3.5 text-[14px] font-medium text-surface shadow-[0_10px_24px_-12px] shadow-ink/50 sm:inset-x-4 sm:bottom-4">
          Подробнее
          <Icon
            name="arrow-right"
            className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </span>
      <SpecLabel className="mt-4">{line.brandLabel}</SpecLabel>
      <span className="mt-2 block font-display text-h3 font-semibold text-ink">
        {line.name}
      </span>
      <span className="mt-1 line-clamp-2 block text-sm text-muted">
        {line.use}
      </span>
    </button>
  );
}

export function CatalogTeaser({ index }: { index?: string } = {}) {
  const [filter, setFilter] = useState<CategoryId>("teksulate");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [imageZoomed, setImageZoomed] = useState(false);

  const filtered = useMemo(
    () => lines.filter((line) => line.brand === filter),
    [filter],
  );

  const active = lines.find((line) => line.id === activeId) ?? null;

  const closePanel = useCallback(() => {
    setActiveId(null);
    setImageZoomed(false);
  }, []);
  const closeZoom = useCallback(() => setImageZoomed(false), []);

  return (
    <section id="catalog" className="section-y bg-canvas-2 text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Материалы"
          title="Линейки утеплителей с нашего завода"
          lead="Производим в Шымкенте с 2008 года из полиэфирных волокон и легкоплавкого П/Э. Материалы идут на спецодежду, форму и зимнюю экипировку — напрямую со швейными фабриками Казахстана."
        />

        <FilterTabs
          label="Фильтр линеек"
          tabs={TABS}
          value={filter}
          onChange={setFilter}
          className="mt-12 sm:mt-16"
        />

        <ul className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-6">
          {filtered.map((line) => (
            <li key={line.id}>
              <LineCard line={line} onOpen={() => setActiveId(line.id)} />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <SpecLabel>
            Показано {filtered.length} из {lines.length} линеек · завод в Шымкенте
          </SpecLabel>
          <ButtonLink href={WA_CONSULT} variant="text">
            Бесплатная консультация в WhatsApp
          </ButtonLink>
        </div>
      </div>

      {active ? (
        <SidePanel
          eyebrow={active.brandLabel}
          title={active.name}
          meta={active.use}
          onClose={closePanel}
          locked={imageZoomed}
          footer={
            <ButtonLink href={waForLine(active.name)} className="w-full">
              Получить образец
            </ButtonLink>
          }
        >
          <button
            type="button"
            onClick={() => setImageZoomed(true)}
            aria-label={`Увеличить фото: ${active.name}`}
            className="group relative block aspect-[4/3] w-full overflow-hidden bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Image
              src={lineImage(active)}
              alt={active.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="400px"
            />
            <span className="absolute right-2 bottom-2 bg-surface/90 px-2 py-1 font-mono text-[10px] text-ink uppercase">
              Увеличить
            </span>
          </button>

          <SpecLabel className="mt-6">Состав и производство</SpecLabel>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/85">
            {active.material}
          </p>

          <ul className="mt-6 border-t border-line">
            {active.highlights.map((item) => (
              <li
                key={item}
                className="border-b border-line py-3 text-[14px] leading-snug text-ink/85"
              >
                {item}
              </li>
            ))}
          </ul>

          <ButtonLink
            href={
              "https://wa.me/77781200084?text=" +
              encodeURIComponent(
                `Здравствуйте! Пришлите, пожалуйста, техкарту материала ${active.name}: плотность, толщина, ширина рулона.`,
              )
            }
            variant="text"
            className="mt-6"
          >
            Запросить техкарту: плотность, толщина, ширина рулона
          </ButtonLink>
        </SidePanel>
      ) : null}

      {active && imageZoomed ? (
        <Lightbox
          items={[{ src: lineImage(active), alt: active.name, caption: active.brandLabel }]}
          index={0}
          onIndexChange={() => {}}
          onClose={closeZoom}
        />
      ) : null}
    </section>
  );
}
