# appliance-plugin 

This plugin is based on the plugin mechanism of white-web-sdk, and implements a set of whiteboard teaching aids drawing tools. It is also based on @netless/window-manager, enabling usage across multiple windows. 
 
## Introduction 
 
appliance-plugin depends on [white-web-sdk](https://www.npmjs.com/package/white-web-sdk) and [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager), and is based on web API support for [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas).

## Principle 

1. The plugin is mainly based on the 2D functionality of SpriteJS, supports WebGL2 rendering, and is backward compatible with downgrades to WebGL and Canvas2D.
2. The plugin uses a dual WebWorker + OffscreenCanvas mechanism to process drawing calculations and rendering logic in a separate worker thread, which does not occupy CPU tasks of the main thread.
3. For mobile devices that do not support OffscreenCanvas, the plugin will process it in the main thread.
 
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
> **Worker.js file CDN deployment**
> 
> We use two-worker concurrency to improve drawing efficiency, which improves it by more than 40% over single-thread efficiency. However, the common dependencies in the two worker files are repeated, so building directly into the package will greatly increase the package size. Therefore, we allow worker.js file CDN deployment by simply deploying the files under `@netless/appliance-plugin/cdn` to your CDN, and then configuring the two worker.js CDN addresses via the second parameter `options.cdn` of `getInstance` in the plugin. This solves the problem of excessive package size.
> 
> - **The total package is about 400kB, and the two worker.js files are 800kB each.** If you need to consider the size of the package you are building, please configure CDN. 
 
### Access mode reference 

#### fastboard(interconnection with fastboard)
```js
// The method of importing worker.js is optional. If CDN is used, it does not need to be imported from dist. If importing from dist, it needs to be configured into options.cdn in the form of a resource module and blob inline. For example, '?raw' requires bundler support. Vite supports '?raw' by default, while webpack needs to configure raw-loader or asset/source.
import fullWorkerString from '@netless/appliance-plugin/dist/fullWorker.js?raw';
import subWorkerString from '@netless/appliance-plugin/dist/subWorker.js?raw';
const fullWorkerBlob = new Blob([fullWorkerString], {type: 'text/javascript'});
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], {type: 'text/javascript'});
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

// interconnection with fastboard-react
// Full package mode reference
// import { useFastboard, Fastboard } from "@netless/fastboard-react/full";
// Subcontract reference
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

// interconnection with fastboard
// Full package mode reference
// import { createFastboard, createUI } from "@netless/fastboard/full";
// Subcontract reference
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

#### Multi-window (Interconnecting with window-manager)
```js 
import '@netless/window-manager/dist/style.css'; 
import '@netless/appliance-plugin/dist/style.css'; 
import { WhiteWebSdk } from "white-web-sdk"; 
import { WindowManager } from "@netless/window-manager"; 
import { ApplianceMultiPlugin } from '@netless/appliance-plugin'; 
// The method of importing worker.js is optional. If CDN is used, it does not need to be imported from dist. If importing from dist, it needs to be configured into options.cdn in the form of a resource module and blob inline. For example, '?raw' requires bundler support. Vite supports '?raw' by default, while webpack needs to configure raw-loader or asset/source.
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
> **Note** the css file `import '@netless/appliance-plugin/dist/style.css'` needs to be imported into the project;

#### Single whiteboard (interconnection with white-web-sdk) 
```js 
import { WhiteWebSdk } from "white-web-sdk"; 
import { ApplianceSinglePlugin, ApplianceSigleWrapper } from '@netless/appliance-plugin'; 
// The method of importing worker.js is optional. If CDN is used, it does not need to be imported from dist. If importing from dist, it needs to be configured into options.cdn in the form of a resource module and blob inline. For example, '?raw' requires bundler support. Vite supports '?raw' by default, while webpack needs to configure raw-loader or asset/source.
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
> **Note** the css file `import '@netless/appliance-plugin/dist/style.css'` needs to be imported into the project;

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
 
## Introduction to the Calling Method

### api introduction

#### Optimize legacy interface

The plugin re-implements some interfaces with the same names on room or WindowManager, but internally we have re-injected them back into the original object via `injectMethodToObject`. No changes are required for external users. As follows:
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
 
2. WindowManager interface 
- `cleanCurrentScene`
- `canUndoSteps`
- `canRedoSteps` 
 
3. WindowManager mainView interface 
- `setMemberState` 
- `undo` 
- `redo` 
- `callbacks` 
- `insertImage` 
- `lockImage` 
- `completeImageUpload` 
- `getImagesInformation` 
- `cleanCurrentScene` 
 
4. Custom interfaces
- `getBoundingRectAsync` - Replaces the API `room.getBoundingRect`
- `screenshotToCanvasAsync` - Replaces the API `room.screenshotToCanvas`
- `scenePreviewAsync` - Replaces the API `room.scenePreview`
- `fillSceneSnapshotAsync` - Replaces the API `room.fillSceneSnapshot`
- `destroy` - Destroys the instance of appliance-plugin
- `addListener` - Adds appliance plugin listener
- `removeListener` - Removes appliance plugin listener
- `disableDeviceInputs` - Replaces the API `room.disableDeviceInputs`
- `disableEraseImage` - Replaces the API `room.disableEraseImage` **This method only prevents the overall eraser from erasing images, and the local eraser is not affected**
- `disableCameraTransform` - Replaces the API `room.disableCameraTransform` (Version >=1.1.17)
- `insertText` - Inserts text at the specified position (Version >=1.1.18)
- `updateText` - Edits the content of the specified text (Version >=1.1.18)
- `blurText` - Removes text focus (Version >=1.1.19)
- `hasElements` - Checks if elements exist in the specified scene (Version >=1.1.19)
- `getElements` - Gets all elements in the scene (Version >=1.1.19)
- `stopDraw` - Stops Draw event (Version >=1.1.19)
- `setViewLocalScenePathChange` - Sets the local scene path change of the whiteboard (Version >=1.1.27)

5. Incompatible interfaces
- `exportScene` - When the appliance-plugin is enabled, notes cannot be exported in room mode
- Server-side screenshot - After the appliance-plugin is turned on, notes cannot be obtained by calling server-side screenshot, but need to use `screenshotToCanvasAsync` to obtain the screenshot

#### New features
##### Laser pen teaching aid (Version >=1.1.1)
```js
import { EStrokeType, ApplianceNames } from '@netless/appliance-plugin';
room.setMemberState({currentApplianceName: ApplianceNames.laserPen, strokeType: EStrokeType.Normal});
```
![Image](https://github.com/user-attachments/assets/3cd10c3a-b17b-4c01-b9d4-868c69116d96)

##### Extended teaching aids (Version >=1.1.1)
Based on the original [whiteboard teaching aids](https://doc.shengwang.cn/api-ref/whiteboard/javascript/globals.html#memberstate) types, some extended functional properties have been added, as follows:

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
        /** The teaching aids selected by the current user */ 
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
/** Set the state of teaching aids  */
room.setMemberState({ ... } as ExtendMemberState);
manager.mainView.setMemberState({ ... } as ExtendMemberState);
appliance.setMemberState({ ... } as ExtendMemberState);
```
1. Set stroke type:
```js
// Solid line
setMemberState({strokeType: EStrokeType.Normal });
// Line with pen edge
setMemberState({strokeType: EStrokeType.Stroke });
// Dotted line
setMemberState({strokeType: EStrokeType.Dotted });
// Long dotted line
setMemberState({strokeType: EStrokeType.LongDotted });
```
![Image](https://github.com/user-attachments/assets/fabe4ea7-db42-4c31-a751-10df4dd82807)

2. Set stroke and shape border opacity (marker):
```js
setMemberState({strokeOpacity: 0.5 });
```
![Image](https://github.com/user-attachments/assets/1aac265d-9643-4858-bcc6-a43af94ed73e)

3. Set text color, text opacity, text background color, text background opacity
```js
setMemberState({textOpacity: 0.5, textBgOpacity: 0.5, textBgColor:[0, 0, 0]});
```
![Image](https://github.com/user-attachments/assets/b59a9864-8f3f-4700-abee-2ccbe264cc86)

4. Set shape fill color and fill opacity
```js
setMemberState({fillOpacity: 0.5, fillColor:[0, 0, 0]});
```
![Image](https://github.com/user-attachments/assets/468b930c-3db0-4355-87be-6b55af764799)

5. Custom regular polygon
```js
// regular pentagon
setMemberState({currentApplianceName: ApplianceNames.shape, shapeType: ShapeType.Polygon, vertices: 5});
```
![Image](https://github.com/user-attachments/assets/f34540f5-d779-42f9-bb8a-91250fcfe4e1)

6. Custom star shape
```js
// fat hexagonal star
setMemberState({currentApplianceName: ApplianceNames.shape, shapeType: ShapeType.Star, vertices: 12, innerVerticeStep: 2, innerRatio: 0.8});
```
![Image](https://github.com/user-attachments/assets/49215362-722a-47d3-998f-cc933a2b5126)

7. Customize the placement of the speechballoon
```js
// The dialog box in the lower left corner
setMemberState({currentApplianceName: ApplianceNames.shape, shapeType: ShapeType.SpeechBalloon, placement: 'bottomLeft'});
```
![Image](https://github.com/user-attachments/assets/6d52dedf-ca21-406d-a353-d801273b98bf)

##### Split screen display notes (little whiteboard feature), need to combine [`@netless/app-little-white-board`](https://github.com/netless-io/app-little-white-board) (Version >=1.1.3)
![Image](https://github.com/user-attachments/assets/20810ea6-7d85-4e72-b75f-185599fffaf8)

##### Minimap function (Version >=1.1.6)
```js
/** Create a minimap
 * @param viewId ID of the whiteboard under windowManager. The ID of the main whiteboard is mainView, and the ID of other whiteboards is the appID of addApp() return
 * @param div Small map DOM container
 */
createMiniMap(viewId: string, div: HTMLElement): Promise<void>;
/** Destroy minimap */
destroyMiniMap(viewId: string): Promise<boolean>;
```
![Image](https://github.com/user-attachments/assets/8888dc2f-ba66-4807-aa12-16530b3b8a3c)

##### Text editing API (Version >=1.1.18)
```js
/** Insert text at the specified position
 * @param x The x coordinate of the midpoint of the left edge of the first character in the world coordinate system
 * @param y The y coordinate of the midpoint of the left edge of the first character in the world coordinate system
 * @param textContent The initial text content, empty if not provided
 * @returns The identifier of the text
 */
insertText(x: number, y: number, textContent?: string): string | undefined;

/** Edit the content of the specified text
 * @param identifier The identifier of the text. It is the return value of insertText().
 * @param textContent The content to change the text to
 */
updateText(identifier: string, textContent: string): void;

/** Remove text focus */
blurText(): void;
```

##### Element query API (Version >=1.1.19)
```js
/** Check if elements exist in the specified scene
 * @param scenePath Scene path, defaults to the currently focused scene
 * @param filter Filter condition
 * @returns Whether elements exist
 */
hasElements(
  scenePath?: string,
  filter?: (toolsType: EToolsKey) => boolean,
): boolean;

/** Get all elements in the scene
 * @param scenePath Scene path, defaults to the currently focused scene
 * @param filter Filter condition
 * @returns All elements
 */
getElements(
  scenePath?: string,
  filter?: (toolsType: EToolsKey) => boolean,
): BaseCollectorReducerAction[];
```

##### Filter notes (Version >=1.1.6)
```js
/** Filter notes
 * @param viewId ID of the whiteboard under windowManager. The ID of the main whiteboard is mainView, and the ID of other whiteboards is the appID of addApp() return
 * @param filter filter condition
 *  render: Whether notes can be rendered, [uid1, uid2, ...] or true. true, that is, all will be rendered; [uid1, uid2, ...] is the set of user uids specified for rendering
 *  hide: Whether notes are hidden, [uid1, uid2, ...] or true. true, that is, all will be hidden; [uid1, uid2, ...] is the set of user uids specified for hiding
 *  clear: Whether notes can be erased, [uid1, uid2, ...] or true. true, that is, all can be erased; [uid1, uid2, ...] is the set of user uids specified for erasing
 * @param isSync Whether to synchronize to the whiteboard room, default is true, that is, the setting will be synchronized to all users
 */
filterRenderByUid(viewId: string, filter: { render?: _ArrayTrue, hide?: _ArrayTrue, clear?: _ArrayTrue}, isSync?:boolean): void;
/** Cancel filter notes
 * @param viewId ID of the whiteboard under windowManager. The ID of the main whiteboard is mainView, and the ID of other whiteboards is the appID of addApp() return
 * @param isSync Whether to synchronize to the whiteboard room, default is true, that is, it will be synchronized to other users. Please keep it consistent with the filterRenderByUid setting
 */
cancelFilterRender(viewId: string, isSync?:boolean): void;
```
![Image](https://github.com/user-attachments/assets/7952ee1d-4f9c-4e86-802a-bac8e4ae6a51)

##### Set whiteboard local scene path change (Version >=1.1.27)
```js
/** Set whiteboard local scene path change
 * @param viewId ID of the whiteboard under windowManager. The ID of the main whiteboard is mainView, and the ID of other whiteboards is the appID of addApp() return
 * @param scenePath The scene path to set
 */
setViewLocalScenePathChange(viewId: string, scenePath: string): Promise<void>;
```

##### ExtrasOption custom tool configuration
1. Custom Pen Styles
    - Dotted Stroke Style
    ```ts
    export type DottedOpt = {
        /** Line cap style for dotted line, square: square cap, round: round cap, default value is round */
        lineCap: "square" | "round";
        /** Dotted line, single segment length, default value is 1, i.e., single segment length is 1 */
        segment: number;
        /** Dotted line, single segment gap, default value is 2, i.e., single segment gap is 2 * thickness */
        gap: number;
    };
    /** Dotted stroke style */
    dottedStroke: {
        lineCap: "round",
        segment: 1,
        gap: 2,
    },
    ```
    ![Image](https://github.com/user-attachments/assets/5dc7e2bf-c285-45f0-89d2-849b4792dc7e)
    - Long Dotted Stroke Style
    ```ts
    export type LongDottedOpt = {
        /** Line cap style for long dotted line, square: square cap, round: round cap, default value is round */
        lineCap: "square" | "round";
        /** Long dotted line, single segment length, default value is 1, i.e., single segment length is 1 * thickness */
        segment: number;
        /** Long dotted line, single segment gap, default value is 2, i.e., single segment gap is 2 * thickness */
        gap: number;
    };
    /** Long dotted stroke style */
    longDottedStroke: {
        lineCap: "round",
        segment: 2,
        gap: 3,
    },
    ```
    ![Image](https://github.com/user-attachments/assets/a305c1a1-b366-444a-ace6-3e0ecbf5ad19)
    - Normal Pen Style
    ```ts
    export type NormalOpt = {
        /** Line cap style, square: square cap, round: round cap, default value is round */
        lineCap: "square" | "round";
    };
    /** Normal pen style */
    normalStroke: {
        lineCap: "round",
    }
    ```
    ![Image](https://github.com/user-attachments/assets/23979f81-057a-408f-8302-de228ef00b4f)

2. Text Custom Style
```ts
export type TextEditorOpt = {
    /** Whether to show the floating bar */
    showFloatBar?: boolean;
    /** Whether it can be switched by selector tool */
    canSelectorSwitch?: boolean;
    /** Whether to automatically wrap at the right boundary */
    rightBoundBreak?: boolean;
    /** Extended font list */
    extendFontFaces?: { fontFamily: string; src: string }[];
    /** Font loading timeout, unit: milliseconds */
    loadFontFacesTimeout?: number;
};
// For example: Set unified font library
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
Need to be combined with CSS style implementation
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

#### Handwriting graphics automatic association function: `autoDraw`, need to combine [@netless/appliance-extend-auto-draw-plugin](https://www.npmjs.com/package/@netless/appliance-extend-auto-draw-plugin)
```js
export interface AutoDrawOptions {
    /** API key for accessing all models of OpenRouter */
    apiKey?: string;
    /** Custom model to use */
    customModel?: string;
    /** Container for rendering icons */
    container: HTMLDivElement;
    /** Delay time for rendering icons, default is 2000ms */
    delay?: number;
    /**
     * Upload file to OSS server and return URL address, if returns undefined then this function will not be used
     * @param file File object
     * @returns Image URL string
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

### Configuration parameters 
`getInstance(wm: WindowManager | Room | Player, adaptor: ApplianceAdaptor)` 
- `wm`: `WindowManager | Room | Player`. In multi-window mode, pass `WindowManager`. In single-window mode, pass `Room` or `Player` (whiteboard playback mode). 
- `adaptor`: Configures the adapter. 
    - `options: AppliancePluginOptions` - Must be configured, where `cdn` is a required field.
        ```js 
            export type AppliancePluginOptions = { 
                /** cdn configuration item */ 
                cdn: CdnOpt; 
                /** Additional configuration items */
                extras?: ExtrasOptions;
            };
            export type CdnOpt = {
                /**  full worker url Address, the thread for drawing complete data */
                fullWorkerUrl?: string;
                /** sub worker url Address, the thread that draws a frame of data */
                subWorkerUrl?: string;
            };
            export type ExtrasOptions =  {
                /** Whether to use simple mode, default value is ``false`` 
                 * true: Simple mode:
                    1. Drawing will use a single worker, and Bezier smoothing cannot be used during pen drawing.
                    2. Remove some new features: minimap, pointerPen (laser pointer), autoDraw plugin.
                 */
                useSimple: boolean;
                /** Whether to use worker, the default value is 'auto'
                * auto: Automatic selection (Use webWorker if your browser supports offscreenCanvas; otherwise, use the main thread) 
                * mainThread: Use the main thread, canvas, to draw data. 
                */ 
                useWorker? : UseWorkerType; 
                /** Synchronize data configuration items */ 
                syncOpt? : SyncOpt; 
                /** Canvas Configuration item */ 
                canvasOpt? : CanvasOpt; 
                /** Pointer configuration item */ 
                cursor? : CursorOpt; 
                /** Canvas cache configuration item */ 
                bufferSize? : BufferSizeOpt; 
                /** Bezier Optimization Configuration items */ 
                bezier? : BezierOpt; 
                /** Local eraser configuration item */ 
                pencilEraser? : PencilEraserOpt; 
                /** Line thickness range configuration item */ 
                strokeWidth? : StrokeWidthOpt, 
                /** Text Editor configuration item */ 
                textEditor? : TextEditorOpt;
                /** Undo/Redo configuration item */ 
                undoRedo?: {
                    /** Whether to enable global undo/redo, default value is false (Version >=1.1.27) */
                    enableGlobal?: boolean;
                    /** Maximum stack length for undo/redo, default value is 20 */
                    maxStackLength?: number;
                };
            }
        ```
    - `cursorAdapter?: CursorAdapter` - Optional. In single whiteboard mode, customize the mouse style.
    - `logger?: Logger` - Optional. Configure the log printer object. The default output is on the local console. If logs need to be uploaded to the specified server, you need to manually configure it.
        > If you need to upload the log to the whiteboard log server, configure `room.logger` to this item.

## Front-end debugging 
During the integration process, if you want to understand and track the internal status of the plugin, you can view the internal data through the following console commands. 

```js 
const appliancePlugin = await ApplianceSinglePlugin.getInstance(...) 
appliancePlugin.currentManager  // can see the package version number, internal state, etc 
appliancePlugin.currentManager.consoleWorkerInfo()  // can check information to draw on the worker 
```