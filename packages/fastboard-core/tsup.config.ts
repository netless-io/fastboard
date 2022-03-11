import { defineConfig } from "tsup";
import { main } from "./package.json";

export default defineConfig({
  entry: [main],
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  platform: "browser",
  target: "es2017",
  dts: true,
});
