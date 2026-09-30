import Link from "next/link";
import type { ReactNode } from "react";
import { HeroBackground } from "@/components/hero-background";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";
import { Icon } from "@/components/ui/icon";

type HeroAction = {
  href: string;
  label: string;
  /** One line under the label. */
  note?: string;
  /** Kept for existing callers; every action renders as a door. */
  tone?: "solid" | "soft" | "ghost";
};

const HOME_ACTIONS: HeroAction[] = [
  {
    href: "#catalog",
    label: "Утеплители и наполнители",
    note: "Teksulate, UniFiber, стёжка",
  },
  {
    href: "#apparel",
    label: "Спецодежда на заказ",
    note: "Куртки, жилеты, вышивка и шевроны",
  },
  {
    href: "/brands/",
    label: "Пошив для брендов",
    note: "Футболки, худи, свитшоты",
  },
];

const DOOR =
  "group flex items-start justify-between gap-4 border-t border-white/25 py-4 text-white transition-colors hover:border-white sm:min-h-24 sm:py-5 sm:pr-6";

function Door({ action, index }: { action: HeroAction; index: number }) {
  const body = (
    <>
      <span className="min-w-0">
        <span className="font-mono text-label text-white/55">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-2 block text-[17px] font-semibold tracking-[-0.02em] sm:text-[19px]">
          {action.label}
        </span>
        {action.note ? (
          <span className="mt-1 block text-[13px] text-white/65">
            {action.note}
          </span>
        ) : null}
      </span>
      <Icon
        name={action.href.startsWith("#") ? "arrow-right" : "arrow-up-right"}
        className="mt-1 size-5 shrink-0 sm:mt-6 text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
      />
    </>
  );

  if (action.href.startsWith("#")) {
    return (
      <SmoothScrollLink href={action.href} className={DOOR}>
        {body}
      </SmoothScrollLink>
    );
  }
  if (action.href.startsWith("http")) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={DOOR}>
        {body}
      </a>
    );
  }
  return (
    <Link href={action.href} className={DOOR}>
      {body}
    </Link>
  );
}

export function Hero({
  background,
  backgroundSrc,
  eyebrow = "Шымкент · свой завод · с 2008",
  title = "Утеплители и наполнители для текстиля",
  description,
  actions = HOME_ACTIONS,
}: {
  background?: ReactNode;
  backgroundSrc?: string;
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  actions?: HeroAction[];
} = {}) {
  const body = description ?? (
    <>
      Производим материалы и шьём утеплённую спецодежду на заказ — со своего
      завода в Казахстане. Работаем с фабриками и заказчиками по всей стране.
    </>
  );

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background">
      {background ?? <HeroBackground src={backgroundSrc} />}
      <div
        aria-hidden
        className="absolute inset-0 -z-[5] bg-gradient-to-t from-black/80 via-black/30 to-black/35"
      />

      <div className="container-x flex flex-1 flex-col justify-end pt-28 pb-6 sm:pb-8">
        <p className="font-mono text-label text-white/70 uppercase">{eyebrow}</p>
        <h1 className="mt-5 max-w-[15ch] font-display text-display font-semibold text-balance text-white">
          {title}
        </h1>
        <p className="mt-6 max-w-[52ch] text-lead text-white/80">{body}</p>

        <nav
          aria-label="Направления"
          className="mt-10 grid sm:mt-14 sm:grid-cols-3 sm:gap-x-6"
        >
          {actions.map((action, i) => (
            <Door key={action.href} action={action} index={i} />
          ))}
        </nav>
      </div>
    </section>
  );
}
