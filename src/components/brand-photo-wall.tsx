import Image from "next/image";
import { asset } from "@/lib/asset";
import { listBrandPhotoPaths } from "@/lib/brand-photos";

type Shot = {
  src: string;
  width: number;
  height: number;
};

const COLUMN_COUNT = 8;

function brandColumns(): Shot[][] {
  const photos = listBrandPhotoPaths().map((src) => ({
    src: asset(src),
    width: 1600,
    height: 2000,
  }));
  const columns: Shot[][] = Array.from({ length: COLUMN_COUNT }, () => []);
  photos.forEach((photo, index) => {
    columns[index % COLUMN_COUNT].push(photo);
  });
  return columns;
}

function ShotColumn({
  shots,
  index,
  priority,
}: {
  shots: Shot[];
  index: number;
  priority: boolean;
}) {
  return (
    <div
      className={`flex w-[clamp(148px,13vw,220px)] shrink-0 flex-col ${
        index % 2 === 0
          ? "reviews-mosaic-col--up"
          : "reviews-mosaic-col--down"
      }`}
      style={{ animationDelay: `${-index * 7}s` }}
    >
      {[0, 1, 2].map((copy) => (
        <div key={copy} className="flex flex-col gap-3.5 pb-3.5">
          {shots.map((shot, shotIndex) => (
            <Image
              key={`${copy}-${shot.src}`}
              src={shot.src}
              alt=""
              width={shot.width}
              height={shot.height}
              sizes="220px"
              priority={priority && copy === 0 && shotIndex === 0}
              className="block h-auto w-full rounded-[10px] shadow-[0_18px_48px_rgba(14,16,19,0.18)]"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function BrandPhotoWall({
  scrim = false,
  priority = false,
}: {
  /** Soft center wash so type can sit on the photos. */
  scrim?: boolean;
  priority?: boolean;
}) {
  const columns = brandColumns();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        scrim ? "" : "-z-10"
      }`}
      aria-hidden
    >
      <div
        className={`absolute inset-0 ${scrim ? "reviews-mosaic-frame" : ""}`}
      >
        <div
          className="absolute top-1/2 left-1/2 flex w-[168%] items-start justify-center gap-3.5"
          style={{ transform: "translate(-50%, -46%) rotate(-6deg)" }}
        >
          {columns.map((shots, index) => (
            <ShotColumn
              key={index}
              shots={shots}
              index={index}
              priority={priority}
            />
          ))}
        </div>
      </div>

      {scrim ? (
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 88% 74% at 50% 50%, color-mix(in oklab, var(--surface) 97%, transparent) 0%, color-mix(in oklab, var(--surface) 90%, transparent) 54%, transparent 80%)",
          }}
        />
      ) : null}
    </div>
  );
}
