import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import rehypeMermaid from 'rehype-mermaid'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://stormwild.github.io',

  image: {
    domains: [],
  },

  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          strategy: 'img-svg',
          dark: true,
        },
      ],
    ],
  },

  vite: {
    ssr: {
      noExternal: ['bootstrap'],
    },
  },
  integrations: [
    sitemap(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
  ],
})
