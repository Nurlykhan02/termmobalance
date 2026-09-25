"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const HIDE_AFTER_MS = 15000;

const WA_DISCOUNT =
  "https://wa.me/77781200084?text=" +
  encodeURIComponent(
    "Здравствуйте! Хочу узнать про текущие скидки на материалы / спецодежду.",
  );

export function DiscountToast() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [dockLeft, setDockLeft] = useState(false);
  const shownRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const removeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    const sync = () => {
      setDockLeft(document.querySelector('[role="dialog"]') != null);
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mapSection = document.getElementById("about");
    if (!mapSection) return;

    const show = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      setVisible(true);
      hideTimerRef.current = setTimeout(() => {
        setLeaving(true);
        removeTimerRef.current = setTimeout(() => setVisible(false), 320);
      }, HIDE_AFTER_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -20% 0px",
      },
    );

    observer.observe(mapSection);

    return () => {
      observer.disconnect();
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
    };
  }, []);

  const dismiss = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
    setLeaving(true);
    removeTimerRef.current = setTimeout(() => setVisible(false), 280);
  };

  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none fixed right-0 bottom-0 z-[80] flex items-end justify-end pr-1 pb-0 sm:pr-3 sm:pb-0 ${
        leaving ? "discount-toast--out" : "discount-toast--in"
      }`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`transition-transform duration-500 ease-out ${
          dockLeft ? "-translate-x-[calc(100vw-100%)]" : ""
        }`}
      >
        <div
          className={`pointer-events-auto relative flex items-end pr-1 sm:pr-2 ${
            dockLeft ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`relative mb-[42%] max-w-[min(52vw,210px)] rounded-[16px] bg-surface px-3.5 py-3 text-ink shadow-[0_14px_40px_rgba(33,14,3,0.2)] ring-1 ring-ink/8 sm:mb-[46%] sm:max-w-[230px] sm:px-4 sm:py-3.5 ${
              dockLeft ? "ml-[-6px]" : "mr-[-6px]"
            }`}
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Закрыть"
              className="absolute -top-2.5 -right-2.5 z-20 flex size-7 items-center justify-center rounded-full bg-white text-[18px] leading-none text-ink shadow-[0_4px_14px_rgba(33,14,3,0.18)] ring-1 ring-ink/10 transition-transform hover:scale-105"
            >
              ×
            </button>

            <a
              href={WA_DISCOUNT}
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform hover:-translate-y-0.5"
            >
              <p className="text-[11px] font-medium tracking-[0.1em] text-accent uppercase">
                Скидки сейчас
              </p>
              <p className="mt-1 text-[13px] leading-snug font-semibold tracking-[-0.02em] sm:text-[14px]">
                Есть спецпредложения — напишите и узнайте условия
              </p>
              <span className="mt-1.5 inline-block text-[12px] font-medium text-accent">
                Открыть WhatsApp →
              </span>
            </a>
            <span
              aria-hidden
              className={`absolute top-1/2 size-3.5 -translate-y-1/2 rotate-45 bg-surface ring-1 ring-ink/8 ${
                dockLeft ? "-left-2" : "-right-2"
              }`}
            />
          </div>

          <a
            href={WA_DISCOUNT}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1]"
          >
            <Image
              src={asset("/images/avatar.png")}
              alt="Termmo Balance"
              width={420}
              height={900}
              sizes="(max-width: 640px) 42vw, 200px"
              className="h-[min(52vh,340px)] w-auto drop-shadow-[0_18px_36px_rgba(0,0,0,0.35)] sm:h-[min(56vh,400px)]"
              priority={false}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
