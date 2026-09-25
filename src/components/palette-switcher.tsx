"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import {
  ACCENT_PRESETS,
  BACKGROUND_PRESETS,
  BRANDS_ACCENT_PRESETS,
  BRANDS_BACKGROUND_PRESETS,
  BRANDS_DEFAULT_PALETTE,
  BRANDS_PALETTE_STORAGE_KEY,
  BRANDS_SURFACE_PRESETS,
  DEFAULT_PALETTE,
  PALETTE_STORAGE_KEY,
  SURFACE_PRESETS,
  applyPalette,
  clearPalette,
  readStoredPalette,
  resetStoredPalette,
  sameHex,
  storePalette,
  type Palette,
} from "@/lib/palette";

function Swatch({
  value,
  label,
  hint,
  selected,
  onSelect,
}: {
  value: string;
  label: string;
  hint?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      title={hint ? `${label} · ${hint}` : label}
      className={`flex flex-col items-center gap-1 rounded-lg px-0.5 py-1 transition-colors ${
        selected ? "bg-ink/5" : "hover:bg-ink/5"
      }`}
    >
      <span
        className={`size-7 rounded-full ring-1 ring-ink/15 ${
          selected ? "outline outline-2 outline-offset-2 outline-ink" : ""
        }`}
        style={{ background: value }}
      />
      <span className="max-w-[52px] truncate text-[9px] leading-tight font-medium tracking-[-0.01em] text-ink/70">
        {label}
      </span>
    </button>
  );
}

