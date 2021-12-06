import type { Location, Plugin } from "esbuild";
import type { Warning } from "svelte/types/compiler/interfaces";
import fs from "fs";
import path from "path";
import { compile } from "svelte/compiler";

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
        const { js, warnings } = compile(source, {
          filename,
          generate: "dom",
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
