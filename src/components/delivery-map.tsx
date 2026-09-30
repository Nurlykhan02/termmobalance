"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { PauseOffscreen } from "@/components/ui/pause-offscreen";
import { SectionHeading } from "@/components/ui/section-heading";
import { SidePanel } from "@/components/ui/side-panel";
import { SpecLabel } from "@/components/ui/spec-label";
import { useInView } from "@/hooks/use-in-view";
import { asset } from "@/lib/asset";
import { KZ_OUTLINE } from "./delivery-map-geometry";

const FACTORY_PHOTO = asset("/images/factory/plant.jpg");

const WA_FACTORY =
  "https://wa.me/77781200084?text=" +
  encodeURIComponent(
    "Здравствуйте! Хочу узнать о заводе Termmo Balance в Шымкенте — материалы и спецодежда.",
  );

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
const VIEW = { w: 960, h: 560 };

const FACTORY_POINTS = [
  "Линейки Teksulate, UniFiber и стёжка — с одной площадки",
  "Склад на месте: отгружаем объём без перекупщиков",
  "Доставка в любой регион — от Актау до Усть-Каменогорска",
  "Со швейными фабриками и государственными заказчиками с 2008 года",
];

const FACTS = [
  { title: "Шымкент", text: "Свой завод и склад — отсюда едет весь объём" },
  { title: "Куда угодно", text: "Доставка материалов и продукции по всей республике" },
  { title: "С 2008", text: "Со швейными фабриками и госзаказами по РК" },
];

function DeliveryRoutes() {
  return (
    <g aria-hidden className="delivery-routes">
      {CITIES.map((city, i) => {
        const midX = (SHYMKENT.x + city.x) / 2;
        const midY = Math.min(SHYMKENT.y, city.y) - 28;
        return (
          <path
            key={city.id}
            d={`M${SHYMKENT.x} ${SHYMKENT.y} Q${midX} ${midY} ${city.x} ${city.y}`}
            pathLength={1}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.55"
            strokeWidth="1.25"
            strokeLinecap="round"
            style={{ transitionDelay: `${i * 90}ms` }}
          />
        );
      })}
    </g>
  );
}

function KazakhstanSvg() {
  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      <path
        d={KZ_OUTLINE}
        fill="color-mix(in oklab, var(--accent) 7%, transparent)"
        stroke="var(--ink)"
        strokeOpacity="0.35"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />

      <DeliveryRoutes />

      {CITIES.map((city) => (
        <g key={city.id} className={city.major ? undefined : "max-sm:hidden"}>
          <circle
            cx={city.x}
            cy={city.y}
            r={city.major ? 4 : 3}
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="1.25"
          />
          <text
            x={city.x}
            y={city.y - (city.major ? 13 : 10)}
            textAnchor="middle"
            fill="var(--muted)"
            fontSize={city.major ? 13 : 11}
            style={{ fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.04em" }}
          >
            {city.name}
          </text>
        </g>
      ))}

      <circle
        cx={SHYMKENT.x}
        cy={SHYMKENT.y}
        r="28"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.25"
        strokeOpacity="0.6"
        className="hq-ring"
      />
    </svg>
  );
}

function FactoryPin({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label="Завод Termmo Balance в Шымкенте"
      className="group absolute z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{
        left: `${(SHYMKENT.x / VIEW.w) * 100}%`,
        top: `${(SHYMKENT.y / VIEW.h) * 100}%`,
      }}
    >
      <span className="relative size-10 overflow-hidden rounded-full bg-accent ring-2 ring-surface transition-transform group-hover:scale-110 sm:size-12">
        <Image src={FACTORY_PHOTO} alt="" fill className="object-cover" sizes="48px" />
      </span>
    </button>
  );
}

function FactoryCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex w-full items-center gap-4 border border-line bg-surface p-3 text-left transition-colors hover:border-ink/30 md:absolute md:bottom-5 md:left-5 md:w-[min(100%,360px)]"
    >
      <span className="relative h-16 w-20 shrink-0 overflow-hidden bg-wash">
        <Image src={FACTORY_PHOTO} alt="" fill className="object-cover" sizes="80px" />
      </span>
      <span className="min-w-0 flex-1">
        <SpecLabel>Шымкент · с 2008</SpecLabel>
        <span className="mt-1 block font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
          Завод Termmo Balance
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-muted">
          Утеплители, наполнители и спецодежда
        </span>
      </span>
      <span
        aria-hidden
        className="pr-1 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
      >
        →
      </span>
    </button>
  );
}

