import { defineConfig } from "tsup";
import { svelte } from "@hyrious/esbuild-plugin-svelte";
import { sass } from "@netless/esbuild-plugin-inline-sass";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  platform: "browser",
  target: "esnext",
  esbuildPlugins: [svelte(), sass()],
  dts: true,
  treeshake: true,
});
