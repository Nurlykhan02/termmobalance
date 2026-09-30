"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/** Soft dissolve only after the logo zoom has finished */
const FADE_MS = 900;
const HOLD_FADED_MS = 400;

const SRC_MOBILE = asset("/video/hero-mobile.mp4");
const SRC_DESKTOP = asset("/video/hero-1280.mp4");
const POSTER = asset("/video/hero-poster.webp");

function motionAllowed() {
  const saveData = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection?.saveData;
  return (
    !saveData && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function HeroBackground({ src: srcOverride }: { src?: string } = {}) {
  const fixedSrc = srcOverride ? asset(srcOverride) : null;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !motionAllowed()) return;

    let started = false;
    let inView = true;
    let phase: "play" | "fading-out" | "hold" | "fading-in" = "play";
    let timers: ReturnType<typeof setTimeout>[] = [];

    const clearTimers = () => {
      for (const timer of timers) clearTimeout(timer);
      timers = [];
    };

    const later = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    const play = () => {
      if (!inView) return;
      void video.play().catch(() => {
        /* autoplay may be blocked until user gesture */
      });
    };

    const setOpacity = (value: number, withTransition: boolean) => {
      video.style.transition = withTransition
        ? `opacity ${FADE_MS}ms ease-in-out`
        : "none";
      video.style.opacity = String(value);
    };

    const startPlayback = () => {
      if (started) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      started = true;
      phase = "play";
      video.currentTime = 0;
      setOpacity(1, false);
      play();
    };

    const restartSoft = () => {
      phase = "fading-in";
      setOpacity(0, false);

      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        play();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setOpacity(1, true);
            later(() => {
              phase = "play";
            }, FADE_MS);
          });
        });
      };

      video.addEventListener("seeked", onSeeked);
      video.currentTime = 0;
    };

    const onEnded = () => {
      if (phase !== "play") return;
      phase = "fading-out";
      clearTimers();
      setOpacity(0, true);

      later(() => {
        video.pause();
        phase = "hold";
        later(restartSoft, HOLD_FADED_MS);
      }, FADE_MS);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) video.pause();
      else if (started && phase !== "hold") play();
    });

    video.addEventListener("loadedmetadata", startPlayback);
    video.addEventListener("ended", onEnded);
    observer.observe(video);
    video.preload = "auto";
    if (video.readyState >= 1) startPlayback();
    else video.load();

    return () => {
      clearTimers();
      observer.disconnect();
      video.removeEventListener("loadedmetadata", startPlayback);
      video.removeEventListener("ended", onEnded);
    };
  }, [fixedSrc]);

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden bg-background bg-cover bg-[60%_center] lg:bg-center"
      style={fixedSrc ? undefined : { backgroundImage: `url(${POSTER})` }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-[60%_center] lg:object-center"
        poster={fixedSrc ? undefined : POSTER}
        muted
        playsInline
        preload="none"
        aria-hidden
      >
        {fixedSrc ? (
          <source src={fixedSrc} type="video/mp4" />
        ) : (
          <>
            <source media="(max-width: 1023px)" src={SRC_MOBILE} type="video/mp4" />
            <source src={SRC_DESKTOP} type="video/mp4" />
          </>
        )}
      </video>
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/22 to-transparent lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-black/35 via-transparent to-black/12 lg:block" />
    </div>
  );
}
