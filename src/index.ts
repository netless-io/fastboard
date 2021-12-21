import "./behaviors/register-apps";
import "./behaviors/style";

import { WhiteboardApp, type WhiteboardAppConfig } from "./WhiteboardApp";

export { version } from "../package.json";
export { PageControl, type PageControlProps } from "./components/PageControl";
export { RedoUndo, type RedoUndoProps } from "./components/RedoUndo";
export { Toolbar, type ToolbarProps } from "./components/Toolbar";
export { ZoomControl, type ZoomControlProps } from "./components/ZoomControl";
export * from "./WhiteboardApp";

export function createWhiteboardApp(
  config: WhiteboardAppConfig
): WhiteboardApp {
  return new WhiteboardApp(config);
}
