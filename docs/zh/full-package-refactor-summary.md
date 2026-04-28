# Fastboard Full 包改造与 Full Mode 联调总纪要（更新于 2026-04-28）

本文是当前唯一维护中的汇总文档，用于统一承接：

- `fastboard` normal / lite / full 拆包策略
- `full-room` 页面下 `white-web-sdk` / runtime 冲突问题
- `app-in-mainview-plugin` / `appliance-plugin` bridge 化接入
- `LittleBoard`、`MathsKit`、`Paste` 在 full 模式下的当前接入状态
- 各关联仓库的真实改动边界、验证结果与未完成项

旧文档 [full-mode-handoff-2026-04-28.md](/Users/hongqiuer/work/fastboard/docs/zh/full-mode-handoff-2026-04-28.md) 已合并进本文，不再单独维护。

## 1. 本轮目标

本轮工作的目标分成两条主线：

1. 包结构层面：
   - 将 normal / lite / full 拆成清晰独立包
   - 让 `@netless/fastboard-full` / `@netless/fastboard-react-full` 成为 full 的正式入口
2. 运行时层面：
   - 修复 `full-room` 页面下多份 `white-web-sdk` 造成的
     - `window.__netlessJavaScriptLoader was override`
   - 保持 full 页面尽可能和 normal 页面一致地支持：
     - `enableAppInMainViewPlugin`
     - `enableAppliancePlugin`
     - `LittleBoard`
     - `ExtendMathsKitPlugin`
     - `ExtendPastePlugin`

说明：

- `ExtendAIPlugin` 已从 normal / full demo 接入层移除，不再作为本轮联调目标。
- 当前优先级最高的问题是 `full-room` 下的 runtime 冲突；`MathsKit / Paste` 的交互打通排在其后。

## 2. 涉及仓库

本轮实际联调涉及以下本地仓库：

- `fastboard`: `/Users/hongqiuer/work/fastboard`
- `fastboard-demo`: `/Users/hongqiuer/work/fastboard-demo`
- `window-manager`: `/Users/hongqiuer/work/window-manager`
- `window-manager-extend`: `/Users/hongqiuer/work/window-manager-extend`
- `appliance-plugin`: `/Users/hongqiuer/work/appliance-plugin`
- `appInMainView`: `/Users/hongqiuer/work/appInMainView`
- `app-little-white-board`: `/Users/hongqiuer/work/work-origin/app-little-white-board`
- `netless-app/app-plyr`: `/Users/hongqiuer/work/netless-app/packages/app-plyr`

## 3. 拆包后的包矩阵

当前目标包矩阵如下：

| 形态 | 入口包 | React 包 | Core 包 | UI 包 |
| --- | --- | --- | --- | --- |
| normal | `@netless/fastboard` | `@netless/fastboard-react` | `@netless/fastboard-core` | `@netless/fastboard-ui` |
| lite | `@netless/fastboard-lite` | `@netless/fastboard-react-lite` | `@netless/fastboard-core-lite` | 复用 `@netless/fastboard-ui` |
| full | `@netless/fastboard-full` | `@netless/fastboard-react-full` | `@netless/fastboard-core-full` | 复用 `@netless/fastboard-ui` |

补充约束：

- `@netless/fastboard-ui` 不再拆 `-lite` / `-full` 独立运行时包。
- UI 仍保留 `./lite` / `./full` 类型子路径，用于区分 core 类型来源。
- `@netless/fastboard`、`@netless/fastboard-react`、`@netless/fastboard-core` 只代表 normal 形态。

## 4. 当前已确认的根因链路

### 4.1 `app-in-mainview-plugin` 旧入口会重新拉起外部 SDK

最初 `full-room?usePlugin=2` 下，`enableAppInMainViewPlugin` 会通过旧入口再次触发外部 `white-web-sdk`。

已处理：

- `appInMainView` 增加 `bridge` 入口
- `fastboard-core-full` 在 full 模式下改走 `@netless/app-in-mainview-plugin/bridge`
- `fastboard-demo/vite.config.ts` 精确 alias 到本地 `dist/bridge.mjs`

### 4.2 `window-manager` 内建 `MediaPlayer` 历史上存在 eager import 问题

较早期一个已确认根因是：

- `@netless/window-manager` 的 builtin `MediaPlayer` 曾经顶层 eager import
- 会在 full 初始化阶段把 `video.js / mux.js / clock.js` 提前带进来
- 最终继续触发 `window.__netlessJavaScriptLoader was override`

