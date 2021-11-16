import path from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    build: {
      lib: {
        entry: path.resolve(process.cwd(), "src/index.tsx"),
        formats: ["cjs", "es", "iife"],
        fileName: "index",
        name: "AgoraWhiteboardSdk",
      },
      sourcemap: isProd,
      outDir: "dist",
      rollupOptions: {
        plugins: [peerDepsExternal()],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "white-web-sdk": "WhiteWebSdk",
          },
        },
      },
      minify: isProd,
    },
  };
});
