import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import image from '@astrojs/image'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    tailwind(),
  ],
  vite: {
    ssr: {
      noExternal: ['modern-normalize'],
    },
  },
  server: { port: 3000 },
})
