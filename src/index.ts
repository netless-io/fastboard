import { WindowManager } from "@netless/window-manager";

import "./behaviors/register-apps";
import "./behaviors/style";

import { WhiteboardApp, type WhiteboardAppConfig } from "./WhiteboardApp";

export { version } from "../package.json";
export {
  PageControl,
  usePageControl,
  type PageControlProps,
} from "./components/PageControl";
export {
  RedoUndo,
  useRedoUndo,
  type RedoUndoProps,
} from "./components/RedoUndo";
export { Toolbar, useToolbar, type ToolbarProps } from "./components/Toolbar";
export {
  ZoomControl,
  useZoomControl,
  type ZoomControlProps,
} from "./components/ZoomControl";
export {
  PlayerControl,
  usePlayerControl,
  type PlayerControlProps,
} from "./components/PlayerControl";
export {};

export * from "./WhiteboardApp";
export * from "./react";

export const register = WindowManager.register.bind(WindowManager);

/**
 * @example
 * let app = await createWhiteboardApp(config)
 * app.bindElement(el)
 */
export async function createWhiteboardApp(
  config: WhiteboardAppConfig
): Promise<WhiteboardApp> {
  const app = new WhiteboardApp(config);
  // @ts-expect-error // eslint-disable-line
  await app._instance.readyPromise;
  return app;
}