已处理：

- [BuiltinApps.ts](/Users/hongqiuer/work/window-manager/src/BuiltinApps.ts) 已改为懒加载
- 当前 `MediaPlayer` 注册形式是：

```ts
WindowManager.register({
  kind: "MediaPlayer",
  src: loadAppMediaPlayer,
});
```

当前结论：

- 这条历史问题已经修过
- 但它不是本轮最后阶段“纯 `full-room` 静置数秒后异步报错”的主要根因

### 4.3 `app-little-white-board` 曾把运行时插件依赖重新打进 bundle

历史上 `LittleBoard` 构建修复过程中，有几次改动把本地工具枚举改成了运行时直接引用 `@netless/appliance-plugin`，会导致模块加载时把 `appliance-plugin` 依赖链重新带进来。

已处理方向：

- `app-little-white-board` 源码恢复为尽量只在类型层引用 `@netless/appliance-plugin`
- `vite.config.js` 显式 external peer deps
- `@netless/app-little-white-board@0.0.4` 已发布并用于 `fastboard-demo`

### 4.4 本轮最终锁定的主要根因：`appliance-plugin` 异步线程 chunk 会二次触发 SDK

这是当前最关键的结论。

在 full 本地 dev 模式下，最终确认的冲突链是：

1. `fastboard-core-full` 自己已经内联了一份 `white-web-sdk`
2. `full-room` 页面初始化后，`@netless/appliance-plugin/bridge` 继续异步加载内部线程模块
3. Vite 会把这些线程模块预构建成：
   - `index-CJN2Kuo1-*.js`
   - `index-0fHpKu9i-*.js`
4. 这些异步 chunk 再次把 `white-web-sdk` 拉起
5. 因为不是首屏同步阶段，而是延迟数秒后的异步阶段，所以控制台表现为：
   - 页面先正常进房
   - `cameraUpdated / sizeUpdated / safeSetAttributes` 等日志先出现
   - 之后才异步报：
     - `window.__netlessJavaScriptLoader was override`

这一点解释了为什么用户实际观察到：

- 不是页面一打开就报
- 而是异步延迟出现

### 4.5 `auto-draw-plugin` 会把 normal 页的插件链泄漏进 full 路由

本轮还确认到一个很容易误导排查方向的问题：

- `Whiteboard.tsx` 顶层静态 import 了 `@netless/appliance-extend-auto-draw-plugin`
- 在 Vite dev + React Router 懒加载场景下，它会把 `appliance-plugin` 主入口链提前卷进应用图
- full-room 即使不使用 auto-draw，自身也可能被这条 normal 页静态依赖污染

已处理：

- normal 页的 `AutoDrawView` 改成运行时动态 `import("@netless/appliance-extend-auto-draw-plugin")`
- full-room 不再通过路由共享顶层静态依赖把它顺手带进来

## 5. 这轮实际涉及到哪些项目需要改代码

### 5.1 必须改动的项目

以下项目已经被证明和 `full-room` 下的 runtime 冲突直接相关：

- `fastboard-demo`
- `fastboard`
- `window-manager`
- `appliance-plugin`

### 5.2 条件相关但已实际改动的项目

以下项目不是每一条问题都直接依赖它们，但在本轮联调中确实改过并影响结果：

- `window-manager-extend`
- `appInMainView`
- `app-little-white-board`

### 5.3 各仓库当前改动边界

#### `fastboard-demo`

当前确认涉及的关键文件：

- [package.json](/Users/hongqiuer/work/fastboard-demo/package.json)
- [pnpm-lock.yaml](/Users/hongqiuer/work/fastboard-demo/pnpm-lock.yaml)
- [vite.config.ts](/Users/hongqiuer/work/fastboard-demo/vite.config.ts)
- [src/components/FullWhiteboard.tsx](/Users/hongqiuer/work/fastboard-demo/src/components/FullWhiteboard.tsx)
- [src/components/Whiteboard.tsx](/Users/hongqiuer/work/fastboard-demo/src/components/Whiteboard.tsx)
- [src/components/OverlayWidgets.tsx](/Users/hongqiuer/work/fastboard-demo/src/components/OverlayWidgets.tsx)
- [src/helpers/use-show-maths-kit.ts](/Users/hongqiuer/work/fastboard-demo/src/helpers/use-show-maths-kit.ts)
- `src/behaviors/*` 中的部分插件配置与依赖接入

