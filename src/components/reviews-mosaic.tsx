import Image from "next/image";
import { asset } from "@/lib/asset";

type MosaicImg = {
  src: string;
  width: number;
  height: number;
};

/** Replace these files with your WhatsApp screenshot exports. */
const COL_1: MosaicImg[] = [
  {
    src: asset("/images/reviews-mosaic/magnum-hr-chat.webp"),
    width: 480,
    height: 1040,
  },
  {
    src: asset("/images/reviews-mosaic/jua-mvp-overview.webp"),
    width: 480,
    height: 302,
  },
  {
    src: asset("/images/reviews-mosaic/jua-map-search-overview.webp"),
    width: 480,
    height: 270,
  },
];

const COL_2: MosaicImg[] = [
  {
    src: asset("/images/reviews-mosaic/lifted-teacher-home.webp"),
    width: 480,
    height: 326,
  },
  {
    src: asset("/images/reviews-mosaic/lifted-assessments.webp"),
    width: 480,
    height: 326,
  },
];

const COL_3: MosaicImg[] = [
  {
    src: asset("/images/reviews-mosaic/kaizen-home.webp"),
    width: 480,
    height: 1036,
  },
  {
    src: asset("/images/reviews-mosaic/kaizen-ai-diagnostic.webp"),
    width: 480,
    height: 1066,
  },
];

const COLUMNS = [COL_1, COL_2, COL_3];

function MosaicColumn({
  images,
  index,
}: {
  images: MosaicImg[];
  index: number;
}) {
  return (
    <div
      className={`reviews-mosaic-col flex w-[clamp(168px,19vw,260px)] shrink-0 flex-col sm:w-[clamp(190px,20vw,290px)] ${
        index % 2 === 0
          ? "reviews-mosaic-col--up"
          : "reviews-mosaic-col--down"
      }`}
    >
      {[0, 1, 2].map((g) => (
        <div
          key={g}
          className="reviews-mosaic-grp flex flex-col gap-3 pb-3 sm:gap-5 sm:pb-5"
        >
          {images.map((img) => (
            <Image
              key={`${g}-${img.src}`}
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              sizes="(max-width: 909px) 180px, min(20vw, 290px)"
              className="shadow-accent-card block h-auto w-full rounded-[14px] border border-ink/[0.06]"
              priority={g === 0 && index === 0}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ReviewsMosaic() {
  return (
    <section
      id="reviews"
      className="reviews-mosaic relative overflow-hidden bg-surface px-4 pt-14 text-ink sm:px-[30px] sm:pt-20"
    >
      <div
        aria-hidden
        className="accent-veil pointer-events-none absolute inset-x-0 top-0 h-64"
      />

      <div className="relative z-[2] mx-auto max-w-[1280px]">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display max-w-[720px] text-[clamp(1.7rem,4.2vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-ink">
            С нами сотрудничают снова и снова
          </h2>

          <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-muted sm:text-[16px]">
            По всему СНГ поставляем утеплители и шьём спецодежду для фабрик,
            сетей и госзаказов — тысячами метров материала и комплектов под
            бренд.
          </p>
        </div>
      </div>

      <div className="reviews-mosaic-frame relative mt-8 h-[min(70vh,580px)] overflow-hidden sm:mt-10 sm:h-[min(74vh,680px)]">
        <div
          className="reviews-mosaic-bg pointer-events-none absolute inset-[-20%] flex items-start justify-center gap-3 sm:inset-[-12%] sm:gap-5"
          aria-hidden
        >
          {COLUMNS.map((col, i) => (
            <MosaicColumn key={i} images={col} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
