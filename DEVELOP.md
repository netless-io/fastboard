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

## Publish Canary Version

1. Enter prerelease mode.

```bash
pnpx changeset pre enter canary
```

2. Create changesets.

```bash
pnpx changeset
# commit the changes
```

3. Release.

```bash
pnpx changeset version
pnpm i
pnpm build
pnpm publish -r --tag canary
```

4. Exit prerelease mode.

```bash
pnpx changeset pre exit
```
