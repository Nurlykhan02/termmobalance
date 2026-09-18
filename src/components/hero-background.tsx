"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/** Skip intro frames where the face is not yet visible */
const START_AT_SECONDS = 1.8;
/** Restart a bit before the last broken frames for a seamless loop */
const LOOP_BEFORE_END = 0.35;

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => {
        /* autoplay may be blocked until user gesture */
      });
    };

    const startFromFace = () => {
      if (startedRef.current) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      startedRef.current = true;
      const startAt = Math.min(
        START_AT_SECONDS,
        Math.max(0, video.duration - 0.5),
      );
      video.currentTime = startAt;
      play();
    };

    const restartLoop = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const startAt = Math.min(
        START_AT_SECONDS,
        Math.max(0, video.duration - 0.5),
      );
      video.currentTime = startAt;
      play();
    };

    const onTimeUpdate = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= LOOP_BEFORE_END) {
        restartLoop();
      }
    };

    video.addEventListener("loadedmetadata", startFromFace);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", restartLoop);
    if (video.readyState >= 1) startFromFace();

    return () => {
      video.removeEventListener("loadedmetadata", startFromFace);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", restartLoop);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-[center_46%] max-lg:translate-y-0 sm:scale-[1.02] sm:object-[center_48%] lg:scale-100 lg:object-[center_50%]"
        muted
        playsInline
        preload="auto"
        poster={asset("/images/hero-poster.jpg")}
      >
        <source src={asset("/desktop.mp4")} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/22 to-transparent lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-black/35 via-transparent to-black/12 lg:block" />
    </div>
  );
}