export function PaletteSwitcher() {
  const titleId = useId();
  const pathname = usePathname();
  const brands = pathname.includes("/brands");
  const storageKey = brands ? BRANDS_PALETTE_STORAGE_KEY : PALETTE_STORAGE_KEY;
  const accents = brands ? BRANDS_ACCENT_PRESETS : ACCENT_PRESETS;
  const surfaces = brands ? BRANDS_SURFACE_PRESETS : SURFACE_PRESETS;
  const backgrounds = brands ? BRANDS_BACKGROUND_PRESETS : BACKGROUND_PRESETS;
  const fallback = brands ? BRANDS_DEFAULT_PALETTE : DEFAULT_PALETTE;
  const [open, setOpen] = useState(true);
  const [palette, setPalette] = useState<Palette>(fallback);

  useEffect(() => {
    const stored = readStoredPalette(storageKey);
    if (stored) {
      setPalette(stored);
      applyPalette(stored);
      return;
    }
    setPalette(fallback);
    if (brands) {
      applyPalette(fallback);
      return;
    }
    clearPalette();
  }, [brands, fallback, storageKey]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function commit(next: Palette) {
    setPalette(next);
    applyPalette(next);
    storePalette(next, storageKey);
  }

  function reset() {
    resetStoredPalette(storageKey);
    setPalette(fallback);
    if (brands) {
      applyPalette(fallback);
      return;
    }
    clearPalette();
  }

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[90] flex max-w-[calc(100vw-2rem)] flex-col items-start gap-2">
      {open ? (
        <section
          aria-labelledby={titleId}
          className="pointer-events-auto max-h-[min(78vh,640px)] w-[min(100%,340px)] overflow-y-auto rounded-[20px] bg-surface text-ink shadow-[0_16px_48px_rgba(33,14,3,0.18)] ring-1 ring-ink/10"
        >
          <header className="flex items-center justify-between gap-3 px-4 pt-3.5 pb-2">
            <div>
              <p
                id={titleId}
                className="text-[12px] font-semibold tracking-[-0.02em]"
              >
                {brands ? "Палитра одежды" : "Палитра"}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-muted">
                {palette.accent} · только у вас в браузере
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-8 items-center justify-center rounded-full text-[18px] leading-none text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
              aria-label="Свернуть палитру"
            >
              ×
            </button>
          </header>

          <div className="flex items-center gap-2 px-4 pb-3">
            <span className="inline-flex h-8 items-center rounded-full bg-accent px-3 text-[11px] font-semibold text-white">
              Кнопка
            </span>
            <span className="text-[11px] font-medium text-accent">лейбл</span>
            <span className="rounded-md bg-raised px-2 py-1 text-[10px] text-ink ring-1 ring-ink/8">
              карточка
            </span>
          </div>

          <div className="space-y-3 border-t border-ink/8 px-3 py-3">
            <fieldset>
              <legend className="mb-1.5 px-1 text-[10px] font-medium tracking-[0.12em] text-muted uppercase">
                Акцент
              </legend>
              <div className="flex flex-wrap items-start gap-1">
                {accents.map((preset) => (
                  <Swatch
                    key={preset.id}
                    value={preset.value}
                    label={preset.label}
                    hint={preset.hint}
                    selected={sameHex(palette.accent, preset.value)}
                    onSelect={() => commit({ ...palette, accent: preset.value })}
                  />
                ))}
                <label className="flex flex-col items-center gap-1 rounded-lg px-0.5 py-1">
                  <span className="relative size-7 overflow-hidden rounded-full ring-1 ring-ink/15">
                    <input
                      type="color"
                      value={palette.accent}
                      aria-label="Свой акцент"
                      onChange={(event) =>
                        commit({ ...palette, accent: event.target.value })
                      }
                      className="absolute inset-[-30%] size-[160%] cursor-pointer border-0 bg-transparent"
                    />
                  </span>
                  <span className="text-[9px] font-medium text-ink/70">Свой</span>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-1.5 px-1 text-[10px] font-medium tracking-[0.12em] text-muted uppercase">
                Бумага
              </legend>
              <div className="flex flex-wrap items-start gap-1">
                {surfaces.map((preset) => (
                  <Swatch
                    key={preset.id}
                    value={preset.value}
                    label={preset.label}
                    selected={sameHex(palette.surface, preset.value)}
                    onSelect={() =>
                      commit({ ...palette, surface: preset.value })
                    }
                  />
                ))}
                <label className="flex flex-col items-center gap-1 rounded-lg px-0.5 py-1">
                  <span className="relative size-7 overflow-hidden rounded-full ring-1 ring-ink/15">
                    <input
                      type="color"
                      value={palette.surface}
                      aria-label="Свой фон бумаги"
                      onChange={(event) =>
                        commit({ ...palette, surface: event.target.value })
                      }
                      className="absolute inset-[-30%] size-[160%] cursor-pointer border-0 bg-transparent"
                    />
                  </span>
                  <span className="text-[9px] font-medium text-ink/70">Свой</span>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-1.5 px-1 text-[10px] font-medium tracking-[0.12em] text-muted uppercase">
                Тёмный фон
              </legend>
              <div className="flex flex-wrap items-start gap-1">
                {backgrounds.map((preset) => (
                  <Swatch
                    key={preset.id}
                    value={preset.value}
                    label={preset.label}
                    selected={sameHex(palette.background, preset.value)}
                    onSelect={() =>
                      commit({ ...palette, background: preset.value })
                    }
                  />
                ))}
              </div>
            </fieldset>
          </div>

          <footer className="flex items-center justify-between border-t border-ink/8 px-4 py-2.5">
            <button
              type="button"
              onClick={reset}
              className="text-[11px] font-medium text-muted transition-colors hover:text-ink"
            >
              Сбросить
            </button>
            <p className="text-[10px] text-muted">Esc — свернуть</p>
          </footer>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-[12px] font-semibold text-ink shadow-[0_10px_28px_rgba(33,14,3,0.16)] ring-1 ring-ink/10"
      >
        <span
          aria-hidden
          className="size-3.5 rounded-full ring-1 ring-ink/20"
          style={{ background: palette.accent }}
        />
        {open ? "Скрыть" : "Палитра"}
      </button>
    </div>
  );
}
