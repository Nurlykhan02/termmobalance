import fs from "node:fs";
import path from "node:path";

/** Every file in public/images/photos-brands, in numeric order. */
export function listBrandPhotoPaths() {
  const dir = path.join(process.cwd(), "public", "images", "photos-brands");
  return fs
    .readdirSync(dir)
    .filter((name) => /\.(jpe?g|png|webp|avif)$/i.test(name))
    .sort((a, b) => {
      const num = (name: string) => Number(name.match(/\d+/)?.[0] ?? 0);
      return num(a) - num(b) || a.localeCompare(b);
    })
    .map((name) => `/images/photos-brands/${name}`);
}
