import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

import { productCategories } from './config';

/**
 * The `products` catalogue. Each product is a Markdown file in
 * `src/content/products/`, edited by the owner through the Git-based CMS
 * (Phase 4). Fields below are what the CMS form writes.
 *
 * Images are referenced by filename only (e.g. `sm1.png`); the actual files
 * live in `src/assets/products/` and are optimised at build time. Missing
 * images fall back to a "photo coming soon" tile so the site always builds.
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    code: z.string(),
    name: z.string(),
    category: z.enum(productCategories),
    dimensions: z.string(),
    price: z.number(),
    description: z.string(),
    image: z.string(),
    altImages: z.array(z.string()).default([]),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

/**
 * The `gallery` — lifestyle photos of Earthecho pieces styled in gardens and
 * homes. Managed by the owner through the CMS (image + optional caption).
 */
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    image: z.string(),
    caption: z.string().default(''),
    order: z.number().default(0),
  }),
});

export const collections = { products, gallery };
