# appliance-plugin 
 
This plugin is based on the plugin mechanism of white-web-sdk, and realizes a set of whiteboard teaching AIDS drawing tools. At the same time, it is also based on @netless/window-manager, which can be used on multiple Windows. 
 
## Introduction 
 
appliance-plugin, Depend on [white-web-SDK](https://www.npmjs.com/package/white-web-sdk), [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager), And based on web API support for [offscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas).

## Principle 
 
1. appliance-plugin supports webgl2 rendering and is backward compatible with downgrades to webgl and canvas2d 
2. appliance-plugin uses the dual web worker + offscreenCanvas mechanism to process drawing and rendering logic in parallel in independent worker threads without occupying cpu tasks of the main thread. 
3. If the earlier version of the browser does not support offscreenCanvas, it will actively return to the main thread processing.

## Plugin usage 

**workerjs file cdn Deployment** 
> 
> We use dual worker concurrency to improve drawing efficiency, which makes it more than 40% more efficient than a single thread. However, the common dependencies on the two worker files are repeated, so building directly into the package will greatly increase the package size. So we allow the workerjs file cdn deployment by simply deploying the file under @netless/appliance-plugin/cdn into the cdn and then configuring the c of the last two workerjs via the second parameter of getInstance in the plug-in, options.cdn The dn address is fine. This solves the problem of excessive package size. 
> 
> - **The total package is about 300kB, and the two wokerjs each have 800kB.** If you need to consider the size of the package you are building, select the Configuration cdn.

## Call introduction 
 
### api introduction 
The plugin re-implements some of the interfaces of the same name on room or Windows Manager, but internally we have re-injected them back into the original object via injectMethodToObject. No changes are required for external users. As follows: 
```js 
// Internal hack 
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
// These we can see through the front-end log call behavior, for example: 
// [ApplianceMultiPlugin] setMemberState 
// [ApplianceMultiPlugin] cleanCurrentScene 
```
The following interfaces are involved: 
 
1. Interface on room 
- `setMemberState` 
- `undo` 
- `redo` 
- `callbacks` 
- `insertImage` 
- `lockImage` 
- `completeImageUpload` 
- `getImagesInformation` 
- `cleanCurrentScene` 
 
2. windowmanager upper interface 
- `cleanCurrentScene` 
 
3. The mainview interface of windowmanager 
- `setMemberState` 
- `undo` 
- `redo` 
- `callbacks` 
- `insertImage` 
- `lockImage` 
- `completeImageUpload` 
- `getImagesInformation` 
- `cleanCurrentScene` 
 
4. Customize 
- `getBoundingRectAsync` 
- `screenshotToCanvasAsync` 
- `scenePreviewAsync` 
- `destroy` 
 
### Configure parameters 
``getInstance(wm: WindowManager, adaptor: ApplianceAdaptor)`` 
- wm: WindowManager\room\player. In multi-window mode, you pass WindowManager, and in single-window mode, you pass room or player(whiteboard playback mode). 
- adaptor: configures the adapter. 
- options: ``AppliancePluginOptions``; The cdn addresses of both workers must be configured. 
```js 
export type AppliancePluginOptions = { 
    /** cdn Configuration item */ 
    cdn: CdnOpt; 
    /** Synchronize data configuration items */ 
    syncOpt? : SyncOpt; 
    /** Canvas configuration item */ 
    canvasOpt? : CanvasOpt; 
} 
```
- cursorAdapter? : ``CursorAdapter``; This parameter is optional. In single whiteboard mode, customize the mouse style. 
 
### Front-end debugging introduction 
During the interconnection process, if you want to understand and track the internal status of the plug-in, you can view the internal data through the following console commands. 

```js 
const applianPlugin = await ApplianceSinglePlugin.getInstance(...) 
AppliancePlugin.CurrentManager // can see the package version number,internal state, etc 
AppliancePlugin.CurrentManager.ConsoleWorkerInfo () // can check information to draw on the worker 
```
