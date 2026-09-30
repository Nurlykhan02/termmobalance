import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";
import { CATEGORIES, WA_SEWING, waLink } from "@/lib/brands-content";

const TERMS = [
  { value: "от 50 шт", label: "Минимальный тираж" },
  { value: "3–5 дней", label: "Сэмпл до тиража" },
  { value: "от 14 дней", label: "Партия под ключ" },
];

export function Categories({ index }: { index: string }) {
  return (
    <section
      id="categories"
      className="section-y overflow-hidden bg-surface text-ink"
    >
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Что шьём"
          title="Трикотаж и верхняя одежда под ваш бренд"
          lead="От базовой футболки до утеплённой куртки — на своих линиях, с вашим логотипом. Нажмите на изделие, и в WhatsApp откроется готовый запрос."
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {CATEGORIES.map((item, i) => {
            const wide = i % 3 === 0;
            return (
              <li
                key={item.label}
                className={`${wide ? "col-span-2 md:col-span-1" : ""} ${
                  i % 3 === 1 ? "lg:translate-y-16" : ""
                }`}
              >
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <a
                    href={waLink(
                      `Здравствуйте! Интересует пошив: ${item.label.toLowerCase()} под наш бренд.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative block cursor-pointer overflow-hidden bg-raised text-[#ede6da] transition-transform duration-200 ease-out-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.985] md:aspect-[4/5] ${
                      wide ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[3/4]"
                    }`}
                  >
                    <Image
                      src={asset(item.photo.src)}
                      alt={item.photo.alt}
                      fill
                      sizes={
                        wide
                          ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          : "(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      }
                      className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.06]"
                      style={{ objectPosition: item.photo.focus }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 transition-opacity duration-500 group-hover:opacity-90"
                    />

                    <span
                      className={`absolute flex items-start justify-between sm:inset-x-5 sm:top-5 ${
                        wide ? "inset-x-4 top-4" : "inset-x-3 top-3"
                      }`}
                    >
                      <SpecLabel className="bg-black/45 px-2 py-1 text-[#ede6da] backdrop-blur-sm">
                        {String(i + 1).padStart(2, "0")}
                      </SpecLabel>
                      <span
                        className={`grid place-items-center rounded-full bg-accent text-[#0e0d0c] shadow-[0_8px_20px_-10px] shadow-black/50 transition-transform duration-500 ease-out-soft group-hover:rotate-45 sm:size-10 ${
                          wide ? "size-10" : "size-9"
                        }`}
                      >
                        <Icon name="arrow-up-right" className="size-4" />
                      </span>
                    </span>

                    <span
                      className={`absolute sm:inset-x-5 sm:bottom-5 ${
                        wide ? "inset-x-4 bottom-4" : "inset-x-3 bottom-3"
                      }`}
                    >
                      <span
                        className={`block font-display leading-[1.05] font-semibold tracking-[-0.03em] md:text-[clamp(1.5rem,2.4vw,2.125rem)] ${
                          wide
                            ? "text-[1.75rem]"
                            : "text-[1.125rem] sm:text-[1.375rem]"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`block border-t border-white/20 leading-snug text-[#ede6da]/80 md:mt-3 md:pt-3 md:text-[14px] ${
                          wide
                            ? "mt-3 pt-3 text-[14px]"
                            : "mt-2 pt-2 text-[12px] sm:text-[13px]"
                        }`}
                      >
                        {item.specs}
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:mt-14 lg:mt-28 lg:grid-cols-12 lg:items-end lg:gap-6">
          <dl className="grid grid-cols-3 gap-4 lg:col-span-8">
            {TERMS.map((term) => (
              <div key={term.label}>
                <dt className="font-mono text-label text-muted uppercase">
                  {term.label}
                </dt>
                <dd className="mt-2 font-display text-h3 font-semibold">
                  {term.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href={WA_SEWING} variant="light">
              Своё изделие по ТЗ
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
