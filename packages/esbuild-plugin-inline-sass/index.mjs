import { dirname } from "path";
import SASS from "sass";

export function sass() {
  return {
    name: "inline-sass",
    setup({ onLoad, esbuild }) {
      onLoad({ filter: /\.scss$/, namespace: "file" }, async args => {
        if (args.suffix === "?inline") {
          const { css } = SASS.compile(args.path, {
            style: "compressed",
          });
          const { outputFiles } = await esbuild.build({
            stdin: {
              contents: css,
              loader: "css",
              resolveDir: dirname(args.path),
              sourcefile: args.path,
            },
            logLevel: "silent",
            bundle: true,
            minify: true,
            write: false,
            outdir: "dist",
          });
          const contents = outputFiles[0].text.trimEnd();
          return { contents, loader: "text" };
        }
      });
    },
  };
}

export default sass;
