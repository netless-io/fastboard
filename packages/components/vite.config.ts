import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig } from "vite";
import { peerDependencies } from "./package.json";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [
      svelte({
        emitCss: false,
        compilerOptions: {
          enableSourcemap: {
            js: true,
            css: false,
          },
        },
        experimental: {
          useVitePreprocess: true,
        },
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(process.cwd(), "src/index.ts"),
        formats: ["es", "cjs"],
        fileName: "index",
      },
      minify: isProd,
      sourcemap: isProd,
      outDir: "dist",
      rollupOptions: {
        external: Object.keys(peerDependencies),
        output: {
          manualChunks: undefined,
          inlineDynamicImports: true,
          exports: "named",
        },
      },
    },
  };
});
