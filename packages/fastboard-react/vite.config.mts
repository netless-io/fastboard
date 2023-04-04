import type { Plugin } from "vite";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const viteReactPlugins = react();
// Remove `dedupe: ['react', 'react-dom']` from the viteReactRefresh plugin.
const viteReactRefresh = viteReactPlugins.find(
  e => (e as Plugin | null)?.name === "vite:react-refresh"
) as Plugin;
delete viteReactRefresh.config;

export default defineConfig({
  plugins: [viteReactPlugins, svelte({ preprocess: vitePreprocess() })],
  envDir: "../..",
  define: { __NAME__: '"@netless/fastboard"', __VERSION__: '"develop"' },
});
