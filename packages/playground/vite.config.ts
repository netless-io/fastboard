import path from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@netless/fastboard": path.resolve(__dirname, "../fastboard/src"),
    },
  },
});
