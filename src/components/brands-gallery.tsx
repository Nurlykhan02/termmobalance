"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

type Photo = {
  src: string;
  alt: string;
  place: string;
  sizes: string;
  fit: string;
  from: "up" | "down";
};

/**
 * Mobile is a 2-column stack. Desktop is a 4×4 collage:
 * one tall portrait, one large tile, one wide strip, and small closers.
 */
const PHOTOS: Photo[] = [
  {
    src: "/images/photos-brands/brand_4.jpg",
    alt: "Образ в полный рост на капоте",
    place: "col-start-1 row-start-1 row-span-3 lg:row-span-3",
    sizes: "(max-width: 1024px) 50vw, 22vw",
    fit: "object-[center_58%]",
    from: "up",
  },
  {
    src: "/images/photos-brands/brand_2.jpg",
    alt: "Оверсайз футболка с принтом",
    place:
      "col-span-2 col-start-1 row-start-4 row-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:row-span-2",
    sizes: "(max-width: 1024px) 100vw, 48vw",
    fit: "object-[center_34%]",
    from: "up",
  },
  {
    src: "/images/photos-brands/brand_7.jpg",
    alt: "Чёрная футболка с принтом",
    place:
      "col-start-2 row-start-1 row-span-2 lg:col-start-4 lg:row-start-1 lg:row-span-2",
    sizes: "(max-width: 1024px) 50vw, 22vw",
    fit: "object-[center_30%]",
    from: "down",
  },
  {
    src: "/images/photos-brands/brand_3.jpg",
    alt: "Принт на спине футболки",
    place:
      "col-start-2 row-start-3 row-span-1 lg:col-start-2 lg:row-start-3 lg:row-span-1",
    sizes: "(max-width: 1024px) 50vw, 22vw",
    fit: "object-[center_32%]",
    from: "down",
  },
  {
    src: "/images/photos-brands/brand_5.jpg",
    alt: "Крупный план принта на футболке",
    place:
      "col-span-2 col-start-1 row-start-6 row-span-1 lg:col-span-2 lg:col-start-3 lg:row-start-3 lg:row-span-1",
    sizes: "(max-width: 1024px) 100vw, 48vw",
    fit: "object-[center_34%]",
    from: "up",
  },
  {
    src: "/images/photos-brands/brand_8.jpg",
    alt: "Принт на спине чёрной футболки",
    place:
      "col-start-1 row-start-7 row-span-1 lg:col-span-2 lg:col-start-1 lg:row-start-4 lg:row-span-1",
    sizes: "(max-width: 1024px) 50vw, 48vw",
    fit: "object-[center_42%]",
    from: "down",
  },
  {
    src: "/images/photos-brands/brand_6.jpg",
    alt: "Футболка с принтом на спине",
    place:
      "col-start-2 row-start-7 row-span-1 lg:col-start-3 lg:row-start-4 lg:row-span-1",
    sizes: "(max-width: 1024px) 50vw, 22vw",
    fit: "object-[center_30%]",
    from: "up",
  },
  {
    src: "/images/photos-brands/brand_1.jpg",
    alt: "Ночная съёмка комплекта у машины",
    place:
      "col-span-2 col-start-1 row-start-8 row-span-1 lg:col-span-1 lg:col-start-4 lg:row-start-4 lg:row-span-1",
    sizes: "(max-width: 1024px) 100vw, 22vw",
    fit: "object-[center_62%]",
    from: "down",
  },
];

function GalleryPhoto({ photo, delay }: { photo: Photo; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative min-h-0 overflow-hidden rounded-[1.35rem] bg-ink/10 transition-[opacity,transform] duration-700 ease-out sm:rounded-3xl ${photo.place} ${
        shown
          ? "translate-y-0 scale-100 opacity-100"
          : photo.from === "up"
            ? "translate-y-8 scale-[0.96] opacity-0"
            : "-translate-y-8 scale-[0.96] opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Image
        src={asset(photo.src)}
        alt={photo.alt}
        fill
        sizes={photo.sizes}
        className={`object-cover ${photo.fit}`}
      />
    </div>
  );
}

export function BrandsGallery() {
  return (
    <section
      aria-label="Галерея пошива"
      className="bg-surface px-4 py-14 text-ink sm:px-[30px] sm:py-20"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="grid grid-cols-2 auto-rows-[6.4rem] gap-3 sm:auto-rows-[8rem] sm:gap-4 lg:auto-rows-[9.25rem] lg:grid-cols-4">
          {PHOTOS.map((photo, index) => (
            <GalleryPhoto key={photo.src} photo={photo} delay={index * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
