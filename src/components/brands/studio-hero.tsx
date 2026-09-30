import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";
import { HERO, WA_SEWING, shotByNumber } from "@/lib/brands-content";

export function StudioHero() {
  const shot = shotByNumber(HERO.shot);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-background text-[#ede6da]">
      <div className="hero-settle absolute inset-x-0 top-16 bottom-0 -z-10 overflow-hidden md:left-[28%]">
        <Image
          src={asset(shot.src)}
          alt={shot.alt}
          fill
          preload
          sizes="(max-width: 768px) 100vw, 75vw"
          className="object-cover object-[58%_top] md:object-top"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/35 to-black/50"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-black/80 via-black/40 to-transparent md:w-[55%]"
      />

      <div className="container-x pt-28 pb-6 sm:pb-8">
        <SpecLabel className="text-[#ede6da]/80">{HERO.eyebrow}</SpecLabel>
        <h1 className="mt-5 max-w-[14ch] font-display text-display font-semibold text-balance">
          {HERO.title}
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[46ch] text-lead text-[#ede6da]/85 lg:col-span-5">
            {HERO.lead}
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-7 lg:justify-end">
            <ButtonLink href="#contact" variant="light">
              Обсудить проект
            </ButtonLink>
            <ButtonLink href={WA_SEWING} variant="outline-light">
              WhatsApp
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/15 pt-4 sm:mt-16">
          {HERO.specs.map((item) => (
            <li key={item}>
              <SpecLabel className="text-[#ede6da]/70">{item}</SpecLabel>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
