import { HeroBackground } from "@/components/hero-background";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-background">
      <HeroBackground />

      <div className="mx-auto flex min-h-[100svh] max-w-[1380px] flex-col justify-end px-4 pt-24 pb-[18vh] sm:px-[30px] sm:pb-[16vh] lg:pb-20">
        <div className="max-w-[600px] rounded-2xl border border-white/10 bg-black/42 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.3)] backdrop-blur-md sm:max-w-[640px] sm:p-6 lg:p-7">
          <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 sm:mb-4">
            <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] text-white uppercase">
              <span className="size-2 shrink-0 rounded-full bg-accent" />
              с 2008 · Шымкент · свой завод
            </p>
            <SmoothScrollLink
              href="#about"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90 transition-colors hover:bg-white/18"
            >
              Доставка по всей республике
            </SmoothScrollLink>
          </div>

          <h1 className="text-[clamp(1.75rem,5vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-white">
            Утеплители и наполнители для текстиля
          </h1>

          <p className="mt-3 max-w-[460px] text-[14px] leading-relaxed text-white/92 sm:mt-4 sm:text-[17px]">
            Производим материалы и шьём утеплённую спецодежду на заказ —
            напрямую с производства в Казахстане.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
            <SmoothScrollLink
              href="#catalog"
              className="inline-flex items-center rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-opacity hover:opacity-90 sm:px-5 sm:py-3 sm:text-[14px]"
            >
              Нужен материал
            </SmoothScrollLink>

            <SmoothScrollLink
              href="#apparel"
              className="inline-flex items-center rounded-full border border-white/45 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/20 sm:px-5 sm:py-3 sm:text-[14px]"
            >
              Нужна спецодежда
            </SmoothScrollLink>

            <a
              href="https://wa.me/77781200084"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/40 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white/10 sm:px-5 sm:py-3 sm:text-[14px]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
