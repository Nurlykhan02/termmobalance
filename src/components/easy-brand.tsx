import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";
import { CAPSULES, shotByNumber } from "@/lib/brands-content";

/** Lilac, blue and black capsules — one frame each. */
const FRAMES = [4, 20, 7].map(shotByNumber);

const CAPSULE_LABEL = Object.fromEntries(
  CAPSULES.map((item) => [item.id, item.label]),
);

const TERMS = [
  { value: "от 50 шт", label: "тираж" },
  { value: "3–5 дней", label: "сэмпл" },
  { value: "от 14 дней", label: "партия" },
];

/** Teaser for /brands/ in the studio register, so the switch of worlds is visible. */
export function EasyBrand({ index }: { index?: string } = {}) {
  return (
    <section
      id="easy"
      className="theme-studio section-y relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_40%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_70%)]"
      />
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-5">
          <SpecLabel className="text-ink/80">
            {index ? <span className="text-accent">({index})</span> : null}
            Пошив для брендов
          </SpecLabel>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,5.4vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-balance text-ink">
            Шьём одежду под ваш бренд
          </h2>
          <p className="mt-6 max-w-[40ch] text-lead text-ink/80">
            Футболки, худи, свитшоты и другой трикотаж на заказ — со своего
            производства. Пример — наш собственный бренд{" "}
            <span className="text-accent">2EASY</span>.
          </p>

          <dl className="mt-10 grid max-w-md grid-cols-3 border-y border-line">
            {TERMS.map((term) => (
              <div
                key={term.label}
                className="border-line py-4 not-first:border-l not-first:pl-4"
              >
                <dt className="font-mono text-label text-muted uppercase">
                  {term.label}
                </dt>
                <dd className="mt-1.5 font-display text-[1.25rem] font-semibold text-ink">
                  {term.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href="/brands/" variant="light">
              Смотреть работы
            </ButtonLink>
            <ButtonLink
              href="/brands/#contact"
              variant="text"
              className="text-ink decoration-ink/40"
            >
              Бриф на пошив
            </ButtonLink>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:col-span-7">
          {FRAMES.map((shot, i) => (
            <li
              key={shot.n}
              className={
                i === 0
                  ? "col-span-2 sm:col-span-1"
                  : i === 1
                    ? "sm:pt-16"
                    : "sm:pt-8"
              }
            >
              <Reveal variant="clip" delay={i * 120}>
                <Link
                  href="/brands/#work"
                  className={`group relative block overflow-hidden bg-raised ${
                    i === 0 ? "aspect-[4/3] sm:aspect-[3/4]" : "aspect-[3/4]"
                  }`}
                  aria-label={`Лукбук 2EASY: ${shot.alt}`}
                >
                  <Image
                    src={asset(shot.src)}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 22vw"
                    className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                    style={{ objectPosition: shot.focus }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"
                  />
                  <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
                    <SpecLabel className="text-[#ede6da]">
                      {CAPSULE_LABEL[shot.capsule]}
                    </SpecLabel>
                    <SpecLabel className="text-[#ede6da]/70 max-sm:hidden">
                      No. {String(shot.n).padStart(2, "0")}
                    </SpecLabel>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
