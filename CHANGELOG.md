# Changelog

## Unreleased

- Added a helper function `dispatchDocsEvent()` to make it easier to control docs apps from code.

- Fixed `fastboard-ui` CJS export not working well with `tippy.js`, this was caused by `tsup`'s `treeshake` option drops ESM behavior. While this often works well, it actually breaks the CJS export. Here's the details:

  ```js
  // old fastboard-ui/dist/index.js   (CJS export)
  var Tippy = require('tippy.js')
  Tippy.setDefaultProps({})
  ```

  ```js
  // new fastboard-ui/dist/index.js   (CJS export)
  var import_Tippy = __toESM(require('tippy.js'))
  import_Tippy.default.setDefaultProps({})
  ```

  The `tippy.js` has this CJS export:

  ```js
  // tippy.js   (CJS export)
  exports.__esModule = true
  exports.default = Tippy
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