当前确认已落地的关键策略：

1. `@netless/app-little-white-board` 不再使用本地软链，改为：
   - `@netless/app-little-white-board@0.0.4`
2. `@netless/appliance-plugin` 当前联调方式改为：
   - `link:../appliance-plugin`
3. `vite.config.ts` 中增加了：
   - `@netless/app-in-mainview-plugin/bridge` alias
   - `@netless/appliance-plugin/bridge` alias
   - `white-web-sdk` alias
   - `optimizeDeps.exclude`，避免 Vite 把 `appliance-plugin` / `bridge` / `auto-draw-plugin` 再次预构建进错误依赖图
4. full 页已移除：
   - `ExtendAIPlugin`
5. normal / full 两边 demo 接入层已移除：
   - `ExtendAIPlugin`
   - `AIChat` 菜单项
   - `AIChatBoxView`
6. normal 页的 `auto-draw-plugin` 已改成只在 `AutoDrawView` 渲染时动态 import，避免污染 full 路由
7. normal 页 `MathsKit` 已切换到 bridge runtime 模式，避免被 full 的 runtime 改动反向污染

#### `fastboard`

当前确认涉及的关键文件：

- [packages/fastboard-core/src/impl/appliance-plugin-loader.full.ts](/Users/hongqiuer/work/fastboard/packages/fastboard-core/src/impl/appliance-plugin-loader.full.ts)
- [packages/fastboard-core/src/impl/app-in-mainview-plugin-loader.full.ts](/Users/hongqiuer/work/fastboard/packages/fastboard-core/src/impl/app-in-mainview-plugin-loader.full.ts)
- [packages/fastboard-core/src/impl/bridge-runtime.ts](/Users/hongqiuer/work/fastboard/packages/fastboard-core/src/impl/bridge-runtime.ts)
- [packages/fastboard-core/src/impl/FastboardApp.ts](/Users/hongqiuer/work/fastboard/packages/fastboard-core/src/impl/FastboardApp.ts)
- [packages/fastboard-core/src/impl/FastboardPlayer.ts](/Users/hongqiuer/work/fastboard/packages/fastboard-core/src/impl/FastboardPlayer.ts)

当前关键作用：

- full 模式通过内部 loader 改走 bridge
- 向 `manager` 挂载 `__fastboardBridgeRuntime.whiteWebSdk`
- 让 `window-manager-extend` / 其它 bridge 包可以复用同一份 SDK runtime

#### `window-manager`

当前关键文件：

- [src/BuiltinApps.ts](/Users/hongqiuer/work/window-manager/src/BuiltinApps.ts)

当前作用：

- `MediaPlayer` 改为懒加载
- 这条历史根因已经消除

#### `window-manager-extend`

当前关键文件：

- `packages/maths-kit/src/index.ts`
- `packages/maths-kit/src/runtime.ts`
- `packages/maths-kit/bridge.js`
- `packages/paste/src/index.ts`
- `packages/paste/bridge.js`
- `packages/ai/src/component/*`
- `packages/ai/src/controller.tsx`
- 各包 `bridge.js / bridge.d.ts / package.json`

当前已完成的关键动作：

1. `maths-kit` 增加 bridge runtime 模型
2. `paste` / `ai` / `background` / `scrollbar` / `wheel` 都具备统一 bridge 入口
3. 修掉了多处 `lodash` 命名导入在原生 ESM 下不稳定的问题
4. `maths-kit` runtime 已去掉顶层直接执行 `white-web-sdk`

当前状态说明：

- `window-manager-extend` 已经是 full 下继续对齐 `MathsKit / Paste` 的必要前置
- 但 `MathsKit / Paste` 的完整交互联调仍未全部结束

#### `appliance-plugin`

当前联调源码路径：

- `/Users/hongqiuer/work/appliance-plugin`

本轮实际改动：

- [vite.config.bridge.js](/Users/hongqiuer/work/appliance-plugin/vite.config.bridge.js)
- [src/bridge-white-web-sdk.ts](/Users/hongqiuer/work/appliance-plugin/src/bridge-white-web-sdk.ts)

说明：

- 这部分改动的方向是正确的：
  - 把 bridge build 中 `white-web-sdk` 指到空 shim
- 但它**单独并没有完全解决** demo 本地 dev 下的 `override`
- 当前真正让本地 `full-room` 稳定下来的，是：
  - `fastboard-demo` 侧的 `optimizeDeps.exclude`
  - `auto-draw-plugin` 从 full 路由依赖图中隔离

