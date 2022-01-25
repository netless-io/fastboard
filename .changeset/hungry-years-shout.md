---
"@netless/fastboard": minor
"@netless/fastboard-core": minor
"@netless/fastboard-react": minor
---

Move fastboard to fastboard-core, export a new fastboard package which does everything.

Example usage:

```ts
import { createFastboard, mount } from "@netless/fastboard";

const app = await createFastboard({ ...config });
mount(app, document.getElementById("whiteboard"));
```

It still depends on `react`, but surely we will migrate to svelte in some time.
