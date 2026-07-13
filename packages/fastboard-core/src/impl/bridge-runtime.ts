import type { ExtendPlugin, WindowManager } from "@netless/window-manager";
import type { autorun, toJS } from "white-web-sdk";

export interface FastboardBridgeRuntime {
  whiteWebSdk: {
    autorun: typeof autorun;
    toJS: typeof toJS;
  };
  windowManager: {
    ExtendPlugin: typeof ExtendPlugin;
  };
}

export function attachFastboardBridgeRuntime(manager: WindowManager, runtime: FastboardBridgeRuntime) {
  (
    manager as WindowManager & {
      __fastboardBridgeRuntime?: FastboardBridgeRuntime;
    }
  ).__fastboardBridgeRuntime = runtime;
}