function MapCanvas({ onOpenFactory }: { onOpenFactory: () => void }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div ref={ref} data-drawn={inView}>
      <PauseOffscreen className="relative aspect-[960/560] w-full">
        <KazakhstanSvg />
        <FactoryPin onOpen={onOpenFactory} />
        <div className="hidden md:block">
          <FactoryCard onOpen={onOpenFactory} />
        </div>
      </PauseOffscreen>
      <div className="mt-4 md:hidden">
        <FactoryCard onOpen={onOpenFactory} />
      </div>
    </div>
  );
}

const FACTORY_ZOOM: LightboxItem[] = [
  { src: FACTORY_PHOTO, alt: "Производственный цех Termmo Balance" },
];

function FactoryPanel({ onClose }: { onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);
  const closeZoom = useCallback(() => setZoomed(false), []);

  return (
    <>
      {zoomed ? (
        <Lightbox
          items={FACTORY_ZOOM}
          index={0}
          onIndexChange={() => {}}
          onClose={closeZoom}
        />
      ) : null}
      <FactoryDrawer onClose={onClose} locked={zoomed} onZoom={() => setZoomed(true)} />
    </>
  );
}

function FactoryDrawer({
  onClose,
  locked,
  onZoom,
}: {
  onClose: () => void;
  locked: boolean;
  onZoom: () => void;
}) {
  return (
    <SidePanel
      eyebrow="Производство"
      title="Завод в Шымкенте"
      meta="ул. Жибек-Жолы 66/3"
      onClose={onClose}
      locked={locked}
      footer={
        <ButtonLink href={WA_FACTORY} className="w-full">
          Написать заводу
        </ButtonLink>
      }
    >
      <button
        type="button"
        onClick={onZoom}
        aria-label="Увеличить фото завода"
        className="relative block aspect-[16/10] w-full overflow-hidden bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Image
          src={FACTORY_PHOTO}
          alt="Производственный цех Termmo Balance"
          fill
          className="object-cover"
          sizes="420px"
        />
        <span className="absolute right-2 bottom-2 bg-surface/90 px-2 py-1 font-mono text-[10px] text-ink uppercase">
          Увеличить
        </span>
      </button>

      <p className="mt-5 text-[15px] leading-relaxed text-ink/85">
        Свой завод и склад в Шымкенте: производим утеплители и наполнители для
        текстиля и шьём утеплённую спецодежду на заказ. Отсюда материал и
        готовые изделия уходят по всему Казахстану.
      </p>

      <ul className="mt-6 border-t border-line">
        {FACTORY_POINTS.map((item) => (
          <li
            key={item}
            className="border-b border-line py-3 text-[14px] leading-snug text-ink/85"
          >
            {item}
          </li>
        ))}
      </ul>

      <ButtonLink
        href="#history"
        variant="text"
        onClick={onClose}
        className="mt-6"
      >
        История компании с 2008 года
      </ButtonLink>
    </SidePanel>
  );
}

export function DeliveryMap({ index }: { index?: string } = {}) {
  const [factoryOpen, setFactoryOpen] = useState(false);
  const closeFactory = useCallback(() => setFactoryOpen(false), []);
  const openFactory = useCallback(() => setFactoryOpen(true), []);

  return (
    <section id="about" className="section-y bg-canvas-2 text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Завод и доставка"
          title="Доставка по всему Казахстану"
          lead="Производим в Шымкенте и отправляем утеплители, наполнители и спецодежду в любой регион — от Актау до Усть-Каменогорска."
        />

        <div className="mt-12 sm:mt-16 lg:mx-auto lg:max-w-[1040px]">
          <MapCanvas onOpenFactory={openFactory} />
        </div>

        <ul className="mt-12 grid gap-px border-y border-line bg-line sm:mt-16 sm:grid-cols-3">
          {FACTS.map((fact) => (
            <li key={fact.title} className="bg-canvas-2 py-6 sm:px-6 sm:first:pl-0">
              <p className="font-display text-h3 font-semibold text-ink">
                {fact.title}
              </p>
              <p className="mt-2 text-sm text-muted">{fact.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {factoryOpen ? <FactoryPanel onClose={closeFactory} /> : null}
    </section>
  );
}
