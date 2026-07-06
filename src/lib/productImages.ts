import type { ImageMetadata } from 'astro';

/**
 * Eagerly import every product photo in `src/assets/products/` so Astro can
 * optimise them at build time. Products reference images by filename only
 * (e.g. `sm1.png`); this maps that filename to its optimised asset.
 *
 * If a filename has no matching file yet (photos not uploaded), the lookup
 * returns `undefined` and the UI shows a "photo coming soon" tile instead of
 * breaking the build.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/{products,gallery}/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const byFilename = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  const filename = path.split('/').pop();
  if (filename) byFilename.set(filename.toLowerCase(), mod.default);
}

/** Just the file name from either a bare name or a CMS-stored path. */
function basename(value: string): string {
  return value.split(/[\\/]/).pop()!.toLowerCase();
}

/**
 * Return the optimised asset for an image filename, or undefined.
 * Accepts a bare filename ("sm1.png") or a path the CMS may store
 * ("/src/assets/products/sm1.png").
 */
export function resolveProductImage(
  filename: string | undefined,
): ImageMetadata | undefined {
  if (!filename) return undefined;
  return byFilename.get(basename(filename));
}

/** All image filenames for a product (primary first), de-duplicated. */
export function galleryFilenames(
  primary: string,
  alts: string[] = [],
): string[] {
  return [...new Set([primary, ...alts])];
}
