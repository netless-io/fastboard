import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { dependencies, peerDependencies } from "./package.json";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [react()],
    build: {
      lib: {
        entry: path.resolve(process.cwd(), "./src/index.ts"),
        formats: ["es", "cjs"],
        fileName: "index",
      },
      minify: isProd,
      sourcemap: isProd,
      outDir: "dist",
      rollupOptions: {
        external: Object.keys({
          ...dependencies,
          ...peerDependencies,
        }),
        output: {
          manualChunks: undefined,
          inlineDynamicImports: true,
          exports: "named",
        },
      },
    },
  };
});
