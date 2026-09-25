import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";

const WA_SEWING =
  "https://wa.me/77781200084?text=" +
  encodeURIComponent(
    "Здравствуйте! Нужен пошив одежды под наш бренд — с логотипом.",
  );

export const metadata: Metadata = {
  title: "Пошив одежды под ваш бренд — Termmo Balance",
  description:
    "Шьём любую одежду под любой бренд: футболки, худи, свитшоты. Логотип, вышивка и шевроны со своего завода в Шымкенте.",
};

export default function BrandsPage() {
  return (
    <main>
      <SiteHeader
        logoHref="/brands/"
        links={[
          { label: "Пошив", href: "/brands/" },
          { label: "Завод", href: "/" },
          { label: "Контакты", href: "/#contact" },
        ]}
        cta={{ label: "Заказать пошив", href: WA_SEWING }}
      />
      <Hero
        backgroundSrc="/brands_hero_background.mp4"
        eyebrow="Пошив одежды · Шымкент · с 2008"
        title="Шьём любую одежду под любой бренд"
        description={
          <>
            Футболки, худи, свитшоты и другая одежда на заказ. Наносим{" "}
            <span className="font-semibold text-white">логотип</span>, вышивку
            и шевроны — со своего завода{" "}
            <span className="font-semibold text-accent">в Казахстане</span>.
          </>
        }
        actions={[
          { href: WA_SEWING, label: "Заказать пошив", tone: "solid" },
          {
            href: "https://wa.me/77781200084",
            label: "WhatsApp",
            tone: "ghost",
          },
        ]}
      />
    </main>
  );
}
