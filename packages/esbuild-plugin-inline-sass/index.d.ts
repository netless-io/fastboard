import type { Plugin } from "esbuild";

export function sass(options?: { emitCss?: boolean; strip?: boolean }): Plugin;
export default sass;
