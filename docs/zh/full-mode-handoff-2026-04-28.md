# Full Mode 交接文档已合并

本文已不再作为独立维护文档。

请改为阅读最新版总纪要：

- [full-package-refactor-summary.md](/Users/hongqiuer/work/fastboard/docs/zh/full-package-refactor-summary.md)

合并说明：

- 旧的 `full-room usePlugin=5` / `AI / MathsKit / Paste` 结论已经过时
- `app-little-white-board` 已从本地软链切换为 `@netless/app-little-white-board@0.0.4`
- `ExtendAIPlugin` 已从 normal / full demo 接入层移除
- `auto-draw-plugin` 已从 full 路由依赖图中隔离
- `full-room` 下 `window.__netlessJavaScriptLoader was override` 的根因分析与当前修复状态，以总纪要为准

如果是新会话继续联调，请直接从总纪要中的“当前验证结果 / 后续未完成项 / 建议的后续顺序”开始。
