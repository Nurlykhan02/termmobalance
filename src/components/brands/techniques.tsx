import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";
import { TECHNIQUES } from "@/lib/brands-content";

export function Techniques({ index }: { index: string }) {
  return (
    <section id="techniques" className="section-y bg-surface text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Нанесение"
          title="Логотип, вышивка, шевроны, печать"
          lead="Брендируем изделие целиком — от принта на спине до бирки на шве."
        />

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-4">
          {TECHNIQUES.main.map((item, i) => (
            <li key={item.label}>
              <Reveal delay={i * 80} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-raised">
                  <Image
                    src={asset(item.photo.src)}
                    alt={item.photo.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-110"
                    style={{ objectPosition: item.photo.focus }}
                  />
                </div>
                <SpecLabel className="mt-4">
                  <span className="text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </SpecLabel>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-8">
          <SpecLabel className="shrink-0">Также делаем</SpecLabel>
          <ul className="flex flex-wrap gap-2">
            {TECHNIQUES.extra.map((item) => (
              <li
                key={item}
                className="border border-line px-3 py-2 text-[14px] text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
