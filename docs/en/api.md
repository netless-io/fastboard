# API Reference

See the [README of Fastboard Core](../../packages/fastboard-core/docs/modules.md).

## Unified page control

Use the async `dispatchDocsEvent` helper for mainView, DocsViewer, Slide, and Presentation.

```ts
import { dispatchDocsEvent } from "@netless/fastboard";

const result = await dispatchDocsEvent(fastboard, "nextPage", { target: appId });
await dispatchDocsEvent(fastboard, "jumpToPage", { target: appId, page: 3 });
await dispatchDocsEvent(fastboard, "scalePage", { target: "mainView", scale: 1.5 });
```

`target` can be `"mainView"` or a concrete appId. When omitted, the focused App is used and the
command falls back to mainView when no App is focused. `page` is 1-based. `scale` is relative to
fitted size, where `1` means fitted size. The returned result contains `accepted`; rejected
commands also contain a stable `reason` and readable `message`. Observe WindowManager's
`unifiedPageStateChange` for the actual state after an accepted command.
