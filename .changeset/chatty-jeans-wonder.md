---
"@netless/fastboard": patch
"@netless/fastboard-core": patch
"@netless/fastboard-react": patch
---

apps status, `mount()` results, remember last shape and more.

- feat: add apps status
- refactor: change `mount()` result to `{ update(props), destroy() }`
- refactor: switch to last shape on click toolbar button
- refactor: remove misleading `fileType: "ppt"`
- refactor: make `sdkConfig.region` required
- refactor: add `appsConfig` on create
