import Image from "next/image";
import { BrandPhotoWall } from "@/components/brand-photo-wall";
import { asset } from "@/lib/asset";

const CLIENTS = Array.from({ length: 20 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `client-${n}`,
    src: asset(`/images/trusted/client-${n}.png`),
  };
});

export function BrandsCollaborate() {
  return (
    <section
      id="reviews"
      className="relative isolate h-[min(88vh,840px)] min-h-[560px] overflow-hidden bg-surface text-ink"
    >
      <BrandPhotoWall scrim />

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
