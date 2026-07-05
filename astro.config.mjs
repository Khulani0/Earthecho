// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` to the live domain once it is pointed at Vercel (Phase 6).
// It is required for a correct sitemap.xml, canonical URLs and Open Graph links.
export default defineConfig({
  site: 'https://earthecho.co.za',
  output: 'static',
  integrations: [sitemap()],
});
