## Fastboard 迁移指南

之前使用 white-web-sdk 编写白板应用的，可以参考本文迁移到 Fastboard 中。**如果你以前没有用过 white-web-sdk，无需阅读本文，请看 [README](../README-zh.md)。**

### 新功能

Fastboard 相比 white-web-sdk 提供的主要新功能包括：

- [多窗口模式](https://github.com/netless-io/window-manager)
- [自定义互动应用 Netless App](https://github.com/netless-io/netless-app)
  - 基于此功能制作的一些官方 App，包括 PDF/PPT 预览、同步音视频播放器等

### 重大变化

- [进入房间与显示白板](#进入房间与显示白板)
- [退出房间](#退出房间)
- [新增/切换页面](#新增切换页面)
- [切换工具/教具、设置线宽、颜色等](#切换工具教具设置线宽颜色等)
- [插入图片](#插入图片)
- [打开 PPT](#打开-pptpdf)
- [打开音视频](#打开音视频)

#### 进入房间与显示白板

以前的 white-web-sdk 进入房间的流程是：

```js
import { WhiteWebSdk } from "white-web-sdk";
// 初始化 SDK
let sdk = new WhiteWebSdk({
  appIdentifier: "whiteboard-appid",
  region: "cn-hz",
});
// 进入房间
let room = await sdk.joinRoom({
  uid: "unique_id_for_each_client",
  uuid: "room-uuid",
  roomToken: "NETLESSROOM_...",
});
// 渲染白板
room.bindHtmlElement(document.getElementById("whiteboard"));
```

在 Fastboard 中如下：

```js
import { createFastboard, createUI } from "@netless/fastboard";
let fastboard = await createFastboard({
  sdkConfig: {
    appIdentifier: "whiteboard-appid",
    region: "cn-hz",
  },
  joinRoom: {
    uid: "unique_id_for_each_client",
    uuid: "room-uuid",
    roomToken: "NETLESSROOM_...",
  },
});
let ui = createUI(fastboard, document.getElementById("whiteboard"));
```

与原先只有一个白板不同，Fastboard 还内置了一套 UI 组件，你可以通过上面 `createUI` 返回的 `ui`
变量来控制 ui 上各个组件的显示与隐藏，具体用法请看 [API](./api.md)。

#### 退出房间

在 white-web-sdk 中需要调用 `room.disconnect()` 退出房间：

```js
// 退出房间
await room.disconnect();
```

在 Fastboard 中，你需要分别关闭 UI 和退出房间：

```js
ui.destroy();
await fastboard.destroy();
```

#### 新增/切换页面

white-web-sdk 中场景 (Scene) 树的概念比较复杂，而且在树形数据结构中的<q>上下页</q>比较难懂，因此 Fastboard 中将其简化成了一维的页面 (Page) 接口：

```js
// 在当前位置后新增一页
fastboard.addPage({ after: true });
// 切到新增的那页
fastboard.nextPage();
// 删除当前页
fastboard.removePage();
```

原始的接口还允许设置背景图 / PPT 资源，在 Fastboard 中已经去除该功能，请参考[基于 Netless App 的 PPT 查看方式](#打开-pptpdf)。

#### 切换工具/教具、设置线宽、颜色等

将一个 `setMemberState` 接口拆成多个原子化的小接口，更简单。

```js
room.setMemberState({ currentApplianceName: "pencil" });
room.setMemberState({ currentApplianceName: "shape", shapeType: "triangle" });
room.setMemberState({ strokeWidth: 1, strokeColor: [255, 0, 0] });
```

在 Fastboard 中如下：

```js
fastboard.setAppliance("pencil");
fastboard.setAppliance("shape", "triangle");
fastboard.setStrokeWidth(1);
fastboard.setStrokeColor([255, 0, 0]);
```

#### 插入图片

white-web-sdk 的插入图片需要调用两个接口，用法比较复杂：

```js
// 准备插入图片到指定位置（此时还没有要输入图片 URL，可以看作 "正在上传"）
room.insertImage({ uuid, centerX, centerY, width, height, locked: false });
// 上传完毕，设置图片 URL
room.completeImageUpload(uuid, url);
```

Fastboard 中将其简化为：

```js
fastboard.insertImage(url);
```

图片的位置信息会自动计算到当前视角，并且会尝试插入到最适合阅读和批注的位置。

#### 打开 PPT/PDF

white-web-sdk 中 PPT 是通过插入场景接口实现的，实践中我们发现这在以下场景中不方便使用：

- 同时打开多个课件
- PDF 文件更适合以连续滚动而不是翻页的方式阅读

在 Fastboard 中 PPT / PDF 都是通过 Netless App 呈现的。使用接口如下：

```js
fastboard.insertDocs(title, response);
// 例如
fastboard.insertDocs("hello.pdf", {
  uuid: "",
  type: "dynamic",
  status: "Finished",
  failedReason: "",
  progress: {
    /* ... */
  },
});
```

其中 `response` 参数就是[白板转码服务](https://developer.netless.link/server-zh/home/server-conversion#get-%E6%9F%A5%E8%AF%A2%E4%BB%BB%E5%8A%A1%E8%BD%AC%E6%8D%A2%E8%BF%9B%E5%BA%A6)的返回结果。

#### 打开音视频

```js
fastboard.insertMedia(title, url);
// 例如
fastboard.insertMedia("hello.mp3", "https://example.org/hello.mp3");
```
