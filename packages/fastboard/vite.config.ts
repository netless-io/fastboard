import path from "path";
import preact from "@preact/preset-vite";
import { defineConfig, type LibraryFormats } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import pkg from "./package.json";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const formats: LibraryFormats[] = ["es", "cjs"];

  return {
    plugins: [
      preact(),
      visualizer({ filename: "./node_modules/.visualizer/stats.html" }),
    ],
    build: {
      lib: {
        name: "Fastboard",
        entry: path.resolve(__dirname, "src/index.ts"),
        fileName: "index",
      },
      minify: isProd,
      sourcemap: isProd,
      outDir: "dist",
      rollupOptions: {
        external: Object.keys({
          ...pkg.dependencies,
          ...pkg.peerDependencies,
        }),
        output: formats.map(format => ({
          format,
          entryFileNames: ({ name }) => `${name}.${format}.js`,
          manualChunks: {},
          exports: "named",
        })),
      },
    },
  };
});
