# @netless/fastboard

## 0.2.10

### Patch Changes

- 0a79e4a: release types.
- Updated dependencies [0a79e4a]
  - @netless/fastboard-core@0.2.10
  - @netless/fastboard-react@0.2.10

## 0.2.9

### Patch Changes

- b99d989: replay mode and bug fixes.

  - fixed drawer button not hiding on shorter screen.
  - added replay mode.
  - fixed tippy not hiding on some touch-input devices.

- Updated dependencies [b99d989]
  - @netless/fastboard-core@0.2.9
  - @netless/fastboard-react@0.2.9

## 0.2.8

### Patch Changes

- d44983f: update styles and edit cdn links.
- Updated dependencies [d44983f]
  - @netless/fastboard-core@0.2.8
  - @netless/fastboard-react@0.2.8

## 0.2.7

### Patch Changes

- 9fc3bdc: apps status, `mount()` results, remember last shape and more.

  - feat: add apps status
  - refactor: change `mount()` result to `{ update(props), destroy() }`
  - refactor: switch to last shape on click toolbar button
  - refactor: remove misleading `fileType: "ppt"`
  - refactor: make `sdkConfig.region` required
  - refactor: add `appsConfig` on create

- Updated dependencies [9fc3bdc]
  - @netless/fastboard-core@0.2.7
  - @netless/fastboard-react@0.2.7

## 0.2.6

### Patch Changes

- 1790c6d: refactor: change camera bound from 0.1-10 to 0.3-3

  refactor: remember last shape

- Updated dependencies [1790c6d]
  - @netless/fastboard-core@0.2.6
  - @netless/fastboard-react@0.2.6

## 0.2.5

### Patch Changes

- ae154b1: refactor: clean current window's scene
- Updated dependencies [ae154b1]
  - @netless/fastboard-core@0.2.5
  - @netless/fastboard-react@0.2.5

## 0.2.4

### Patch Changes

- 9cd2a07: refactor: hide controls if not writable by default
- Updated dependencies [9cd2a07]
  - @netless/fastboard-core@0.2.4
  - @netless/fastboard-react@0.2.4

## 0.2.3

### Patch Changes

- eebefc0: fix: should hide mask button automatically
- Updated dependencies [eebefc0]
  - @netless/fastboard-core@0.2.3
  - @netless/fastboard-react@0.2.3

## 0.2.2

### Patch Changes

- 7831845: [5e2cb73] refactor: redo/undo bind to current window
- Updated dependencies [7831845]
  - @netless/fastboard-core@0.2.2
  - @netless/fastboard-react@0.2.2

## 0.2.1

### Patch Changes

- 3e2bce8: (core) Add player.

  (package) Move app-slide to dependencies.

  (react) Improve toolbar styles.

- Updated dependencies [3e2bce8]
  - @netless/fastboard-core@0.2.1
  - @netless/fastboard-react@0.2.1

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

### Patch Changes

- Updated dependencies [51c9f77]
  - @netless/fastboard-core@0.2.0
  - @netless/fastboard-react@1.0.0