也就是说：

- `appliance-plugin` 源仓库侧仍然需要进一步做正式修复
- 当前源码改动可以视为“方向验证通过，但还没形成最终上游方案”

#### `appInMainView`

当前关键作用：

- full 模式继续走 `bridge`
- 当前没有发现它是本轮最终阶段 `override` 的主要触发者

#### `app-little-white-board`

当前状态：

- 已发布并接入 `@netless/app-little-white-board@0.0.4`
- full 页 `LittleBoard` 仍是本轮需要继续回归验证的一部分

## 6. 当前本地接入策略

当前 `fastboard-demo` 的本地联调方式已经和旧文档不同，以下是最新版：

### 6.1 当前依赖策略

- `@netless/fastboard-react` -> `1.1.5-beta.7`
- `@netless/fastboard-react-full` -> `1.1.5-beta.7`
- `@netless/app-in-mainview-plugin` -> `link:../appInMainView`
- `@netless/appliance-plugin` -> `link:../appliance-plugin`
- `@netless/window-manager` -> 通过 pnpm override 指向本地 `../window-manager`
- `@netless/window-manager-maths-kit-extend` -> `0.0.3`
- `@netless/window-manager-paste-extend` -> `0.0.6`
- `@netless/app-little-white-board` -> **registry 包 `0.0.4`**

### 6.2 当前 Vite 关键配置

当前 `vite.config.ts` 中的关键点：

- alias `white-web-sdk`
- alias `@netless/app-in-mainview-plugin/bridge`
- alias `@netless/appliance-plugin/bridge`
- alias `@netless/window-manager`
- `optimizeDeps.exclude`
  - `@netless/appliance-plugin`
  - `@netless/appliance-plugin/bridge`
  - `@netless/appliance-extend-auto-draw-plugin`

说明：

- 在本地 dev 下，这个 `optimizeDeps.exclude` 目前是**有效且必要**的
- 它不是最终上游方案，但在当前联调阶段能稳定避免 Vite 再生成那条错误的预构建依赖链

## 7. 当前验证结果

以下结果仅记录**本轮本地代码状态下已经实际验证过**的结论。

### 7.1 已确认正常

#### A. `full-room` 纯页面（不依赖 UI 操作）

使用 brand-new tab、brand-new console、只观察新日志的方式验证：

- `http://localhost:3000/full-room/<uuid>?region=cn-hz`
- 页面正常进房
- 静置 15 到 20 秒
- **未再出现新的**
  - `window.__netlessJavaScriptLoader was override`

这个结论至少多次在以下场景中成立：

- fresh room
- old room
- 纯 `full-room`

#### B. `full-room?usePlugin=1`

已确认：

- 能正常进房
- `LittleBoard` 菜单项可见
- 早期一轮曾实际点开并成功创建窗口
- 在后续大量改动之后，仍需要再做一轮最终回归确认

#### C. `normal room`

已确认：

- normal 页不再因为 full 的 bridge 改动报：
  - `[@netless/window-manager-maths-kit-extend/bridge] white-web-sdk runtime has not been bound yet`

### 7.2 已确认移除/隔离

- `ExtendAIPlugin` 已从 normal/full demo 接入层移除
- `auto-draw-plugin` 已从 full 路由依赖图中隔离，只在 normal 页的 `AutoDrawView` 动态加载

### 7.3 当前仍未完全闭环的项

#### `MathsKit`

当前状态：

- 菜单项已经重新出现在 full 页 app 菜单里
- 但自动化点击后 overlay 仍未在浏览器自动化里稳定弹出
- 从代码结构看，当前更像是 UI 触发链问题，而不是 runtime override 问题

#### `Paste`

当前状态：

- 接入链已经重新挂回 full / normal 的同一套逻辑
- 但未做完整 end-to-end 操作验证
- `drop / paste / file conversion` 真实交互还没有全部测完

#### `LittleBoard`

当前状态：

- 已完成过真实打开验证
- 但在后续大规模依赖切换后，仍建议再做一次最终回归

### 7.4 2026-04-28 追加诊断：`plugin=` 为空时仍可稳定复现 override

本次按“先验证最裸 `full-room`，再验证 `plugin=1`”的顺序重新跑了一轮脚本化检查。

验证方式：

