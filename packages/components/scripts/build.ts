import type { BuildOptions } from "esbuild";
import esbuild from "esbuild";
import { exit } from "process";
import package_ from "../package.json";
import { globalExternal } from "./global-external";
import { noMap } from "./no-map";
import { svelte } from "./svelte-plugin";

const common: BuildOptions = {
  entryPoints: ["src/index.ts", "src/react/index.tsx", "src/vue/index.tsx"],
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

import * as React from "react";
import * as Vue from "vue";

const excludeInvalidNames = (e: string) => {
  return e !== "__esModule" && e !== "default" && !e.startsWith("_");
};

const globalPlugin = globalExternal({
  react: {
    default: "React",
    names: Object.keys(React).filter(excludeInvalidNames),
  },
  vue: {
    default: "Vue",
    names: Object.keys(Vue).filter(excludeInvalidNames),
  },
});

esbuild
  .build({
    ...common,
    format: "iife",
    outExtension: { ".js": ".global.js" },
    plugins: [svelte, noMap, globalPlugin],
  })
  .catch(errorExit);
