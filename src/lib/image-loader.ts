"use client";

import { OPTIMIZED_DIRS } from "../../image-config.mjs";

/** `/<basePath>/images/<dir>/<name>.<jpg|png>` — the basePath prefix is kept as-is. */
const OPTIMIZED = new RegExp(
  `^(.*)/images/((?:${OPTIMIZED_DIRS.join("|")})/[^?#]+)\\.(?:jpe?g|png)$`,
  "i",
);

/**
 * Static export has no image server, so variants are prebuilt by
 * scripts/optimize-images.mjs; anything outside those folders is served untouched.
 */
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const match = src.match(OPTIMIZED);
  if (!match) return `${src}?w=${width}`;
  return `${match[1]}/images/opt/${match[2]}-${width}.webp`;
}
