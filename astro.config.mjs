// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://bruce212.github.io",
  base: "/somerset-accountancy/",
  integrations: [svelte()],
  output: "static",
});
