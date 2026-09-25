"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { useSwipeToClose } from "@/hooks/use-swipe-to-close";
import {
  CompanyHistoryTimeline,
  type HistoryPeriod,
} from "./company-history-timeline";
import { KZ_OUTLINE } from "./delivery-map-geometry";

const FACTORY_PHOTO = asset("/images/factory/plant.jpg");

const WA_FACTORY =
  "https://wa.me/77781200084?text=" +
  encodeURIComponent(
    "Здравствуйте! Хочу узнать о заводе Termmo Balance в Шымкенте — материалы и спецодежда.",
  );

/** История компании — с termmobalance.net */
const COMPANY_HISTORY: readonly HistoryPeriod[] = [
  {
    year: "2008 – 2010",
    label: "Старт",
    items: [
      "Запуск первой линии производства утеплителей под брендом Синтермо",
      "Начало работы компании, направленной на создание инновационных материалов для текстиля",
      "Запуск линии по производству наполнителей для текстильной промышленности",
      "Расширение ассортимента продукции для работы с швейными фабриками",
    ],
  },
  {
    year: "2012 – 2013",
    label: "Стандарты",
    items: [
      "Разработка методик и оформление стандартов по выпуску высококачественной продукции утеплителей",
      "Продукция марок UniFiber и Teksulate успешно прошла этапы испытаний на качество",
      "Расширение и строительство производственных площадей площадью 500 м² для линий нетканых материалов",
      "Подготовка к запуску новых производственных направлений",
    ],
  },
  {
    year: "2014 – 2015",
    label: "Госзаказы",
    items: [
      "Запуск линии по производству нетканого полотна и наполнителей для одеял",
      "Внедрена линия стегальной машины для пошива подкладок — ускорили производство и качество спецодежды партнёров",
      "Заключение долгосрочного контракта с Министерством обороны на обеспечение высококачественными утеплителями",
      "Укрепление позиций компании как надёжного партнёра для государственных структур",
    ],
  },
  {
    year: "2016 – 2017",
    label: "Швейный цех",
    items: [
      "Расширение производственных мощностей на 900 м² для создания швейного производства",
      "Подготовка к масштабному выпуску спецодежды и других текстильных изделий",
    ],
  },
  {
    year: "2018 – 2019",
    label: "Масштаб",
    items: [
      "Приобретение дополнительного оборудования для модернизации основной линии производства утеплителей",
      "Увеличение производительности линии в три раза — охват большего числа клиентов и новые рынки",
      "Запуск двух стегальных линий для пошива одеял",
      "Расширение ассортимента продукции для дома и гостиничного сектора",
    ],
  },
  {
    year: "2020 – 2021",
    label: "Полный цикл",
    items: [
      "Внедрение линии сублимационной печати на тканях",
      "Организация производства трикотажных спортивных изделий",
      "Полноценный запуск швейной фабрики с автоматизированными линиями",
      "Налаживание производства специализированной утеплённой одежды для различных отраслей",
    ],
  },
  {
    year: "2023",
    label: "2EASY",
    items: [
      "Расширение производственных мощностей на дополнительные 200 м²",
      "Увеличение объёмов выпуска и подготовка к освоению новых рынков",
      "Запуск трикотажной молодёжной одежды под брендом 2EASY",
    ],
  },
  {
    year: "2024 и далее",
    label: "Вперёд",
    items: [
      "Планы по дальнейшему расширению, совершенствованию технологий и укреплению позиций на рынке Казахстана и за его пределами",
    ],
  },
];

const CITIES = [
  { id: "astana", name: "Астана", x: 578.8, y: 170.9, major: true },
  { id: "almaty", name: "Алматы", x: 726.7, y: 424.9, major: true },
  { id: "aktau", name: "Актау", x: 103.5, y: 387.6, major: true },
  { id: "atyrau", name: "Атырау", x: 142.6, y: 277, major: false },
  { id: "aktobe", name: "Актобе", x: 274.4, y: 189.8, major: false },
  { id: "karaganda", name: "Караганда", x: 616.9, y: 214.2, major: false },
  { id: "pavlodar", name: "Павлодар", x: 689.4, y: 122.6, major: false },
  {
    id: "oskemen",
    name: "Усть-Каменогорск",
    x: 820.3,
    y: 180.2,
    major: true,
  },
] as const;

