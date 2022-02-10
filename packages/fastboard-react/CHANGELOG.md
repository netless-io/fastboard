# @netless/fastboard-react

## 0.2.6

### Patch Changes

- 1790c6d: refactor: change camera bound from 0.1-10 to 0.3-3

  refactor: remember last shape

- Updated dependencies [1790c6d]
  - @netless/fastboard-core@0.2.6

## 0.2.5

### Patch Changes

- ae154b1: refactor: clean current window's scene
- Updated dependencies [ae154b1]
  - @netless/fastboard-core@0.2.5

## 0.2.4

### Patch Changes

- 9cd2a07: refactor: hide controls if not writable by default
- Updated dependencies [9cd2a07]
  - @netless/fastboard-core@0.2.4

## 0.2.3

### Patch Changes

- eebefc0: fix: should hide mask button automatically
- Updated dependencies [eebefc0]
  - @netless/fastboard-core@0.2.3

## 0.2.2

### Patch Changes

- 7831845: [5e2cb73] refactor: redo/undo bind to current window
- Updated dependencies [7831845]
  - @netless/fastboard-core@0.2.2

## 0.2.1

### Patch Changes

- 3e2bce8: (core) Add player.

  (package) Move app-slide to dependencies.

  (react) Improve toolbar styles.

- Updated dependencies [3e2bce8]
  - @netless/fastboard-core@0.2.1

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

## 0.1.1

### Patch Changes

- 117e415: forwardRef, fix themes and add sceneIndex stuff (to be refactored).
- Updated dependencies [117e415]
  - @netless/fastboard@0.1.1

## 0.1.0

### Minor Changes

- c44b259: API almost ready.
