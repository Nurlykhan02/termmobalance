import type { Metadata } from "next";
import { Capabilities } from "@/components/brands/capabilities";
import { Categories } from "@/components/brands/categories";
import { EasyStory } from "@/components/brands/easy-story";
import { EditorialPortfolio } from "@/components/brands/editorial-portfolio";
import { FactoryFashionCompare } from "@/components/brands/factory-fashion-compare";
import { ProcessSteps } from "@/components/brands/process-steps";
import { StudioBrief } from "@/components/brands/studio-brief";
import { StudioHero } from "@/components/brands/studio-hero";
import { Techniques } from "@/components/brands/techniques";
import { BrandsClients } from "@/components/brands-proof";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  COMPARE_PAIRS,
  TESTIMONIALS,
  WA_SEWING,
  publicShots,
} from "@/lib/brands-content";

export const metadata: Metadata = {
  title: "Пошив одежды под ваш бренд — Termmo Balance",
  description:
    "Шьём любую одежду под любой бренд: футболки, худи, свитшоты. Логотип, вышивка и шевроны со своего завода в Шымкенте.",
};

const NAV = [
  { label: "Что шьём", href: "#categories" },
  { label: "Работы", href: "#work" },
  { label: "Производство", href: "#production" },
  { label: "Контакты", href: "#contact" },
  { label: "Завод", href: "/" },
];

export default function BrandsPage() {
  return (
    <main className="theme-studio">
      <SiteHeader
        variant="studio"
        logoHref="/brands/"
        links={NAV}
        cta={{ label: "Заказать пошив", href: WA_SEWING }}
      />
      <StudioHero />
      <EasyStory index="01" />
      <Categories index="02" />
      <Capabilities index="03" />
      <Techniques index="04" />
      <ProcessSteps index="05" />
      <EditorialPortfolio index="06" shots={publicShots()} />
      <FactoryFashionCompare index="07" pairs={COMPARE_PAIRS} />
      <BrandsClients index="08" testimonials={TESTIMONIALS} />
      <StudioBrief index="09" />
      <SiteFooter
        tone="light"
        links={[
          { label: "Пошив для брендов", href: "/brands/" },
          { label: "Материалы и спецодежда", href: "/" },
          { label: "Бриф", href: "#contact" },
        ]}
      />
    </main>
  );
}