const SHYMKENT = { x: 549.4, y: 470.1 };

interface MapViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Full national outline — same on mobile and desktop. */
const FULL_VIEW: MapViewBox = { x: 0, y: 0, w: 960, h: 560 };

function isInView(
  x: number,
  y: number,
  view: MapViewBox,
  pad = 28,
) {
  return (
    x > view.x + pad &&
    x < view.x + view.w - pad &&
    y > view.y + pad &&
    y < view.y + view.h - pad
  );
}

function DeliveryRoutes({ view }: { view: MapViewBox }) {
  return (
    <g aria-hidden className="delivery-routes">
      {CITIES.filter((city) => isInView(city.x, city.y, view, 8)).map(
        (city) => {
          const midX = (SHYMKENT.x + city.x) / 2;
          const midY = Math.min(SHYMKENT.y, city.y) - 28;
          return (
            <path
              key={city.id}
              d={`M${SHYMKENT.x} ${SHYMKENT.y} Q${midX} ${midY} ${city.x} ${city.y}`}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.38"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeDasharray="4 8"
            />
          );
        },
      )}
    </g>
  );
}

function KazakhstanSvg({
  view,
  uid,
}: {
  view: MapViewBox;
  uid: string;
}) {
  return (
    <svg
      viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-hidden
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id={`${uid}-fill`} x1="12%" y1="8%" x2="88%" y2="92%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={`${uid}-stroke`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
          <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.45" />
        </linearGradient>
        <filter id={`${uid}-soft`} x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="b" />
          <feOffset dy="4" result="o" />
          <feComponentTransfer in="o" result="s">
            <feFuncA type="linear" slope="0.12" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="s" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="500"
        cy="290"
        rx="420"
        ry="220"
        fill="var(--accent)"
        opacity="0.045"
      />

      <path
        d={KZ_OUTLINE}
        fill={`url(#${uid}-fill)`}
        stroke={`url(#${uid}-stroke)`}
        strokeWidth="2.75"
        strokeLinejoin="round"
        filter={`url(#${uid}-soft)`}
      />

      <DeliveryRoutes view={view} />

      {CITIES.filter((city) => isInView(city.x, city.y, view)).map((city) => (
        <g key={city.id} className={city.major ? undefined : "max-sm:hidden"}>
          <circle
            cx={city.x}
            cy={city.y}
            r={city.major ? 5 : 3.75}
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x={city.x}
            y={city.y - (city.major ? 14 : 11)}
            textAnchor="middle"
            fill="var(--muted)"
            fontSize={city.major ? 13 : 11}
            fontWeight="500"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {city.name}
          </text>
        </g>
      ))}

      <g className="shymkent-hq">
        <circle
          cx={SHYMKENT.x}
          cy={SHYMKENT.y}
          r="42"
          fill={`url(#${uid}-glow)`}
          className="hq-pulse"
        />
        <circle
          cx={SHYMKENT.x}
          cy={SHYMKENT.y}
          r="28"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeOpacity="0.5"
          className="hq-ring"
        />
      </g>
    </svg>
  );
}

function FactoryPin({
  view,
  onOpen,
}: {
  view: MapViewBox;
  onOpen: () => void;
}) {
  const left = ((SHYMKENT.x - view.x) / view.w) * 100;
  const top = ((SHYMKENT.y - view.y) / view.h) * 100;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label="Завод Termmo Balance в Шымкенте"
      className="absolute z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:size-[4.5rem]"
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      <span className="shadow-accent-btn relative size-11 overflow-hidden rounded-full bg-accent ring-[3px] ring-white transition-transform hover:scale-105 sm:size-14">
        <Image
          src={FACTORY_PHOTO}
          alt=""
          fill
          className="object-cover object-center"
          sizes="56px"
          quality={70}
        />
      </span>
    </button>
  );
}

