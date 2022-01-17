import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  platform: "browser",
  target: "es2017",
  esbuildOptions(options) {
    options.ignoreAnnotations = true;
  },
});
