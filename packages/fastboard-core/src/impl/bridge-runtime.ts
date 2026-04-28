import type { WindowManager } from "@netless/window-manager";

export interface FastboardBridgeRuntime {
  whiteWebSdk: {
    autorun: typeof import("white-web-sdk").autorun;
    toJS: typeof import("white-web-sdk").toJS;
  };
  windowManager: {
    ExtendPlugin: typeof import("@netless/window-manager").ExtendPlugin;
  };
}

export function attachFastboardBridgeRuntime(manager: WindowManager, runtime: FastboardBridgeRuntime) {
  (
    manager as WindowManager & {
      __fastboardBridgeRuntime?: FastboardBridgeRuntime;
    }
  ).__fastboardBridgeRuntime = runtime;
}
