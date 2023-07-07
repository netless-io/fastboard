This is a private package that only used in this repo.

Because [tsup](https://github.com/egoist/tsup) has some issues for now:

1. When enabled [treeshake](https://tsup.egoist.dev/#tree-shaking), tsup runs rollup against
   the result of esbuild. This is correct, but he forgot to pass the sourcemap to rollup, which
   leads to multiple sourcemap url comments in the final bundle.

   ```js
   //# sourceMappingURL=out.js.map
   //# sourceMappingURL=index.js.map
   ```

2. tsup sorts all user plugins after his own plugins, which forbids me using another svelte plugin.
   I want to use that because I want to use TypeScript 5's options (verbatimModuleSyntax) and
   svelte compiler options (css: external).

So I decide to write a custom build script instead. If someday tsup fixes these issues,
I can switch back to tsup.
