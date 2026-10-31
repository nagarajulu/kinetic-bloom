/**
 * Resolves static asset URLs relative to Vite's configured BASE_URL.
 * Supports root domain deployments, subpath deployments (e.g. GitHub Pages),
 * and local dev environments seamlessly.
 */
export function getAssetUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
