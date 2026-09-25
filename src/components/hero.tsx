import type { ReactNode } from "react";
import { HeroBackground } from "@/components/hero-background";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";

type HeroAction = {
  href: string;
  label: string;
  tone: "solid" | "soft" | "ghost";
};

const HOME_ACTIONS: HeroAction[] = [
  { href: "#catalog", label: "Нужен материал", tone: "solid" },
  { href: "#apparel", label: "Нужна спецодежда", tone: "soft" },
  { href: "https://wa.me/77781200084", label: "WhatsApp", tone: "ghost" },
];

const ACTION_CLASS: Record<HeroAction["tone"], string> = {
  solid:
    "inline-flex items-center rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-opacity hover:opacity-90 sm:px-5 sm:py-3 sm:text-[14px]",
  soft: "inline-flex items-center rounded-full border border-white/45 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/20 sm:px-5 sm:py-3 sm:text-[14px]",
  ghost:
    "inline-flex items-center rounded-full border border-white/40 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white/10 sm:px-5 sm:py-3 sm:text-[14px]",
};

export function Hero({
  backgroundSrc,
  eyebrow = "Шымкент · свой завод · с 2008",
  title = "Утеплители и наполнители для текстиля",
  description,
  actions = HOME_ACTIONS,
}: {
  backgroundSrc?: string;
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  actions?: HeroAction[];
} = {}) {
  const body = description ?? (
    <>
      Производим материалы и шьём утеплённую спецодежду на заказ — со своего
      завода <span className="font-semibold text-white">в Казахстане</span>.
      Работаем с фабриками и заказчиками{" "}
      <span className="font-semibold text-accent">по всей стране</span>.
    </>
  );

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-background">
      <HeroBackground src={backgroundSrc} />

      <div className="mx-auto flex min-h-[100svh] max-w-[1380px] flex-col justify-end px-4 pt-24 pb-8 sm:px-[30px] sm:pb-12 lg:pb-14">
        <div className="max-w-[600px] rounded-2xl border border-white/10 bg-black/42 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.3)] backdrop-blur-md sm:max-w-[640px] sm:p-6 lg:p-7">
          <p className="mb-2.5 text-[11px] font-medium tracking-[0.1em] text-white/60 uppercase sm:mb-3">
            {eyebrow}
          </p>
          <h1 className="text-[clamp(1.75rem,5vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-white">
            {title}
          </h1>

          <p className="mt-3 max-w-[520px] text-[14px] leading-relaxed text-white/85 sm:mt-4 sm:text-[17px]">
            {body}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
            {actions.map((action) =>
              action.href.startsWith("#") ? (
                <SmoothScrollLink
                  key={action.label}
                  href={action.href}
                  className={ACTION_CLASS[action.tone]}
                >
                  {action.label}
                </SmoothScrollLink>
              ) : (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ACTION_CLASS[action.tone]}
                >
                  {action.label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
