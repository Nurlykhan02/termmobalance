import { ApparelSolutions } from "@/components/apparel-solutions";
import { CatalogTeaser } from "@/components/catalog-teaser";
import { ContactStrip } from "@/components/contact-strip";
import { DeliveryMap } from "@/components/delivery-map";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ApparelSolutions />
      <CatalogTeaser />
      <DeliveryMap />
      <ContactStrip />
    </main>
  );
}
