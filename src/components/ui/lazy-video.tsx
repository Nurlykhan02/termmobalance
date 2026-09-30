"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";

/**
 * Muted loop that only downloads once it nears the viewport and pauses when
 * it leaves. Skipped for reduced motion and Save-Data, where the poster stays.
 */
export function LazyVideo({
  src,
  poster,
  className = "",
  label,
}: {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: false,
    rootMargin: "200px 0px",
    threshold: 0,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (reduce || saveData) return;

    if (inView) {
      if (!loadedRef.current) {
        video.src = src;
        loadedRef.current = true;
      }
      void video.play().catch(() => {});
    } else if (loadedRef.current) {
      video.pause();
    }
  }, [inView, src]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
