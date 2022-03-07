import { dirname } from "path";
import { defineConfig } from "tsup";
import sass from "sass";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  platform: "browser",
  external: ["react", "react-dom"],
  target: "es2017",
  loader: {
    ".png": "dataurl",
  },
  dts: true,
  esbuildPlugins: [
    {
      name: "sass",
      setup({ onLoad, esbuild }) {
        onLoad({ filter: /\.scss/ }, async args => {
          if (args.suffix === "?inline") {
            // first run, get user styles
            const { css } = sass.compile(args.path, {
              style: "compressed",
            });
            // second run, bundle libraries
            const { outputFiles } = await esbuild.build({
              stdin: {
                contents: css,
                loader: "css",
                resolveDir: dirname(args.path),
                sourcefile: args.path,
              },
              bundle: true,
              minify: true,
              write: false,
              outdir: "dist",
            });
            // return all css as text
            return { contents: outputFiles[0].text, loader: "text" };
          }
        });
      },
    },
  ],
});
