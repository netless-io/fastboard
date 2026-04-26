import { fileURLToPath, URL } from "node:url";

import type { Plugin } from "vite";

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import react from "@vitejs/plugin-react";

const viteReactPlugins = react();
const viteReactRefresh = viteReactPlugins.find(
  e => (e as Plugin | null)?.name === "vite:react-refresh"
) as Plugin;
delete viteReactRefresh.config;

export default defineConfig({
  plugins: [viteReactPlugins, svelte()],
  envDir: "../..",
  build: {
    outDir: "test-dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      {
        find: /^@netless\/fastboard-react-full$/,
        replacement: fileURLToPath(new URL("../fastboard-react/src/index.tsx", import.meta.url)),
      },
      {
        find: /^@netless\/fastboard-core$/,
        replacement: fileURLToPath(new URL("../fastboard-core-full/src/index.ts", import.meta.url)),
      },
      {
        find: /^@netless\/fastboard-ui$/,
        replacement: fileURLToPath(new URL("../fastboard-ui/dist/index.svelte.mjs", import.meta.url)),
      },
      {
        find: /^@fastboard-internal\/appliance-plugin-loader$/,
        replacement: fileURLToPath(
          new URL("../fastboard-core/src/impl/appliance-plugin-loader.full.ts", import.meta.url)
        ),
      },
    ],
  },
  define: { __NAME__: '"@netless/fastboard-react-full"', __VERSION__: '"develop"' },
});
