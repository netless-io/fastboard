# appliance-plugin

该插件基于 white-web-sdk 的插件机制, 实现了一套白板的教具的绘制工具. 同时也基于 @netless/window-manager, 实现了可多窗口上使用.

## 简介

appliance-plugin, 依赖 [white-web-sdk](https://www.npmjs.com/package/white-web-sdk)、[@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager), 并基于web API对 [offscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas) 的支持.

## 原理

1. 该插件主要是基于SpriteJS的2D功能,支持 webgl2 渲染，并可向后兼容降级为 webgl 和 canvas2d
2. 该插件通过双webWorker + offscreenCanvas机制,把绘制计算+渲染逻辑都放在独立的worker线程中处理.不占用主线程的cpu任务.
3. 针对移动端有些终端不支持offscreenCanvas,则会把它放在主进程处理.

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

> **workerjs文件cdn部署**
>
>我们采用双worker并发来提高绘制效率,这样让它比主进程效率提高了40%以上.但是两个worker文件上的公共依赖都是重复的,所以如果直接构建到包中,那么会大大增加包体积.所以我们允许workerjs文件cdn部署,只要把@netless/appliance-plugin/cdn下的文件部署到cdn中即可,然后通过插件中的getInstance的第二个参数options.cdn中配置上两个workerjs的cdn地址即可.这样就可以解决包体积过大的问题.
>
> - **总包大概在400kB,两个wokerjs各有800kB.** 如果需要考虑构建的包体积大小的,请选择配置cdn.

### 接入方式参考

#### 多窗口模式(对接window-manager)
```js
import '@netless/window-manager/dist/style.css';
import '@netless/appliance-plugin/dist/style.css';
import { WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";
// 全打包
import { ApplianceMultiPlugin } from '@netless/appliance-plugin';
// 以下步骤可选, 如果走cdn,可以不用从dist中引入,如果从dist中引入,需要以资源引入并通过bolb内联形式配置到options.cdn中.如?raw,这个需要打包器的支持,vite默认支持?raw,webpack需要配置.
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
const manager = await WindowManager.mount({ room , container:elm, chessboard: true, cursor: true, supportAppliancePlugin: true});
if (manager) {
    await manager.switchMainViewToWriter();
    await ApplianceMultiPlugin.getInstance(manager,
        {
            options: {
                cdn: {
                    fullWorkerUrl,
                    subWorkerUrl,
                }
            }
        }
    );
}
```
#### 单白板(对接white-web-sdk)
```js
import { WhiteWebSdk } from "white-web-sdk";
// 全打包
import { ApplianceSinglePlugin, ApplianceSigleWrapper } from '@netless/appliance-plugin';
// 以下步骤可选, 如果走cdn,可以不用从dist中引入,如果从dist中引入,需要以资源引入并通过bolb内联形式配置到options.cdn中.如?raw,这个需要打包器的支持,vite默认支持?raw,webpack需要配置.
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
        }
    }
);
```
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

插件重新实现了一些room或windowmanager上的同名接口,但是我们内部已经通过``injectMethodToObject`` 重新注入回原来的对象中.从而外部用户无需任何改动.如以下几个:
```js
    // 内部 hack
    injectMethodToObject(windowmanager, 'undo');
    injectMethodToObject(windowmanager, 'redo');
    injectMethodToObject(windowmanager,'cleanCurrentScene');
    injectMethodToObject(windowmanager,'insertImage');
    injectMethodToObject(windowmanager,'completeImageUpload');
    injectMethodToObject(windowmanager,'lockImage');
    injectMethodToObject(room,'getImagesInformation');
    injectMethodToObject(room,'callbacks');
    injectMethodToObject(room,'screenshotToCanvasAsync');
    injectMethodToObject(room,'getBoundingRectAsync');
    injectMethodToObject(room,'scenePreviewAsync');
    injectMethodToObject(windowmanager.mainView,'setMemberState');
    // 这些我们可以通过前端日志看到调用行为,例如:
    // [ApplianceMultiPlugin] setMemberState
    // [ApplianceMultiPlugin] cleanCurrentScene
```
具体涉及以下接口:

1. room上接口
- `setMemberState`
- `undo`
- `redo`
- `callbacks`
- `insertImage`
- `lockImage`
- `completeImageUpload`
- `getImagesInformation`
- `cleanCurrentScene`

2. windowmanager上接口
- `cleanCurrentScene`
- `canUndoSteps`
- `canRedoSteps`

3. windowmanager的mainview上的接口
- `setMemberState`
- `undo`
- `redo`
- `callbacks`
- `insertImage`
- `lockImage`
- `completeImageUpload`
- `getImagesInformation`
- `cleanCurrentScene`

4. 自定义
- `getBoundingRectAsync` 替代接口 room.getBoundingRect
- `screenshotToCanvasAsync` 替代接口 room.screenshotToCanvas
- `scenePreviewAsync` 替代接口 room.scenePreview
- `fillSceneSnapshotAsync` 替代接口 room.fillSceneSnapshot
- `destroy` 销毁appliance-plugin的实例
- `addListener` 添加监听器
- `removeListener` 移除监听器

5. 不兼容
- `exportScene` appliance-plugin开启后,笔记不能按room的方式导出
- 服务端截图, appliance-plugin开启后, 笔记不能通过调用服务端截图方式获取截图,而需要改用`screenshotToCanvasAsync`获取

#### 新功能
1. 小地图功能
    ```js
    /** 创建小地图
     * @param viewId 多白板下白板ID, 主白板ID为 `mainView`, 其他白板ID为 addApp() return 的appID
     * @param div 小地图DOM容器
     */
    createMiniMap(viewId: string, div: HTMLElement): Promise<void>;
    /** 销毁小地图 */
    destroyMiniMap(viewId: string): Promise<boolean>;
    ```
2. 过滤笔记
    ```js
    /** 过滤笔记
     * @param viewId 多白板下白板ID, 主白板ID为 `mainView`, 其他白板ID为 addApp() return 的appID
     * @param filter 过滤条件
     *  render: 笔记是否能要渲染, [uid1, uid2, ...] 或 true. true, 即都会渲染, [uid1, uid2, ...] 为指定渲染的用户uid集合
     *  hide: 笔记是否隐藏, [uid1, uid2, ...] 或 true. true, 即都要隐藏, [uid1, uid2, ...] 为指定隐藏的用户uid集合
     *  clear: 笔记是否可被清除, [uid1, uid2, ...] 或 true. true, 即都可以被清除, [uid1, uid2, ...] 为指定可被清除的用户uid集合
     * @param isSync 是否同步到其他用户, 默认为true, 即会同步到其他用户
     */
    filterRenderByUid(viewId: string, filter: { render?: _ArrayTrue, hide?: _ArrayTrue, clear?: _ArrayTrue}, isSync?:boolean): void;
    /** 取消过滤笔记
     * @param viewId 多白板下白板ID, 主白板ID为 `mainView`, 其他白板ID为 addApp() return 的appID
     * @param isSync 是否同步到其他用户, 默认为true, 即会同步到其他用户. 请保持和filterRenderByUid设置的一致
     */
    cancelFilterRender(viewId: string, isSync?:boolean): void;
    ```
3. 分屏显示笔记(小白板功能),需要结合 `@netless/app-little-white-board`

4. 激光铅笔教具
    ```js
        import { EStrokeType, ApplianceNames } from '@netless/appliance-plugin';
        room.setMemberState({currentApplianceName: ApplianceNames.laserPen, strokeType: EStrokeType.Normal});
    ```

### 配置参数
``getInstance(wm: WindowManager, adaptor: ApplianceAdaptor)``
- wm: `` WindowManager\room\player``。多窗口模式下传入的是WindowManager，单窗口模式下传入的是room或者player(白板回放模式)。
- adaptor: 配置适配器.
    - options: ``AppliancePluginOptions``; 必须配置, 两个worker的cdn地址。
        ```js
            export type AppliancePluginOptions = {
                /** cdn配置项 */
                cdn: CdnOpt;
                /** 同步数据配置项 */
                syncOpt?: SyncOpt;
                /** 画布配置项 */
                canvasOpt?: CanvasOpt;
            }
        ```
    - cursorAdapter?: ``CursorAdapter``; 非必填, 单白板模式下, 配置的自定义鼠标样式。

### 前端调试介绍
对接过程中如果想了解和跟踪插件内部状态,可以通过以下几个控制台指令,查看内部数据.
```js
const applianPlugin = await ApplianceSinglePlugin.getInstance(...)
appliancePlugin.currentManager  // 可以查看到包版本号,内部状态等
appliancePlugin.currentManager.consoleWorkerInfo()  // 可以查看到worker上的绘制信息
```