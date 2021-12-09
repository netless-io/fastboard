import type { BuildOptions } from "esbuild";
import esbuild from "esbuild";
import { exit } from "process";
import package_ from "../package.json";
import { noMap } from "./no-map";
import { svelte } from "./svelte-plugin";

const common: BuildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  external: Object.keys(package_.peerDependencies),
  treeShaking: true,
  sourcemap: true,
  charset: "utf8",
  minifySyntax: true,
  globalName: "NetlessComponents",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  plugins: [svelte, noMap],
  outdir: "dist",
  logLevel: "info",
};

const errorExit = () => exit(1);

esbuild.build({ ...common, format: "cjs" }).catch(errorExit);

esbuild
  .build({
    ...common,
    format: "esm",
    outExtension: { ".js": ".mjs" },
    splitting: true,
  })
  .catch(errorExit);

esbuild
  .build({
    ...common,
    format: "iife",
    outExtension: { ".js": ".global.js" },
    plugins: [svelte, noMap],
  })
  .catch(errorExit);
