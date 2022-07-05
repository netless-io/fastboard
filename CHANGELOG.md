# Changelog

## Unreleased

- Added `syncedStore` api.
- Fixed incorrect UI for user-defined hotKeys.
- Fixed whiteboard may lose focus on some devices.

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
