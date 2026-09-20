"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

const SHOW_AFTER_MS = 5000;
const HIDE_AFTER_MS = 15000;

const WA_DISCOUNT =
  "https://wa.me/77781200084?text=" +
  encodeURIComponent(
    "Здравствуйте! Хочу узнать про текущие скидки на материалы / спецодежду.",
  );

export function DiscountToast() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;

    const showTimer = setTimeout(() => {
      setVisible(true);
      hideTimer = setTimeout(() => {
        setLeaving(true);
        removeTimer = setTimeout(() => setVisible(false), 320);
      }, HIDE_AFTER_MS);
    }, SHOW_AFTER_MS);

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none fixed right-0 bottom-0 z-[80] flex items-end justify-end pr-1 pb-0 sm:pr-3 sm:pb-0 ${
        leaving ? "discount-toast--out" : "discount-toast--in"
      }`}
      role="status"
      aria-live="polite"
    >
      <a
        href={WA_DISCOUNT}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-end gap-0 pr-1 sm:pr-2"
      >
        <div className="relative mb-[42%] mr-[-6px] max-w-[min(52vw,210px)] rounded-[16px] bg-surface px-3.5 py-3 text-ink shadow-[0_14px_40px_rgba(33,14,3,0.2)] ring-1 ring-ink/8 transition-transform group-hover:-translate-y-0.5 sm:mb-[46%] sm:max-w-[230px] sm:px-4 sm:py-3.5">
          <p className="text-[11px] font-medium tracking-[0.1em] text-accent uppercase">
            Скидки сейчас
          </p>
          <p className="mt-1 text-[13px] leading-snug font-semibold tracking-[-0.02em] sm:text-[14px]">
            Есть спецпредложения — напишите и узнайте условия
          </p>
          <span className="mt-1.5 inline-block text-[12px] font-medium text-accent">
            Открыть WhatsApp →
          </span>
          <span
            aria-hidden
            className="absolute top-1/2 -right-2 size-3.5 -translate-y-1/2 rotate-45 bg-surface ring-1 ring-ink/8"
          />
        </div>

        <Image
          src={asset("/images/avatar.png")}
          alt="Termmo Balance"
          width={420}
          height={900}
          sizes="(max-width: 640px) 42vw, 200px"
          className="relative z-[1] h-[min(52vh,340px)] w-auto drop-shadow-[0_18px_36px_rgba(0,0,0,0.35)] sm:h-[min(56vh,400px)]"
          priority={false}
        />
      </a>
    </div>
  );
}
