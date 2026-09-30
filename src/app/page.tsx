import { ApparelSolutions } from "@/components/apparel-solutions";
import { CatalogTeaser } from "@/components/catalog-teaser";
import { CompanyHistory } from "@/components/company-history";
import { ContactStrip } from "@/components/contact-strip";
import { DeliveryMap } from "@/components/delivery-map";
import { EasyBrand } from "@/components/easy-brand";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrustedBy } from "@/components/trusted-by";

const FOOTER_LINKS = [
  { label: "Спецодежда", href: "#apparel" },
  { label: "Материалы", href: "#catalog" },
  { label: "Завод и доставка", href: "#about" },
  { label: "История", href: "#history" },
  { label: "Пошив для брендов", href: "/brands/" },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <TrustedBy />
      <ApparelSolutions index="01" />
      <CatalogTeaser index="02" />
      <DeliveryMap index="03" />
      <CompanyHistory index="04" />
      <EasyBrand index="05" />
      <ContactStrip index="06" />
      <SiteFooter links={FOOTER_LINKS} />
    </main>
  );
}
