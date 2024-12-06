# appliance-plugin 
 
This plugin is based on the plugin mechanism of white-web-sdk, and realizes a set of whiteboard teaching AIDS drawing tools. At the same time, it is also based on @netless/window-manager, which can be used on multiple Windows. 
 
## Introduction 
 
appliance-plugin, Depend on [white-web-SDK](https://www.npmjs.com/package/white-web-sdk), [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager), And based on web API support for [offscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas).

## Principle 
 
1. The plugin is mainly based on the 2D functionality of SpriteJS, supports webgl2 rendering, and is backward compatible with downgrades to webgl and canvas2d 
2. The plugin uses the dual webWorker+offscreenCanvas mechanism to process the drawing calculation + rendering logic in a separate worker thread. Does not occupy cpu tasks of the main thread. 
 
## Plugin usage 
 
### Install 
 
```bash 
npm install @netless/appliance-plugin 
``` 
 
### Sign up for plugins 
 
Plug-ins can support two scenarios, their access plug-in names are different:
- Multi-window 'ApplianceMultiPlugin' 
```js 
import { ApplianceMultiPlugin } from '@netless/appliance-plugin'; 
``` 
- Single whiteboard 'ApplianceSinglePlugin' 
```js 
import { ApplianceSinglePlugin } from '@netless/appliance-plugin'; 
``` 
 
> workerjs file cdn deployment
> 
> We used two-worker concurrency to improve drawing efficiency, which improved it by more than 40% over single-thread efficiency. However, the common dependencies on the two worker files are repeated, so building directly into the package will greatly increase the package size. So we allow the workerjs file cdn deployment by simply deploying the file under @netless/appliance-plugin/cdn into the cdn and then configuring the c of the last two workerjs via the second parameter of getInstance in the plug-in, options.cdn The dn address is fine. This solves the problem of excessive package size
> 
> - **The total package is about 300kB, and the two wokerjs are 600kB each** If you need to consider the size of the package you are building, select Configure cdn. 
 
### Access mode reference 
 
#### Multi-window mode (Interconnecting with window-manager) 
```js 
import '@netless/window-manager/dist/style.css'; 
import '@netless/appliance-plugin/dist/style.css'; 
import { WhiteWebSdk } from "white-web-sdk"; 
import { WindowManager } from "@netless/window-manager"; 
// All bundled
import { ApplianceMultiPlugin } from '@netless/appliance-plugin'; 
// cdn 
// The following steps are optional. If you use cdn, you do not need to import from dist. If you import from dist, you need to import resources and configure them to options.cdn in bolb inline form. Such as? raw, this requires packaging support,vite default support? raw,webpack needs to be configured.
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
// await manager.switchMainViewToWriter(); 
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
#### Single whiteboard (interconnection with white-web-sdk) 
```js 
import { WhiteWebSdk } from "white-web-sdk"; 
// All bundled
import { ApplianceSinglePlugin, ApplianceSigleWrapper } from '@netless/appliance-plugin'; 
// The following steps are optional. If you use cdn, you do not need to import from dist. If you import from dist, you need to import resources and configure them to options.cdn in bolb inline form. Such as? raw, this requires packaging support,vite default support? raw,webpack needs to be configured.
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
#### About ’?raw‘ webpack configuration
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
 
## Call introduction 

### api introduction

#### Optimize legacy interface

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
    // These we can see the call behavior through the front-end log, for example:
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
- `getBoundingRectAsync` Replace the api room.getBoundingRect
- `screenshotToCanvasAsync` Replace the api room.screenshotToCanvas
- `scenePreviewAsync` Replace the api room.scenePreview
- `destroy` Destroy the instance of appliance-plugin
- `addListener` add appliance plugin Listener
- `removeListener` remove appliance plugin Listener

5.Incompatible
- `exportScene` When the appliance-plugin is enabled, notes cannot be exported in room mode
- Server-side screenshot, after the appliance-plugin is turned on, notes cannot be obtained by calling server-side screenshot, but need to use `screenshotToCanvasAsync` to obtain the screenshot

#### New features
1. Minimap function (Version >=1.1.6)
    ```js
    /** Create a minimap
     * @param viewId ID of the whiteboard under windowManager. The ID of the main whiteboard is mainView, and the ID of other whiteboards is the appID of addApp() return
     * @param div Small map DOM container
     */
    createMiniMap(viewId: string, div: HTMLElement): Promise<void>;
    /** Destroy minimap */
    destroyMiniMap(viewId: string): Promise<void>;
    ```
2. Filter Elements (Version >=1.1.6)
    ```js
    /** Filter Elements
     * @param viewId ID of the whiteboard under windowManager. The ID of the main whiteboard is mainView, and the ID of other whiteboards is the appID of addApp() return
     * @param filter filter condition
     *  render: Whether notes can be rendered, [uid1, uid2,...] Or true. true, that is, both render, [uid1, uid2,...] The collection of user Uids rendered for the specified
     *  hide: Note is hidden, [uid1, uid2,...] Or true. true, that is to hide, [uid1, uid2,...] To specify a hidden user uid collection
     *  clear: Whether notes can be cleared, [uid1, uid2,...] Or true. true, that is, can be cleared, [uid1, uid2,...] Specifies a collection of user Uids that can be cleared
     * @param isSync Whether to synchronize data to other users. The default value is true, that is, the data will be synchronized to other users
     */
    filterRenderByUid(viewId: string, filter: { render?: _ArrayTrue, hide?: _ArrayTrue, clear?: _ArrayTrue}, isSync?:boolean): void;
    /** Filter Elements
     * @param viewId ID of the whiteboard under windowManager. The ID of the main whiteboard is mainView, and the ID of other whiteboards is the appID of addApp() return
     * @param isSync Whether to synchronize data to other users. The default value is true, that is, the data will be synchronized to other users. Keep it the same as the filterRenderByUid setting
     */
    cancelFilterRender(viewId: string, isSync?:boolean): void;
    ```
3. Split screen display Elements (little whiteboard featrue), need to combine '@netless/app-little-white-board' (Version >=1.1.3)

4. laserPen teaching aids (Version >=1.1.1)
    ```js
    import { EStrokeType, ApplianceNames } from '@netless/appliance-plugin';
    room.setMemberState({currentApplianceName: ApplianceNames.laserPen, strokeType: EStrokeType.Normal});
    ```
5. Extended Teaching AIDS (Version >=1.1.1)
    ```js
    export enum EStrokeType { 
        /** Solid line */ 
        Normal = 'Normal', 
        /** Line with pen edge */ 
        Stroke = 'Stroke', 
        /** Dotted line */ 
        Dotted = 'Dotted', 
        /** Long dotted line */ 
        LongDotted = 'LongDotted' 
    };
    export type ExtendMemberState = {
        /** The teaching AIDS selected by the current user */ 
        currentApplianceName: ApplianceNames; 
        /** Whether to open the pen tip */ 
        strokeType? : EStrokeType; 
        /** Whether to delete the entire line segment */ 
        isLine? : boolean; 
        /** Wireframe transparency */ 
        strokeOpacity? : number; 
        /** Whether to turn on laser pointer */ 
        useLaserPen? : boolean; 
        /** Laser pointer holding time, second */ 
        duration? : number; 
        /** Fill style */ 
        fillColor? : Color; 
        /** Fill transparency */ 
        fillOpacity? : number; 
        /** The specific type of graph to draw when using shape */ 
        shapeType? : ShapeType; 
        /** Number of polygon vertices */ 
        vertices? :number; 
        /** Length of the inner vertex of the polygon */ 
        innerVerticeStep? :number; 
        /** Ratio of the radius of the inner vertex of the polygon to the outer vertex */ 
        innerRatio? : number; 
        /** Text transparency */ 
        textOpacity? : number; 
        /** Text background color */ 
        textBgColor? : Color; 
        /** Text background color transparency */ 
        textBgOpacity? : number; 
        /** Location */ 
        placement? : SpeechBalloonPlacement;
    };
    import { ExtendMemberState, ApplianceNames } from '@netless/appliance-plugin';
    /** Set the state of teaching AIDS  */
    room.setMemberState({ ... } as ExtendMemberState);
    manager.mainView.setMemberState({ ... } as ExtendMemberState);
    appliance.setMemberState({ ... } as ExtendMemberState);
    ```

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
applianPlugin.CurrentManager  // can see the package version number, internal state, etc 
applianPlugin.CurrentManager.ConsoleWorkerInfo () // can check information to draw on the worker 
```