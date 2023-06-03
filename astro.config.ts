import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  experimental: {
    assets: true
  },
  integrations: [AstroPWA({
    /* your pwa options */
    registerType: "autoUpdate"
  }), react()]
});