function FactoryCard({
  onOpen,
  stacked = false,
}: {
  onOpen: () => void;
  stacked?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className={
        stacked
          ? "relative z-20 flex w-full gap-3 rounded-2xl border border-ink/8 bg-white p-2.5 text-left shadow-[0_10px_28px_rgba(33,14,3,0.1)]"
          : "absolute inset-x-auto left-5 bottom-5 z-20 flex w-[min(100%,340px)] gap-3 rounded-2xl border border-ink/8 bg-white/95 p-2.5 text-left shadow-[0_16px_40px_rgba(33,14,3,0.16)] backdrop-blur-md"
      }
    >
      <span className="relative h-[68px] w-[80px] shrink-0 overflow-hidden rounded-xl bg-wash sm:h-[84px] sm:w-[104px]">
        <Image
          src={FACTORY_PHOTO}
          alt=""
          fill
          className="object-cover"
          sizes="104px"
          quality={72}
        />
      </span>
      <span className="min-w-0 flex-1 py-0.5 pr-1">
        <span className="block text-[11px] font-medium tracking-[0.04em] text-accent uppercase">
          Шымкент · с 2008
        </span>
        <span className="mt-0.5 block font-display text-[14px] leading-tight font-semibold tracking-[-0.03em] text-ink sm:text-[16px]">
          Завод Termmo Balance
        </span>
        <span className="mt-1 block text-[12px] leading-snug text-muted">
          Утеплители, наполнители и спецодежда — со своего производства.
        </span>
        <span className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
          О заводе
          <span aria-hidden>→</span>
        </span>
      </span>
    </button>
  );
}

function MapCanvas({
  onOpenFactory,
  showOverlayCard = false,
}: {
  onOpenFactory: () => void;
  showOverlayCard?: boolean;
}) {
  return (
    <div className="relative aspect-[960/560] w-full overflow-hidden bg-canvas-2">
      <KazakhstanSvg view={FULL_VIEW} uid={showOverlayCard ? "kz-d" : "kz-m"} />
      <FactoryPin view={FULL_VIEW} onOpen={onOpenFactory} />
      {showOverlayCard ? <FactoryCard onOpen={onOpenFactory} /> : null}
    </div>
  );
}

