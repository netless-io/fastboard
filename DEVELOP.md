## Publish

1. Create changesets.

```bash
pnpx changeset
# commit the changes
```

2. Release.

```bash
pnpx changeset version
pnpm i
pnpm build
pnpm publish -r
```
