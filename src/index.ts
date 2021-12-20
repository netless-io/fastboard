import "./behaviors/style";
import "./internal/register-apps";

export type { RedoUndoProps } from "./components/RedoUndo";
export type { PageControlProps } from "./components/PageControl";
export type { ZoomControlProps } from "./components/ZoomControl";
export type { ToolbarProps } from "./components/Toolbar";

export { version } from "../package.json";
export { RedoUndo } from "./components/RedoUndo";
export { PageControl } from "./components/PageControl";
export { ZoomControl } from "./components/ZoomControl";
export { Toolbar } from "./components/Toolbar";

import type { WhiteboardAppConfig } from "./internal";
import { WhiteboardApp } from "./WhiteboardApp";

export type { WhiteboardAppConfig };
export { WhiteboardApp };

export function createWhiteboardApp(
  config: WhiteboardAppConfig
): WhiteboardApp {
  return new WhiteboardApp(config);
}
