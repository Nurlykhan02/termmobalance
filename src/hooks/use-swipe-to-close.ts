"use client";

import {
  useCallback,
  useRef,
  type CSSProperties,
  type RefObject,
  type TouchEvent,
} from "react";

const EDGE_START_PX = 28;
const CLOSE_DISTANCE_PX = 88;
const CLOSE_VELOCITY = 0.55;

interface UseSwipeToCloseOptions {
  onClose: () => void;
  enabled?: boolean;
}

interface SwipeHandlers {
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
}

/**
 * Swipe the right-edge panel to the right to close.
 * Ignores mostly-vertical scrolls inside the panel content.
 */
export function useSwipeToClose({
  onClose,
  enabled = true,
}: UseSwipeToCloseOptions): {
  panelRef: RefObject<HTMLDivElement | null>;
  handlers: SwipeHandlers;
  style: CSSProperties;
} {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);
  const deltaX = useRef(0);
  const tracking = useRef(false);
  const decided = useRef<"none" | "h" | "v">("none");

  const resetVisual = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    el.style.transition = "transform 0.22s ease-out";
    el.style.transform = "translate3d(0,0,0)";
  }, []);

  const onTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return;
      const touch = event.touches[0];
      if (!touch) return;

      startX.current = touch.clientX;
      startY.current = touch.clientY;
      startTime.current = performance.now();
      deltaX.current = 0;
      tracking.current = true;
      decided.current = "none";

      const el = panelRef.current;
      if (el) el.style.transition = "none";
    },
    [enabled],
  );

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!enabled || !tracking.current) return;
      const touch = event.touches[0];
      if (!touch) return;

      const dx = touch.clientX - startX.current;
      const dy = touch.clientY - startY.current;

      if (decided.current === "none") {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        const nearLeftEdge =
          startX.current -
            (panelRef.current?.getBoundingClientRect().left ?? 0) <
          EDGE_START_PX;
        if (Math.abs(dy) > Math.abs(dx) * 1.15 && !nearLeftEdge) {
          decided.current = "v";
          return;
        }
        if (dx > 0 || nearLeftEdge) {
          decided.current = "h";
        } else {
          decided.current = "v";
          return;
        }
      }

      if (decided.current !== "h") return;

      const clamped = Math.max(0, dx);
      deltaX.current = clamped;
      const el = panelRef.current;
      if (el) el.style.transform = `translate3d(${clamped}px,0,0)`;
      if (clamped > 12) event.preventDefault();
    },
    [enabled],
  );

  const finish = useCallback(() => {
    if (!tracking.current) return;
    tracking.current = false;

    if (decided.current !== "h") {
      decided.current = "none";
      resetVisual();
      return;
    }

    const elapsed = Math.max(1, performance.now() - startTime.current);
    const velocity = deltaX.current / elapsed;
    const shouldClose =
      deltaX.current >= CLOSE_DISTANCE_PX || velocity >= CLOSE_VELOCITY;

    const el = panelRef.current;
    if (shouldClose) {
      if (el) {
        el.style.transition = "transform 0.2s ease-in";
        el.style.transform = "translate3d(110%,0,0)";
      }
      window.setTimeout(() => onClose(), 160);
    } else {
      resetVisual();
    }

    decided.current = "none";
    deltaX.current = 0;
  }, [onClose, resetVisual]);

  return {
    panelRef,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd: finish,
      onTouchCancel: finish,
    },
    style: { touchAction: "pan-y" },
  };
}
