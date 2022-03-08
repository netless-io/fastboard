import { defineConfig } from "tsup";
import { sass } from "@netless/esbuild-plugin-inline-sass";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  platform: "browser",
  target: "es2017",
  jsxFactory: "h",
  jsxFragment: "Fragment",
  esbuildPlugins: [sass()],
  dts: true,
});
