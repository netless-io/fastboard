import path from "path";
// import react from "@vitejs/plugin-react";
import preact from "@preact/preset-vite";
import { defineConfig, type LibraryFormats } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import { dependencies, peerDependencies } from "./package.json";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const formats: LibraryFormats[] = ["es", "cjs"];

  return {
    plugins: [
      preact(),
      // react({ jsxRuntime: "classic" }), // TODO: change react to svelte
      visualizer({ filename: "./node_modules/.visualizer/stats.html" }),
    ],
    // esbuild: {
    //   jsxFactory: "h",
    //   jsxFragment: "Fragment",
    //   jsxInject: "import { h, Fragment } from 'preact'",
    // },
    // resolve: {
    //   alias: {
    //     "react-dom/test-utils": "preact/test-utils",
    //     "react-dom": "preact/compat",
    //     react: "preact/compat",
    //   },
    // },
    build: {
      lib: {
        name: "Fastboard",
        entry: path.resolve(process.cwd(), "./src/index.ts"),
        fileName: "index",
      },
      minify: isProd,
      sourcemap: isProd,
      outDir: "dist",
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "src/index.ts"),
        },
        external: Object.keys({
          ...dependencies,
          ...peerDependencies,
        }),
        output: formats.map(format => ({
          format,
          entryFileNames: ({ name }) => `${name}.${format}.js`,
          manualChunks: undefined,
          exports: "named",
        })),
      },
    },
  };
});
