# appliance-plugin

[中文文档](https://github.com/netless-io/fastboard/blob/main/docs/zh/appliance-plugin.md)

This plugin is based on the plugin mechanism of white-web-sdk, and realizes a set of whiteboard teaching AIDS drawing tools. At the same time, it is also based on @netless/window-manager, which can be used on multiple Windows.

## Introduction

appliance-plugin is a high-performance whiteboard drawing plugin that depends on [white-web-sdk](https://www.npmjs.com/package/white-web-sdk) and [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager), and is based on Web API support for [OffscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas).

### Key Features

- 🎨 **Rich Drawing Tools**: Supports pencil, eraser, shape tools, text, images, and more
- ⚡ **High Performance Rendering**: Uses dual WebWorker + OffscreenCanvas mechanism, improving drawing efficiency by more than 40% compared to the main thread
- 🖼️ **Multi-window Support**: Supports multi-window scenarios, can be used independently on different windows
- 🎯 **Laser Pen Tool**: Supports laser pen functionality, suitable for presentation scenarios
- 📝 **Text Editing**: Supports text insertion, editing, and style settings
- 🗺️ **Minimap Function**: Provides minimap navigation for viewing overall content
- 🔄 **Undo/Redo**: Supports global undo/redo functionality
- 🎭 **Custom Styles**: Supports custom brush styles, text styles, etc.
- 🔌 **Plugin Extension**: Supports extending functionality through plugin mechanism (e.g., autoDraw handwriting graphics auto-association)

## Principle

1. **Rendering Engine**: The plugin is mainly based on SpriteJS's 2D functionality, supports WebGL2 rendering, and is backward compatible with downgrades to WebGL and Canvas2D.
2. **Multi-threaded Architecture**: The plugin uses the dual WebWorker + OffscreenCanvas mechanism to process drawing calculations and rendering logic in independent worker threads, not occupying the CPU tasks of the main thread.
   - **Full Worker**: Thread responsible for drawing complete data
   - **Sub Worker**: Thread responsible for drawing one frame of data
3. **Compatibility Handling**: For mobile terminals that do not support OffscreenCanvas, it will automatically downgrade to main thread processing.

### Supported Drawing Tools

The plugin supports the following drawing tools:

- **Basic Tools**: Pencil, eraser, partial eraser, bitmap eraser, selector tool, hand tool
- **Shape Tools**: Straight line, arrow, rectangle, circle, triangle, diamond, polygon, star, speech balloon
- **Text Tool**: Supports text input, editing, and style settings
- **Image Tool**: Supports image insertion and editing
- **Special Tools**: Laser pen, background SVG
- **Interactive Tools**: Click interactive tool (for plugin custom behavior)

## Plugin usage

### Install

```bash
npm install @netless/appliance-plugin
```

### Register Plugin

Plugins can support two scenarios, they have different plugin names:
- Multi-window `ApplianceMultiPlugin`
```js
import { ApplianceMultiPlugin } from '@netless/appliance-plugin';
```
- Single whiteboard `ApplianceSinglePlugin`
```js
import { ApplianceSinglePlugin } from '@netless/appliance-plugin';
```

> **worker.js file CDN deployment**
>
> We use dual worker concurrency to improve drawing efficiency, which makes it more than 40% more efficient than the main thread. However, the common dependencies on the two worker files are duplicated, so if we build them directly into the package, it will greatly increase the package size. So we allow worker.js files to be deployed via CDN. Just deploy the files under `@netless/appliance-plugin/cdn` to the CDN, and then configure the CDN addresses of the two worker.js files in the second parameter `options.cdn` of `getInstance` in the plugin. This solves the problem of excessive package size.
>
> **The total package is about 400kB, and the two worker.js files are 800kB each.** If you need to consider the size of the build package, please choose to configure CDN.

### Access Mode Reference

#### fastboard (Direct integration with fastboard)
```js

// The method of importing worker.js is optional. If using CDN, you don't need to import from dist. If importing from dist, you need to configure it into options.cdn in the form of a resource module and blob inline. Such as `?raw`, this requires packer support. Vite supports `?raw` by default, webpack needs to configure raw-loader or asset/source.
import fullWorkerString from '@netless/appliance-plugin/dist/fullWorker.js?raw';
import subWorkerString from '@netless/appliance-plugin/dist/subWorker.js?raw';
const fullWorkerBlob = new Blob([fullWorkerString], {type: 'text/javascript'});
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], {type: 'text/javascript'});
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

// Integration with fastboard-react
// Full package mode reference
// import { useFastboard, Fastboard } from "@netless/fastboard-react/full";
// Subpackage reference
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

// Integration with fastboard
// Full package mode reference
// import { createFastboard, createUI } from "@netless/fastboard/full";
// Subpackage reference
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

#### Multi-window (Direct integration with window-manager)

```js

import '@netless/window-manager/dist/style.css';
import '@netless/appliance-plugin/dist/style.css';

import { WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";
import { ApplianceMultiPlugin } from '@netless/appliance-plugin';
// The method of importing worker.js is optional. If using CDN, you don't need to import from dist. If importing from dist, you need to configure it into options.cdn in the form of a resource module and blob inline. Such as `?raw`, this requires packer support. Vite supports `?raw` by default, webpack needs to configure raw-loader or asset/source.
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

> **Note** The project needs to import the CSS file `import '@netless/appliance-plugin/dist/style.css';`

#### Single whiteboard (Direct integration with white-web-sdk)

```js

import '@netless/appliance-plugin/dist/style.css';

import { WhiteWebSdk } from "white-web-sdk";
import { ApplianceSinglePlugin, ApplianceSigleWrapper } from '@netless/appliance-plugin';
// The method of importing worker.js is optional. If using CDN, you don't need to import from dist. If importing from dist, you need to configure it into options.cdn in the form of a resource module and blob inline. Such as `?raw`, this requires packer support. Vite supports `?raw` by default, webpack needs to configure raw-loader or asset/source.
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

> **Note** The project needs to import the CSS file `import '@netless/appliance-plugin/dist/style.css';`

#### About ?raw webpack configuration

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

## API Introduction

#### Optimize Original Interfaces

The plugin re-implements some interfaces with the same name on room or windowmanager, but we have internally re-injected them back into the original object through `injectMethodToObject`. Therefore, external users do not need to make any changes. As follows:
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

1. Interfaces on room
- [`setMemberState`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#setmemberstate)
- [`undo`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#undo)
- [`redo`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#redo)
- [`callbacks`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#callbacks)
- [`insertImage`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#insertimage)
- [`lockImage`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#lockimage)
- [`completeImageUpload`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#completeimageupload)
- `getImagesInformation`
- [`cleanCurrentScene`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#cleancurrentscene)

2. WindowManager interfaces
- [`cleanCurrentScene`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#cleancurrentscene)
- [`canUndoSteps`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#canundosteps)
- [`canRedoSteps`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#canredosteps)

3. Interfaces on WindowManager's mainView
- [`setMemberState`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#setmemberstate)
- [`undo`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#undo)
- [`redo`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#redo)
- [`callbacks`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#callbacks)
- [`insertImage`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#insertimage)
- [`lockImage`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#lockimage)
- [`completeImageUpload`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#completeimageupload)
- `getImagesInformation`
- [`cleanCurrentScene`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#cleancurrentscene)

4. Custom interfaces
- `getBoundingRectAsync` - Replace interface `room.getBoundingRect`
- `screenshotToCanvasAsync` - Replace interface [room.screenshotToCanvasAsync](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#screenshottocanvasasync)
- `scenePreviewAsync` - Replace interface [room.scenePreview](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#scenepreview)
- `fillSceneSnapshotAsync` - Replace interface [room.fillSceneSnapshot](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#fillscenesnapshot)
- `destroy` - Destroy the instance of appliance-plugin
- `addListener` - Add appliance-plugin internal event listener
- `removeListener` - Remove appliance-plugin internal event listener
- `disableDeviceInputs` - Replace interface [room.disableDeviceInputs](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#disabledeviceinputs)
- `disableEraseImage` - Replace interface [room.disableEraseImage](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#disableeraseimage) **This method only prohibits the eraser that erases the entire image from erasing images, partial eraser is invalid**
- `disableCameraTransform` - Replace interface [room.disableCameraTransform](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#disablecameratransform) (Version >=1.1.17)
- `insertText` - Insert text at the specified position (Version >=1.1.18)
- `updateText` - Edit the content of the specified text (Version >=1.1.18)
- `blurText` - Remove text focus (Version >=1.1.19)
- `hasElements` - Check if there are elements in the specified scene (Version >=1.1.19)
- `getElements` - Get all elements in the specified scene (Version >=1.1.19)
- `stopDraw` - Stop Draw event (Version >=1.1.19)
- `setViewLocalScenePathChange` - Set the local scene path change for the whiteboard view (Version >=1.1.27)
- `insertMarkmap` - Insert markdown text to whiteboard (Version >=1.1.32) **This method requires enabling extras.useBackgroundThread**
- `updateMarkmap` - Update markdown text in whiteboard (Version >=1.1.32) **This method requires enabling extras.useBackgroundThread**
- `insertBackgroundImage` - Insert whiteboard background image (Version >=1.1.32) **This method requires enabling extras.useBackgroundThread**

5. Incompatible interfaces
- [`exportScene`](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/interfaces/room.html#exportscene) - After appliance-plugin is enabled, notes cannot be exported in room mode
- [Server-side screenshot](https://docs.agora.io/en/interactive-whiteboard/reference/whiteboard-api/screenshots?platform=web#screenshot-a-scene-post) - After appliance-plugin is enabled, notes cannot be obtained by calling server-side screenshot, but need to use `screenshotToCanvasAsync` to obtain the screenshot

#### New Features
##### Laser Pen Tool (Version >=1.1.1)
```js
import { EStrokeType, ApplianceNames } from '@netless/appliance-plugin';
room.setMemberState({currentApplianceName: ApplianceNames.laserPen, strokeType: EStrokeType.Normal});
```
![Image](https://github.com/user-attachments/assets/3cd10c3a-b17b-4c01-b9d4-868c69116d96)

##### Extended Tools (Version >=1.1.1)
On the original [whiteboard tools](https://api-ref.agora.io/en/interactive-whiteboard-sdk/web/2.x/globals.html#memberstate) type, some extended function attributes have been added, as follows:

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
    /** The tool selected by the current user */
    currentApplianceName: ApplianceNames;
    /** Whether to enable pen edge */
    strokeType?: EStrokeType;
    /** Whether to delete the entire line segment */
    isLine?: boolean;
    /** Stroke transparency */
    strokeOpacity?: number;
    /** Whether to enable laser pointer */
    useLaserPen?: boolean;
    /** Laser pointer holding time, second */
    duration?: number;
    /** Fill style */
    fillColor?: Color;
    /** Fill transparency */
    fillOpacity?: number;
    /** The specific type of graph to draw when using ``shape`` tool */
    shapeType?: ShapeType;
    /** Number of polygon vertices */
    vertices?:number;
    /** Inner vertex step length of polygon */
    innerVerticeStep?:number;
    /** Ratio of inner vertex radius to outer vertex radius of polygon */
    innerRatio?: number;
    /** Text transparency */
    textOpacity?: number;
    /** Text background color  */
    textBgColor?: Color;
    /** Text background color transparency */
    textBgOpacity?: number;
    /** Placement */
    placement?: SpeechBalloonPlacement;
};
import { ExtendMemberState, ApplianceNames } from '@netless/appliance-plugin';
/** Set tool state  */
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

3. Set text color, opacity, background color, and opacity
```js
setMemberState({textOpacity: 0.5, textBgOpacity: 0.5, textBgColor:[0, 0, 0]});
```
![Image](https://github.com/user-attachments/assets/b59a9864-8f3f-4700-abee-2ccbe264cc86)

4. Set shape fill color and opacity
```js
setMemberState({fillOpacity: 0.5, fillColor:[0, 0, 0]});
```
![Image](https://github.com/user-attachments/assets/468b930c-3db0-4355-87be-6b55af764799)

5. Custom regular polygon
```js
// Regular pentagon
setMemberState({currentApplianceName: ApplianceNames.shape, shapeType: ShapeType.Polygon, vertices: 5});
```
![Image](https://github.com/user-attachments/assets/f34540f5-d779-42f9-bb8a-91250fcfe4e1)

6. Custom star shape
```js
// Fat hexagonal star
setMemberState({currentApplianceName: ApplianceNames.shape, shapeType: ShapeType.Star, vertices: 12, innerVerticeStep: 2, innerRatio: 0.8});
```
![Image](https://github.com/user-attachments/assets/49215362-722a-47d3-998f-cc933a2b5126)

7. Custom speech balloon placement
```js
// Speech balloon in the lower left corner
setMemberState({currentApplianceName: ApplianceNames.shape, shapeType: ShapeType.SpeechBalloon, placement: 'bottomLeft'});
```
![Image](https://github.com/user-attachments/assets/6d52dedf-ca21-406d-a353-d801273b98bf)

##### Split screen display notes (little whiteboard feature), need to combine [`@netless/app-little-white-board`](https://github.com/netless-io/app-little-white-board) (Version >=1.1.3)
![Image](https://github.com/user-attachments/assets/20810ea6-7d85-4e72-b75f-185599fffaf8)

##### Minimap function (Version >=1.1.6)
```js
/** Create a minimap
 * @param viewId ID of the whiteboard under multi-whiteboard, the main whiteboard ID is `mainView`, other whiteboard IDs are the appID returned by addApp()
 * @param div Minimap DOM container
 */
createMiniMap(viewId: string, div: HTMLElement): Promise<void>;
/** Destroy minimap */
destroyMiniMap(viewId: string): Promise<boolean>;
```
![Image](https://github.com/user-attachments/assets/8888dc2f-ba66-4807-aa12-16530b3b8a3c)

##### Text editing API (Version >=1.1.18)
```js
/** Insert text at the specified position
 * @param x The x coordinate of the left edge midpoint of the first character in the world coordinate system
 * @param y The y coordinate of the left edge midpoint of the first character in the world coordinate system
 * @param textContent Initial text content, empty if not provided
 * @returns The identifier of the text
 */
insertText(x: number, y: number, textContent?: string): string | undefined;

/** Edit the content of the specified text
 * @param identifier The identifier of the text, returned by insertText()
 * @param textContent The new content of the text
 */
updateText(identifier: string, textContent: string): void;

/** Remove text focus */
blurText(): void;
```

##### Element query API (Version >=1.1.19)
```js
/** Check if there are elements in the specified scene
 * @param scenePath Scene path, defaults to the currently focused scene
 * @param filter Filter condition
 * @returns Whether elements exist
 */
hasElements(
  scenePath?: string,
  filter?: (toolsType: EToolsKey) => boolean,
): boolean;

/** Get all elements in the specified scene
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
 * @param viewId ID of the whiteboard under multi-whiteboard, the main whiteboard ID is `mainView`, other whiteboard IDs are the appID returned by addApp()
 * @param filter Filter condition
 *  render: Whether notes can be rendered, [uid1, uid2, ...] or true. true means all will be rendered; [uid1, uid2, ...] is the specified set of user uids to render
 *  hide: Whether notes are hidden, [uid1, uid2, ...] or true. true means all will be hidden; [uid1, uid2, ...] is the specified set of user uids to hide
 *  clear: Whether notes can be erased, [uid1, uid2, ...] or true. true means all can be erased; [uid1, uid2, ...] is the specified set of user uids that can be erased
 * @param isSync Whether to synchronize to the whiteboard room, default is true, meaning the setting will be synchronized to all users
 */
filterRenderByUid(viewId: string, filter: { render?: _ArrayTrue, hide?: _ArrayTrue, clear?: _ArrayTrue}, isSync?:boolean): void;
/** Cancel filter notes
 * @param viewId ID of the whiteboard under multi-whiteboard, the main whiteboard ID is `mainView`, other whiteboard IDs are the appID returned by addApp()
 * @param isSync Whether to synchronize to the whiteboard room, default is true, meaning it will be synchronized to other users. Please keep it consistent with the filterRenderByUid setting
 */
cancelFilterRender(viewId: string, isSync?:boolean): void;
```
![Image](https://github.com/user-attachments/assets/7952ee1d-4f9c-4e86-802a-bac8e4ae6a51)

##### Set whiteboard local scene path change (Version >=1.1.27)
```js
/** Set whiteboard local scene path change
 * @param viewId ID of the whiteboard under multi-whiteboard, the main whiteboard ID is `mainView`, other whiteboard IDs are the appID returned by addApp()
 * @param scenePath The scene path to set
 */
setViewLocalScenePathChange(viewId: string, scenePath: string): Promise<void>;
```

##### ExtrasOption custom tool configuration
1. Custom stroke styles
    - Short dotted line style
    ```ts
    export type DottedOpt = {
        /** Dotted line endpoint style, square: flat, round: round, default is round */
        lineCap: "square" | "round";
        /** Dotted line, single segment length, default is 1, meaning single segment length is 1 */
        segment: number;
        /** Dotted line, single segment gap, default is 2, meaning single segment gap is 2 * thickness */
        gap: number;
    };
    /** Short dotted line style */
    dottedStroke: {
        lineCap: "round",
        segment: 1,
        gap: 2,
    },
    ```
    ![Image](https://github.com/user-attachments/assets/5dc7e2bf-c285-45f0-89d2-849b4792dc7e)
    - Long dotted line style
    ```ts
    export type LongDottedOpt = {
        /** Long dotted line endpoint style, square: flat, round: round, default is round */
        lineCap: "square" | "round";
        /** Long dotted line, single segment length, default is 1, meaning single segment length is 1 * thickness */
        segment: number;
        /** Long dotted line, single segment gap, default is 2, meaning single segment gap is 2 * thickness */
        gap: number;
    };
    /** Long dotted line style */
    longDottedStroke: {
        lineCap: "round",
        segment: 2,
        gap: 3,
    },
    ```
    ![Image](https://github.com/user-attachments/assets/a305c1a1-b366-444a-ace6-3e0ecbf5ad19)
    - Normal stroke style
    ```ts
    export type NormalOpt = {
        /** Endpoint style, square: flat, round: round, default is round */
        lineCap: "square" | "round";
    };
    /** Normal stroke style */
    normalStroke: {
        lineCap: "round",
    }
    ```
    ![Image](https://github.com/user-attachments/assets/23979f81-057a-408f-8302-de228ef00b4f)

2. Text custom styles
```ts
export type TextEditorOpt = {
    /** Whether to show float bar */
    showFloatBar?: boolean;
    /** Whether can switch by selector tool */
    canSelectorSwitch?: boolean;
    /** Whether right boundary auto wrap */
    rightBoundBreak?: boolean;
    /** Extended font list */
    extendFontFaces?: { fontFamily: string; src: string }[];
    /** Font loading timeout, unit: milliseconds */
    loadFontFacesTimeout?: number;
};
// For example: set unified font library
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
Need to combine CSS style implementation
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

##### Insert Mind Map (requires markdown text) (Version >=1.1.32)
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
    data: `# First Level Title
## Second Level Title 1
### Third Level Title 1
### Third Level Title 2
#### Fourth Level Title 1
#### Fourth Level Title 2
#### Fourth Level Title 3
## Second Level Title 2
### Third Level Title 1
### Third Level Title 2`,
    uuid: 'unique identifier',
    centerX: 0,
    centerY: 0,
    width: 200,
    height: 200,
    locked: false,
});
plugin.updateMarkmap(viewId, markId, {
    data: `# First Level Title
## Second Level Title 1
## Second Level Title 2
### Third Level Title 1
### Third Level Title 2`,
    uuid: 'unique identifier',
    centerX: 0,
    centerY: 0,
    width: 200,
    height: 200,
    locked: false,
} )

```
![Image](https://github.com/user-attachments/assets/0d278bd5-1cc7-413f-881c-8a43ef1429e3)
##### Insert Background Image (Version >=1.1.32)
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
    uuid: 'unique identifier',
    centerX: 0,
    centerY: 0,
    width: 200,
    height: 200,
    locked: true,
})
```

##### Handwriting graphics automatic association function:`autoDraw`, need to combine [@netless/appliance-extend-auto-draw-plugin](https://www.npmjs.com/package/@netless/appliance-extend-auto-draw-plugin)
```js
export interface AutoDrawOptions {
    /** API key for accessing all OpenRouter models */
    apiKey?: string;
    /** Custom model to use */
    customModel?: string;
    /** Container for rendering icons */
    container: HTMLDivElement;
    /** Delay time for rendering icons, default is 2000ms */
    delay?: number;
    /**
     * Upload file to OSS server and return URL address, if returns undefined then this feature will not be used
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

<!-- 9. Handwriting graphics automatic association function: 'autoDraw' (version >=1.1.7)
    ```js
    export type AutoDrawOptions = {
        /** Automatically associate rest api addresses */
        hostServer: string;
        /** A container that holds a list of associated icons */
        container: HTMLDivElement;
        /** How long does the drawing end start activating the association */
        delay?: number;
    };
    import { ApplianceMultiPlugin, AutoDrawPlugin } from '@netless/appliance-plugin';
    const plugin = await ApplianceMultiPlugin.getInstance(...);
    const autoDrawPlugin = new AutoDrawPlugin({
        container: topBarDiv,
        hostServer: 'https://autodraw-white-backup-hk-hkxykbfofr.cn-hongkong.fcapp.run',
        delay: 2000
    });
    plugin.usePlugin(autoDrawPlugin);
    ```
    ![Image](https://github.com/user-attachments/assets/c388691c-ae72-44ec-bbb7-e92c3a73c9c7) -->

### Configuration Parameters
`getInstance(wm: WindowManager | Room | Player, adaptor: ApplianceAdaptor)`
- `wm`: `WindowManager | Room | Player`. In multi-window mode, pass `WindowManager`, in single-window mode, pass `Room` or `Player` (whiteboard playback mode).
- `adaptor`: Configuration adapter.
    - `options: AppliancePluginOptions` - Must be configured, where `cdn` is required.
        ```js
        export type AppliancePluginOptions = {
            /** CDN configuration item */
            cdn: CdnOpt;
            /** Additional configuration items */
            extras?: ExtrasOptions;
        };
        export type CdnOpt = {
            /** Full worker URL address, thread for drawing complete data */
            fullWorkerUrl?: string;
            /** Sub worker URL address, thread for drawing one frame of data */
            subWorkerUrl?: string;
        };
        export type ExtrasOptions =  {
            /** Whether to use simple mode, default value is ``false``
             * true: Simple mode:
                1. Drawing will use single worker, bezier smoothing cannot be used during drawing.
                2. Remove some new features: minimap, pointerPen (laser pen), autoDraw plugin.
             */
            useSimple: boolean;
            /** Whether to use worker, default value is ``auto``
            * auto: Automatically select (use webWorker if browser supports offscreenCanvas, otherwise use main thread)
            * mainThread: Use main thread, canvas drawing data.
            */
            useWorker?: UseWorkerType;
            /** Whether to use backgroundThread, default value is ``false``
             * true: Use backgroundThread, can call ``insertMarkmap``, ``updateMarkmap``, ``insertBackgroundImage``
             * false: Do not use backgroundThread
             */
            useBackgroundThread?: boolean;
            /** Synchronization data configuration item */
            syncOpt?: SyncOpt;
            /** Canvas configuration item */
            canvasOpt?: CanvasOpt;
            /** Pointer configuration item */
            cursor?: CursorOpt;
            /** Canvas cache configuration item */
            bufferSize?: BufferSizeOpt;
            /** Bezier optimization configuration item */
            bezier?: BezierOpt;
            /** Partial eraser configuration item */
            pencilEraser?: PencilEraserOpt;
            /** Stroke width range configuration item */
            strokeWidth?: StrokeWidthOpt,
            /** Text editor configuration item */
            textEditor?: TextEditorOpt;
            /** Undo redo configuration item */
            undoRedo?: {
                /** Whether to enable global undo redo, default value is false (Version >=1.1.27) */
                enableGlobal?: boolean;
                /** Maximum stack length for undo redo, default value is 20 */
                maxStackLength?: number;
            };
        }
        ```
    - `cursorAdapter?: CursorAdapter` - Optional, in single whiteboard mode, configure custom mouse style.
    - `logger?: Logger` - Optional, configure log printer object. If not provided, defaults to local console output. If logs need to be uploaded to a specified server, manual configuration is required.
        > If you need to upload to the whiteboard log server, you can configure `room.logger` to this item.

### Front-end Debugging
During the integration process, if you want to understand and track the internal status of the plugin, you can view internal data through the following console commands.
```js
const appliancePlugin = await ApplianceSinglePlugin.getInstance(...)
appliancePlugin.currentManager  // Can view package version number, internal status, etc.
appliancePlugin.currentManager.consoleWorkerInfo()  // Can view drawing information on worker
```

## Usage Examples

### Basic Usage Example

```js
import { ApplianceSinglePlugin } from '@netless/appliance-plugin';
import '@netless/appliance-plugin/dist/style.css';

// Method 1: Using CDN (recommended for production)
const plugin = await ApplianceSinglePlugin.getInstance(room, {
  options: {
    cdn: {
      fullWorkerUrl: 'https://your-cdn.com/fullWorker.js',
      subWorkerUrl: 'https://your-cdn.com/subWorker.js',
    },
  },
});

// Method 2: Using local worker files (suitable for development)
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

### Switch Drawing Tools

```js
import { ApplianceNames, EStrokeType } from '@netless/appliance-plugin';

// Switch to pencil tool
room.setMemberState({ currentApplianceName: ApplianceNames.pencil });

// Switch to rectangle tool
room.setMemberState({ currentApplianceName: ApplianceNames.rectangle });

// Switch to laser pen tool
room.setMemberState({ 
  currentApplianceName: ApplianceNames.laserPen,
  strokeType: EStrokeType.Normal 
});

// Switch to text tool
room.setMemberState({ currentApplianceName: ApplianceNames.text });
```

### Custom Style Example

```js
// Set brush style to dotted line
room.setMemberState({ 
  strokeType: EStrokeType.Dotted,
  strokeOpacity: 0.8 
});

// Set shape fill
room.setMemberState({ 
  fillColor: [255, 0, 0],  // Red
  fillOpacity: 0.5 
});

// Set text style
room.setMemberState({ 
  textOpacity: 0.9,
  textBgColor: [255, 255, 0],  // Yellow background
  textBgOpacity: 0.3 
});
```

### Text Editing Example

```js
// Insert text at specified position
const textId = plugin.insertText(100, 100, 'Hello World');

// Edit text content
plugin.updateText(textId, 'Updated Text');

// Remove text focus
plugin.blurText();
```

### Minimap Function Example

```js
// Create minimap
const minimapDiv = document.getElementById('minimap');
await plugin.createMiniMap('mainView', minimapDiv);

// Destroy minimap
await plugin.destroyMiniMap('mainView');
```

### Undo/Redo Example

```js
// Undo operation
const undoSteps = plugin.undo();

// Redo operation
const redoSteps = plugin.redo();

// Check if undo/redo is possible
const canUndo = plugin.canUndoSteps() > 0;
const canRedo = plugin.canRedoSteps() > 0;
```

## FAQ

### 1. How to choose the right integration method?

- **fastboard**: If you are using the fastboard framework, it is recommended to use fastboard's integration method, which has the simplest configuration
- **Multi-window scenario**: If you need multi-window functionality, use `ApplianceMultiPlugin`
- **Single whiteboard scenario**: If you only need single whiteboard functionality, use `ApplianceSinglePlugin`

### 2. Worker file deployment method selection?

- **CDN deployment** (recommended): Suitable for production environments, can reduce main package size (main package ~400kB, two workers ~800kB each)
- **Local packaging**: Suitable for development environments or scenarios where package size is not a concern

### 3. Performance optimization recommendations

- Use CDN deployment for worker files to reduce main package size
- Reasonably configure `bufferSize` to adjust canvas cache size according to device performance
- On mobile or low-performance devices, consider using `useSimple: true` simple mode
- If there are unnecessary features, you can avoid enabling `useBackgroundThread: true`

### 4. Compatibility notes

- Supports modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browser support depends on OffscreenCanvas support
- Devices that do not support OffscreenCanvas will automatically downgrade to main thread mode

## Version History

For detailed version update records, please refer to [CHANGELOG.md](./CHANGELOG.md)

## License

MIT License

## Related Links

- [white-web-sdk](https://www.npmjs.com/package/white-web-sdk)
- [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager)
- [fastboard](https://github.com/netless-io/fastboard)
- [Official Documentation](https://doc.shengwang.cn/)
