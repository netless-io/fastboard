import type { Plugin } from "vite";

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import react from "@vitejs/plugin-react";

const viteReactPlugins = react();
// Remove `dedupe: ['react', 'react-dom']` from the viteReactRefresh plugin.
const viteReactRefresh = viteReactPlugins.find(
  e => (e as Plugin | null)?.name === "vite:react-refresh"
) as Plugin;
delete viteReactRefresh.config;

export default defineConfig({
  plugins: [viteReactPlugins, svelte()],
  envDir: "../..",
  define: { __NAME__: '"@netless/fastboard"', __VERSION__: '"develop"' },
});
