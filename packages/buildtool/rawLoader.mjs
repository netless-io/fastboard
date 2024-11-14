import { readFile } from "fs/promises";
import path from "path";

function rawPlugin() {
  return {
    name: "raw",
    setup(build) {
      build.onResolve({ filter: /\?raw$/ }, args => {
        return {
          path: args.path,
          pluginData: {
            isAbsolute: path.isAbsolute(args.path),
            resolveDir: args.resolveDir,
          },
          namespace: "raw-loader",
        };
      });
      build.onLoad({ filter: /\?raw$/, namespace: "raw-loader" }, async args => {
        const fullPath = args.pluginData.isAbsolute
          ? args.path
          : path.resolve(args.pluginData.resolveDir, "../../../../node_modules", args.path);
        // console.log('rawPlugin-0', args, args.pluginData.resolveDir);
        // console.log('rawPlugin-1', args.path);
        // console.log('rawPlugin===>', fullPath);
        return {
          contents: await readFile(fullPath.replace(/\?raw$/, "")),
          loader: "text",
        };
      });
    },
  };
}
export { rawPlugin as default };
