# @netless/fastboard

本库用于快速开始一个白板应用，基于 [white-web-sdk](https://www.npmjs.com/package/white-web-sdk)、[@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager) 和 [netless-app](https://github.com/netless-io/netless-app) 实现。

<p align=center>🚧 Working in Progress 🚧</p>

## 目录

- [安装](#install)
- [使用](#usage)
- [进阶](./docs)

<h2 id="install">安装</h2>

<pre class="language-bash">
npm add <b>@netless/fastboard</b> @netless/window-manager white-web-sdk react react-dom
</pre>

> **注意：**@netless/window-manager 和 white-web-sdk 是 peerDependency，如果你不清楚 peerDependency 是什么意思，可以阅读 [《为什么使用 peerDependency ？》](./docs/peer-dependency.md)。

> React **暂时**是也依赖，目前我们的 UI 库使用了它开发，所以现在我们需要安装它。将来我们会把它去掉。

<h2 id="usage">使用</h2>

### 原生 JavaScript

```js
import { createFastboard, mount } from "@netless/fastboard";

let app;
async function mountFastboard(div) {
  app = await createFastboard({
    // [1]
    sdkConfig: {
      appIdentifier: "whiteboard-appid",
    },
    // [2]
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
    },
    // [3]
    managerConfig: {
      cursor: true,
    },
  });
  return mount(app, div);
}

let dispose = mountFastboard(document.getElementById("whiteboard"));

// 卸载 app
dispose();
app.destroy();
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
npm add <b>@netless/fastboard-react</b> @netless/fastboard-core \
        @netless/window-manager white-web-sdk react react-dom
</pre>

```jsx
import { createFastboard } from "@netless/fastboard-core";
import { Fastboard } from "@netless/fastboard-react";
import ReactDOM from "react-dom";

function App() {
  const [app, setApp] = useState(null);

  useEffect(() => {
    // 在这个闭包内持有 app 实例，因为外面的 app 的最新值在这个闭包里拿不到
    let app_instance;

    createFastboard({
      sdkConfig: {
        appIdentifier: "whiteboard-appid",
      },
      joinRoom: {
        uid: "unique_id_for_each_client",
        uuid: "room-uuid",
        roomToken: "NETLESSROOM_...",
      },
    }).then(app => {
      // 修改外面的 app 状态，并且让 app_instance 持有此 app 实例
      setApp((app_instance = app));
    });

    // 组件关闭的时候，卸载 app
    return () => {
      if (app_instance) app_instance.destroy();
    };

    // 必须保证只 createFastboard 一次
  }, []);

  return <Fastboard app={app} language="zh-CN" theme="dark" />;
}

ReactDOM.render(<App />, document.getElementById("app"));
```

### 使用白板功能

#### 插入图片

```js
await app.insertImage(fileUrl);
```

其中 `fileUrl` 是该图片文件的 CDN 地址。本库并不包含任何上传、保存文件的逻辑和功能。

#### 撤销、重做

```js
app.undo();
app.redo();
```

#### 移动视角

```js
app.moveCamera({ centerX: 0, centerY: 0, scale: 1 });
app.moveCameraToContain({ originX: -300, originY: -200, width: 600, height: 400 });
```

#### 设置教具

```js
app.setAppliance("pencil");
app.setAppliance("shape", "triangle");
app.setStrokeWidth(2);
app.setStrokeColor([r, g, b]);
```

### 使用 Apps

#### 插入 PDF、PPT 和 PPTX 文档

> **注意：**插入 PPTX 需要先安装对应的包：
>
> <pre class="language-bash">
> npm add <b>@netless/app-slide</b>
> </pre>

```js
// 插入 PDF/PPT/PPTX 至主白板
const appId = await app.insertDocs("文件名.pptx", conversionResponse);
```

其中 `conversionResponse` 是 [转码](https://developer.netless.link/server-zh/home/server-conversion#get-%E6%9F%A5%E8%AF%A2%E4%BB%BB%E5%8A%A1%E8%BD%AC%E6%8D%A2%E8%BF%9B%E5%BA%A6) 结果。

#### 插入音频、视频

```js
const appId = await app.insertMedia("文件名.mp3", fileUrl);
```

其中 `fileUrl` 是该媒体文件的 CDN 地址。本库并不包含任何上传、保存文件的逻辑和功能。

#### 插入 [@netless/app-monaco](https://github.com/netless-io/netless-app/tree/master/packages/app-monaco)

```js
const appId = await app.insertCodeEditor();
```

#### 插入 [@netless/app-countdown](https://github.com/netless-io/netless-app/tree/master/packages/app-countdown)

```js
const appId = await app.insertCountdown();
```

#### 插入 [@netless/app-geogebra](https://github.com/netless-io/netless-app/tree/master/packages/app-geogebra)

```js
const appId = await app.insertGeoGebra();
```

> 更多 `app` 请看 [netless-app](#https://github.com/netless-io/netless-app)

## License

MIT @ [netless](https://github.com/netless-io)
