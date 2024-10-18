# appliance-plugin

该插件基于 white-web-sdk 的插件机制, 实现了一套白板的教具的绘制工具. 同时也基于 @netless/window-manager, 实现了可多窗口上使用.

## 简介

appliance-plugin, 依赖 [white-web-sdk](https://www.npmjs.com/package/white-web-sdk)、[@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager), 并基于web API对 [offscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas) 的支持.

## 原理

1. appliance-plugin 支持 webgl2 渲染，并可向后兼容降级为 webgl 和 canvas2d
2. appliance-plugin 通过 双web worker + offscreenCanvas机制, 把绘制渲染逻辑都放在独立的worker线程中并行处理, 不占用主线程的cpu任务.
3. 针对低版本浏览器中不支持 offscreenCanvas , 则会主动回归到主线程处理.

> **workerjs文件cdn部署**
>
>我们采用双worker并发来提高绘制效率,这样让它比单线程效率提高了40%以上.但是两个worker文件上的公共依赖都是重复的,所以如果直接构建到包中,那么会大大增加包体积.所以我们允许workerjs文件cdn部署,只要把@netless/appliance-plugin/cdn下的文件部署到cdn中即可,然后通过插件中的getInstance的第二个参数options.cdn中配置上两个workerjs的cdn地址即可.这样就可以解决包体积过大的问题.
>
> - **总包大概在300kB,两个wokerjs各有600kB.** 如果需要考虑构建的包体积大小的,请选择配置cdn.

## 调用介绍

### api介绍
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
- `getBoundingRectAsync`
- `screenshotToCanvasAsync`
- `scenePreviewAsync`
- `destroy`

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