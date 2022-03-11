## Develop

This project uses [svelte](https://svelte.dev), and is publishing two files:

```json
"main": "dist/index.js", // same as dist/index.mjs, but is in commonjs
"module": "dist/index.mjs",
"svelte": "dist/index.svelte.mjs",
```

**dist/index.mjs**: Including svelte itself, ready for use in vanilla js.

```js
import { Toolbar } from "@netless/fastboard-ui";

new Toolbar({ target: document.body });
```

**dist/index.svelte.mjs**: Excluding svelte, for use in svelte.

```svelte
<script>
import { Toolbar } from "@netless/fastboard-ui";
</script>

<Toolbar />
```

We will use this package in @netless/fastboard and @netless/fastboard-react.

### UI Test

You may noticed there're `index.html` and `vite.config.ts` in this package,
run `pnpm dev` to start a vite server to test the UI individually.

We mock the fastboard app interface in `mock-app.ts`, so that it can be
decoupled from the core package and can be tested without connecting to
a real backend.
