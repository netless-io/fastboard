import fs from "node:fs";
import * as rollup from "rollup";
import * as esbuild from "esbuild";
import * as dts from "@hyrious/dts";
import { svelte } from "@hyrious/esbuild-plugin-svelte";
import { sass } from "@netless/esbuild-plugin-inline-sass";

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
 * }} pkg
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
  process.chdir(dir);
  fs.rmSync("dist", { recursive: true, force: true });

  const esbuildPlugin = external => ({
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

  let start = Date.now();
  let bundle = await rollup.rollup({
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

  // Generate dist/index.svelte.mjs for the UI package,
  // this also helps to avoid depending on svelte in fastboard/fastboard-react test.
  if (name.endsWith("-ui")) {
    start = Date.now();
    let bundle = await rollup.rollup({
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
  await dts.build(main, "dist/index.d.ts", { exclude: ["svelte", "svelte/internal"] });
  console.log("Built dist/index.d.ts in", Date.now() - start + "ms");
}
