"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";
import {
  CONSTRUCTOR,
  waLink,
  type ConstructorPlacement,
} from "@/lib/brands-content";

type Swatch = { label: string; hex: string };

type Base = {
  width: number;
  height: number;
  pixels: Uint8ClampedArray;
  mask: Float32Array;
  shade: Float32Array;
};

type Logo =
  | { kind: "text"; text: string }
  | { kind: "file"; image: HTMLImageElement; name: string };

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function readPixels(image: HTMLImageElement, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(image, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height).data;
}

/** Studio backdrop luminance — used to despill the white JPEG fringe. */
const STUDIO_BG = 93;

async function loadBase(): Promise<Base> {
  const [photo, maskImage] = await Promise.all([
    loadImage(asset(CONSTRUCTOR.photo)),
    loadImage(asset(CONSTRUCTOR.mask)),
  ]);
  const width = photo.naturalWidth;
  const height = photo.naturalHeight;
  const pixels = readPixels(photo, width, height);
  const maskPixels = readPixels(maskImage, width, height);

  const count = width * height;
  const mask = new Float32Array(count);
  const lum = new Float32Array(count);
  const lit: number[] = [];
  for (let i = 0; i < count; i++) {
    const p = i * 4;
    mask[i] = maskPixels[p + 3] / 255;
    lum[i] = 0.299 * pixels[p] + 0.587 * pixels[p + 1] + 0.114 * pixels[p + 2];
    if (mask[i] > 0.85 && i % 5 === 0) lit.push(lum[i]);
  }
  lit.sort((a, b) => a - b);
  const white = lit[Math.floor(lit.length * 0.88)] || 255;

  const shade = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const m = mask[i];
    if (m <= 0.02) {
      shade[i] = 1;
      continue;
    }
    // pixel ≈ fabric·m + bg·(1−m) — recover fabric luminance for folds.
    const fabric = Math.min(
      255,
      Math.max(0, (lum[i] - STUDIO_BG * (1 - m)) / Math.max(m, 0.25)),
    );
    // Stronger contrast so folds survive dark dyes (black/navy).
    const n = fabric / white;
    shade[i] = Math.min(Math.max(0.48 + (n - 0.55) * 1.45, 0.32), 1.15);
  }

  // The outer pixels are cotton mixed with the gray backdrop, so they look
  // darker than the cloth and dye as a black ring. Pull shade from inside.
  healRim(mask, shade, width, height);

  return { width, height, pixels, mask, shade };
}

