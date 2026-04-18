/**
 * Prepends the Vite base URL to a public asset path.
 * In production (base: '/portfolio/') → /portfolio/img/...
 * In development (base: '/')          → /img/...
 */
export const assetUrl = (path: string): string =>
  import.meta.env.BASE_URL.replace(/\/$/, '') + path;
