import { ClientLogos } from "@/components/client-logos";
import { SectionHeading } from "@/components/ui/section-heading";

export function TrustedBy({ index }: { index?: string } = {}) {
  return (
    <section id="trusted" className="section-y bg-surface text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Клиенты"
          title="С кем мы работаем"
          lead="Швейные фабрики, производители формы и государственные заказчики Казахстана."
        />
        <ClientLogos className="mt-14 sm:mt-20" />
      </div>
    </section>
  );
}
