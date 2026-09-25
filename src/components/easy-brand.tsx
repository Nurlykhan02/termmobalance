import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

type Tile = {
  id: string;
  src: string;
  caption: string;
  span: "hero" | "wide" | "square";
};

const TILES: Tile[] = [
  {
    id: "1",
    src: asset("/images/apparel/kurtki/variant-1/01.jpg"),
    caption: "Худи и трикотаж под бренд",
    span: "hero",
  },
  {
    id: "2",
    src: asset("/images/apparel/kurtki/variant-1/02.jpg"),
    caption: "Серийный пошив",
    span: "wide",
  },
  {
    id: "3",
    src: asset("/images/apparel/kurtki/variant-1/03.jpg"),
    caption: "Футболки",
    span: "square",
  },
  {
    id: "4",
    src: asset("/images/apparel/kurtki/variant-1/04.jpg"),
    caption: "Свитшоты",
    span: "square",
  },
  {
    id: "5",
    src: asset("/images/apparel/kurtki/variant-2/01.jpg"),
    caption: "Lookbook / примерка",
    span: "wide",
  },
  {
    id: "6",
    src: asset("/images/apparel/zhilety/variant-1/01.jpg"),
    caption: "Детали и вышивка",
    span: "square",
  },
  {
    id: "7",
    src: asset("/images/apparel/zhilety/variant-2/01.jpg"),
    caption: "Готовый тираж",
    span: "square",
  },
];

function spanClass(span: Tile["span"]) {
  switch (span) {
    case "hero":
      return "col-span-2 row-span-2";
    case "wide":
      return "col-span-2";
    default:
      return "col-span-1";
  }
}

function GalleryTile({ tile }: { tile: Tile }) {
  return (
    <Link
      href="/brands/"
      className={`group relative min-h-[160px] overflow-hidden rounded-[1.25rem] bg-ink sm:min-h-[200px] ${spanClass(tile.span)} ${
        tile.span === "hero"
          ? "min-h-[280px] sm:min-h-[360px] md:min-h-[480px]"
          : tile.span === "wide"
            ? "min-h-[180px] sm:min-h-[200px] md:min-h-[230px]"
            : "md:min-h-[230px]"
      }`}
    >
      <Image
        src={tile.src}
        alt=""
        fill
        sizes={
          tile.span === "hero"
            ? "(max-width: 768px) 100vw, 50vw"
            : tile.span === "wide"
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex translate-y-0 flex-col items-start gap-2.5 p-4 opacity-100 transition-all duration-300 sm:gap-3 sm:p-5 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <p className="text-[13px] font-medium tracking-[-0.01em] text-white sm:text-[14px]">
          {tile.caption}
        </p>
        <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-ink sm:px-4 sm:py-2 sm:text-[13px]">
          Подробнее →
        </span>
      </div>
    </Link>
  );
}

export function EasyBrand() {
  return (
    <section
      id="easy"
      className="relative overflow-hidden bg-surface px-4 py-14 text-ink sm:px-[30px] sm:py-20"
    >
      <div
        aria-hidden
        className="accent-veil pointer-events-none absolute inset-x-0 top-0 h-64"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted uppercase sm:text-[12px]">
            Производство одежды
          </p>
          <h2 className="font-display mt-3 text-[clamp(1.7rem,4.2vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
            Шьём одежду под ваш бренд
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted sm:text-[16px]">
            Футболки, худи, свитшоты и другой трикотаж на заказ — под любой бренд
            со своего производства.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-4 md:grid-rows-[repeat(3,minmax(0,1fr))]">
          {TILES.map((tile) => (
            <GalleryTile key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
