import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://stormwild.github.io',
  image: {
    domains: []
  },
  vite: {
    ssr: {
      noExternal: ['bootstrap']
    }
  },
  integrations: [sitemap()]
});