import type { Loader, Location, Plugin } from "esbuild";
import esbuild from "esbuild";
import sass from "sass";
import fs from "fs";
import path from "path";
import { compile, preprocess } from "svelte/compiler";
import type { Warning } from "svelte/types/compiler/interfaces";
import type { PreprocessorGroup } from "svelte/types/compiler/preprocess";

const preprocessorGroup: PreprocessorGroup = {
  markup({ content, filename }) {
    return preprocess(
      content,
      {
        async script({ attributes, content, filename = "" }) {
          return await esbuild.transform(content, {
            sourcemap: true,
            sourcefile: filename,
            loader: attributes.lang as Loader,
            tsconfigRaw: {
              compilerOptions: {
                useDefineForClassFields: true,
                preserveValueImports: true,
              },
            },
          });
        },
        async style({ attributes, content, filename = "" }) {
          const lang = attributes.lang as string;
          const moduleId = `${filename}.${lang}`;
          const result = await new Promise<sass.Result>((resolve, reject) =>
            sass.render(
              { data: content, file: moduleId, outFile: moduleId },
              (err, res) => {
                err ? reject(err) : resolve(res);
              }
            )
          );
          return { code: result.css.toString(), map: result.map };
        },
      },
      { filename }
    );
  },
};

// https://esbuild.github.io/plugins/#svelte-plugin
export const svelte: Plugin = {
  name: "svelte",
  setup({ onLoad }) {
    onLoad({ filter: /\.svelte$/ }, async args => {
      // This converts a message in Svelte's format to esbuild's format
      const convertMessage = ({ message, start, end }: Warning) => {
        let location: Partial<Location> | undefined;
        if (start && end) {
          const lineText = source.split(/\r\n|\r|\n/g)[start.line - 1];
          const lineEnd =
            start.line === end.line ? end.column : lineText.length;
          location = {
            file: filename,
            line: start.line,
            column: start.column,
            length: lineEnd - start.column,
            lineText,
          };
        }
        return { text: message, location };
      };

      // Load the file from the file system
      const source = await fs.promises.readFile(args.path, "utf8");
      const filename = path.relative(process.cwd(), args.path);

      // Convert Svelte syntax to JavaScript
      try {
        const temp = await preprocess(source, preprocessorGroup, { filename });
        const { js, warnings } = compile(temp.code, {
          filename,
          generate: "dom",
          sourcemap: temp.map,
          css: true,
          dev: true,
        });
        const contents = js.code + `//# sourceMappingURL=` + js.map.toUrl();
        return { contents, warnings: warnings.map(convertMessage) };
      } catch (e) {
        return { errors: [convertMessage(e)] };
      }
    });
  },
};
