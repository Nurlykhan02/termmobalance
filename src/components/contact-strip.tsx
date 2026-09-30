import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { COMPANY } from "@/lib/brands-content";

export function ContactStrip({
  id = "contact",
  index,
  eyebrow = "Образец — бесплатно",
  title = "Консультация по материалу и пошиву",
  description = (
    <>
      Подберём линейку утеплителя или рассчитаем спецодежду. Работаем со
      швейными фабриками и государственными заказчиками по всему Казахстану.
    </>
  ),
  whatsappHref = COMPANY.whatsapp,
}: {
  id?: string;
  index?: string;
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  whatsappHref?: string;
} = {}) {
  const contacts = [
    { label: "Телефон", value: COMPANY.phone, href: COMPANY.phoneHref },
    { label: "Почта", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { label: "Завод", value: COMPANY.address, href: COMPANY.mapsUrl },
  ];

  return (
    <section id={id} className="section-y bg-ink text-surface">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2 font-mono text-label text-surface/60 uppercase">
              {index ? <span className="text-accent">({index})</span> : null}
              {eyebrow}
            </p>
            <h2 className="mt-5 font-display text-h2 font-semibold text-balance">
              {title}
            </h2>
            <p className="mt-5 max-w-[56ch] text-lead text-surface/70">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink href={whatsappHref} variant="light">
              Написать в WhatsApp
            </ButtonLink>
            <ButtonLink href={COMPANY.phoneHref} variant="outline-light">
              Позвонить
            </ButtonLink>
          </div>
        </div>

        <dl className="mt-14 grid gap-px border-y border-surface/15 bg-surface/15 sm:mt-20 sm:grid-cols-3">
          {contacts.map((item) => (
            <div key={item.label} className="bg-ink py-6 sm:px-6 sm:first:pl-0">
              <dt className="font-mono text-label text-surface/50 uppercase">
                {item.label}
              </dt>
              <dd className="mt-2">
                <a
                  href={item.href}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-[17px] transition-colors hover:text-accent"
                >
                  {item.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
