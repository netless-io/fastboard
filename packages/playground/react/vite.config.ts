import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@netless/fastboard",
        replacement: path.resolve(__dirname, "../../fastboard/src"),
      },
      {
        find: "@netless/fastboard-react",
        replacement: path.resolve(__dirname, "../../fastboard-react/src"),
      },
    ],
  },
});
