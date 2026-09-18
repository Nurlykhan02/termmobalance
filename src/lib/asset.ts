/** Prefix public asset paths with the app basePath (e.g. `/termmobalance` on GitHub Pages). */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
