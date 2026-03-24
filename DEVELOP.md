## Release a New Version

Package groups:

- `[normal]` `@netless/fastboard` `@netless/fastboard-react` `@netless/fastboard-core` `@netless/fastboard-ui`
- `[lite]` `@netless/fastboard-lite` `@netless/fastboard-react-lite` `@netless/fastboard-core-lite`
- `[full]` `@netless/fastboard-full` `@netless/fastboard-react-full` `@netless/fastboard-core-full`

Notes:

- `pnpm release` updates every `packages/fastboard*` package to the same version, so the three groups stay aligned.
- `@netless/fastboard-ui` is only published in `[normal]`. Lite/full consumers reuse the same UI package.
- The default release flow is still `publish everything`. Group-specific publish commands are mainly for selective retry or staged release of packages that already share the same version.

```bash
pnpm release
# select the new version, commit changes
# if it is not a pre-release, try also tag the commit
pnpm cleanup
pnpm build

# publish everything
pnpm publish -r [--tag canary]

# publish [normal]
pnpm -r --filter @netless/fastboard --filter @netless/fastboard-react --filter @netless/fastboard-core --filter @netless/fastboard-ui publish [--tag canary]

# publish [lite]
pnpm -r --filter @netless/fastboard-lite --filter @netless/fastboard-react-lite --filter @netless/fastboard-core-lite publish [--tag canary]

# publish [full]
pnpm -r --filter @netless/fastboard-full --filter @netless/fastboard-react-full --filter @netless/fastboard-core-full publish [--tag canary]
```
