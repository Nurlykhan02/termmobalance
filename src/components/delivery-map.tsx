"use client";

import { KZ_OUTLINE } from "./delivery-map-geometry";

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

function DeliveryRoutes() {
  return (
    <g aria-hidden className="delivery-routes">
      {CITIES.map((city) => {
        const midX = (SHYMKENT.x + city.x) / 2;
        const midY = Math.min(SHYMKENT.y, city.y) - 28;
        return (
          <path
            key={city.id}
            d={`M${SHYMKENT.x} ${SHYMKENT.y} Q${midX} ${midY} ${city.x} ${city.y}`}
            fill="none"
            stroke="#1f9e96"
            strokeOpacity="0.38"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeDasharray="4 8"
          />
        );
      })}
    </g>
  );
}

function KazakhstanSvg() {
  return (
    <svg
      viewBox="0 0 960 560"
      role="img"
      aria-label="Карта Казахстана: производство в Шымкенте, доставка по всей стране"
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient id="kz-fill" x1="12%" y1="8%" x2="88%" y2="92%">
          <stop offset="0%" stopColor="#1f9e96" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#1f9e96" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#210e03" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="kz-stroke" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#1f9e96" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#1f9e96" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1f9e96" stopOpacity="0.45" />
        </linearGradient>
        <filter id="kz-soft" x="-8%" y="-8%" width="116%" height="116%">
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
        <radialGradient id="hq-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1f9e96" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1f9e96" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="500"
        cy="290"
        rx="420"
        ry="220"
        fill="#1f9e96"
        opacity="0.045"
      />

      <path
        d={KZ_OUTLINE}
        fill="url(#kz-fill)"
        stroke="url(#kz-stroke)"
        strokeWidth="2.75"
        strokeLinejoin="round"
        filter="url(#kz-soft)"
      />

      <DeliveryRoutes />

      {CITIES.map((city) => (
        <g
          key={city.id}
          className={city.major ? undefined : "max-sm:opacity-0"}
        >
          <circle
            cx={city.x}
            cy={city.y}
            r={city.major ? 5 : 3.75}
            fill="#f7f5f0"
            stroke="#1f9e96"
            strokeWidth="1.5"
          />
          <text
            x={city.x}
            y={city.y - (city.major ? 14 : 11)}
            textAnchor="middle"
            fill="#6d635c"
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
          fill="url(#hq-glow)"
          className="hq-pulse"
        />
        <circle
          cx={SHYMKENT.x}
          cy={SHYMKENT.y}
          r="24"
          fill="none"
          stroke="#1f9e96"
          strokeWidth="1.6"
          strokeOpacity="0.5"
          className="hq-ring"
        />
        <circle cx={SHYMKENT.x} cy={SHYMKENT.y} r="9" fill="#1f9e96" />
        <circle cx={SHYMKENT.x} cy={SHYMKENT.y} r="3.75" fill="#f7f5f0" />

        <g transform={`translate(${SHYMKENT.x - 58}, ${SHYMKENT.y + 20})`}>
          <rect width="116" height="30" rx="15" fill="#210e03" />
          <text
            x="58"
            y="19.5"
            textAnchor="middle"
            fill="#f7f5f0"
            fontSize="12.5"
            fontWeight="600"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            Шымкент · завод
          </text>
        </g>
      </g>
    </svg>
  );
}

export function DeliveryMap() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f3f0ea] px-4 py-14 text-ink sm:px-[30px] sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,rgba(31,158,150,0.16),transparent_52%),radial-gradient(ellipse_at_12%_85%,rgba(33,14,3,0.05),transparent_48%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(rgba(33,14,3,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(33,14,3,0.035)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_72%)]"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
            Доставка по всему Казахстану
          </h2>

          <p className="mt-3 text-[14px] leading-relaxed text-muted sm:text-[16px]">
            Производим в Шымкенте и отправляем утеплители, наполнители и
            спецодежду в любой регион — от Актау до Усть-Каменогорска.
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-[1000px] sm:mt-12">
          <div className="rounded-[24px] border border-ink/[0.05] bg-white/60 px-1 py-4 shadow-[0_24px_70px_rgba(33,14,3,0.07)] backdrop-blur-sm sm:rounded-[28px] sm:px-4 sm:py-7 lg:px-8 lg:py-9">
            <KazakhstanSvg />
          </div>
        </div>

        <ul className="mx-auto mt-9 flex max-w-[880px] flex-col divide-y divide-ink/10 border-y border-ink/10 sm:mt-11 sm:flex-row sm:divide-x sm:divide-y-0">
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
    </section>
  );
}
