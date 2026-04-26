import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ preprocess: vitePreprocess() })],
  envDir: "../..",
  build: {
    outDir: "test-dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      {
        find: /^@netless\/fastboard-full$/,
        replacement: fileURLToPath(new URL("../fastboard/src/index.ts", import.meta.url)),
      },
      {
        find: /^@netless\/fastboard-core$/,
        replacement: fileURLToPath(new URL("../fastboard-core-full/src/index.ts", import.meta.url)),
      },
      {
        find: /^@netless\/fastboard-ui$/,
        replacement: fileURLToPath(new URL("../fastboard-ui/src/index.ts", import.meta.url)),
      },
      {
        find: /^@fastboard-internal\/appliance-plugin-loader$/,
        replacement: fileURLToPath(
          new URL("../fastboard-core/src/impl/appliance-plugin-loader.full.ts", import.meta.url)
        ),
      },
    ],
  },
  define: { __NAME__: '"@netless/fastboard-full"', __VERSION__: '"develop"' },
});
