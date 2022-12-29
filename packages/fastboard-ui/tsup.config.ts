import { defineConfig } from "tsup";
import { sass } from "@netless/esbuild-plugin-inline-sass";
import { main } from "./package.json";

export default defineConfig([
  {
    entry: [main],
    format: ["cjs", "esm"],
    sourcemap: false,
    clean: true,
    platform: "browser",
    target: "esnext",
    esbuildPlugins: [sass({ emitCss: true })],
    loader: { ".svg": "dataurl" },
    dts: true,
  },
  {
    entry: { "index.svelte": main },
    format: ["esm"],
    external: ["svelte"],
    sourcemap: false,
    clean: true,
    platform: "browser",
    target: "esnext",
    esbuildPlugins: [sass({ strip: true })],
    loader: { ".svg": "dataurl" },
  },
]);
