/**
 * Writes resized WebP variants next to the static export's source images:
 *   public/images/<dir>/<name>.jpg → public/images/opt/<dir>/<name>-<width>.webp
 *
 * The widths must match images.deviceSizes + images.imageSizes in next.config.ts,
 * and the directories must match OPTIMIZED_DIRS in src/lib/image-loader.ts.
 * Existing up-to-date variants are skipped, so reruns are cheap.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { IMAGE_WIDTHS, OPTIMIZED_DIRS } from "../image-config.mjs";

const ROOT = path.join(process.cwd(), "public", "images");
const OUT = path.join(ROOT, "opt");
const SOURCE = /\.(jpe?g|png)$/i;
const QUALITY = 72;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return SOURCE.test(entry.name) ? [full] : [];
    }),
  );
  return files.flat();
}

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

async function optimize(file) {
  const relative = path.relative(ROOT, file).replace(SOURCE, "");
  const sourceTime = await mtime(file);
  let written = 0;

  for (const width of IMAGE_WIDTHS) {
    const target = path.join(OUT, `${relative}-${width}.webp`);
    if ((await mtime(target)) >= sourceTime) continue;

    await mkdir(path.dirname(target), { recursive: true });
    await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(target);
    written += 1;
  }
  return written;
}

const files = (
  await Promise.all(OPTIMIZED_DIRS.map((dir) => walk(path.join(ROOT, dir))))
).flat();

let written = 0;
for (const file of files) written += await optimize(file);

console.log(
  `optimize-images: ${files.length} sources, ${written} variants written`,
);
