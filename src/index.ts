import "./behaviors/style";

export type { RedoUndoProps } from "./components/RedoUndo";

export { version } from "../package.json";
export { RedoUndo } from "./components/RedoUndo";
export { Toolbar } from "./components/toolbar";

import type { WhiteboardAppConfig } from "./WhiteboardApp";

import { WhiteboardApp } from "./WhiteboardApp";

export function createWhiteboardApp(
  config: WhiteboardAppConfig
): WhiteboardApp {
  return new WhiteboardApp(config);
}
