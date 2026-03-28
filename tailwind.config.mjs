/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        th: {
          bg: 'var(--th-bg)',
          surface: 'var(--th-surface)',
          raised: 'var(--th-raised)',
          border: 'var(--th-border)',
          ring: 'var(--th-ring)',
          text: 'var(--th-text)',
          muted: 'var(--th-muted)',
          faint: 'var(--th-faint)',
          accent: 'var(--th-accent)',
          'accent-h': 'var(--th-accent-h)',
        },
      },
    },
  },
  plugins: [],
}
