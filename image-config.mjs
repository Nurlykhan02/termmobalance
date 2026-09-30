/** Shared by next.config.ts, src/lib/image-loader.ts and scripts/optimize-images.mjs. */

export const DEVICE_SIZES = [640, 960, 1280, 1920];
export const IMAGE_SIZES = [320, 480];
export const IMAGE_WIDTHS = [...IMAGE_SIZES, ...DEVICE_SIZES];

/** Folders under public/images that get WebP variants; everything else is served as-is. */
export const OPTIMIZED_DIRS = ["photos-brands", "apparel", "products", "factory"];
