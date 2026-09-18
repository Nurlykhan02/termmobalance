import { HeroBackground } from "@/components/hero-background";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-background">
      <HeroBackground />

      <div className="mx-auto flex min-h-[100svh] max-w-[1380px] flex-col justify-end px-4 pt-28 pb-5 sm:px-[30px] sm:pb-10">
        <div className="max-w-[520px] rounded-[18px] border border-white/10 bg-black/38 px-3.5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md sm:max-w-[560px] sm:px-5 sm:py-4 lg:px-5 lg:py-4.5">
          <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 sm:mb-2.5">
            <p className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.07em] text-white/90 uppercase sm:text-[11px]">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" />
              с 2008 · Шымкент · свой завод
            </p>
            <SmoothScrollLink
              href="#about"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-2 py-0.5 text-[10px] font-medium text-white/85 transition-colors hover:bg-white/14 sm:text-[11px]"
            >
              Доставка по всей республике
            </SmoothScrollLink>
          </div>

          <h1 className="text-[clamp(1.45rem,4.2vw,2.55rem)] leading-[1.07] font-semibold tracking-[-0.04em] text-white">
            Утеплители и наполнители для текстиля
          </h1>

          <p className="mt-2 max-w-[400px] text-[12.5px] leading-snug text-white/88 sm:mt-2.5 sm:text-[14px] sm:leading-relaxed">
            Производим материалы и шьём утеплённую спецодежду на заказ —
            напрямую с производства в Казахстане.
          </p>

          <div className="mt-3.5 flex flex-wrap items-center gap-2 sm:mt-4">
            <SmoothScrollLink
              href="#catalog"
              className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-ink transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-[13px]"
            >
              Нужен материал
            </SmoothScrollLink>

            <SmoothScrollLink
              href="#apparel"
              className="inline-flex items-center rounded-full border border-white/45 bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-white/20 sm:px-4 sm:py-2 sm:text-[13px]"
            >
              Нужна спецодежда
            </SmoothScrollLink>

            <a
              href="https://wa.me/77781200084"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/40 px-3.5 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-white/10 sm:px-4 sm:py-2 sm:text-[13px]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
