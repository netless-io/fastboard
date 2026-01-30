# appliance-plugin

[English Documentation](README.md)

该插件基于 white-web-sdk 的插件机制，实现了一套功能丰富的白板教具绘制工具。同时也基于 @netless/window-manager，实现了可在多窗口上使用。

## 简介

appliance-plugin 是一个高性能的白板绘制插件，依赖 [white-web-sdk](https://www.npmjs.com/package/white-web-sdk) 和 [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager)，并基于 Web API 对 [OffscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas) 的支持。

### 主要特性

- 🎨 **丰富的绘制工具**：支持铅笔、橡皮擦、形状工具、文字、图片等多种绘制工具
- ⚡ **高性能渲染**：采用双 WebWorker + OffscreenCanvas 机制，绘制效率比主线程提升 40% 以上
- 🖼️ **多窗口支持**：支持多窗口场景，可在不同窗口上独立使用
- 🎯 **激光笔工具**：支持激光笔功能，适合演示场景
- 📝 **文字编辑**：支持文字插入、编辑、样式设置等功能
- 🗺️ **小地图功能**：提供小地图导航功能，方便查看整体内容
- 🔄 **撤销重做**：支持全局撤销重做功能
- 🎭 **自定义样式**：支持自定义画笔样式、文字样式等
- 🔌 **插件扩展**：支持通过插件机制扩展功能（如 autoDraw 手写图形自动联想）

## 原理

1. **渲染引擎**：该插件主要是基于 SpriteJS 的 2D 功能，支持 WebGL2 渲染，并可向后兼容降级为 WebGL 和 Canvas2D。
2. **多线程架构**：该插件通过双 WebWorker + OffscreenCanvas 机制，把绘制计算和渲染逻辑都放在独立的 worker 线程中处理，不占用主线程的 CPU 任务。
   - **Full Worker**：负责绘制完整数据的线程
   - **Sub Worker**：负责绘制一帧数据的线程
3. **兼容性处理**：针对移动端有些终端不支持 OffscreenCanvas，则会自动降级到主线程处理。

### 支持的绘制工具

插件支持以下绘制工具：

- **基础工具**：铅笔、橡皮擦、局部橡皮擦、位图橡皮擦、选择工具、抓手工具
- **形状工具**：直线、箭头、矩形、圆形、三角形、菱形、多边形、星形、聊天泡泡框
- **文字工具**：支持文字输入、编辑、样式设置
- **图片工具**：支持图片插入和编辑
- **特殊工具**：激光笔、背景 SVG
- **互动工具**：点击互动工具（可供插件自定义行为）

## 插件用法

### 安装

```bash
npm install @netless/appliance-plugin
```

### 注册插件

插件可以支持两种场景,它们接入插件命名不同:
- 多窗口 `ApplianceMultiPlugin`
```js
import { ApplianceMultiPlugin } from '@netless/appliance-plugin';
```
- 单白板 `ApplianceSinglePlugin`
```js
import { ApplianceSinglePlugin } from '@netless/appliance-plugin';
```

> **worker.js 文件 CDN 部署**
>
> 我们采用双 worker 并发来提高绘制效率，这样让它比主线程效率提高了 40% 以上。但是两个 worker 文件上的公共依赖都是重复的，所以如果直接构建到包中，那么会大大增加包体积。所以我们允许 worker.js 文件 CDN 部署，只要把 `@netless/appliance-plugin/cdn` 下的文件部署到 CDN 中即可，然后通过插件中的 `getInstance` 的第二个参数 `options.cdn` 中配置上两个 worker.js 的 CDN 地址即可。这样就可以解决包体积过大的问题。
>
> 如果需要考虑构建的包体积大小的，请选择配置 CDN。

### 接入方式参考

#### fastboard(直接对接fastboard)
```js

// 引入 worker.js 方式可选，如果走 CDN，可以不用从 dist 中引入。如果从 dist 中引入，需要以资源模块方式并通过 blob 内联形式配置到 options.cdn 中。如 `?raw`，这个需要打包器的支持，vite 默认支持 `?raw`，webpack 需要配置 raw-loader 或 asset/source。
import fullWorkerString from '@netless/appliance-plugin/dist/fullWorker.js?raw';
import subWorkerString from '@netless/appliance-plugin/dist/subWorker.js?raw';
const fullWorkerBlob = new Blob([fullWorkerString], {type: 'text/javascript'});
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], {type: 'text/javascript'});
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

// 对接 fastboard-react
// 全打包方式引用
// import { useFastboard, Fastboard } from "@netless/fastboard-react/full";
// 分包引用
import { useFastboard, Fastboard } from "@netless/fastboard-react";

const app = useFastboard(() => ({
    sdkConfig: {
      ...
    },
    joinRoom: {
      ...
    },
    managerConfig: {
      cursor: true,
      enableAppliancePlugin: true,
      ...
    },
    enableAppliancePlugin: {
      cdn: {
          fullWorkerUrl,
          subWorkerUrl,
      }
      ...
    }
  }));

// 对接 fastboard
// 全打包方式引用
// import { createFastboard, createUI } from "@netless/fastboard/full";
// 分包引用
import { createFastboard, createUI } from "@netless/fastboard";

const fastboard = await createFastboard({
    sdkConfig: {
      ...
    },
    joinRoom: {
      ...
    },
    managerConfig: {
      cursor: true,
      supportAppliancePlugin: true,
      ...
    },
    enableAppliancePlugin: {
      cdn: {
          fullWorkerUrl,
          subWorkerUrl,
      }
      ...
    }
  });
```

#### 多窗口(直接对接window-manager)

```js

import '@netless/window-manager/dist/style.css';
import '@netless/appliance-plugin/dist/style.css';

import { WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";
import { ApplianceMultiPlugin } from '@netless/appliance-plugin';
// 引入 worker.js 方式可选，如果走 CDN，可以不用从 dist 中引入。如果从 dist 中引入，需要以资源模块方式并通过 blob 内联形式配置到 options.cdn 中。如 `?raw`，这个需要打包器的支持，vite 默认支持 `?raw`，webpack 需要配置 raw-loader 或 asset/source。
import fullWorkerString from '@netless/appliance-plugin/dist/fullWorker.js?raw';
import subWorkerString from '@netless/appliance-plugin/dist/subWorker.js?raw';
const fullWorkerBlob = new Blob([fullWorkerString], {type: 'text/javascript'});
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], {type: 'text/javascript'});
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

const whiteWebSdk = new WhiteWebSdk(...)
const room = await whiteWebSdk.joinRoom({
    ...
    invisiblePlugins: [WindowManager, ApplianceMultiPlugin],
    useMultiViews: true, 
})
const manager = await WindowManager.mount({ room, container: elm, chessboard: true, cursor: true, supportAppliancePlugin: true});
if (manager) {
    await manager.switchMainViewToWriter();
    await ApplianceMultiPlugin.getInstance(manager,
        {
            options: {
                cdn: {
                    fullWorkerUrl,
                    subWorkerUrl,
                },
                ...
            }
        }
    );
}
```

> **注意** 项目中需要引入css文件 `import '@netless/appliance-plugin/dist/style.css';`

#### 单白板(直接对接white-web-sdk)

```js

import '@netless/appliance-plugin/dist/style.css';

import { WhiteWebSdk } from "white-web-sdk";
import { ApplianceSinglePlugin, ApplianceSigleWrapper } from '@netless/appliance-plugin';
// 引入 worker.js 方式可选，如果走 CDN，可以不用从 dist 中引入。如果从 dist 中引入，需要以资源模块方式并通过 blob 内联形式配置到 options.cdn 中。如 `?raw`，这个需要打包器的支持，vite 默认支持 `?raw`，webpack 需要配置 raw-loader 或 asset/source。
import fullWorkerString from '@netless/appliance-plugin/dist/fullWorker.js?raw';
import subWorkerString from '@netless/appliance-plugin/dist/subWorker.js?raw';
const fullWorkerBlob = new Blob([fullWorkerString], {type: 'text/javascript'});
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], {type: 'text/javascript'});
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

const whiteWebSdk = new WhiteWebSdk(...)
const room = await whiteWebSdk.joinRoom({
    ...
    invisiblePlugins: [ApplianceSinglePlugin],
    wrappedComponents: [ApplianceSigleWrapper]
})
await ApplianceSinglePlugin.getInstance(room, 
    {
        options: {
            cdn: {
                fullWorkerUrl,
                subWorkerUrl,
            }
            ...
        }
    }
);
```

> **注意** 项目中需要引入css文件 `import '@netless/appliance-plugin/dist/style.css';`

#### 关于?raw的webpack配置

```js
module: {
    rules: [
        // ...
        {
            test: /\.m?js$/,
            resourceQuery: { not: [/raw/] },
            use: [ ... ]
        },
        {
            resourceQuery: /raw/,
            type: 'asset/source',
        }
    ]
},
```

## 调用介绍

### api介绍

#### 优化原有接口

插件重新实现了一些 room 或 windowmanager 上的同名接口，但是我们内部已经通过 `injectMethodToObject` 重新注入回原来的对象中。从而外部用户无需任何改动。如以下几个：
```js
// 内部 hack
injectMethodToObject(windowmanager, 'undo');
injectMethodToObject(windowmanager, 'redo');
injectMethodToObject(windowmanager,'cleanCurrentScene');
injectMethodToObject(windowmanager,'insertImage');
injectMethodToObject(windowmanager,'completeImageUpload');
injectMethodToObject(windowmanager,'lockImage');
injectMethodToObject(windowmanager, "insertText");
injectMethodToObject(windowmanager, "updateText");
injectMethodToObject(room,'getImagesInformation');
injectMethodToObject(room,'callbacks');
injectMethodToObject(room,'screenshotToCanvasAsync');
injectMethodToObject(room,'getBoundingRectAsync');
injectMethodToObject(room,'scenePreviewAsync');
injectMethodToObject(room, "fillSceneSnapshotAsync");
injectMethodToObject(room, "setWritable");
injectMethodToObject(windowmanager.mainView,'setMemberState');
// 这些我们可以通过前端日志看到调用行为,例如:
// [ApplianceMultiPlugin] setMemberState
// [ApplianceMultiPlugin] cleanCurrentScene
```

具体涉及以下接口:

1. room上接口
- [`setMemberState`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#setmemberstate)
- [`undo`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#undo)
- [`redo`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#redo)
- [`callbacks`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#callbacks)
- [`insertImage`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#insertImage)
- [`lockImage`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#lockImage)
- [`completeImageUpload`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#completeImageUpload)
- `getImagesInformation`
- [`cleanCurrentScene`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#cleanCurrentScene)

2. WindowManager 接口
- [`cleanCurrentScene`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#cleanCurrentScene)
- [`canUndoSteps`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#canUndoSteps)
- [`canRedoSteps`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#canUndoSteps)

3. WindowManager 的 mainView 上的接口
- [`setMemberState`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#setmemberstate)
- [`undo`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#undo)
- [`redo`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#redo)
- [`callbacks`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#callbacks)
- [`insertImage`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#insertImage)
- [`lockImage`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#lockImage)
- [`completeImageUpload`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#completeImageUpload)
- `getImagesInformation`
- [`cleanCurrentScene`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#cleanCurrentScene)

4. 自定义接口
- `getBoundingRectAsync` - 替代接口 `room.getBoundingRect`
- `screenshotToCanvasAsync` - 替代接口 [room.screenshotToCanvas](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#screenshotToCanvas)
- `scenePreviewAsync` - 替代接口 [room.scenePreview](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#scenePreview)
- `fillSceneSnapshotAsync` - 替代接口 [room.fillSceneSnapshot](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#fillSceneSnapshot)
- `destroy` - 销毁 appliance-plugin 的实例
- `addListener` - 添加 appliance-plugin 内部事件监听器
- `removeListener` - 移除 appliance-plugin 内部事件监听器
- `disableDeviceInputs` - 替代接口 [room.disableDeviceInputs](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#disableDeviceInputs)
- `disableEraseImage` - 替代接口 [room.disableEraseImage](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#disableEraseImage) **该方法只禁止整体擦除的橡皮擦对图片的擦除，局部橡皮擦无效**
- `disableCameraTransform` - 替代接口 [room.disableCameraTransform](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#disableCameraTransform) (Version >=1.1.17)
- `insertText` - 在指定位置插入文字 (Version >=1.1.18)
- `updateText` - 编辑指定文字的内容 (Version >=1.1.18)
- `blurText` - 失去文本焦点 (Version >=1.1.19)
- `hasElements` - 指定场景下是否存在元素 (Version >=1.1.19)
- `getElements` - 获取场景下的所有元素 (Version >=1.1.19)
- `stopDraw` - 停止Draw事件 (Version >=1.1.19)
- `setViewLocalScenePathChange` - 设置白板本地场景路径变化 (Version >=1.1.27)
- `insertMarkmap` - 插入markdow文本到白板 (Version >=1.1.32) **该方法需要开启extras.useBackgroundThread**
- `updateMarkmap` - 修改白板中的markdow文本 (Version >=1.1.32) **该方法需要开启extras.useBackgroundThread**
- `insertBackgroundImage` - 插入白板的背景图片 (Version >=1.1.32) **该方法需要开启extras.useBackgroundThread**

5. 不兼容接口
- [`exportScene`](https://doc.shengwang.cn/api-ref/whiteboard/javascript/interfaces/room#exportScene) - appliance-plugin 开启后，笔记不能按 room 的方式导出
- [服务端截图](https://doc.shengwang.cn/doc/whiteboard/restful/fastboard-sdk/restful-wb/operations/post-v5-rooms-uuid-screenshots) - appliance-plugin 开启后，笔记不能通过调用服务端截图方式获取截图，而需要改用 `screenshotToCanvasAsync` 获取

#### 新功能
##### 激光铅笔教具 (Version >=1.1.1)
```js
import { EStrokeType, ApplianceNames } from '@netless/appliance-plugin';
room.setMemberState({currentApplianceName: ApplianceNames.laserPen, strokeType: EStrokeType.Normal});
```
![Image](https://github.com/user-attachments/assets/3cd10c3a-b17b-4c01-b9d4-868c69116d96)

##### 扩展教具 (Version >=1.1.1)
在原来的[白板教具](https://doc.shengwang.cn/api-ref/whiteboard/javascript/globals.html#memberstate)类型上,增加了一些扩展功能属性,如下:

```js
export enum EStrokeType {
    /** 实心线条 */
    Normal = 'Normal',
    /** 带笔锋线条 */
    Stroke = 'Stroke',
    /** 虚线线条 */
    Dotted = 'Dotted',
    /** 长虚线线条 */
    LongDotted = 'LongDotted'
};
export type ExtendMemberState = {
    /** 当前用户所选择的教具 */
    currentApplianceName: ApplianceNames;
    /** 是否开启笔锋 */
    strokeType?: EStrokeType;
    /** 是否删除整条线段 */
    isLine?: boolean;
    /** 线框透明度 */
    strokeOpacity?: number;
    /** 是否开启激光笔 */
    useLaserPen?: boolean;
    /** 激光笔保持时间, second */
    duration?: number;
    /** 填充样式 */
    fillColor?: Color;
    /** 填充透明度 */
    fillOpacity?: number;
    /** 使用 ``shape`` 教具时，绘制图形的具体类型 */
    shapeType?: ShapeType;
    /** 多边形顶点数 */
    vertices?:number;
    /** 多边形向内顶点步长 */
    innerVerticeStep?:number;
    /** 多边形向内顶点与外顶点半径比率 */
    innerRatio?: number;
    /** 文字透明度 */
    textOpacity?: number;
    /** 文字背景颜色  */
    textBgColor?: Color;
    /** 文字背景颜色透明度 */
    textBgOpacity?: number;
    /** 位置 */
    placement?: SpeechBalloonPlacement;
};
import { ExtendMemberState, ApplianceNames } from '@netless/appliance-plugin';
/** 设置教具状态  */
room.setMemberState({ ... } as ExtendMemberState);
manager.mainView.setMemberState({ ... } as ExtendMemberState);
appliance.setMemberState({ ... } as ExtendMemberState);
```
1. 设置笔记类型:
```js
// 实心线条
setMemberState({strokeType: EStrokeType.Normal });
// 带笔锋线条
setMemberState({strokeType: EStrokeType.Stroke });
// 虚线线条
setMemberState({strokeType: EStrokeType.Dotted });
// 长虚线线条
setMemberState({strokeType: EStrokeType.LongDotted });
```
![Image](https://github.com/user-attachments/assets/fabe4ea7-db42-4c31-a751-10df4dd82807)

2. 设置笔记、图形边框透明度(马克笔):
```js
setMemberState({strokeOpacity: 0.5 });
```
![Image](https://github.com/user-attachments/assets/1aac265d-9643-4858-bcc6-a43af94ed73e)

3. 设置文字颜色、透明度、背景颜色、透明度
```js
setMemberState({textOpacity: 0.5, textBgOpacity: 0.5, textBgColor:[0, 0, 0]});
```
![Image](https://github.com/user-attachments/assets/b59a9864-8f3f-4700-abee-2ccbe264cc86)

4. 设置图形填充色及透明度
```js
setMemberState({fillOpacity: 0.5, fillColor:[0, 0, 0]});
```
![Image](https://github.com/user-attachments/assets/468b930c-3db0-4355-87be-6b55af764799)

5. 自定义正多边形
```js
// 正五边形
setMemberState({currentApplianceName: ApplianceNames.shape, shapeType: ShapeType.Polygon, vertices: 5});
```
![Image](https://github.com/user-attachments/assets/f34540f5-d779-42f9-bb8a-91250fcfe4e1)

6. 自定义星形
```js
// 胖六角星
setMemberState({currentApplianceName: ApplianceNames.shape, shapeType: ShapeType.Star, vertices: 12, innerVerticeStep: 2, innerRatio: 0.8});
```
![Image](https://github.com/user-attachments/assets/49215362-722a-47d3-998f-cc933a2b5126)

7. 自定义泡泡框方向
```js
// 左下角提示框
setMemberState({currentApplianceName: ApplianceNames.shape, shapeType: ShapeType.SpeechBalloon, placement: 'bottomLeft'});
```
![Image](https://github.com/user-attachments/assets/6d52dedf-ca21-406d-a353-d801273b98bf)

##### 分屏显示笔记(小白板功能),需要结合[`@netless/app-little-white-board`](https://github.com/netless-io/app-little-white-board) (Version >=1.1.3)
![Image](https://github.com/user-attachments/assets/20810ea6-7d85-4e72-b75f-185599fffaf8)

##### 小地图功能 (Version >=1.1.6)
```js
/** 创建小地图
 * @param viewId 多白板下白板ID, 主白板ID为 `mainView`, 其他白板ID为 addApp() return 的appID
 * @param div 小地图DOM容器
 */
createMiniMap(viewId: string, div: HTMLElement): Promise<void>;
/** 销毁小地图 */
destroyMiniMap(viewId: string): Promise<boolean>;
```
![Image](https://github.com/user-attachments/assets/8888dc2f-ba66-4807-aa12-16530b3b8a3c)

##### 文字编辑API (Version >=1.1.18)
```js
/** 在指定位置插入文字
 * @param x 第一个字的的左侧边中点，世界坐标系中的 x 坐标
 * @param y 第一个字的的左侧边中点，世界坐标系中的 y 坐标
 * @param textContent 初始化文字的内容，不传则为空
 * @returns 该文字的标识符
 */
insertText(x: number, y: number, textContent?: string): string | undefined;

/** 编辑指定文字的内容
 * @param identifier 文字的标识符。为 insertText() 的返回值。
 * @param textContent 文字要改成的内容
 */
updateText(identifier: string, textContent: string): void;

/** 失去文本焦点 */
blurText(): void;
```

##### 元素查询API (Version >=1.1.19)
```js
/** 指定场景下是否存在元素
 * @param scenePath 场景路径, 默认取当前聚焦的场景
 * @param filter 过滤条件
 * @returns 是否存在元素
 */
hasElements(
  scenePath?: string,
  filter?: (toolsType: EToolsKey) => boolean,
): boolean;

/** 获取场景下的所有元素
 * @param scenePath 场景路径, 默认取当前聚焦的场景
 * @param filter 过滤条件
 * @returns 所有元素
 */
getElements(
  scenePath?: string,
  filter?: (toolsType: EToolsKey) => boolean,
): BaseCollectorReducerAction[];
```

##### 过滤笔记 (Version >=1.1.6)
```js
/** 过滤笔记
 * @param viewId 多白板下的白板ID, 主白板ID为 `mainView`, 其他白板ID为 addApp() return 的appID
 * @param filter 过滤条件
 *  render: 笔记是否能要渲染, [uid1, uid2, ...] 或 true. true, 即都会渲染; [uid1, uid2, ...] 为指定渲染的用户uid集合
 *  hide: 笔记是否隐藏, [uid1, uid2, ...] 或 true. true, 即都要隐藏; [uid1, uid2, ...] 为指定隐藏的用户uid集合
 *  clear: 笔记是否可被擦除, [uid1, uid2, ...] 或 true. true, 即都可以被擦除; [uid1, uid2, ...] 为指定可被擦除的用户uid集合
 * @param isSync 是否同步到白板房间中, 默认为true, 即设置会同步给所有用户
 */
filterRenderByUid(viewId: string, filter: { render?: _ArrayTrue, hide?: _ArrayTrue, clear?: _ArrayTrue}, isSync?:boolean): void;
/** 取消过滤笔记
 * @param viewId 多白板下白板ID, 主白板ID为 `mainView`, 其他白板ID为 addApp() return 的appID
 * @param isSync 是否同步到白板房间中, 默认为true, 即会同步到其他用户. 请保持和filterRenderByUid设置的一致
 */
cancelFilterRender(viewId: string, isSync?:boolean): void;
```
![Image](https://github.com/user-attachments/assets/7952ee1d-4f9c-4e86-802a-bac8e4ae6a51)

##### 设置白板本地场景路径变化 (Version >=1.1.27)
```js
/** 设置白板本地场景路径变化
 * @param viewId 多白板下白板ID, 主白板ID为 `mainView`, 其他白板ID为 addApp() return 的appID
 * @param scenePath 要设置的场景路径
 */
setViewLocalScenePathChange(viewId: string, scenePath: string): Promise<void>;
```

##### ExtrasOption自定义教具配置
1. 自定义画笔样式
    - 短虚线样式
    ```ts
    export type DottedOpt = {
        /** 虚线端点样式, square: 平头, round: 圆头, 默认值为 round */
        lineCap: "square" | "round";
        /** 虚线,单线段长度, 默认值为 1, 即单线段长度为 1 */
        segment: number;
        /** 虚线,单线段间隔, 默认值为 2, 即单线段间隔为 2 * thickness */
        gap: number;
    };
    /** 短虚线样式 */
    dottedStroke: {
        lineCap: "round",
        segment: 1,
        gap: 2,
    },
    ```
    ![Image](https://github.com/user-attachments/assets/5dc7e2bf-c285-45f0-89d2-849b4792dc7e)
    - 长虚线样式
    ```ts
    export type LongDottedOpt = {
        /** 长虚线端点样式, square: 平头, round: 圆头, 默认值为 round */
        lineCap: "square" | "round";
        /** 长虚线,单线段长度, 默认值为 1, 即单线段长度为 1 * thickness */
        segment: number;
        /** 长虚线,单线段间隔, 默认值为 2, 即单线段间隔为 2 * thickness */
        gap: number;
    };
    /** 长虚线线样式 */
    longDottedStroke: {
        lineCap: "round",
        segment: 2,
        gap: 3,
    },
    ```
    ![Image](https://github.com/user-attachments/assets/a305c1a1-b366-444a-ace6-3e0ecbf5ad19)
    - 普通画笔样式
    ```ts
    export type NormalOpt = {
        /** 端点样式, square: 平头, round: 圆头, 默认值为 round */
        lineCap: "square" | "round";
    };
    /** 普通画笔样式 */
    normalStroke: {
        lineCap: "round",
    }
    ```
    ![Image](https://github.com/user-attachments/assets/23979f81-057a-408f-8302-de228ef00b4f)

2. 文字自定义样式
```ts
export type TextEditorOpt = {
    /** 是否显示浮动栏 */
    showFloatBar?: boolean;
    /** 是否可以通过selector教具切换 */
    canSelectorSwitch?: boolean;
    /** 是否右边界自动换行 */
    rightBoundBreak?: boolean;
    /** 扩展字体列表 */
    extendFontFaces?: { fontFamily: string; src: string }[];
    /** 加载字体超时时间，单位：毫秒 */
    loadFontFacesTimeout?: number;
};
// 比如: 设置统一字体库
textEditor: {
  showFloatBar: false,
  canSelectorSwitch: false,
  rightBoundBreak: true,
  extendFontFaces: [
    {
      fontFamily: "Noto Sans SC",
      src: "https://fonts.gstatic.com/s/opensans/v44/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-mu0SC55I.woff2",
    },
  ],
  loadFontFacesTimeout: 20000,
},
```
需要结合css style实现
```css
@font-face {
    font-family: "Noto Sans SC";
    src: url("https://fonts.gstatic.com/s/opensans/v44/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-mu0SC55I.woff2")
        format("woff2");
    font-display: swap;
}
html {
    font-family: "Noto Sans SC";
}
```
    
##### 手写图形自动联想功能:`autoDraw`，需要结合[@netless/appliance-extend-auto-draw-plugin](https://www.npmjs.com/package/@netless/appliance-extend-auto-draw-plugin)
```js
export interface AutoDrawOptions {
    /** 用于访问 OpenRouter 所有模型的 API 密钥 */
    apiKey?: string;
    /** 自定义使用的模型 */
    customModel?: string;
    /** 用于渲染图标的容器 */
    container: HTMLDivElement;
    /** 渲染图标的延迟时间，默认为 2000ms */
    delay?: number;
    /**
     * 将文件上传到 OSS 服务器并返回 URL 地址，如果返回 undefined 则不会使用此功能
     * @param file 文件对象
     * @returns 图片 URL 字符串
     */
    uploadFile?: (file: File) => Promise<string | undefined>;
}
import { ApplianceMultiPlugin } from '@netless/appliance-plugin';
import { AutoDrawPlugin } from '@netless/appliance-extend-auto-draw-plugin';
const plugin = await ApplianceMultiPlugin.getInstance(...);
const autoDrawPlugin = new AutoDrawPlugin({
    container: topBarDiv,
    delay: 2000
});
plugin.usePlugin(autoDrawPlugin);
```
![Image](https://github.com/user-attachments/assets/c388691c-ae72-44ec-bbb7-e92c3a73c9c7)

##### 插入思维导图(需要markdown文本) (Version >=1.1.32)
```ts
import { ApplianceMultiPlugin } from '@netless/appliance-plugin';
const plugin = await ApplianceMultiPlugin.getInstance(manager, {
    options: {
        cdn: {...}
        extras: {
            ...,
            useBackgroundThread: true,
        }
    },
});
const markId = await plugin.insertMarkmap(viewId, {
    data: `# 一集标题
## 二级标题1
### 三级标题1
### 三级标题2
#### 四级标题1
#### 四级标题2
#### 四级标题3
## 二级标题2
### 三级标题1
### 三级标题2`,
    uuid: '唯一标识',
    centerX: 0,
    centerY: 0,
    width: 200,
    height: 200,
    locked: false,
});
plugin.updateMarkmap(viewId, markId, {
    data: `# 一集标题
## 二级标题1
## 二级标题2
### 三级标题1
### 三级标题2`,
    uuid: '唯一标识',
    centerX: 0,
    centerY: 0,
    width: 200,
    height: 200,
    locked: false,
} )

```
![Image](https://github.com/user-attachments/assets/0d278bd5-1cc7-413f-881c-8a43ef1429e3)
##### 插入背景图  (Version >=1.1.32)
```ts
import { ApplianceMultiPlugin } from '@netless/appliance-plugin';
const plugin = await ApplianceMultiPlugin.getInstance(manager, {
    options: {
        cdn: {...}
        extras: {
            ...,
            useBackgroundThread: true,
        }
    },
});
plugin.insertBackgroundImage(viewId, {
    src: 'https://example.com/background.png'
    uuid: '唯一标识',
    centerX: 0,
    centerY: 0,
    width: 200,
    height: 200,
    locked: true,
})
```

### 配置参数
`getInstance(wm: WindowManager | Room | Player, adaptor: ApplianceAdaptor)`
- `wm`: `WindowManager | Room | Player`。多窗口模式下传入的是 `WindowManager`，单窗口模式下传入的是 `Room` 或者 `Player`（白板回放模式）。
- `adaptor`: 配置适配器。
    - `options: AppliancePluginOptions` - 必须配置，其中 `cdn` 为必填项。
        ```js
        export type AppliancePluginOptions = {
            /** cdn配置项 */
            cdn: CdnOpt;
            /** 额外配置项 */
            extras?: ExtrasOptions;
        };
        export type CdnOpt = {
            /**  full worker url 地址, 绘制完整数据的线程 */
            fullWorkerUrl?: string;
            /** sub worker url 地址, 绘制一帧数据的线程 */
            subWorkerUrl?: string;
        };
        export type ExtrasOptions =  {
            /** 是否使用简单模式, 默认值为 ``false``
             * true: 简单模式:
                1、绘制将使用单worker绘制,画笔过程中无法使用贝塞尔圆滑处理。
                2、移除部分新功能:小地图、pointerPen(激光笔)、autoDraw插件。
             */
            useSimple?: boolean;
            /** 是否使用 worker, 默认值为 ``auto``
            * auto: 自动选择(如果浏览器支持 offscreenCanvas 则使用 webWorker, 否则使用主线程)
            * mainThread: 使用主线程, canvas 绘制数据。
            */
            useWorker?: UseWorkerType;
            /** 是否使用 backgroundThread, 默认值为 ``false``
             * true: 使用 backgroundThread, 可以调用 ``insertMarkmap``, ``updateMarkmap``, ``insertBackgroundImage``
             * false: 不使用 backgroundThread
             */
            useBackgroundThread?: boolean;
            /** 同步数据配置项 */
            syncOpt?: SyncOpt;
            /** 画布配置项 */
            canvasOpt?: CanvasOpt;
            /** 指针配置项 */
            cursor?: CursorOpt;
            /** 画布缓存配置项 */
            bufferSize?: BufferSizeOpt;
            /** 贝塞尔优化配置项 */
            bezier?: BezierOpt;
            /** 局部橡皮擦配置项 */
            pencilEraser?: PencilEraserOpt;
            /** 线条粗细范围配置项 */
            strokeWidth?: StrokeWidthOpt,
            /** 文字编辑器配置项 */
            textEditor?: TextEditorOpt;
            /** 撤销重做配置项 */
            undoRedo?: {
                /** 是否启用全局撤销重做, 默认值为 false (Version >=1.1.27) */
                enableGlobal?: boolean;
                /** 撤销重做最大堆栈长度, 默认值为 20 */
                maxStackLength?: number;
            };
        }
        ```
    - `cursorAdapter?: CursorAdapter` - 非必填，单白板模式下，配置的自定义鼠标样式。
    - `logger?: Logger` - 非必填，配置日志打印器对象。不填写默认在本地 console 输出，如果需要把日志上传到指定 server，则需要手动配置。
        > 如需要上传到白板日志服务器，可以把 `room.logger` 配置到该项目。

### 前端调试

对接过程中如果想了解和跟踪插件内部状态，可以通过以下几个控制台指令，查看内部数据。

```js
const appliancePlugin = await ApplianceSinglePlugin.getInstance(...)
appliancePlugin.currentManager  // 可以查看到包版本号，内部状态等
appliancePlugin.currentManager.consoleWorkerInfo()  // 可以查看到 worker 上的绘制信息
```

## 使用示例

### 基础使用示例

```js
import { ApplianceSinglePlugin } from '@netless/appliance-plugin';
import '@netless/appliance-plugin/dist/style.css';

// 方式1: 使用 CDN（推荐生产环境）
const plugin = await ApplianceSinglePlugin.getInstance(room, {
  options: {
    cdn: {
      fullWorkerUrl: 'https://your-cdn.com/fullWorker.js',
      subWorkerUrl: 'https://your-cdn.com/subWorker.js',
    },
  },
});

// 方式2: 使用本地 worker 文件（适合开发环境）
import fullWorkerString from '@netless/appliance-plugin/dist/fullWorker.js?raw';
import subWorkerString from '@netless/appliance-plugin/dist/subWorker.js?raw';
const fullWorkerBlob = new Blob([fullWorkerString], {type: 'text/javascript'});
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], {type: 'text/javascript'});
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

const plugin = await ApplianceSinglePlugin.getInstance(room, {
  options: {
    cdn: {
      fullWorkerUrl,
      subWorkerUrl,
    },
  },
});
```

### 切换绘制工具

```js
import { ApplianceNames, EStrokeType } from '@netless/appliance-plugin';

// 切换到铅笔工具
room.setMemberState({ currentApplianceName: ApplianceNames.pencil });

// 切换到矩形工具
room.setMemberState({ currentApplianceName: ApplianceNames.rectangle });

// 切换到激光笔工具
room.setMemberState({ 
  currentApplianceName: ApplianceNames.laserPen,
  strokeType: EStrokeType.Normal 
});

// 切换到文字工具
room.setMemberState({ currentApplianceName: ApplianceNames.text });
```

### 自定义样式示例

```js
// 设置画笔样式为虚线
room.setMemberState({ 
  strokeType: EStrokeType.Dotted,
  strokeOpacity: 0.8 
});

// 设置图形填充
room.setMemberState({ 
  fillColor: [255, 0, 0],  // 红色
  fillOpacity: 0.5 
});

// 设置文字样式
room.setMemberState({ 
  textOpacity: 0.9,
  textBgColor: [255, 255, 0],  // 黄色背景
  textBgOpacity: 0.3 
});
```

### 文字编辑示例

```js
// 在指定位置插入文字
const textId = plugin.insertText(100, 100, 'Hello World');

// 编辑文字内容
plugin.updateText(textId, 'Updated Text');

// 移除文字焦点
plugin.blurText();
```

### 小地图功能示例

```js
// 创建小地图
const minimapDiv = document.getElementById('minimap');
await plugin.createMiniMap('mainView', minimapDiv);

// 销毁小地图
await plugin.destroyMiniMap('mainView');
```

### 撤销重做示例

```js
// 撤销操作
const undoSteps = plugin.undo();

// 重做操作
const redoSteps = plugin.redo();

// 检查是否可以撤销/重做
const canUndo = plugin.canUndoSteps() > 0;
const canRedo = plugin.canRedoSteps() > 0;
```

## 常见问题

### 1. 如何选择合适的接入方式？

- **fastboard**：如果你使用的是 fastboard 框架，推荐使用 fastboard 的集成方式，配置最简单
- **多窗口场景**：如果需要多窗口功能，使用 `ApplianceMultiPlugin`
- **单白板场景**：如果只需要单白板功能，使用 `ApplianceSinglePlugin`

### 2. Worker 文件部署方式选择？

- **CDN 部署**（推荐）：适合生产环境，可以减少主包体积（主包约 400kB，两个 worker 各约 800kB）
- **本地打包**：适合开发环境或对包体积不敏感的场景

### 3. 性能优化建议

- 使用 CDN 部署 worker 文件，减少主包体积
- 合理配置 `bufferSize`，根据设备性能调整画布缓存大小
- 在移动端或低性能设备上，可以考虑使用 `useSimple: true` 简单模式
- 如有非必要的功能, 可以不用开启 `useBackgroundThread: true`

### 4. 兼容性说明

- 支持现代浏览器（Chrome、Firefox、Safari、Edge）
- 移动端浏览器支持情况取决于 OffscreenCanvas 支持情况
- 不支持 OffscreenCanvas 的设备会自动降级到主线程模式

## 版本历史

详细的版本更新记录请查看 [CHANGELOG.md](./CHANGELOG.md)

## 许可证

MIT License

## 相关链接

- [white-web-sdk](https://www.npmjs.com/package/white-web-sdk)
- [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager)
- [fastboard](https://github.com/netless-io/fastboard)
- [官方文档](https://doc.shengwang.cn/)


## [changelog](https://github.com/duty-os/appliance-plugin/blob/master/CHANGELOG.md)