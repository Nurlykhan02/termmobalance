"use client";

import Image from "next/image";
import { useEffect, useRef, type TouchEvent } from "react";
import { Icon } from "@/components/ui/icon";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
};

const SWIPE_PX = 48;

export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const item = items[index];
  const many = items.length > 1;

  const go = (step: number) =>
    onIndexChange((index + step + items.length) % items.length);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (!many) return;
      if (event.key === "ArrowRight")
        onIndexChange((index + 1) % items.length);
      if (event.key === "ArrowLeft")
        onIndexChange((index - 1 + items.length) % items.length);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, many, onClose, onIndexChange]);

  if (!item) return null;

  const onTouchStart = (event: TouchEvent) => {
    touchX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    const start = touchX.current;
    const end = event.changedTouches[0]?.clientX;
    touchX.current = null;
    if (!many || start == null || end == null) return;
    const dx = end - start;
    if (Math.abs(dx) < SWIPE_PX) return;
    go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-[#0a0908] text-[#ede6da]"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="font-mono text-label uppercase opacity-70">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
          {item.caption ? ` · ${item.caption}` : ""}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="flex size-11 items-center justify-center border border-white/20 transition-colors hover:border-white/60"
        >
          <Icon name="close" className="size-5" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1" onClick={onClose}>
        <Image
          key={item.src}
          src={item.src}
          alt={item.alt}
          fill
          sizes="100vw"
          className="object-contain"
          onClick={(event) => event.stopPropagation()}
        />
      </div>

      {many ? (
        <div className="flex items-center justify-center gap-3 px-4 py-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Предыдущее фото"
            className="flex size-11 items-center justify-center border border-white/20 transition-colors hover:border-white/60"
          >
            <Icon name="chevron-left" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Следующее фото"
            className="flex size-11 items-center justify-center border border-white/20 transition-colors hover:border-white/60"
          >
            <Icon name="chevron-right" className="size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
