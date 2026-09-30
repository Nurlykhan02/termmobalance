import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { StitchDivider } from "@/components/ui/stitch-divider";

export const metadata: Metadata = {
  title: "Styleguide — Termmo Balance",
  robots: { index: false, follow: false },
};

const ICONS: IconName[] = [
  "arrow-right",
  "arrow-up-right",
  "close",
  "chevron-left",
  "chevron-right",
  "plus",
];

function Sheet({ label, className }: { label: string; className?: string }) {
  return (
    <section className={`section-y bg-surface text-ink ${className ?? ""}`}>
      <div className="container-x space-y-14">
        <SectionHeading
          index="00"
          eyebrow={label}
          title="Производим одежду для брендов"
          lead="Шкала: display, h2, h3, lead, body, small, label. Кнопки, метки, иконки и разделитель-«строчка»."
        />

        <p className="font-display text-display font-semibold">Display</p>
        <p className="font-display text-h3 font-semibold">Heading 3</p>
        <p className="text-lead text-muted">Lead — 18px / 1.6</p>
        <p className="text-base">Body — 16px</p>
        <p className="text-sm text-muted">Small — 14px</p>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="#">Primary</ButtonLink>
          <ButtonLink href="#" variant="secondary">
            Secondary
          </ButtonLink>
          <ButtonLink href="#" variant="text">
            Text link
          </ButtonLink>
          <ButtonLink href="https://wa.me/77781200084">External</ButtonLink>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-black p-6">
          <ButtonLink href="#" variant="light">
            Light
          </ButtonLink>
          <ButtonLink href="#" variant="outline-light">
            Outline light
          </ButtonLink>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <SpecLabel>Шымкент · с 2008</SpecLabel>
          <SpecLabel boxed>Made in KZ</SpecLabel>
        </div>

        <div className="flex gap-4 text-ink">
          {ICONS.map((name) => (
            <Icon key={name} name={name} className="size-6" />
          ))}
        </div>

        <StitchDivider />
      </div>
    </section>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main>
      <Sheet label="Завод" />
      <div className="theme-studio">
        <Sheet label="Студия" />
      </div>
    </main>
  );
}
