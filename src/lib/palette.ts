export const PALETTE_STORAGE_KEY = "termmo-palette";
export const BRANDS_PALETTE_STORAGE_KEY = "termmo-palette-brands";

export interface Palette {
  accent: string;
  surface: string;
  background: string;
}

export const DEFAULT_PALETTE: Palette = {
  accent: "#1f9e96",
  surface: "#f7f5f0",
  background: "#0a0705",
};

export const ACCENT_PRESETS = [
  { id: "teal", label: "Бирюза", value: "#1f9e96", hint: "сейчас" },
  { id: "teal-deep", label: "Бирюза+", value: "#147a73", hint: "контраст" },
  { id: "coral", label: "Коралл", value: "#ef523c", hint: "логотип" },
  { id: "coral-deep", label: "Коралл+", value: "#c43a28", hint: "контраст" },
  { id: "forest", label: "Хвоя", value: "#2f6b4f", hint: "ткань" },
  { id: "copper", label: "Медь", value: "#b85c38", hint: "тепло" },
] as const;

export const SURFACE_PRESETS = [
  { id: "cream", label: "Крем", value: "#f7f5f0" },
  { id: "warm", label: "Теплее", value: "#f3ebe0" },
  { id: "paper", label: "Бумага", value: "#efebe3" },
  { id: "white", label: "Белый", value: "#ffffff" },
  { id: "cool", label: "Холоднее", value: "#f3f4f1" },
] as const;

export const BACKGROUND_PRESETS = [
  { id: "espresso", label: "Эспрессо", value: "#0a0705" },
  { id: "ink", label: "Чернила", value: "#210e03" },
  { id: "void", label: "Глубже", value: "#050403" },
] as const;

/** Clothing page: a little darker than the factory cream, with room to go further. */
export const BRANDS_DEFAULT_PALETTE: Palette = {
  accent: "#c4a574",
  surface: "#2c2824",
  background: "#141210",
};

export const BRANDS_ACCENT_PRESETS = [
  { id: "camel", label: "Кэмел", value: "#c4a574", hint: "одежда" },
  { id: "sand", label: "Песок", value: "#d7c4a3", hint: "светлый" },
  { id: "bone", label: "Кость", value: "#efe8dc", hint: "на тёмном" },
  { id: "leather", label: "Кожа", value: "#8c5e3c", hint: "тёплый" },
  { id: "burgundy", label: "Бордо", value: "#7c3038", hint: "ткань" },
  { id: "olive", label: "Олива", value: "#5d6848", hint: "форма" },
  { id: "ink", label: "Чернила", value: "#1c1612", hint: "строгий" },
  { id: "coral", label: "Коралл", value: "#ef523c", hint: "логотип" },
  { id: "teal", label: "Бирюза", value: "#1f9e96", hint: "завод" },
] as const;

export const BRANDS_SURFACE_PRESETS = [
  { id: "graphite", label: "Графит", value: "#2c2824" },
  { id: "wool", label: "Шерсть", value: "#3c352f" },
  { id: "cocoa", label: "Какао", value: "#4a4038" },
  { id: "coal", label: "Уголь", value: "#221e1b" },
  { id: "night", label: "Ночь", value: "#171412" },
  { id: "stone", label: "Камень", value: "#e6dfd6" },
  { id: "linen", label: "Лён", value: "#d5ccc0" },
  { id: "dust", label: "Пыль", value: "#c4b8aa" },
  { id: "cream", label: "Крем", value: "#f7f5f0" },
] as const;

export const BRANDS_BACKGROUND_PRESETS = [
  { id: "night", label: "Ночь", value: "#141210" },
  { id: "coal", label: "Уголь", value: "#0e0c0b" },
  { id: "espresso", label: "Эспрессо", value: "#0a0705" },
  { id: "chocolate", label: "Шоколад", value: "#241910" },
] as const;

export function isDarkHex(hex: string) {
  const raw = hex.replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((char) => char + char)
          .join("")
      : raw;
  const value = Number.parseInt(full, 16);
  if (Number.isNaN(value)) return false;
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance < 0.5;
}

function mixWithWhite(hex: string, amount: number) {
  const raw = hex.replace("#", "");
  const value = Number.parseInt(raw.length === 3 ? raw.repeat(2) : raw, 16);
  const channel = (shift: number) => {
    const current = (value >> shift) & 255;
    return Math.round(current + (255 - current) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(16)}${channel(8)}${channel(0)}`;
}

export function applyPalette(palette: Palette) {
  const root = document.documentElement;
  const dark = isDarkHex(palette.surface);
  root.style.setProperty("--accent", palette.accent);
  root.style.setProperty("--surface", palette.surface);
  root.style.setProperty("--background", palette.background);
  if (dark) {
    root.style.setProperty("--ink", "#f4f0ea");
    root.style.setProperty("--foreground", "#f4f0ea");
    root.style.setProperty("--muted", "#b7ab9f");
    root.style.setProperty("--raised", mixWithWhite(palette.surface, 0.08));
    return;
  }
  root.style.setProperty("--ink", "#210e03");
  root.style.setProperty("--foreground", palette.surface);
  root.style.setProperty("--muted", "#6d635c");
  root.style.setProperty("--raised", "#ffffff");
}

export function clearPalette() {
  const root = document.documentElement;
  for (const name of [
    "--accent",
    "--surface",
    "--foreground",
    "--background",
    "--ink",
    "--muted",
    "--raised",
  ]) {
    root.style.removeProperty(name);
  }
}

export function readStoredPalette(
  key: string = PALETTE_STORAGE_KEY,
): Palette | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Palette>;
    if (
      typeof parsed.accent !== "string" ||
      typeof parsed.surface !== "string" ||
      typeof parsed.background !== "string"
    ) {
      return null;
    }
    return {
      accent: parsed.accent,
      surface: parsed.surface,
      background: parsed.background,
    };
  } catch {
    return null;
  }
}

export function storePalette(
  palette: Palette,
  key: string = PALETTE_STORAGE_KEY,
) {
  localStorage.setItem(key, JSON.stringify(palette));
}

export function resetStoredPalette(key: string = PALETTE_STORAGE_KEY) {
  localStorage.removeItem(key);
}

export function sameHex(a: string, b: string) {
  return a.replace("#", "").toLowerCase() === b.replace("#", "").toLowerCase();
}
