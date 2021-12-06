import type { Plugin } from "esbuild";

interface Exports {
  default?: string;
  names?: string[];
}

export interface GlobalExternalConfig {
  [varName: string]: Exports;
}

const namespace = "global-external";

export const globalExternal = (config: GlobalExternalConfig): Plugin => ({
  name: namespace,
  setup({ onResolve, onLoad }) {
    const globalNames = Object.keys(config);
    onResolve({ filter: new RegExp(`^(${globalNames.join("|")})$`) }, args => {
      return { path: args.path, namespace, pluginData: config[args.path] };
    });
    onLoad({ filter: /()/, namespace }, args => {
      const config: Exports = args.pluginData;
      let contents = "";
      if (config.default) {
        contents += `export default ${config.default};\n`;
      }
      if (config.names) {
        const names = config.names.join(", ");
        contents += `const { ${names} } = ${config.default};\n`;
        contents += `export { ${names} };\n`;
      }
      return { contents, loader: "js" };
    });
  },
});
