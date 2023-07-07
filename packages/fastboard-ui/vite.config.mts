import { defineConfig } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ preprocess: vitePreprocess() })],
  envDir: "../..",
  define: { __NAME__: '"@netless/fastboard"', __VERSION__: '"develop"' },
});
