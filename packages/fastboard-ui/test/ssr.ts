import { svelte } from "@hyrious/esbuild-plugin-svelte";
import { importFile } from "@hyrious/esbuild-dev";

const task = importFile("./test/App.svelte", {
  loader: { ".scss": "file" },
  logLevel: "error",
  plugins: [svelte({ compilerOptions: { generate: "ssr" } })],
}).then(({ default: App }) => {
  console.log(App.render().html);
});

task.catch(console.error);