function healRim(mask: Float32Array, shade: Float32Array, width: number, height: number) {
  const count = width * height;
  const dist = new Float32Array(count);
  for (let i = 0; i < count; i++) dist[i] = mask[i] > 0.12 ? 99 : 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (dist[i] === 0) continue;
      let d = dist[i];
      if (x > 0) d = Math.min(d, dist[i - 1] + 1);
      if (y > 0) d = Math.min(d, dist[i - width] + 1);
      dist[i] = d;
    }
  }
  for (let y = height - 1; y >= 0; y--) {
    for (let x = width - 1; x >= 0; x--) {
      const i = y * width + x;
      if (dist[i] === 0) continue;
      let d = dist[i];
      if (x + 1 < width) d = Math.min(d, dist[i + 1] + 1);
      if (y + 1 < height) d = Math.min(d, dist[i + width] + 1);
      dist[i] = d;
    }
  }

  for (let pass = 0; pass < 5; pass++) {
    const next = shade.slice();
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        if (dist[i] === 0 || dist[i] > 5) continue;
        let best = shade[i];
        const neighbors = [i - 1, i + 1, i - width, i + width];
        for (const n of neighbors) {
          if (mask[n] > 0.4 && shade[n] > best) best = shade[n];
        }
        next[i] = best;
      }
    }
    shade.set(next);
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function isDark(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

function drawLogo(
  ctx: CanvasRenderingContext2D,
  logo: Logo,
  box: { x: number; y: number; w: number; h: number },
  ink: string | null,
) {
  ctx.save();
  if (logo.kind === "text") {
    const text = logo.text.trim() || "BRAND";
    const family = getComputedStyle(document.body).fontFamily;
    ctx.font = `800 100px ${family}`;
    const scale = Math.min(box.w / ctx.measureText(text).width, box.h / 100);
    ctx.font = `800 ${100 * scale}px ${family}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = ink ?? "#111111";
    ctx.fillText(text, box.x + box.w / 2, box.y + box.h / 2);
  } else {
    const { image } = logo;
    const iw = image.naturalWidth || 300;
    const ih = image.naturalHeight || 150;
    const scale = Math.min(box.w / iw, box.h / ih);
    const w = iw * scale;
    const h = ih * scale;
    ctx.drawImage(image, box.x + (box.w - w) / 2, box.y + (box.h - h) / 2, w, h);
    if (ink) {
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = ink;
      ctx.fillRect(box.x, box.y, box.w, box.h);
    }
  }
  ctx.restore();
}

function renderMockup(
  canvas: HTMLCanvasElement,
  base: Base,
  garment: string,
  logo: Logo,
  ink: string | null,
  placement: ConstructorPlacement,
  size: number,
) {
  const { width, height, pixels, mask, shade } = base;
  canvas.width = width;
  canvas.height = height;

  const layer = document.createElement("canvas");
  layer.width = width;
  layer.height = height;
  const layerCtx = layer.getContext("2d", { willReadFrequently: true })!;
  const w = placement.w * size * width;
  const h = w * placement.ratio;
  drawLogo(
    layerCtx,
    logo,
    { x: placement.cx * width - w / 2, y: placement.cy * height - h / 2, w, h },
    ink,
  );
  const print = layerCtx.getImageData(0, 0, width, height).data;

  const [cr, cg, cb] = hexToRgb(garment);
  // Near-black dye on a white source would flatten the folds; lift it a touch.
  const lift = (1 - (0.299 * cr + 0.587 * cg + 0.114 * cb) / 255) * 20;
  const fr = cr + lift;
  const fg = cg + lift;
  const fb = cb + lift;

  const ctx = canvas.getContext("2d")!;
  const out = ctx.createImageData(width, height);
  const data = out.data;
  for (let i = 0, p = 0; i < mask.length; i++, p += 4) {
    const m = mask[i];
    const pr = pixels[p];
    const pg = pixels[p + 1];
    const pb = pixels[p + 2];
    const chroma = Math.max(pr, pg, pb) - Math.min(pr, pg, pb);
    const skin = chroma > 20 && pr > pg + 10 && pr > pb + 8;
    const L = 0.299 * pr + 0.587 * pg + 0.114 * pb;
    // Collar and cuff fringe is warm white, so it used to match the skin
    // test and stay the original photo. Bright cloth is fabric, not skin.
    const cotton = L > 150;

    if (m < 0.04 || (skin && !cotton)) {
      data[p] = pr;
      data[p + 1] = pg;
      data[p + 2] = pb;
      data[p + 3] = 255;
      continue;
    }

    const s = shade[i];
    let r = fr * s;
    let g = fg * s;
    let b = fb * s;

    const la = (print[p + 3] / 255) * 0.96;
    if (la > 0) {
      const ps = Math.min(1, s * 1.04);
      r = r * (1 - la) + print[p] * ps * la;
      g = g * (1 - la) + print[p + 1] * ps * la;
      b = b * (1 - la) + print[p + 2] * ps * la;
    }

    // Soft edge blends only the faintest fringe into the backdrop. A wider
    // partial mask used to dye dark and read as a black outline.
    if (m >= 0.25 || cotton) {
      data[p] = r;
      data[p + 1] = g;
      data[p + 2] = b;
    } else {
      const spill = Math.min(1, Math.max(0, (L - STUDIO_BG) / 90));
      const br = pr * (1 - spill) + STUDIO_BG * spill;
      const bg = pg * (1 - spill) + STUDIO_BG * spill;
      const bb = pb * (1 - spill) + (STUDIO_BG + 2) * spill;
      const t = Math.min(1, m * 1.55);
      const ease = t * t * (3 - 2 * t);
      data[p] = br * (1 - ease) + r * ease;
      data[p + 1] = bg * (1 - ease) + g * ease;
      data[p + 2] = bb * (1 - ease) + b * ease;
    }
    data[p + 3] = 255;
  }
  ctx.putImageData(out, 0, 0);
}

function Group({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-5">
      <legend className="float-left w-full font-mono text-label text-muted uppercase">
        {legend}
      </legend>
      <div className="clear-both pt-4">{children}</div>
    </fieldset>
  );
}

function SwatchButton({
  swatch,
  on,
  onClick,
}: {
  swatch: Swatch;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={swatch.label}
      title={swatch.label}
      onClick={onClick}
      className={`relative size-10 cursor-pointer rounded-full border border-ink/15 transition-transform duration-200 hover:scale-110 active:scale-95 ${
        on ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""
      }`}
      style={{ backgroundColor: swatch.hex }}
    />
  );
}

function CustomColor({
  value,
  on,
  label,
  onChange,
}: {
  value: string;
  on: boolean;
  label: string;
  onChange: (hex: string) => void;
}) {
  return (
    <label
      title={label}
      className={`relative inline-flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-ink/40 text-ink transition-transform duration-200 hover:scale-110 ${
        on ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""
      }`}
      style={on ? { backgroundColor: value } : undefined}
    >
      <span className="sr-only">{label}</span>
      {on ? null : <Icon name="plus" className="size-4" />}
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </label>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const on = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(option.id)}
            className={`inline-flex min-h-11 cursor-pointer items-center border px-4 text-[14px] transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97] ${
              on
                ? "border-accent bg-accent text-background"
                : "border-line text-ink hover:border-ink/50 hover:bg-ink/5"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

const INPUT =
  "w-full border-0 border-b border-line bg-transparent py-3 text-[16px] text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none";

export function TeeConstructor({ index }: { index: string }) {
  const uid = useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileUrl = useRef<string | null>(null);
  const [base, setBase] = useState<Base | null>(null);
  const [failed, setFailed] = useState(false);

  const [garment, setGarment] = useState(CONSTRUCTOR.garments[0].hex);
  const [logoKind, setLogoKind] = useState<Logo["kind"]>("text");
  const [text, setText] = useState("BRAND");
  const [file, setFile] = useState<{ image: HTMLImageElement; name: string } | null>(null);
  const [ink, setInk] = useState<string | null>(null);
  const [placementId, setPlacementId] = useState(CONSTRUCTOR.placements[0].id);
  const [size, setSize] = useState(1);

  const placement =
    CONSTRUCTOR.placements.find((item) => item.id === placementId) ??
    CONSTRUCTOR.placements[0];
  const logo: Logo =
    logoKind === "file" && file
      ? { kind: "file", ...file }
      : { kind: "text", text };
  const autoInk = isDark(garment) ? "#f4f3ef" : "#16161a";
  const resolvedInk = ink ?? (logo.kind === "text" ? autoInk : null);

  useEffect(() => {
    let alive = true;
    loadBase()
      .then((loaded) => alive && setBase(loaded))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
      if (fileUrl.current) URL.revokeObjectURL(fileUrl.current);
    };
  }, []);

  useEffect(() => {
    if (!base || !canvasRef.current) return;
    const frame = requestAnimationFrame(() => {
      if (canvasRef.current) {
        renderMockup(canvasRef.current, base, garment, logo, resolvedInk, placement, size);
      }
    });
    return () => cancelAnimationFrame(frame);
    // `logo` is rebuilt every render; its inputs are listed instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, garment, logoKind, text, file, resolvedInk, placement, size]);

  async function onFile(input: HTMLInputElement) {
    const picked = input.files?.[0];
    input.value = "";
    if (!picked) return;
    const url = URL.createObjectURL(picked);
    try {
      const image = await loadImage(url);
      if (fileUrl.current) URL.revokeObjectURL(fileUrl.current);
      fileUrl.current = url;
      setFile({ image, name: picked.name });
      setLogoKind("file");
      setInk(null);
    } catch {
      URL.revokeObjectURL(url);
    }
  }

  function download() {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "termmo-maket.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  const garmentLabel =
    CONSTRUCTOR.garments.find((item) => item.hex === garment)?.label ?? "свой цвет";
  const inkLabel = ink
    ? (CONSTRUCTOR.inks.find((item) => item.hex === ink)?.label ?? "свой цвет")
    : logo.kind === "file"
      ? "как в файле"
      : "контрастный";
  const message = [
    "Здравствуйте! Собрал(а) макет в конструкторе на сайте.",
    `Изделие: футболка, цвет — ${garmentLabel} (${garment})`,
    logo.kind === "file"
      ? `Логотип: свой файл «${logo.name}», пришлю в чат`
      : `Логотип: надпись «${text.trim() || "BRAND"}»`,
    `Цвет логотипа: ${inkLabel}${ink ? ` (${ink})` : ""}`,
    `Размещение: ${placement.label.toLowerCase()}`,
  ].join("\n");

  return (
    <section id="constructor" className="section-y bg-background text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Конструктор"
          title="Примерьте свой бренд"
          lead="Выберите цвет футболки, загрузите логотип — и отправьте макет нам в WhatsApp."
        />

        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <div className="relative aspect-[3/4] overflow-hidden bg-raised lg:sticky lg:top-24">
              <canvas
                ref={canvasRef}
                role="img"
                aria-label={`Футболка цвета «${garmentLabel}» с логотипом: ${placement.label.toLowerCase()}`}
                className={`size-full object-cover transition-opacity duration-500 ${
                  base ? "opacity-100" : "opacity-0"
                }`}
              />
              {base ? null : (
                <p className="absolute inset-0 grid place-items-center font-mono text-label text-muted uppercase">
                  {failed ? "Не удалось загрузить фото" : "Загружаем макет…"}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-8 lg:col-span-5">
            <Group legend={`Цвет футболки — ${garmentLabel}`}>
              <div className="flex flex-wrap gap-3">
                {CONSTRUCTOR.garments.map((swatch) => (
                  <SwatchButton
                    key={swatch.hex}
                    swatch={swatch}
                    on={swatch.hex === garment}
                    onClick={() => setGarment(swatch.hex)}
                  />
                ))}
                <CustomColor
                  label="Свой цвет футболки"
                  value={garment}
                  on={!CONSTRUCTOR.garments.some((item) => item.hex === garment)}
                  onChange={setGarment}
                />
              </div>
            </Group>

            <Group legend="Логотип">
              <Segmented
                options={[
                  { id: "text", label: "Надпись" },
                  { id: "file", label: "Свой файл" },
                ]}
                value={logoKind}
                onChange={(kind) => {
                  setLogoKind(kind);
                  setInk(null);
                }}
              />
              <div className="mt-5">
                {logoKind === "text" ? (
                  <>
                    <label htmlFor={`${uid}-text`} className="sr-only">
                      Текст логотипа
                    </label>
                    <input
                      id={`${uid}-text`}
                      className={INPUT}
                      maxLength={18}
                      placeholder="Название бренда"
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                    />
                  </>
                ) : (
                  <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 border border-dashed border-ink/30 px-4 text-[14px] transition-colors duration-200 hover:border-ink hover:bg-ink/5">
                    <span className="truncate">
                      {file ? file.name : "Загрузить PNG, SVG или JPG"}
                    </span>
                    <SpecLabel className="shrink-0">
                      {file ? "Заменить" : "Выбрать"}
                    </SpecLabel>
                    <input
                      type="file"
                      accept="image/png,image/svg+xml,image/jpeg,image/webp"
                      className="sr-only"
                      onChange={(event) => onFile(event.currentTarget)}
                    />
                  </label>
                )}
                {logoKind === "file" ? (
                  <p className="mt-3 text-sm text-muted">
                    Лучше всего — PNG с прозрачным фоном. Файл никуда не загружается,
                    макет собирается прямо в браузере.
                  </p>
                ) : null}
              </div>
            </Group>

            <Group legend={`Цвет логотипа — ${inkLabel}`}>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  aria-pressed={ink === null}
                  onClick={() => setInk(null)}
                  className={`inline-flex h-10 cursor-pointer items-center rounded-full border border-line px-4 text-[13px] transition-transform duration-200 hover:scale-105 active:scale-95 ${
                    ink === null
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                      : ""
                  }`}
                >
                  {logoKind === "file" && file ? "Как в файле" : "Авто"}
                </button>
                {CONSTRUCTOR.inks.map((swatch) => (
                  <SwatchButton
                    key={swatch.hex}
                    swatch={swatch}
                    on={swatch.hex === ink}
                    onClick={() => setInk(swatch.hex)}
                  />
                ))}
                <CustomColor
                  label="Свой цвет логотипа"
                  value={ink ?? autoInk}
                  on={ink !== null && !CONSTRUCTOR.inks.some((item) => item.hex === ink)}
                  onChange={setInk}
                />
              </div>
            </Group>

            <Group legend="Размещение">
              <Segmented
                options={CONSTRUCTOR.placements.map(({ id, label }) => ({ id, label }))}
                value={placementId}
                onChange={(id) => {
                  setPlacementId(id);
                  setSize(1);
                }}
              />
              <label htmlFor={`${uid}-size`} className="mt-6 flex items-center gap-4">
                <SpecLabel className="w-20 shrink-0">Размер</SpecLabel>
                <input
                  id={`${uid}-size`}
                  type="range"
                  min={0.6}
                  max={1.4}
                  step={0.01}
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </label>
            </Group>

            <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
              <ButtonLink href={waLink(message)}>Заказать такой</ButtonLink>
              <button
                type="button"
                onClick={download}
                disabled={!base}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-[var(--radius)] border border-ink/25 px-5 text-[14px] font-medium text-ink transition-[color,background-color,border-color,transform] duration-200 hover:border-ink hover:bg-ink/5 active:scale-[0.97] disabled:opacity-40"
              >
                Скачать макет
              </button>
            </div>
            <p className="text-sm text-muted">
              Это быстрый предпросмотр. Точный макет с размерами и техникой нанесения
              подготовим после брифа.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
