// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Domaine de production : sert aux URL canoniques, Open Graph et au sitemap.
  site: 'https://oliviergaillard.fr',
  // URL sans slash final (/coach, /ap) : une seule version indexée par page.
  trailingSlash: 'never',
  build: { format: 'file' },
});
