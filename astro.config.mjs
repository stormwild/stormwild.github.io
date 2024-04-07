import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://stormwild.github.io',
  image: {
    domains: ['astro.build'],
  },
  vite: {
    ssr: {
      noExternal: ['bootstrap'],
    },
  },
})
