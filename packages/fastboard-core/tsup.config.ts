import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/minimal.ts"],
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  platform: "browser",
  target: "es2017",
});
