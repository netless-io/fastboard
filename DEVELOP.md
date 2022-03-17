## Release a New Version

```bash
pnpm release
# select the new version, commit changes
# if it is not a pre-release, try also tag the commit
pnpm cleanup
pnpm build
pnpm publish -r [--tag canary]
```