- 启动本地 `fastboard-demo` dev server
- 直接访问
  - `full-room/<uuid>?region=cn-hz&token=<token>`
  - `full-room/<uuid>?region=cn-hz&token=<token>&usePlugin=1`
- 每个页面静置约 20 秒并抓取 `console / pageerror / request`

实际结果：

- `plugin=` 为空时，依然出现：
  - `window.__netlessJavaScriptLoader was override`
- `plugin=1` 时，同样依然出现：
  - `window.__netlessJavaScriptLoader was override`

这次新的关键信号不是 `appliance-plugin`，而是：

- 页面会请求 `@fs/Users/hongqiuer/work/window-manager-extend/packages/maths-kit/bridge.js`
- 随后又请求 `node_modules/.vite/deps/white-web-sdk.js`
- `pageerror` 栈直接落在第二份 Vite 预构建的 `white-web-sdk`

当前追加结论：

- 目前 `full-room` 的主要复现链已经不能再归因到 `plugin=1` 或 `appliance-plugin`
- 即使 `plugin=` 为空，只要 full 页仍去注册 `MathsKit / Paste` 这类 extend bridge，`MathsKit bridge -> @netless/window-manager -> white-web-sdk` 这条链就可能把第二份 runtime 拉起来
- 这也说明此前“`full-room` 已经稳定压住 override”的结论已经失效，需要以本节为准继续推进

本次已落地的临时诊断动作：

- `fastboard-demo/src/components/FullWhiteboard.tsx`
  - 当 `plugin=` 为空时，先临时跳过 `MathsKit / Paste` 等 extend bridge 注册
  - 目标是先确认“最裸 full-room”本身是否还会单独触发 override

本次继续落地中的正式修复方向：

- `fastboard` 内部 `__fastboardBridgeRuntime` 开始补充 `windowManager.ExtendPlugin`
- `window-manager-extend/packages/maths-kit`
  - 新增 `window-manager runtime bridge`
  - 后续进一步收敛为“bridge bundle 内置兼容 `ExtendPlugin` 基类”，避免 bridge 自己再触发第二份 `window-manager`
- `window-manager-extend/packages/paste`
  - 同步改成和 `maths-kit` 一样的 bridge bundle 基类模式
- 目标是不再依赖“`plugin=` 为空时跳过注册”的 demo 临时隔离手段，而是让 bridge 包本身可以在 full 下安全加载
- 当前已进入 `maths-kit / paste` bridge bundle 的本地编译与回归验证阶段
- 当前编译状态：
  - `paste` bridge bundle 已完成本地 build
  - `maths-kit` 仍在补齐 bridge 改造后的类型收口，再继续 build
- 当前新的收敛结论：
  - 真正需要 bridge 的不是 `window-manager` 的整套运行时，而只是 `ExtendPlugin` 的最小兼容基类
  - 只要 bridge bundle 自己内置这个基类，就能避免 `bridge.js` 在初始化阶段再次碰到外部 `window-manager`
  - 这层兼容基类同时内置最小 `on/off/emit` 能力，足够支撑 `paste` 当前的插件事件使用
  - `white-web-sdk runtime` 也必须绑定到 bridge bundle 自己导出的那一份模块实例，不能只绑定 `dist/runtime.js` 的平行模块副本
  - 当前脚本回归结果：
    - `full-room` 的 `plugin=` 为空、`plugin=1` 都已经恢复为“无 override、无 bridge runtime 报错”
    - `normal room` 也已经恢复为“无 override、无 bridge runtime 报错”
    - `window.mathsKitPlugin` 在 `full-room` 和 `normal room` 的脚本回归里都已经重新出现，说明这次不是靠“桥没注册成功”换来的稳定

本次最终脚本回归结果：

- `full-room?plugin=` 空
  - `overrideMessages=[]`
  - `pageErrors=[]`
  - `window.mathsKitPlugin === true`
- `full-room?usePlugin=1`
  - `overrideMessages=[]`
  - `pageErrors=[]`
  - `window.mathsKitPlugin === true`
- `normal room`
  - `overrideMessages=[]`
  - `pageErrors=[]`
  - `window.mathsKitPlugin === true`

### 7.5 2026-04-28 追加问题：`usePlugin=1` 下 `MathsKit` 首次写入 `mathsKits` 会打到 undefined

用户后续手动回归补充发现：

- `full-room` 且 `plugin=` 为空时，`MathsKit` 正常
- `full-room?usePlugin=1` 时，`MathsKit` 仍可能报：
  - `TypeError: Cannot set properties of undefined (setting 'mathsKits')`

