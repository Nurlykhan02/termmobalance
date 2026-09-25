"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/** Soft dissolve only after the logo zoom has finished */
const FADE_MS = 900;
const HOLD_FADED_MS = 400;
const MOBILE_MQ = "(max-width: 1023px)";

const SRC_MOBILE = asset("/desktop.mp4");
const SRC_DESKTOP = asset("/desktop.mp4");

function pickHeroSrc() {
  if (typeof window === "undefined") return SRC_DESKTOP;
  return window.matchMedia(MOBILE_MQ).matches ? SRC_MOBILE : SRC_DESKTOP;
}

export function HeroBackground({ src: srcOverride }: { src?: string } = {}) {
  const fixedSrc = srcOverride ? asset(srcOverride) : null;
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const phaseRef = useRef<"play" | "fading-out" | "hold" | "fading-in">(
    "play",
  );
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [src, setSrc] = useState(fixedSrc ?? SRC_DESKTOP);

  useEffect(() => {
    if (fixedSrc) {
      setSrc(fixedSrc);
      return;
    }

    const sync = () => setSrc(pickHeroSrc());
    sync();

    const mql = window.matchMedia(MOBILE_MQ);
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [fixedSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    startedRef.current = false;
    phaseRef.current = "play";

    const clearTimers = () => {
      for (const timer of timersRef.current) clearTimeout(timer);
      timersRef.current = [];
    };

    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
      return id;
    };

    const play = () => {
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
      if (startedRef.current) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      startedRef.current = true;
      phaseRef.current = "play";
      video.currentTime = 0;
      video.playbackRate = 1;
      setOpacity(1, false);
      play();
    };

    const restartSoft = () => {
      phaseRef.current = "fading-in";
      video.playbackRate = 1;
      setOpacity(0, false);

      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        play();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setOpacity(1, true);
            later(() => {
              phaseRef.current = "play";
            }, FADE_MS);
          });
        });
      };

      video.addEventListener("seeked", onSeeked);
      video.currentTime = 0;
    };

    const beginFadeOutAndRestart = () => {
      if (phaseRef.current !== "play") return;
      phaseRef.current = "fading-out";
      clearTimers();
      setOpacity(0, true);

      later(() => {
        video.pause();
        video.playbackRate = 1;
        phaseRef.current = "hold";

        later(() => {
          restartSoft();
        }, HOLD_FADED_MS);
      }, FADE_MS);
    };

    const onEnded = () => {
      if (phaseRef.current !== "play") return;
      beginFadeOutAndRestart();
    };

    video.addEventListener("loadedmetadata", startPlayback);
    video.addEventListener("ended", onEnded);
    if (video.readyState >= 1) startPlayback();

    return () => {
      clearTimers();
      video.removeEventListener("loadedmetadata", startPlayback);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      <video
        key={src}
        ref={videoRef}
        src={src}
        className="absolute inset-0 h-full w-full object-cover object-center"
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/22 to-transparent lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-black/35 via-transparent to-black/12 lg:block" />
    </div>
  );
}
