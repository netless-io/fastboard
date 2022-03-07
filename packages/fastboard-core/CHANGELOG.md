# @netless/fastboard

## 0.2.9

### Patch Changes

- b99d989: replay mode and bug fixes.

  - fixed drawer button not hiding on shorter screen.
  - added replay mode.
  - fixed tippy not hiding on some touch-input devices.

## 0.2.8

### Patch Changes

- d44983f: update styles and edit cdn links.

## 0.2.7

### Patch Changes

- 9fc3bdc: apps status, `mount()` results, remember last shape and more.

  - feat: add apps status
  - refactor: change `mount()` result to `{ update(props), destroy() }`
  - refactor: switch to last shape on click toolbar button
  - refactor: remove misleading `fileType: "ppt"`
  - refactor: make `sdkConfig.region` required
  - refactor: add `appsConfig` on create

## 0.2.6

### Patch Changes

- 1790c6d: refactor: change camera bound from 0.1-10 to 0.3-3

  refactor: remember last shape

## 0.2.5

### Patch Changes

- ae154b1: refactor: clean current window's scene

## 0.2.4

### Patch Changes

- 9cd2a07: refactor: hide controls if not writable by default

## 0.2.3

### Patch Changes

- eebefc0: fix: should hide mask button automatically

## 0.2.2

### Patch Changes

- 7831845: [5e2cb73] refactor: redo/undo bind to current window

## 0.2.1

### Patch Changes

- 3e2bce8: (core) Add player.

  (package) Move app-slide to dependencies.

  (react) Improve toolbar styles.

## 0.2.0

### Minor Changes

- 51c9f77: Move fastboard to fastboard-core, export a new fastboard package which does everything.

  Example usage:

  ```ts
  import { createFastboard, mount } from "@netless/fastboard";

  const app = await createFastboard({ ...config });
  mount(app, document.getElementById("whiteboard"));
  ```

  It still depends on `react`, but surely we will migrate to svelte in some time.

## 0.1.1

### Patch Changes

- 117e415: forwardRef, fix themes and add sceneIndex stuff (to be refactored).

## 0.1.0

### Minor Changes

- c44b259: API almost ready.
