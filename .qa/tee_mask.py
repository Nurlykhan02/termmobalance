"""Builds the t-shirt mask for the brands constructor.

Covers white cotton and its bright JPEG fringe, but does not spill into the
studio-gray backdrop (that creates a hard cutout ring).

Usage: /tmp/tb-venv/bin/python .qa/tee_mask.py
"""

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = "public/images/constructor/tee-model.jpg"
OUT = "public/images/constructor/tee-mask.png"
PREVIEW = ".qa/shots/tee-mask-preview.jpg"

img = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float32)
r, g, b = img[..., 0], img[..., 1], img[..., 2]
lum = 0.299 * r + 0.587 * g + 0.114 * b
chroma = img.max(axis=2) - img.min(axis=2)
skin = (r > g + 8) & (r > b + 6) & (chroma > 16)

# White cotton vs studio gray (~lum 75–95). Side folds dip to ~130.
core = (lum > 145) & (chroma < 18) & ~skin
labels, n = ndimage.label(core)
sizes = ndimage.sum(core, labels, range(1, n + 1))
tee = labels == (np.argmax(sizes) + 1)

# Grow into shadowed cotton folds that still read as fabric, not backdrop.
band = ndimage.binary_dilation(tee, iterations=12)
fold = (lum > 118) & (chroma < 18) & band & ~skin
fold_labels, _ = ndimage.label(fold | tee)
tee = np.isin(fold_labels, np.unique(fold_labels[tee]))
tee = ndimage.binary_closing(tee, iterations=5)
tee = ndimage.binary_fill_holes(tee)

# Bright antialiased fringe only (fabric mixed into gray) — not pure gray.
for _ in range(6):
    ring = ndimage.binary_dilation(tee, iterations=1) & ~tee & ~skin
    take = ring & (lum > 120) & (chroma < 22)
    if not take.any():
        break
    tee |= take

# Soft AA: mostly hard interior, ~1px falloff at the silhouette.
alpha = ndimage.gaussian_filter(tee.astype(np.float32), 0.55)
alpha = np.clip(alpha, 0, 1)
alpha = np.where(alpha > 0.08, np.clip((alpha - 0.08) / 0.42, 0, 1), 0)

Image.fromarray((alpha * 255).astype(np.uint8), mode="L").save("/tmp/tee-alpha.png")
rgba = Image.new("RGBA", (alpha.shape[1], alpha.shape[0]), (255, 255, 255, 0))
rgba.putalpha(Image.fromarray((alpha * 255).astype(np.uint8)))
rgba.save(OUT, optimize=True)

ys, xs = np.nonzero(alpha > 0.5)
h, w = alpha.shape
print(f"size {w}x{h}")
print(
    "bbox %",
    round(xs.min() / w * 100, 1),
    round(ys.min() / h * 100, 1),
    round(xs.max() / w * 100, 1),
    round(ys.max() / h * 100, 1),
)

preview = img.copy()
hit = alpha > 0.5
preview[hit] = preview[hit] * 0.4 + np.array([230, 40, 40]) * 0.6
Image.fromarray(preview.astype(np.uint8)).save(PREVIEW, quality=85)