当前判断：

- 根因不在 `appliance-plugin` 本身
- 更像是 `window-manager-extend/packages/maths-kit` 在 app view / LittleBoard 场景下，首次写入 `mathsKits` 时直接走了深层 `safeUpdateAttributes(['mathsKits', ...])`
- 但这时 invisible plugin attributes 的根节点还没有建立，导致白板 SDK 内部 setter 对 `mathsKits` 的父节点写入失败

本次继续落地的修正方向：

- `maths-kit` 改成和 `window-manager` 自己的 `apps / boxesStatus` 一样的防御式写法
- 当 `mathsKits` 根节点或 `appId` 节点尚不存在时：
  - 直接用 `safeSetAttributes({ mathsKits: ... })` 一次性建树
- 只有在树已存在时，才继续走细粒度 `safeUpdateAttributes`

本次追加验证结果：

- 在 `appliance-plugin@1.1.35` 的 `fastboard-demo` 副本上，用 `http://localhost:3000/full-room/<uuid>?usePlugin=1`
- 先创建 `LittleBoard`
- 再对当前 focused app view 执行：
  - `window.mathsKitPlugin.create(<LittleBoardAppId>, 'Ruler')`

结果：

- `mathsKits` 已正常写入为：
  - `mathsKits[LittleBoard-xxx][Ruler-xxx] = {...}`
- `pageErrors=[]`
- 没有再出现：
  - `Cannot set properties of undefined (setting 'mathsKits')`
- 也没有连带重新触发：
  - `window.__netlessJavaScriptLoader was override`

## 8. 后续未完成项

当前还没有完全结束的事项如下：

### 8.1 `appliance-plugin` 上游正式修复

当前 demo 层已经稳定避免 `override`，但 `appliance-plugin` 源仓库的 bridge build 仍然需要形成更正式的上游方案。

换句话说：

- demo 侧已经有可用解法
- 但 `appliance-plugin` 自身的 bridge chunk 与主包 chunk 关系还没有彻底理顺

建议后续继续做：

1. 继续收敛 `appliance-plugin` bridge build 的 chunk 结构
2. 目标是让 demo 最终不依赖 `optimizeDeps.exclude` 这种本地 dev 兜底

### 8.2 `MathsKit` full 页点击链打通

当前代码已经让：

- `MathsKit` 菜单常驻注册
- `showMathsKitBox` 改成显式 open/close

但仍需要继续做：

1. 确认 full 页菜单点击事件是否真的走到 `onClick`
2. 确认 overlay 打开链是否被 toolbar / menu 事件顺序吞掉
3. 最终确认点击后可见的 UI 行为

### 8.3 `Paste` 真实交互验证

需要继续补：

1. `drop` 文件
2. `paste` 文件
3. 图片 / media / docs / pdf 转换路径
4. 是否仍会在异步转换后触发新的 runtime 冲突

### 8.4 `LittleBoard` 最终回归

当前建议再做一次最终确认：

1. `full-room?usePlugin=1`
2. 真点击 `LittleBoard`
3. 检查窗口创建
4. 检查无新的运行时异常

### 8.5 `fastboard-react*` 的 `.d.ts` 打包问题

本轮为了让 `fastboard-demo` 吃到新的 runtime 逻辑，重新跑过：

- `@netless/fastboard-core`
- `@netless/fastboard-core-full`
- `@netless/fastboard-react`
- `@netless/fastboard-react-full`

当前状态：

- `core / core-full` 已完成本地 build
- `react / react-full` 的 JS 产物已经重新输出，可用于当前 runtime 回归
- 但两个 React 包在 `d.ts` 阶段仍然报：
  - `Module '"@netless/fastboard-core"' has no exported member 'FastboardApp'`
  - 以及同类类型导出错误

说明：

- 这组 `.d.ts` 失败不是本轮 `window-manager-extend bridge` 修复本身直接引起的运行时问题
- 但如果最终希望一起发布新的 `fastboard-react` / `fastboard-react-full` 版本，仍需要单独清掉这组类型打包错误

## 9. 当前结论

截至本次更新，可以明确下结论的是：

