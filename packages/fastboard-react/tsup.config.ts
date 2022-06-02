import { defineConfig } from "tsup";
import { sass } from "@netless/esbuild-plugin-inline-sass";
import { main } from "./package.json";

export default defineConfig({
  entry: [main],
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  platform: "browser",
  target: "es2017",
  esbuildPlugins: [sass()],
  dts: true,
  treeshake: true,
});
