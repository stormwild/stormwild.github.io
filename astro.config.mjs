import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'

import analogjsangular from '@analogjs/astro-angular'

// https://astro.build/config
export default defineConfig({
  site: 'https://stormwild.github.io',
  image: {
    domains: [],
  },
  vite: {
    ssr: {
      noExternal: ['bootstrap', '@rx-angular/**'],
    },
  },
  integrations: [
    sitemap(),
    analogjsangular({
      vite: {
        inlineStylesExtension: 'scss|sass|less',
      },
    }),
  ],
})