1. `full-room` 下最核心的 `window.__netlessJavaScriptLoader was override` 已经在当前本地联调状态下被压住
2. 这条问题在本轮最后阶段**不再主要由 `MediaPlayer` 注册导致**
3. 当前更接近真实根因的是：
   - `window-manager-extend/packages/maths-kit` 的 bridge 仍然把 runtime 绑定和 bundle 模块实例拆开了
   - bridge bundle 对 `ExtendPlugin` 的依赖粒度过大
   - Vite 对 linked package 的模块实例边界会放大这类 bridge 绑定错误
4. `normal` 与 `full` 现在已经重新做了接入隔离：
   - AI 已移除
   - auto-draw 已从 full 依赖图隔离
   - maths-kit runtime 在 normal / full 两边都已经重新 bridge 化
5. 当前更像是一个**`window-manager-extend` 上游 bridge 包修复**，而不是必须依赖 `fastboard full` 再做一层临时规避

## 10. 建议的后续顺序

建议下一会话严格按这个顺序继续：

1. 先读本文，不再读旧 handoff 文档
2. 启动 `fastboard-demo` dev server
3. 用 brand-new tab 验证纯 `full-room` 是否仍无新的 `override`
4. 再验证：
   - `full-room?usePlugin=1` 的 `LittleBoard`
5. 再验证：
   - `full-room` 下 `MathsKit` 点击链
6. 最后验证：
   - `Paste / drop / file conversion`

如果再次出现 `window.__netlessJavaScriptLoader was override`，优先继续从这几条方向排：

1. `appliance-plugin` bridge 异步 chunk 是否仍间接拉起主包 chunk
2. `window-manager-extend` 的任意 bridge 包是否再次引入第二份 SDK
3. Vite 是否再次把 linked 包错误预构建进 `.vite/deps`

## 11. 当前建议的发版清单

下面这份清单只基于“本轮 full-room / `override` / `MathsKit` / `LittleBoard` 修复”本身来给出。

### 11.1 必须先发布的上游包

这些包当前仍在本地 link / override 或直接承载了本轮修复，建议先发：

1. `@netless/window-manager`
   - 当前本地版本：`1.0.13-test.20`
   - 本轮作用：
     - `BuiltinApps.ts` 中 `MediaPlayer` 懒加载
   - 建议：
     - 发布一个**高于当前线上 `1.0.13`** 的新版本
     - 如果要给业务方直接吃，优先考虑正式 patch/minor，而不是继续只留在 `-test.*`

2. `@netless/window-manager-maths-kit-extend`
   - 当前本地版本：`0.0.2`
   - 本轮作用：
     - bridge bundle 改为复用 full runtime
     - bridge bundle 内置兼容 `ExtendPlugin` 基类
     - `mathsKits` 首次写入改成防御式建树，修掉 `setting 'mathsKits' of undefined`
   - 这是**本轮最核心的上游修复包之一**

3. `@netless/window-manager-paste-extend`
   - 当前本地版本：`0.0.5`
   - 本轮作用：
     - bridge bundle 改为和 `maths-kit` 同样的最小 bridge 模式
   - 虽然本轮主要问题集中在 `MathsKit`，但为了最终彻底去掉本地 link，建议一起发

### 11.2 当前不需要因为这轮问题额外发版的包

1. `@netless/appliance-plugin`
   - 已实际验证：
     - `1.1.35` 下
       - `full-room?usePlugin=1` 无 `window.__netlessJavaScriptLoader was override`
       - `LittleBoard` 正常
   - 结论：
     - **这轮问题不要求你额外发布新的 appliance-plugin**
     - demo / fastboard 可以继续依赖 `1.1.35` 作为当前稳定基线

2. `window-manager-extend/packages/ai`
3. `window-manager-extend/packages/background`
4. `window-manager-extend/packages/scrollbar`
5. `window-manager-extend/packages/wheel`
   - 这些子包本地虽然也有 bridge 相关改造痕迹
   - 但**不是这轮 full-room / LittleBoard / MathsKit 修复成立的必要前提**
   - 可以不并入本次最小发版集合

### 11.3 fastboard 侧建议发布的包

这轮 fastboard 本身的源码修复主要落在：

- `@netless/fastboard-core`
- `@netless/fastboard-core-full`

以及它们的外层封装：

- `@netless/fastboard`
- `@netless/fastboard-full`
- `@netless/fastboard-react`
- `@netless/fastboard-react-full`

如果你要让 `fastboard-demo` 最终完全切回包依赖，并继续保留 React 接入方式，那么**至少需要有一套新的 fastboard React 包可发布**。

### 11.4 fastboard 侧当前的发布注意项

当前状态不是完全无风险，主要有一条要单独注意：

