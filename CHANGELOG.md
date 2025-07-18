# Changelog

## 1.1.0 (2025-07-07)
- update `@netless/app-slide` to `^0.2.78`.
- update `@netless/window-manager` to `^1.0.5`.

## 1.0.6 (2025-06-10)
- Added `enableAppInMainViewPlugin` in FastboardOptions to support app in mainView.
- update `@netless/app-slide` to `^0.2.73`.
- update `@netless/window-manager` to `^1.0.4`.

## 1.0.5 (2025-05-19)
- update `@netless/appliance-plugin` to `^1.1.17`.
- When turning on appliance plugin, Fastboard UI added `bitMapEraser`.

## 1.0.4 (2025-02-08)
- Fixed Fastboard UI when `floatBar:false` toolbar unable to show.

## 1.0.3 (2025-01-08)
- Fixed Fastboard UI about toolbar pencil menu. 

## 1.0.2 (2024-12-23)
- When turning on appliance plugin, Fastboard UI added `markPen`.

## 1.0.1 (2024-12-17)
- Fixed when import `@netless/fastboard-ui/full` the declaration file `full.d.ts` lost .

## 1.0.0 (2024-12-02)

- When turning on appliance plugin, Fastboard UI added `laserPen`.
- update `@netless/window-manager` to `^1.0.0`.

## 0.3.22 (2024-11-05)

- Fastboard UI color menu to support custom color from ``JoinRoomParams.floatBar.color`` .
- add `@netless/fastboard/full` or `@netless/fastboard-react/full` to import all the packages.
  > [!NOTE]
  > you must remove the `white-web-sdk` & `@netless/window-manager` & `jspdf` packages.


## 0.3.21 (2024-09-20)

- Added `enableAppliancePlugin` in FastboardOptions to support new appliance plugins.

## 0.3.16 (2024-06-26)

- Fixed `insertDocs()` to support projector's static response with `prefix` field.

## 0.3.15 (2024-04-03)

- Allow accessing `state.value` after destroying.
- Added toolbar config `collapsed` to set the default collapsed state of toolbar.
- Allow dragging from top-right corner of the window.

## 0.3.14

- Disable components on `room.phase` changed to non-`connected`.
- Added `canOperate` to test if the room is connected and writable.

## 0.3.13

- Added a <q>lite</q> version of Fastboard where `@netless/app-slide` is not registered.\
  You can save about 1.8 MB of the bundle size.
  If you do not want to use PPTX or want to load it dynamically, import `@netless/fastboard/lite` to use it.

  > [!NOTE]
  > You can set `jspdf` as an external dependency (Vite does this by default) to save another 1 MB if you do not need the export PDF function.

## 0.3.12

- Fixed an error when UI config is updated to `{ toolbar: undefined }`.

## 0.3.11

- Added toolbar config `placement: "left" | "right"` and `items: ToolbarItem[]` to further control the style of toolbar; added 2 more tools `hand` and `laserPointer` to `ToolbarItem`.
- Fixed `insertDocs()` on projector's static response not returning the correct `appId`.
- Fixed states like `camera.value` not returning the latest value when no one listens to it.

## 0.3.10

- Added method `jumpPage(index)`. Requires `@netless/window-manager` at least 0.4.63.

  > [!NOTE]
  > You can do this already in previous versions via `sceneIndex.set(index)`.

- Fixed `camera` not working after a reconnection.

## 0.3.9

- Added methods `setPencilEraserSize(size)` and `toggleDottedLine()`.
- `insertImage()` learns a new param `crossOrigin`.
- Added `ReplayFastboardUIConfig`.

## 0.3.8

- Added support for projector conversion responses in `insertDocs()`.

- Added a helper function `dispatchDocsEvent()` to make it easier to control docs apps from code.

- Fixed `fastboard-ui` CJS export not working well with `tippy.js`, this was caused by `tsup`'s `treeshake` option drops ESM behavior. While this often works well, it actually breaks the CJS export. Here's the details:

  ```js
  // old fastboard-ui/dist/index.js   (CJS export)
  var Tippy = require("tippy.js");
  Tippy.setDefaultProps({});
  ```

  ```js
  // new fastboard-ui/dist/index.js   (CJS export)
  var import_Tippy = __toESM(require("tippy.js"));
  import_Tippy.default.setDefaultProps({});
  ```

  The `tippy.js` has this CJS export:

  ```js
  // tippy.js   (CJS export)
  exports.__esModule = true;
  exports.default = Tippy;
  ```

  `__toESM` here helps to convert the input in babel convention to an ESM module, which should fix this issue.

## 0.3.7

- Added warning in `React.StrictMode`.
- Export helper functions like `addRoomListener` `addPlayerListener` `addViewListener` `addManagerListener`.

## 0.3.6

- Added `syncedStore` api.
- Fixed incorrect UI for user-defined hotKeys.
- Fixed whiteboard may lose focus on some devices.
- Fixed `createUI` type.

## 0.3.4

- Deprecated `insertCodeEditor` `insertGeoGebra` `insertCountdown` methods.
- Make `Fastboard` immutable.
- Added `removePage` api.
- Deprecated `mount`, `replay` api, introduce `createUI`, `createReplayUI` api.
- Added optional `netlessApps` config in `createFastboard`.

## 0.3.3

- Added track info in `window.__netlessUA`.
- Auto hide apps panel on click buttons on it.
- Upgraded `@netless/app-slide` to `0.2.0`.

## 0.3.2

- Re-export [`@netless/app-slide`](https://github.com/netless-io/netless-app/tree/master/packages/app-slide).
- Rename `@netless/app-media-player` to `@netless/app-plyr`.
- Update toolbar handler styles.
- Added `setTextColor` api.
- Added `config` field to the `Fastboard` component to hide controls and apps button.
- Added `apps` to control the content in apps panel.
- Added `useFastboard` and `useReplayFastboard` hooks to help calling async function in react.

## 0.3.1

- Hide controls if room is not writable, instead of making them not clickable.
- Adjust clickable area of controls.
- Fix a bug where internal reactive values might not be updated.

## 0.3.0

Rewrite the whole thing. Change UI framework to use svelte.