function FactoryPanel({ onClose }: { onClose: () => void }) {
  const [panelSettled, setPanelSettled] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    panelRef,
    handlers: swipeHandlers,
    style: swipeStyle,
  } = useSwipeToClose({
    onClose,
    enabled: !imageZoomed,
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (imageZoomed) setImageZoomed(false);
      else onClose();
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [imageZoomed, onClose]);

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="factory-panel-title"
    >
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        {...swipeHandlers}
        style={swipeStyle}
        className={`panel-slide-in absolute inset-y-0 right-0 z-[1] flex h-[100dvh] w-[86%] max-w-[400px] flex-col bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.12)] sm:w-full${panelSettled ? " panel-slide-in--settled" : ""}`}
        onAnimationEnd={() => setPanelSettled(true)}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-black/[0.06] px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="min-w-0 pt-0.5">
            <p className="text-[12px] font-medium text-accent">Производство</p>
            <h3
              id="factory-panel-title"
              className="mt-0.5 text-[16px] font-semibold tracking-[-0.02em] text-ink sm:text-[18px]"
            >
              Завод в Шымкенте
            </h3>
            <p className="mt-0.5 text-[12px] text-muted sm:text-[13px]">
              ул. Жибек-Жолы 66/3
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[20px] leading-none text-white sm:size-10"
            aria-label="Закрыть"
          >
            ×
          </button>
        </header>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-scroll overscroll-y-contain px-4 py-3 [-webkit-overflow-scrolling:touch] [touch-action:pan-y] sm:px-5 sm:py-4"
        >
          <button
            type="button"
            onClick={() => setImageZoomed(true)}
            aria-label="Увеличить фото завода"
            className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-wash ring-1 ring-black/[0.06] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <Image
              src={FACTORY_PHOTO}
              alt="Производственный цех Termmo Balance"
              fill
              className="object-cover"
              sizes="400px"
              quality={82}
              priority
            />
            <span className="absolute right-2 bottom-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white">
              Увеличить
            </span>
          </button>

          <p className="mt-4 text-[14px] leading-relaxed text-ink/85">
            Свой завод и склад в Шымкенте: производим утеплители и наполнители
            для текстиля и шьём утеплённую спецодежду на заказ. Отсюда материал
            и готовые изделия уходят по всему Казахстану.
          </p>

          <ul className="mt-4 space-y-2.5 pb-2">
            {[
              "Линейки Teksulate, UniFiber и стёжка — с одной площадки",
              "Склад на месте: отгружаем объём без перекупщиков",
              "Доставка в любой регион — от Актау до Усть-Каменогорска",
              "Со швейными фабриками и государственными заказчиками с 2008 года",
            ].map((item) => (
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

          {/* История — строго после блока про завод */}
          <div className="mt-10 border-t border-black/[0.06] pt-8 pb-4">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">
              С 2008 года
            </p>
            <h4 className="mt-1 font-display text-[18px] font-semibold tracking-[-0.03em] text-ink sm:text-[20px]">
              История компании
            </h4>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
              От первой линии утеплителей до полного цикла — материалы, стёжка
              и пошив.
            </p>

            <CompanyHistoryTimeline
              periods={COMPANY_HISTORY}
              scrollRef={scrollRef}
            />
          </div>
        </div>

        <div className="relative z-10 shrink-0 border-t border-black/[0.06] bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:px-5 sm:pb-4">
          <a
            href={WA_FACTORY}
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-accent-btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-95"
          >
            Написать заводу
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {imageZoomed ? (
        <div
          className="fixed inset-0 z-[60] bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Фото завода"
          onClick={() => setImageZoomed(false)}
        >
          <Image
            src={FACTORY_PHOTO}
            alt="Производственный цех Termmo Balance"
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
  );
}

export function DeliveryMap() {
  const [factoryOpen, setFactoryOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative bg-surface py-14 text-ink sm:px-[30px] sm:py-20"
    >
      <div
        aria-hidden
        className="accent-veil-map pointer-events-none absolute inset-0 overflow-hidden"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[700px] px-4 text-center sm:px-0">
          <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
            Доставка по всему Казахстану
          </h2>

          <p className="mt-3 text-[14px] leading-relaxed text-muted sm:text-[16px]">
            Производим в Шымкенте и отправляем утеплители, наполнители и
            спецодежду в любой регион — от Актау до Усть-Каменогорска.
          </p>
        </div>

        <div className="relative mt-7 md:mx-auto md:mt-10 md:max-w-[920px]">
          <div className="overflow-hidden md:rounded-[20px] md:ring-1 md:ring-ink/[0.06]">
            <div className="md:hidden">
              <MapCanvas onOpenFactory={() => setFactoryOpen(true)} />
            </div>
            <div className="hidden md:block">
              <MapCanvas
                showOverlayCard
                onOpenFactory={() => setFactoryOpen(true)}
              />
            </div>
          </div>

          <div className="px-4 pt-3 md:hidden">
            <FactoryCard
              stacked
              onOpen={() => setFactoryOpen(true)}
            />
          </div>
        </div>

        <ul className="mx-auto mt-8 flex max-w-[880px] flex-col divide-y divide-ink/10 border-y border-ink/10 px-4 sm:mt-11 sm:flex-row sm:divide-x sm:divide-y-0 sm:px-0">
          <li className="flex-1 px-2 py-4 text-center sm:px-5 sm:py-5">
            <p className="font-display text-[1.25rem] font-semibold tracking-[-0.03em] text-accent sm:text-[1.4rem]">
              Шымкент
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-muted">
              Свой завод и склад — отсюда едет весь объём
            </p>
          </li>
          <li className="flex-1 px-2 py-4 text-center sm:px-5 sm:py-5">
            <p className="font-display text-[1.25rem] font-semibold tracking-[-0.03em] sm:text-[1.4rem]">
              Куда угодно
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-muted">
              Доставка материалов и продукции по всей республике
            </p>
          </li>
          <li className="flex-1 px-2 py-4 text-center sm:px-5 sm:py-5">
            <p className="font-display text-[1.25rem] font-semibold tracking-[-0.03em] sm:text-[1.4rem]">
              С 2008
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-muted">
              Со швейными фабриками и госзаказами по РК
            </p>
          </li>
        </ul>
      </div>

      {factoryOpen ? (
        <FactoryPanel onClose={() => setFactoryOpen(false)} />
      ) : null}
    </section>
  );
}
