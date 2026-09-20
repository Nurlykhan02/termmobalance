import { ApparelSolutions } from "@/components/apparel-solutions";
import { CatalogTeaser } from "@/components/catalog-teaser";
import { ContactStrip } from "@/components/contact-strip";
import { DeliveryMap } from "@/components/delivery-map";
import { Hero } from "@/components/hero";
import { ReviewsMosaic } from "@/components/reviews-mosaic";
import { SiteHeader } from "@/components/site-header";
import { TrustedBy } from "@/components/trusted-by";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ReviewsMosaic />
      <TrustedBy />
      <ApparelSolutions />
      <CatalogTeaser />
      <DeliveryMap />
      <ContactStrip />
    </main>
  );
}
