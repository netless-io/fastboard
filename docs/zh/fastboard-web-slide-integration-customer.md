# Fastboard Web 文档集成指南（客户版）

本文用于说明如何在 Web 项目中集成 Fastboard，并接入：

- 动态 PPT：`@netless/app-slide`
- 静态 PPT / PDF：`@netless/app-presentation`（建议以 `DocsViewer` 方式安装）

## 1. 推荐集成方式

如果你的 Web 项目是 React，推荐使用：

```bash
pnpm add @netless/fastboard-react @netless/app-slide @netless/app-presentation
```

如果项目不是 React，也可以使用：

```bash
pnpm add @netless/fastboard @netless/app-slide @netless/app-presentation
```

推荐原则如下：

- React 项目优先使用 `@netless/fastboard-react`
- 动态 PPT 使用 `@netless/app-slide`
- 静态 PPT、静态文档、PDF 建议使用 `@netless/app-presentation` 并安装为 `DocsViewer`

## 2. 动态 PPT 与静态 PPT 的区别

### 动态 PPT：`Slide`

适用于：

- `.pptx` 动态演示
- 需要保留动画、逐步播放、动态切页的场景

特点：

- 依赖动态文件转换结果
- 打开后对应的 App Kind 为 `Slide`
- 推荐通过 `dispatchDocsEvent()` 统一控制页码，也可以通过底层 `appResult` 直接控制

### 静态 PPT / PDF：`DocsViewer`

适用于：

- 静态 PPT
- PDF
- 其他已经被图片化的文档

特点：

- 依赖静态文件转换结果
- 本质上是逐页图片展示
- 不保留 PPT 动画
- 更适合文档浏览、课件展示、PDF 预览等场景

## 3. 文件转换服务是接入前提

无论是动态 PPT 还是静态 PPT / PDF，Fastboard SDK 都不能直接读取原始文件。

业务侧需要先通过 Agora 文件转换服务，把源文件转换成 SDK 可消费的参数，再传给前端打开文档。

官方说明：

