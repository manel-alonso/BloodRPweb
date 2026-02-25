/**
 * Returns the full URL for a public asset, respecting the Vite base path.
 * Required for GitHub Pages and other deployments with a subpath.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
