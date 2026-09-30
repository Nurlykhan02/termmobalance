import { ClientLogos } from "@/components/client-logos";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import type { Testimonial } from "@/lib/brands-content";

export function BrandsClients({
  index,
  testimonials,
}: {
  index: string;
  testimonials: Testimonial[];
}) {
  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="section-y bg-surface text-ink"
    >
      <div className="container-x">
        <SectionHeading
          id="clients-title"
          index={index}
          eyebrow="Отзывы и клиенты"
          title="Бренды и фабрики, которые шьют у нас"
          lead="Молодые бренды одежды, швейные фабрики и заказчики спецодежды по всему Казахстану."
        />

        <ul className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <li key={item.author}>
              <Reveal delay={i * 90} className="h-full">
                <figure className="flex h-full flex-col justify-between gap-10 border border-line bg-background p-6 sm:p-8">
                  <blockquote className="text-lead text-ink">
                    <span aria-hidden className="block font-display text-[3.5rem] leading-[0.6] text-accent">
                      “
                    </span>
                    <p className="mt-4">{item.quote}</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-wash font-display text-[15px] font-semibold text-accent"
                    >
                      {item.brand.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium text-ink">
                        {item.author}
                      </span>
                      <SpecLabel>{item.brand}</SpecLabel>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <SpecLabel className="mt-16 sm:mt-24">Клиенты завода</SpecLabel>
        <ClientLogos className="mt-6" />
      </div>
    </section>
  );
}
