import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";
import markdoc from "@astrojs/markdoc";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  integrations: [AstroPWA({
    /* your pwa options */
    registerType: "autoUpdate"
  }), react(), solidJs(), markdoc(), mdx()]
});