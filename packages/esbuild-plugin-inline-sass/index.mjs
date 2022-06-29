/* eslint-env node */
import { existsSync } from "fs";
import { dirname, join, relative, sep } from "path";
import SASS from "sass";

const EmptySourceMap =
  "data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ==";

const HELPER = `
export function injectStyle(text) {
  if (typeof document !== 'undefined') {
    var style = document.createElement('style')
    var node = document.createTextNode(text)
    style.appendChild(node)
    document.head.appendChild(style)
  }
}
//# sourceMappingURL=${EmptySourceMap}
`;

const STUB = `
import { injectStyle } from "inline-sass-style-helper.js"
import css from {{ path }}
injectStyle(css)
//# sourceMappingURL=${EmptySourceMap}
`;

function stub(path) {
  return STUB.replace("{{ path }}", JSON.stringify(path));
}

export function sass({ emitCss = false, strip = false } = {}) {
  // remove this file
  if (strip) {
    return {
      name: "strip-sass",
      setup({ onResolve, onLoad }) {
        onResolve({ filter: /\.scss$/, namespace: "file" }, args => {
          return { path: args.path, namespace: "strip-sass" };
        });
        onLoad({ filter: /.*/, namespace: "strip-sass" }, () => {
          // tsup will strip non-error warnings for us
          return { contents: "" };
        });
      },
    };
  }

  // output index.css
  if (emitCss) {
    return {
      name: "emit-css",
      setup({ onResolve, onLoad, esbuild }) {
        onResolve({ filter: /\.scss$/, namespace: "file" }, args => {
          const absPath = join(args.resolveDir, args.path);
          return { path: args.path, namespace: "sass", pluginData: { absPath } };
        });
        onLoad({ filter: /.*/, namespace: "sass" }, async args => {
          const { css } = SASS.compile(args.pluginData.absPath, {
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
          return { contents, loader: "css" };
        });
      },
    };
  }

  // injectStyle(css)
  return {
    name: "inline-sass",
    setup({ onResolve, onLoad, esbuild }) {
      const cwd = process.cwd();

      onResolve({ filter: /\.scss$/, namespace: "file" }, args => {
        const absPath = join(args.resolveDir, args.path);
        const relPath = `.${sep}${relative(cwd, absPath)}`;
        const resolved = existsSync(absPath) ? relPath : args.path;
        return { path: resolved, namespace: "inline-sass-stub" };
      });

      onResolve({ filter: /\.scss$/, namespace: "inline-sass-stub" }, args => {
        return { path: args.path, namespace: "inline-sass-content" };
      });

      onLoad({ filter: /.*/, namespace: "inline-sass-stub" }, args => {
        return { contents: stub(args.path) };
      });

      onResolve({ filter: /^inline-sass-style-helper\.js$/ }, args => {
        return { path: args.path, namespace: "inline-sass-helper" };
      });

      onLoad({ filter: /.*/, namespace: "inline-sass-helper" }, () => {
        return { contents: HELPER };
      });

      onLoad({ filter: /.*/, namespace: "inline-sass-content" }, async args => {
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
      });
    },
  };
}

export default sass;
