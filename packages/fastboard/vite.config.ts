import { defineConfig } from "vite";

export default defineConfig({
  envDir: "../..",
  define: { __NAME__: '"@netless/fastboard"', __VERSION__: '"develop"' },
});
