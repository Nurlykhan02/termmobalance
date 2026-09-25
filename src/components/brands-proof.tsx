import Image from "next/image";
import { asset } from "@/lib/asset";

type Shot = {
  src: string;
  width: number;
  height: number;
};

const SHOTS: Shot[] = [
  { src: asset("/images/apparel/kurtki/variant-1/01.jpg"), width: 480, height: 720 },
  { src: asset("/images/apparel/kurtki/variant-1/02.jpg"), width: 480, height: 640 },
  { src: asset("/images/apparel/zhilety/variant-1/01.jpg"), width: 480, height: 700 },
  { src: asset("/images/apparel/kurtki/variant-2/01.jpg"), width: 480, height: 760 },
  { src: asset("/images/apparel/kurtki/variant-2/05.jpg"), width: 480, height: 640 },
  { src: asset("/images/apparel/zhilety/variant-2/01.jpg"), width: 480, height: 680 },
  { src: asset("/images/apparel/kurtki/variant-1/05.jpg"), width: 480, height: 700 },
  { src: asset("/images/apparel/zhilety/variant-1/02.jpg"), width: 480, height: 640 },
  { src: asset("/images/apparel/kurtki/variant-1/03.jpg"), width: 480, height: 720 },
];

const COLUMNS: Shot[][] = Array.from({ length: 9 }, (_, column) => {
  const start = (column * 2) % SHOTS.length;
  return [0, 1, 2].map((offset) => SHOTS[(start + offset) % SHOTS.length]);
});

const CLIENTS = Array.from({ length: 20 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `client-${n}`,
    src: asset(`/images/trusted/client-${n}.png`),
  };
});

function ShotColumn({ shots, index }: { shots: Shot[]; index: number }) {
  return (
    <div
      className={`flex w-[clamp(148px,12.5vw,230px)] shrink-0 flex-col ${
        index % 2 === 0
          ? "reviews-mosaic-col--up"
          : "reviews-mosaic-col--down"
      }`}
      style={{ animationDelay: `${-index * 7}s` }}
    >
      {[0, 1, 2].map((copy) => (
        <div key={copy} className="flex flex-col gap-3.5 pb-3.5">
          {shots.map((shot) => (
            <Image
              key={`${copy}-${shot.src}`}
              src={shot.src}
              alt=""
              width={shot.width}
              height={shot.height}
              sizes="230px"
              className="block h-auto w-full rounded-[10px] shadow-[0_18px_48px_rgba(14,16,19,0.18)]"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function BrandsCollaborate() {
  return (
    <section
      id="reviews"
      className="relative isolate h-[min(88vh,840px)] min-h-[560px] overflow-hidden bg-surface text-ink"
    >
      <div className="reviews-mosaic-frame pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 flex w-[168%] items-start justify-center gap-3.5"
          style={{ transform: "translate(-50%, -46%) rotate(-6deg)" }}
        >
          {COLUMNS.map((shots, index) => (
            <ShotColumn key={index} shots={shots} index={index} />
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 88% 74% at 50% 50%, color-mix(in oklab, var(--surface) 97%, transparent) 0%, color-mix(in oklab, var(--surface) 90%, transparent) 54%, transparent 80%)",
        }}
      />

      <div className="relative z-[3] flex h-full items-center justify-center px-5">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[12px] font-medium tracking-[0.14em] text-muted uppercase">
            Снова и снова
          </p>
          <h2 className="font-display mt-3 text-[clamp(1.85rem,4.6vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-ink">
            С нами сотрудничают снова и снова
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[14px] leading-relaxed text-muted sm:text-[16px]">
            Фабрики, сети и госзаказчики возвращаются за новыми тиражами —
            утеплители и спецодежда со своего завода в Шымкенте.
          </p>
        </div>
      </div>
    </section>
  );
}

export function BrandsClients() {
  return (
    <section
      id="trusted"
      aria-label="С кем мы работаем"
      className="overflow-hidden bg-surface px-5 pt-2 pb-12 text-center sm:pb-16"
    >
      <h2 className="mb-[30px] font-mono text-[12px] font-medium tracking-[0.14em] text-muted uppercase">
        С кем мы работаем
      </h2>

      <div className="trusted-by-marquee overflow-hidden">
        <div className="trusted-by-track flex w-max items-center gap-10 pr-10">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10">
              {CLIENTS.map((client) => (
                <Image
                  key={`${copy}-${client.id}`}
                  src={client.src}
                  alt=""
                  width={176}
                  height={48}
                  className="h-8 w-auto max-w-[148px] object-contain opacity-75 transition-opacity duration-200 hover:opacity-100 sm:h-9"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