- `@netless/fastboard-react`
- `@netless/fastboard-react-full`

在本地重新 build 时，`JS dist` 已经能重新产出并被 demo 运行时消费，但 `d.ts` 阶段仍报：

- `Module '"@netless/fastboard-core"' has no exported member 'FastboardApp'`
- 以及同类导出错误

因此：

- 如果你要做**干净可复现**的正式发版，建议先修掉这组 React 包的类型打包问题
- 如果不修，它会成为 fastboard React 包发版前的明确风险项

### 11.5 fastboard-demo 最终需要替换成包依赖的项

当前这条目标已经完成：

- `fastboard-demo/package.json` 中已**没有**本地 `link:` 依赖
- `fastboard-demo` 的 `pnpm.overrides` 中也已**没有**本地 `link:` override

当前 `fastboard-demo` 已切回包依赖的关键项包括：

- `@netless/app-in-mainview-plugin`
- `@netless/app-plyr`
- `@netless/fastboard-react`
- `@netless/fastboard-react-full`
- `@netless/window-manager`
- `@netless/window-manager-maths-kit-extend`
- `@netless/window-manager-paste-extend`

其中本轮真正新增需要你先发出去的，是：

- 新版 `@netless/window-manager`
- 新版 `@netless/window-manager-maths-kit-extend`
- 新版 `@netless/window-manager-paste-extend`
- 新版 fastboard 相关包

而下面这些如果对应版本已经在线上可用，则不需要本轮再从源码仓库新发：

- `@netless/appliance-plugin` -> 继续用 `1.1.35`
- `@netless/app-in-mainview-plugin` -> 可切到已发布的 `>=0.0.10`
- `@netless/app-plyr` -> 可切到已发布的 `0.2.12`（或你希望的线上版本）

### 11.6 建议的手动发版顺序

建议按这个顺序：

1. 先发布上游运行时包
   - `@netless/window-manager`
   - `@netless/window-manager-maths-kit-extend`
   - `@netless/window-manager-paste-extend`

2. 再回到 `fastboard`
   - 更新本地测试/依赖指向到刚发的新包版本
   - 回归 `full-room`
   - 发布新的 fastboard 包集合

3. 最后更新 `fastboard-demo`
   - 把所有 `link:` 依赖切回包版本
   - 去掉 `@netless/window-manager` 的本地 override
   - 固定 `@netless/appliance-plugin` 到 `1.1.35` 或你最终确认的线上版本

### 11.7 最小可行发版集合

如果你只想先解决本轮问题，最小集合可以收敛成：

- `@netless/window-manager`
- `@netless/window-manager-maths-kit-extend`
- `@netless/window-manager-paste-extend`
- fastboard 新版本（至少覆盖 demo 实际使用到的 React/full 入口）

而不是把 `window-manager-extend/packages/*` 全部子包都一起发一遍。

### 11.8 当前依赖版本调整进度

当前已先在源码仓库里把 `fastboard` / `fastboard-demo` 对 `@netless/window-manager` 的目标依赖版本统一调整为 `1.0.14`：

- `fastboard/package.json`
  - 根 `devDependencies["@netless/window-manager"]` -> `^1.0.14`
  - `pnpm.overrides["@netless/window-manager"]` -> `1.0.14`
- `fastboard/packages/fastboard-core/package.json`
  - peer range -> `>=1.0.14`
  - dev dependency -> `^1.0.14`
- `fastboard/packages/fastboard-core-full/package.json`
  - dev dependency -> `^1.0.14`
- `fastboard/packages/fastboard-core-lite/package.json`
  - peer range -> `>=1.0.14`
  - dev dependency -> `^1.0.14`
- `fastboard-demo/package.json`
  - dependency -> `1.0.14`
  - `pnpm.overrides["@netless/window-manager"]` -> `1.0.14`

`fastboard-demo` 当前还继续推进了一步：

- `@netless/window-manager-maths-kit-extend` 已从本地 `link:` 切到已发布的 `0.0.3`
- `@netless/window-manager-paste-extend` 已从本地 `link:` 切到已发布的 `0.0.6`
- `@netless/fastboard-react` 已从本地 `link:` 切到已发布的 `1.1.5-beta.7`
- `@netless/fastboard-react-full` 已从本地 `link:` 切到已发布的 `1.1.5-beta.7`
- `fastboard-demo` 当前已无本地 `link:` 依赖和本地 `link` override
