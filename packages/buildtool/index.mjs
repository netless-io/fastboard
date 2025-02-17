import fs from "node:fs";
import * as rollup from "rollup";
import * as esbuild from "esbuild";
import * as dts from "@hyrious/dts";
import { svelte } from "@hyrious/esbuild-plugin-svelte";
import { sass } from "@netless/esbuild-plugin-inline-sass";
// import rawPlugin from "../buildtool/rawLoader.mjs";
/**
 * The output is always dist/index.{js|mjs|d.ts}.
 *
 * @param {{
 *   dir: string,
 *   name: string,
 *   version: string,
 *   main: string,
 *   svelte?: string,
 *   dependencies?: Record<string, string>,
 *   peerDependencies?: Record<string, string>
 * }}
 */
export async function build({
  dir,
  name,
  main,
  svelte: svelteOutfile,
  version,
  dependencies,
  peerDependencies,
}) {
  // eslint-disable-next-line no-undef
  process.chdir(dir);
  fs.rmSync("dist", { recursive: true, force: true });

  const esbuildPlugin = (external, alias = {}) => ({
    name: "esbuild",
    async load(id) {
      const { outputFiles } = await esbuild.build({
        entryPoints: [id],
        bundle: true,
        format: "esm",
        // The filename here does not really matter, because
        // rollup will then merge sourcemaps and get the original input filename.
        outfile: id.replace(/\.tsx?$/, ".js"),
        sourcemap: true,
        write: false,
        target: ["es2017"],
        plugins: [svelte(), sass()],
        loader: {
          ".svg": "dataurl",
        },
        define: {
          __NAME__: '"@netless/fastboard"',
          __VERSION__: JSON.stringify(version),
        },
        alias,
        external: Object.keys({
          ...dependencies,
          ...peerDependencies,
          ...(external && external.reduce((acc, cur) => ((acc[cur] = true), acc), {})),
        }),
      });
      let code, map;
      for (const { path, text } of outputFiles) {
        if (path.endsWith(".map")) map = text;
        else code = text;
      }
      return { code, map };
    },
  });

  // Build dist/index.js
  let start = Date.now();
  {
    const bundle = await rollup.rollup({
      input: main,
      plugins: [esbuildPlugin()],
      external: [/^[@a-z]/],
    });
    const esm = bundle.write({
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true,
    });

    const cjs = bundle.write({
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
      interop: "auto",
    });

    await esm;
    await cjs;
    await bundle.close();
    console.log("Built dist/index.{js|mjs} in", Date.now() - start + "ms");
  }

  // Build dist/lite.js
  start = Date.now();
  if (!name.endsWith("-ui")) {
    const bundle = await rollup.rollup({
      input: name.endsWith("-core") ? "src/lite.ts" : main,
      plugins: [
        esbuildPlugin([], {
          "@netless/fastboard-core": "@netless/fastboard-core/lite",
          // "@netless/fastboard-ui": "@netless/fastboard-ui/lite",
        }),
      ],
      external: [/^[@a-z]/],
    });

    const esm = bundle.write({
      file: "dist/lite.mjs",
      format: "es",
      sourcemap: true,
    });

    const cjs = bundle.write({
      file: "dist/lite.js",
      format: "cjs",
      sourcemap: true,
      interop: "auto",
    });

    await esm;
    await cjs;
    await bundle.close();
    console.log("Built dist/lite.{js|mjs} in", Date.now() - start + "ms");
  }

  // Generate dist/index.svelte.mjs for the UI package,
  // this also helps to avoid depending on svelte in fastboard/fastboard-react test.
  if (name.endsWith("-ui")) {
    start = Date.now();
    const bundle = await rollup.rollup({
      input: main,
      plugins: [esbuildPlugin(["svelte"])],
      external: [/^[@a-z]/],
    });
    await bundle.write({
      file: svelteOutfile,
      format: "es",
      sourcemap: true,
    });
    await bundle.close();
    console.log("Built dist/index.svelte.mjs in", Date.now() - start + "ms");
  }

  start = Date.now();
  await dts.build(main, "dist/index.d.ts", { exclude: ["svelte", "svelte/internal", "./lite", "./full"] });
  console.log("Built dist/index.d.ts in", Date.now() - start + "ms");

  // Generate dist/lite.d.ts
  start = Date.now();
  if (name.endsWith("-core")) {
    await dts.build("src/lite.ts", "dist/lite.d.ts", {
      exclude: ["svelte", "svelte/internal", "@netless/appliance-plugin"],
    });
    console.log("Built dist/lite.d.ts in", Date.now() - start + "ms");
  } else {
    let code = fs.readFileSync("dist/index.d.ts", "utf-8");
    code = code.replace(/@netless\/fastboard-core/g, "@netless/fastboard-core/lite");
    code = code.replace(/@netless\/fastboard-ui/g, "@netless/fastboard-ui/lite");
    fs.writeFileSync("dist/lite.d.ts", code);
    console.log("Built dist/lite.d.ts in", Date.now() - start + "ms");
  }

  // Build dist/full.js
  const esbuildFullPlugin = (external, alias = {}) => ({
    name: "esbuild",
    async load(id) {
      const { outputFiles } = await esbuild.build({
        entryPoints: [id],
        bundle: true,
        format: "esm",
        // The filename here does not really matter, because
        // rollup will then merge sourcemaps and get the original input filename.
        outfile: id.replace(/\.tsx?$/, ".js"),
        sourcemap: true,
        write: false,
        target: ["es2017"],
        plugins: [svelte(), sass()],
        loader: {
          ".svg": "dataurl",
        },
        define: {
          __NAME__: '"@netless/fastboard"',
          __VERSION__: JSON.stringify(version),
        },
        alias,
        external: name.endsWith("-core")
          ? Object.keys({
              ...(external && external.reduce((acc, cur) => ((acc[cur] = true), acc), {})),
            }).concat("@netless/applicance-plugin")
          : Object.keys({
              ...dependencies,
              ...peerDependencies,
              ...(external && external.reduce((acc, cur) => ((acc[cur] = true), acc), {})),
            }),
      });
      let code, map;
      for (const { path, text } of outputFiles) {
        if (path.endsWith(".map")) map = text;
        else code = text;
      }
      return { code, map };
    },
  });
  start = Date.now();
  if (!name.endsWith("-ui")) {
    const bundle = await rollup.rollup({
      input: name.endsWith("-core") ? "src/full.ts" : main,
      plugins: [
        esbuildFullPlugin([], {
          "@netless/fastboard-core": "@netless/fastboard-core/full",
        }),
      ],
      external: [/^[@a-z]/],
    });

    const esm = bundle.write({
      file: "dist/full.mjs",
      format: "es",
      sourcemap: true,
    });

    const cjs = bundle.write({
      file: "dist/full.js",
      format: "cjs",
      sourcemap: true,
      interop: "auto",
    });

    await esm;
    await cjs;
    await bundle.close();
    console.log("Built dist/full.{js|mjs} in", Date.now() - start + "ms");
  }
  start = Date.now();
  if (name.endsWith("-core")) {
    await dts.build("src/full.ts", "dist/full.d.ts", { exclude: ["svelte", "svelte/internal"] });
    console.log("Built dist/full.d.ts in", Date.now() - start + "ms");
  } else {
    let code = fs.readFileSync("dist/index.d.ts", "utf-8");
    code = code.replace(/@netless\/fastboard-core/g, "@netless/fastboard-core/full");
    code = code.replace(/@netless\/fastboard-ui/g, "@netless/fastboard-ui/full");
    fs.writeFileSync("dist/full.d.ts", code);
    console.log("Built dist/full.d.ts in", Date.now() - start + "ms");
  }
}
