import Image from "next/image";
import Link from "next/link";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";
import { COMPANY } from "@/lib/brands-content";

type FooterLink = { label: string; href: string };

export function SiteFooter({
  links,
  tone = "color",
}: {
  links: FooterLink[];
  tone?: "color" | "light";
}) {
  return (
    <footer className="border-t border-line bg-surface py-14 text-ink sm:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <Image
            src={asset("/images/logo.png")}
            alt={COMPANY.name}
            width={1024}
            height={252}
            className={`h-7 w-auto ${tone === "light" ? "brightness-0 invert-[0.92]" : ""}`}
          />
          <p className="mt-5 max-w-[34ch] text-sm text-muted">
            Производство утеплителей, спецодежды и одежды под бренд в Шымкенте с
            2008 года.
          </p>
        </div>

        <nav aria-label="Разделы" className="lg:col-span-3 lg:col-start-6">
          <SpecLabel>Разделы</SpecLabel>
          <ul className="mt-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <SpecLabel>Контакты</SpecLabel>
          <ul className="mt-2">
            <li>
              <a href={COMPANY.phoneHref} className="inline-flex min-h-11 items-center hover:text-accent">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:text-accent"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="inline-flex min-h-11 items-center hover:text-accent">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={COMPANY.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:text-accent"
              >
                {COMPANY.address}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <SpecLabel>
          © {new Date().getFullYear()} {COMPANY.name}
        </SpecLabel>
        <SpecLabel>
          {COMPANY.address} · {COMPANY.hours}
        </SpecLabel>
      </div>
    </footer>
  );
}
