# @netless/fastboard

本库用于快速开始一个白板应用，基于 [white-web-sdk](https://www.npmjs.com/package/white-web-sdk)、[@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager) 和 [netless-app](https://github.com/netless-io/netless-app) 实现。

## 目录

- [安装](#install)
- [使用](#usage)
- [进阶](./docs)

<h2 id="install">安装</h2>

<pre class="language-bash">
npm add <b>@netless/fastboard</b> @netless/window-manager white-web-sdk
</pre>

> **注意：**@netless/window-manager 和 white-web-sdk 是 peerDependency，如果你不清楚 peerDependency 是什么意思，可以阅读 [《为什么使用 peerDependency ？》](./docs/zh/peer-dependency.md)。

<h2 id="usage">使用</h2>

### 原生 JavaScript

```js
import { createFastboard, createUI } from "@netless/fastboard";

async function main() {
  const fastboard = await createFastboard({
    // [1]
    sdkConfig: {
      appIdentifier: "whiteboard-appid",
      region: "cn-hz", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "gb-lon"
    },
    // [2]
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
    },
    // [3] (可选)
    managerConfig: {
      cursor: true,
    },
    // [4] (可选)
    netlessApps: [],
  });

  const container = createContainer();

  const ui = createUI(fastboard, container);

  // .....

  // 关闭 Fastboard UI
  ui.destroy();

  // .....

  // 退出 Fastboard (从白板房间断开)
  fastboard.destroy();
}

function createContainer() {
  const container = document.createElement("div");
  // 白板元素必须具有可见的大小
  Object.assign(container.style, {
    height: "400px",
    border: "1px solid",
    background: "#f1f2f3",
  });
  document.body.appendChild(container);
  return container;
}

main().catch(console.error);
```

<samp>[1]</samp> 关于 SDK 更多配置请看 [构造 WhiteWebSDK](https://developer.netless.link/javascript-zh/home/construct-white-web-sdk)\
<samp>[2]</samp> 加入房间更多配置请看 [构造 Room 与 Player 对象](https://developer.netless.link/javascript-zh/home/construct-room-and-player)\
<samp>[3]</samp> 配置 WindowManager 请看 [WindowManager.mount()](https://github.com/netless-io/window-manager/blob/master/docs/api.md#mount)

关于窗口最小化后显示的小图标，可以通过 CSS 覆盖样式的方式修改它的位置：

```css
.telebox-collector {
  right: 20px;
  bottom: 40px;
}
```

### 使用 React

先安装 @netless/fastboard-react，再使用里面提供的 `<Fastboard />` 组件。

<pre class="language-bash">
npm add <b>@netless/fastboard-react</b> @netless/window-manager white-web-sdk react react-dom
</pre>

```jsx
import { useFastboard, Fastboard } from "@netless/fastboard-react";
import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  const fastboard = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: "whiteboard-appid",
      region: "cn-hz", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "gb-lon"
    },
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
    },
  }));

  return <Fastboard app={fastboard} />;
}

// 白板元素必须具有可见的大小
createRoot(document.getElementById("app")).render(<App />);
```

### 使用白板功能

[详细 API 文档](./docs/zh/api.md)。

#### 插入图片

```js
await fastboard.insertImage(fileUrl);
```

其中 `fileUrl` 是该图片文件的 CDN 地址。本库并不包含任何上传、保存文件的逻辑和功能。

#### 撤销、重做

```js
fastboard.undo();
fastboard.redo();
```

#### 移动视角

```js
fastboard.moveCamera({ centerX: 0, centerY: 0, scale: 1 });
fastboard.moveCameraToContain({ originX: -300, originY: -200, width: 600, height: 400 });
```

#### 设置教具

```js
fastboard.setAppliance("pencil");
fastboard.setAppliance("shape", "triangle");
fastboard.setStrokeWidth(2);
fastboard.setStrokeColor([r, g, b]);
```

### 使用 Apps

#### 注册与使用 Apps

除了 Fastboard 内置的一些官方 app，你也可以定义并使用自己编写的 app。在进入房间（`createFastboard`）前需要按以下操作先在各客户端注册 app：

```js
import { register } from "@netless/fastboard";
import MyApp from "my-app";

register({ kind: MyApp.kind, src: MyApp });
```

或者你也可以在 `createFastboard` 时设置 `netlessApps`：

```js
createFastboard({
  ..., // 其他配置
  netlessApps: [MyApp],
});
```

接着在房间内调用以下接口插入 app：

```js
fastboard.manager.addApp({ kind: MyApp.kind });
```

[在这里阅读更多有关开发 Netless App 的信息](https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md)

#### 插入 PDF、PPT 和 PPTX 文档

```js
// 插入 PDF/PPT/PPTX 至主白板
const appId = await fastboard.insertDocs("文件名.pptx", conversionResponse);
```

其中 `conversionResponse` 是 [转码](https://developer.netless.link/server-zh/home/server-conversion#get-%E6%9F%A5%E8%AF%A2%E4%BB%BB%E5%8A%A1%E8%BD%AC%E6%8D%A2%E8%BF%9B%E5%BA%A6) 结果。

> **注意：** 如果你使用的是 [projector](https://developer.netless.link/server-zh/home/server-projector) 转码服务，请使用以下方式插入：
>
> ```js
> const appId = await fastboard.insertDocs({
>   fileType: "pptx",
>   scenePath: `/pptx/${response.uuid}`,
>   taskId: response.uuid,
>   title: "filename.pptx",
> });
> ```

#### 插入音频、视频

```js
const appId = await fastboard.insertMedia("文件名.mp3", fileUrl);
```

其中 `fileUrl` 是该媒体文件的 CDN 地址。本库并不包含任何上传、保存文件的逻辑和功能。

#### 插入 [@netless/app-monaco](https://github.com/netless-io/netless-app/tree/master/packages/app-monaco)

```js
const appId = await fastboard.manager.addApp({
  kind: "Monaco",
  options: { title: "Code Editor" },
});
```

#### 插入 [@netless/app-countdown](https://github.com/netless-io/netless-app/tree/master/packages/app-countdown)

```js
const appId = await fastboard.manager.addApp({
  kind: "Countdown",
  options: { title: "Countdown" },
});
```

#### 插入 [@netless/app-geogebra](https://github.com/netless-io/netless-app/tree/master/packages/app-geogebra)

```js
const appId = await fastboard.manager.addApp({
  kind: "GeoGebra",
  options: { title: "GeoGebra" },
});
```

#### 插入 [@netless/app-plyr](https://github.com/netless-io/netless-app/tree/master/packages/app-plyr)

```js
const appId = await fastboard.manager.addApp({
  kind: "Plyr",
  options: { title: "YouTube" },
  attributes: {
    src: "https://www.youtube.com/embed/bTqVqk7FSmY",
    provider: "youtube",
  },
});
```

#### 插入 [@netless/app-embedded-page](https://github.com/netless-io/netless-app/tree/master/packages/app-embedded-page)

```js
const appId = await fastboard.manager.addApp({
  kind: "EmbeddedPage",
  options: { title: "Google Docs" },
  attributes: {
    src: "https://docs.google.com/document/d/1bd4SRb5BmTUjPGrFxU2V7KI2g_mQ-HQUBxKTxsEn5e4/edit?usp=sharing",
  },
});
```

> **注意：** EmbeddedPage 使用 [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 来显示外部资源，由于浏览器限制，您最好不要嵌套使用 iframe（即 iframe 内还有 iframe，通常来说浏览器会对第二层 iframe 增加十分多的限制或者根本无法使用）。

> 更多 app 请看 [netless-app](#https://github.com/netless-io/netless-app)。

## License

MIT @ [netless](https://github.com/netless-io)
