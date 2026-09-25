"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type HistoryPeriod = {
  year: string;
  label: string;
  items: readonly string[];
};

type CompanyHistoryTimelineProps = {
  periods: readonly HistoryPeriod[];
  scrollRef: RefObject<HTMLElement | null>;
};

const SPINE = 11;
const LINE_W = 2;
const DOT = 14;

function yInScroll(scrollEl: HTMLElement, node: HTMLElement) {
  const s = scrollEl.getBoundingClientRect();
  const n = node.getBoundingClientRect();
  return n.top - s.top + scrollEl.scrollTop;
}

export function CompanyHistoryTimeline({
  periods,
  scrollRef,
}: CompanyHistoryTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [beamHeight, setBeamHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [lineTop, setLineTop] = useState(6 + DOT / 2);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const track = trackRef.current;
    if (!scrollEl || !track) return;

    let frame = 0;

    const update = () => {
      const dots = [
        ...track.querySelectorAll<HTMLElement>("[data-history-dot]"),
      ];
      if (!dots.length) return;

      const trackOrigin = yInScroll(scrollEl, track);
      const first = dots[0]!;
      const last = dots[dots.length - 1]!;
      const firstCenter =
        yInScroll(scrollEl, first) - trackOrigin + first.offsetHeight / 2;
      const lastCenter =
        yInScroll(scrollEl, last) - trackOrigin + last.offsetHeight / 2;

      setLineTop(firstCenter);
      setLineHeight(Math.max(0, lastCenter - firstCenter));

      const maxScroll = Math.max(
        0,
        scrollEl.scrollHeight - scrollEl.clientHeight,
      );
      const nearEnd = scrollEl.scrollTop >= maxScroll - 32;
      const viewMid = scrollEl.scrollTop + scrollEl.clientHeight * 0.35;

      const centers: number[] = [];
      let active = 0;
      let best = Number.POSITIVE_INFINITY;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]!;
        const center =
          yInScroll(scrollEl, dot) - trackOrigin + dot.offsetHeight / 2;
        centers.push(center);
        const dist = Math.abs(trackOrigin + center - viewMid);
        if (dist < best) {
          best = dist;
          active = i;
        }
      }

      if (nearEnd) active = dots.length - 1;

      setActiveIndex(active);
      setBeamHeight(
        Math.min(
          Math.max(centers[active] ?? firstCenter, firstCenter),
          lastCenter,
        ),
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onScroll)
        : null;
    ro?.observe(track);
    ro?.observe(scrollEl);

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Panel slide-in + image layout
    const t1 = window.setTimeout(update, 50);
    const t2 = window.setTimeout(update, 200);
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro?.disconnect();
      scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollRef, periods]);

  const lineLeft = SPINE - LINE_W / 2;
  const dotLeft = SPINE - DOT / 2;

  return (
    <div className="factory-history relative mt-5">
      <div ref={trackRef} className="relative">
        <div
          aria-hidden
          className="absolute rounded-full bg-ink/[0.1]"
          style={{
            left: lineLeft,
            top: lineTop,
            width: LINE_W,
            height: lineHeight,
          }}
        />

        <div
          aria-hidden
          className="factory-history-beam absolute origin-top overflow-visible rounded-full"
          style={{
            left: lineLeft,
            top: 0,
            width: LINE_W,
            height: beamHeight,
          }}
        >
          <span className="absolute inset-0 rounded-full bg-accent" />
          <span
            className="factory-history-beam-tip absolute left-1/2 rounded-full bg-accent"
            style={{
              width: 10,
              height: 10,
              bottom: 0,
              transform: "translate(-50%, 50%)",
              boxShadow:
                "0 0 0 3px #fff, 0 0 0 5px color-mix(in oklab, var(--accent) 35%, transparent)",
            }}
          />
        </div>

        <ol className="relative m-0 list-none p-0">
          {periods.map((period, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            const isLit = isActive || isPast;
            const isLast = index === periods.length - 1;

            return (
              <li key={period.year} className="relative">
                <div
                  className={`relative ${isLast ? "pb-2" : "pb-14 sm:pb-16"}`}
                  style={{ paddingLeft: SPINE + DOT + 10 }}
                >
                  <span
                    data-history-dot={String(index)}
                    aria-hidden
                    className="absolute z-[2] flex items-center justify-center rounded-full border-[2.5px] bg-white transition-colors duration-300"
                    style={{
                      left: dotLeft,
                      top: 6,
                      width: DOT,
                      height: DOT,
                      borderColor: isLit
                        ? "var(--accent)"
                        : "rgba(0,0,0,0.14)",
                      boxShadow: isActive
                        ? "0 0 0 4px color-mix(in oklab, var(--accent) 22%, transparent)"
                        : undefined,
                    }}
                  >
                    <span
                      className="rounded-full"
                      style={{
                        width: 5,
                        height: 5,
                        background: isLit
                          ? "var(--accent)"
                          : "rgba(0,0,0,0.18)",
                      }}
                    />
                  </span>

                  <div className="mb-2">
                    <p
                      className="text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300"
                      style={{
                        color: isActive
                          ? "var(--accent)"
                          : "var(--muted, #8a8178)",
                      }}
                    >
                      {period.label}
                    </p>
                    <h5
                      className="mt-0.5 font-display text-[24px] leading-[0.95] font-semibold tracking-[-0.045em] transition-colors duration-300 sm:text-[26px]"
                      style={{
                        color: isActive
                          ? "var(--ink, #1a1512)"
                          : isPast
                            ? "rgba(26,21,18,0.42)"
                            : "rgba(26,21,18,0.22)",
                      }}
                    >
                      {period.year}
                    </h5>
                  </div>

                  <ul
                    className="space-y-2 transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0.55 }}
                  >
                    {period.items.map((item) => (
                      <li
                        key={item}
                        className="relative pl-3 text-[13px] leading-snug text-ink/80 before:absolute before:top-[0.55em] before:left-0 before:size-1 before:rounded-full before:bg-accent/45 before:content-['']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