- [Agora File conversion overview](https://docs.agora.io/en/interactive-whiteboard/develop/file-conversion-overview)

根据官方说明：

- 静态文件转换：把 PPT、PPTX、DOC、DOCX、PDF 转成 PNG / JPG(JPEG) 图片，不保留动画
- 动态文件转换：把 PPT / PPTX 转成 HTML Web 页面资源，保留动画

换句话说：

- `Slide` 消费的是“动态转换结果”
- `DocsViewer` 消费的是“静态转换结果”

## 4. 接入前准备

在正式集成前，需要先完成以下准备：

1. 在 Agora Console 中启用文件转换服务
2. 配置第三方存储，用于保存转换产物
3. 确保文件转换所在数据中心与白板房间 `region` 一致
4. 由业务服务端具备调用 Agora 文件转换 REST API 的能力

同时建议：

- 动态转换优先上传 `.pptx`
- 若静态转换效果不理想，可优先尝试先转成 PDF 再做静态转换

## 5. 服务端与客户端职责划分

### 服务端职责

服务端通常负责以下事情：

1. 将源文件上传到可访问的存储地址
2. 调用 Agora 文件转换 REST API 发起转换任务
3. 轮询任务进度，直到转换完成
4. 将转换结果返回给前端

服务端最终需要返回给前端的内容，通常包括两类：

- 动态 PPT 所需参数：`taskId`、`url`、`title`
- 静态文档所需参数：逐页 `scenes` 数据、`title`

### 客户端职责

客户端通常负责以下事情：

1. 注册 `Slide` 和 `DocsViewer`
2. 初始化 Fastboard
3. 使用服务端返回的转换结果调用 `insertDocs()`
4. 保存返回的 `appId`
5. 通过 `appId` 精确控制某一个文档实例

## 6. 建议的服务端返回数据结构

为了降低前端接入复杂度，建议服务端不要把文件转换接口的原始结果直接透传给前端，而是做一层归一化，输出固定的数据结构。

### 6.1 动态 PPT 建议返回

```json
{
  "type": "dynamic-ppt",
  "title": "demo.pptx",
  "taskId": "82d16c40b15745f0b5fad096ac721773",
  "url": "https://convertcdn.netless.link/dynamicConvert",
  "scenePath": "/pptx/82d16c40b15745f0b5fad096ac721773"
}
```

前端收到后可直接调用：

```ts
fastboard.insertDocs({
  fileType: "pptx",
  scenePath,
  taskId,
  title,
  url,
});
```

### 6.2 静态 PPT / PDF 建议返回

```json
{
  "type": "static-docs",
  "title": "lesson.pdf",
  "scenePath": "/pdf/lesson-001",
  "scenes": [
    {
      "name": "1",
      "ppt": {
        "src": "https://example.com/1.png",
        "width": 714,
        "height": 1010
      }
    },
    {
      "name": "2",
      "ppt": {
        "src": "https://example.com/2.png",
        "width": 714,
        "height": 1010
      }
    }
  ]
}
```

前端收到后可直接调用：

```ts
fastboard.insertDocs({
  fileType: "pdf",
  scenePath,
  title,
  scenes,
});
```

### 6.3 为什么建议服务端先做归一化

好处主要有：

- 前端不需要理解文件转换接口的原始返回格式
- 动态和静态文档可以统一成稳定的数据契约
- 后续如果调整转换服务实现，前端改动更小
- 更方便服务端做权限控制、缓存和重试

## 7. 动态 PPT 集成

### 7.1 注册 `Slide`

需要在进入房间前注册：

```ts
import { register } from "@netless/fastboard-react";

register({
  kind: "Slide",
  src: () => import("@netless/app-slide"),
  appOptions: {
    minFPS: 10,
    maxFPS: 20,
    resolution: 1,
    maxResolutionLevel: 2,
    skipActionWhenFrozen: true,
    antialias: false,
  },
});
```

### 7.2 打开动态 PPT

当服务端已经完成动态文件转换后，客户端可使用以下参数打开：

```ts
const appId = await fastboard.insertDocs({
  fileType: "pptx",
  scenePath: `/pptx/${taskId}`,
  taskId,
  title: "demo.pptx",
  url,
});
```

参数说明：

- `taskId`：文件转换任务 ID
- `url`：动态资源前缀
- `scenePath`：白板中的唯一场景路径
- `title`：窗口标题

这里最重要的一点是：

- `taskId` 和 `url` 必须来自文件转换服务结果
- 前端不能自行构造动态 PPT 内容

### 7.3 控制指定动态 PPT

打开成功后，通常会拿到一个 `appId`，例如：

```ts
Slide-fdf169a0
```

推荐使用统一文档控制接口：

```ts
import { dispatchDocsEvent } from "@netless/fastboard";

await dispatchDocsEvent(fastboard, "prevPage", { target: appId });
await dispatchDocsEvent(fastboard, "nextPage", { target: appId });
await dispatchDocsEvent(fastboard, "jumpToPage", { target: appId, page: 3 });
```

如果需要控制动画步骤，也可以使用：

```ts
await dispatchDocsEvent(fastboard, "prevStep", { target: appId });
await dispatchDocsEvent(fastboard, "nextStep", { target: appId });
```

说明：

- `jumpToPage(page)` 采用 1-based 页码
- `jumpToPage(1)` 表示跳到第一页
- `prevPage` / `nextPage` 是上一页、下一页
- `prevStep` / `nextStep` 是动态 PPT 的动画步骤控制

底层上，动态 PPT 也可以通过 `appId` 获取对应实例：

```ts
const app = fastboard.manager.queryOne(appId);
const controller = app?.appResult;
```

分页 API：

```ts
controller?.prevPage();
controller?.nextPage();
controller?.jumpToPage(3);
```

如果已经知道实例 ID，也可以直接写：

```ts
fastboard.manager.queryOne("Slide-fdf169a0")?.appResult?.prevPage();
fastboard.manager.queryOne("Slide-fdf169a0")?.appResult?.nextPage();
fastboard.manager.queryOne("Slide-fdf169a0")?.appResult?.jumpToPage(3);
```

## 8. 静态 PPT / PDF 集成

### 8.1 注册 `DocsViewer`

建议安装为 `DocsViewer`：

```ts
import { register } from "@netless/fastboard-react";
import { install } from "@netless/app-presentation";

install(register, {
  as: "DocsViewer",
  appOptions: {
    useScrollbar: true,
    debounceSync: true,
    maxCameraScale: 5,
    useClipView: true,
  },
});
```

### 8.2 打开静态 PPT / PDF

静态文档打开时，前端需要拿到文件转换服务返回的逐页图片信息，并整理成 `scenes`：

```ts
const appId = await fastboard.insertDocs({
  fileType: "pdf",
  scenePath: `/pdf/${taskId}`,
  title: "lesson.pdf",
  scenes: [
    {
      name: "1",
      ppt: {
        src: "https://example.com/1.png",
        width: 714,
        height: 1010,
      },
    },
    {
      name: "2",
      ppt: {
        src: "https://example.com/2.png",
        width: 714,
        height: 1010,
      },
    },
  ],
});
```

这里的关键点是：

- `scenes[].ppt.src` 来自静态转换后每一页的图片地址
- `scenes[].ppt.width` / `height` 来自页面尺寸
- `DocsViewer` 打开的不是原始文档，而是转换后的图片资源集合

### 8.3 控制指定静态 PPT / PDF

如果静态文档是通过 `DocsViewer` 打开的，也推荐使用同一套文档控制接口：

```ts
import { dispatchDocsEvent } from "@netless/fastboard";

await dispatchDocsEvent(fastboard, "prevPage", { target: appId });
await dispatchDocsEvent(fastboard, "nextPage", { target: appId });
await dispatchDocsEvent(fastboard, "jumpToPage", { target: appId, page: 3 });
```

说明：

- 这里的 `appId` 通常形如 `DocsViewer-xxxx`
- `jumpToPage(page)` 同样采用 1-based 页码
- 静态 PPT / PDF 没有动画步骤，`prevStep` / `nextStep` 会等价为上一页 / 下一页

## 9. PPT / 文档公共接口整理

结合 `fastboard`、`@netless/app-slide`、`@netless/app-presentation` 和 `window-manager` 的实现，建议客户侧只暴露以下稳定接口。

| 场景 | 推荐公共接口 | 适用范围 | 说明 |
| --- | --- | --- | --- |
| 注册动态 PPT | `register({ kind: "Slide", src: () => import("@netless/app-slide") })` | 动态 PPT | 对应 App Kind 为 `Slide` |
| 注册静态文档 | `install(register, { as: "DocsViewer" })` | 静态 PPT / PDF | Fastboard 既有 `insertDocs()` 静态文档流程仍安装为 `DocsViewer`；`dispatchDocsEvent()` 也识别默认的 `Presentation` kind |
| 打开文档 | `fastboard.insertDocs(params)` | 动态 PPT / 静态 PPT / PDF | 动态传 `fileType: "pptx"`；静态传 `fileType: "pdf"` 和 `scenes` |
| 控制文档 | `dispatchDocsEvent(fastboard, event, { target: appId, page })` | 动态 PPT / 静态 PPT / PDF | 推荐业务侧统一使用 |
| 查询底层实例 | `fastboard.manager.queryOne(appId)` | 所有窗口 App | 用于插图、截图、调试等高级场景 |
| 窗口展示控制 | `fastboard.manager.setFullscreen(true / false)` | Fastboard / `window-manager` 容器 | 这是 `window-manager` 的 fullscreen 模式，不是浏览器原生 Fullscreen API |

统一文档控制接口支持：

```ts
type DocsEvent =
  | "prevPage"
  | "nextPage"
  | "jumpToPage"
  | "prevStep"
  | "nextStep"
  | "scalePage";

await dispatchDocsEvent(fastboard, "prevPage", { target: appId });
await dispatchDocsEvent(fastboard, "nextPage", { target: appId });
await dispatchDocsEvent(fastboard, "jumpToPage", { target: appId, page: 3 });
await dispatchDocsEvent(fastboard, "prevStep", { target: appId });
await dispatchDocsEvent(fastboard, "nextStep", { target: appId });
await dispatchDocsEvent(fastboard, "scalePage", { target: appId, scale: 1.5 });
```

结论：

- 对“上一页 / 下一页 / 跳页”，动态 PPT 和静态 PPT / PDF 可以统一调用 `dispatchDocsEvent()`
- 对“上一动画 / 下一动画”，动态 PPT 有真实动画步骤；静态文档会退化为上一页 / 下一页
- `dispatchDocsEvent()` 同时识别独立的 `DocsViewer` kind 和默认的 `Presentation` kind；将 `@netless/app-presentation` 安装为 `DocsViewer` 仍是 Fastboard `insertDocs()` 的静态文档接入方式
- `window-manager.nextPage()` / `prevPage()` 控制的是主白板页，不是指定 PPT 窗口；指定文档窗口时不要用它们

## 10. PPT 窗口全屏展开

如果需要让文档窗口进入 Fastboard 的 fullscreen 展示模式，可调用：

```ts
fastboard.manager.setFullscreen(true);
```

关闭时：

```ts
fastboard.manager.setFullscreen(false);
```

需要注意：

- 这是 `window-manager` 的全屏展示模式
- 它主要用于隐藏窗口标题栏、切换到更适合演示的布局
- 它不是浏览器原生 Fullscreen API

## 11. 向指定 PPT 中插入图片

如果客户有“往 PPT 中插入图片”的需求，推荐理解为：

- 定位到某一个已经打开的动态 PPT 实例
- 在该 PPT 所在的白板视图中插入一张图片

这里要特别区分两件事：

- 这不是修改原始 PPT 文件本体
- 而是在该 PPT 承载的白板视图中叠加一张图片对象

### 11.1 推荐调用方式

```ts
const app = fastboard.manager.queryOne("Slide-fdf169a0");
const view = app?.view;

if (view) {
  const uuid = "test-ooo1";
  const src = "https://p5.ssl.qhimg.com/t01a2bd87890397464a.png";

  view.insertImage({
    uuid,
    centerX: 0,
    centerY: 0,
    width: 100,
    height: 100,
    locked: false,
    crossOrigin: true,
  });

  view.completeImageUpload(uuid, src);
}
```

说明：

- `insertImage()` 先创建图片对象
- `completeImageUpload(uuid, src)` 再把图片对象和真实图片地址绑定
- 这两步通常需要配合使用

### 11.2 为什么建议这样调用

客户给出的调用示例如下：

```ts
fastboard.manager.queryOne("Slide-fdf169a0").view.insertImage({
  uuid: "test-ooo1",
  centerX: 0,
  centerY: 0,
  width: 100,
  height: 100,
  locked: false,
  crossOrigin: true,
  src: "https://p5.ssl.qhimg.com/t01a2bd87890397464a.png",
});
```

更推荐的方式仍然是拆成两步：

```ts
view.insertImage(imageInfo);
view.completeImageUpload(uuid, src);
```

因为这更符合白板和 `window-manager` 的标准插图流程。

### 11.3 使用注意事项

- 只有带 `view` 的 App 才能插图，`Slide` 属于可插图类型
- 图片 URL 必须可访问
- 若存在跨域，建议加 `crossOrigin: true`
- `uuid` 需要保证唯一
- `centerX`、`centerY`、`width`、`height` 控制图片在白板中的位置和大小
- 插入后的图片属于白板内容，会参与多人同步

## 12. FAQ

### Q1：为什么不能直接把原始 PPT / PDF 文件交给 SDK？

因为 Fastboard 打开的不是原始文件，而是文件转换服务生成的结果：

- 动态 PPT 使用的是转换后的 HTML Web 资源
- 静态文档使用的是转换后的逐页图片资源

### Q2：动态 PPT 和静态 PPT 应该怎么选？

建议按下面的原则：

- 需要保留动画、逐步播放：选动态 PPT `Slide`
- 只是浏览课件、PDF、静态文档：选静态 `DocsViewer`

### Q3：为什么建议优先使用 `.pptx`？

根据 Agora 官方文档，`PPTX` 的兼容性更好。`PPT` 在后端通常还会先转为 `PPTX` 再解析，因此建议优先上传 `.pptx`。

### Q4：为什么有些 PPT 动画、字体或样式和原稿不完全一致？

这通常属于文件转换兼容性问题。Agora 官方文档提到：

- 动态转换更适合 Microsoft Office 生成的 PPT / PPTX
- WPS 文件支持不完整
- 部分字体、动画和特效存在兼容性限制

### Q5：为什么有时建议先转成 PDF 再做静态转换？

Agora 官方文档说明，PDF 在静态转换中通常可以得到更准确的图片结果。如果静态 PPT 转换效果不理想，先转成 PDF 再转换通常更稳。

### Q6：静态转换为什么不建议文件过大、页数过多？

Agora 官方文档说明：

- 小于 50 页时，静态转换效果通常更好
- 超过 100 页时，转换超时风险会变高

## 13. 推荐的完整接入流程

一个标准接入流程如下：

1. 客户将源文件上传到业务存储
2. 服务端调用 Agora 文件转换接口发起任务
3. 服务端轮询转换进度
4. 转换完成后，服务端将动态或静态结果返回给前端
5. 前端初始化 Fastboard，并提前注册 `Slide` / `DocsViewer`
6. 前端调用 `fastboard.insertDocs()` 打开文档
7. 前端保存返回的 `appId`
8. 业务侧根据需要调用统一翻页、跳页、全屏等 API

## 14. 常见注意事项

- 动态 PPT 推荐优先使用 `.pptx`，不要依赖旧格式 `.ppt`
- 动态转换适用于需要保留动画的课件
- 静态转换适用于普通课件浏览、PDF 预览、文档展示
- 文件转换服务的数据中心需要与白板房间的 `region` 保持一致
- 静态文档的最终输入是 `scenes`
- 动态文档的最终输入是 `taskId` + `url`
- 第三方存储需要保证客户端可以访问
- 如果图片资源存在跨域，前端插图时建议显式设置 `crossOrigin`

## 15. 最小可复用示例

```ts
import { register } from "@netless/fastboard-react";
import { dispatchDocsEvent } from "@netless/fastboard";
import { install } from "@netless/app-presentation";

export function setupNetlessApps() {
  register({
    kind: "Slide",
    src: () => import("@netless/app-slide"),
  });

  install(register, {
    as: "DocsViewer",
  });
}

export async function openDynamicPPT(fastboard: any, taskId: string, title: string, url?: string) {
  return fastboard.insertDocs({
    fileType: "pptx",
    scenePath: `/pptx/${taskId}`,
    taskId,
    title,
    url,
  });
}

export async function openStaticDocs(fastboard: any, scenePath: string, title: string, scenes: any[]) {
  return fastboard.insertDocs({
    fileType: "pdf",
    scenePath,
    title,
    scenes,
  });
}

export function fullscreen(manager: any) {
  manager.setFullscreen(true);
}

export function prevDocsPage(fastboard: any, appId: string) {
  return dispatchDocsEvent(fastboard, "prevPage", { target: appId });
}

export function nextDocsPage(fastboard: any, appId: string) {
  return dispatchDocsEvent(fastboard, "nextPage", { target: appId });
}

export function jumpDocsPage(fastboard: any, appId: string, page: number) {
  return dispatchDocsEvent(fastboard, "jumpToPage", { target: appId, page });
}

export function prevDocsStep(fastboard: any, appId: string) {
  return dispatchDocsEvent(fastboard, "prevStep", { target: appId });
}

export function nextDocsStep(fastboard: any, appId: string) {
  return dispatchDocsEvent(fastboard, "nextStep", { target: appId });
}

export function insertImageToSlide(manager: any, appId: string, params: {
  uuid: string;
  src: string;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  locked?: boolean;
  crossOrigin?: boolean | string;
}) {
  const view = manager.queryOne(appId)?.view;
  if (!view) {
    throw new Error("Slide view not found");
  }

  view.insertImage({
    uuid: params.uuid,
    centerX: params.centerX,
    centerY: params.centerY,
    width: params.width,
    height: params.height,
    locked: params.locked ?? false,
    crossOrigin: params.crossOrigin ?? true,
  });

  view.completeImageUpload(params.uuid, params.src);
}
```

## 16. 结论

对于 Web 集成场景，推荐的标准方案是：

- 使用 `@netless/fastboard-react` 作为前端白板容器
- 使用 `@netless/app-slide` 处理动态 PPT
- 使用 `@netless/app-presentation` 并以 `DocsViewer` 方式处理静态 PPT / PDF
- 通过 Agora 文件转换服务先生成动态或静态文档资源
- 前端用转换结果调用 `insertDocs()` 打开文档
- 通过 `dispatchDocsEvent()` 的 `{ target: appId }` 精确控制指定动态 PPT / 静态 PPT / PDF
