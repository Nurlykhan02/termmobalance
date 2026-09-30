"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Icon } from "@/components/ui/icon";
import { SpecLabel } from "@/components/ui/spec-label";
import { useSwipeToClose } from "@/hooks/use-swipe-to-close";

/**
 * Right-edge drawer: overlay, body scroll lock, Esc, swipe right to close.
 * While a nested overlay (lightbox) is open, pass `locked` so Esc and swipe
 * belong to that overlay instead. `onClose` must be stable (useCallback).
 */
export function SidePanel({
  eyebrow,
  title,
  meta,
  footer,
  children,
  onClose,
  locked = false,
  bodyRef,
}: {
  eyebrow?: ReactNode;
  title: string;
  meta?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  locked?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
}) {
  const [settled, setSettled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lockedRef = useRef(locked);
  const {
    panelRef,
    handlers: swipeHandlers,
    style: swipeStyle,
  } = useSwipeToClose({ onClose, enabled: !locked });

  useEffect(() => {
    lockedRef.current = locked;
  }, [locked]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !lockedRef.current) onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        tabIndex={-1}
        aria-label="Закрыть"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        {...swipeHandlers}
        style={swipeStyle}
        onAnimationEnd={() => setSettled(true)}
        className={`panel-slide-in absolute inset-y-0 right-0 z-[1] flex h-[100dvh] w-[88%] max-w-[420px] flex-col bg-surface text-ink sm:w-full${
          settled ? " panel-slide-in--settled" : ""
        }`}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            {eyebrow ? <SpecLabel>{eyebrow}</SpecLabel> : null}
            <h3 className="mt-1.5 font-display text-h3 font-semibold text-ink">
              {title}
            </h3>
            {meta ? <p className="mt-1 text-sm text-muted">{meta}</p> : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="-mr-2 flex size-11 shrink-0 cursor-pointer items-center justify-center text-ink transition-[color,transform] duration-200 hover:text-accent active:scale-95"
          >
            <Icon name="close" className="size-5" />
          </button>
        </header>

        <div
          ref={bodyRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 py-5 [touch-action:pan-y]"
        >
          {children}
        </div>

        {footer ? (
          <div className="shrink-0 border-t border-line px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
