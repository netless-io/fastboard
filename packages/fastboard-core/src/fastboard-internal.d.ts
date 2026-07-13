declare module "@fastboard-internal/appliance-plugin-loader" {
  import type { ApplianceMultiPlugin } from "@netless/appliance-plugin";

  export function loadApplianceMultiPluginModule(): Promise<{
    ApplianceMultiPlugin: typeof ApplianceMultiPlugin;
  }>;
}

declare module "@fastboard-internal/app-in-mainview-plugin-loader" {
  import type { AppInMainViewPlugin } from "@netless/app-in-mainview-plugin";

  export function loadAppInMainViewPluginModule(): Promise<{
    AppInMainViewPlugin: typeof AppInMainViewPlugin;
  }>;
}

declare module "@netless/appliance-plugin/bridge" {
  import type { ApplianceMultiPlugin } from "@netless/appliance-plugin";
  import type { autorun, InvisiblePlugin, isPlayer, isRoom, RoomPhase, toJS } from "white-web-sdk";

  export interface WhiteWebSdkBridgeRuntime {
    toJS: typeof toJS;
    autorun: typeof autorun;
    isRoom: typeof isRoom;
    isPlayer: typeof isPlayer;
    InvisiblePlugin: typeof InvisiblePlugin;
    RoomPhase: typeof RoomPhase;
  }

  export function loadAppliancePluginBridge(runtime: WhiteWebSdkBridgeRuntime): Promise<{
    ApplianceMultiPlugin: typeof ApplianceMultiPlugin;
  }>;
}

declare module "@netless/app-in-mainview-plugin/bridge" {
  import type { AppInMainViewPlugin } from "@netless/app-in-mainview-plugin";
  import type { autorun, InvisiblePlugin, isRoom, toJS } from "white-web-sdk";

  export interface WhiteWebSdkBridgeRuntime {
    toJS: typeof toJS;
    autorun: typeof autorun;
    isRoom: typeof isRoom;
    InvisiblePlugin: typeof InvisiblePlugin;
  }

  export function loadAppInMainViewPluginBridge(runtime: WhiteWebSdkBridgeRuntime): Promise<{
    AppInMainViewPlugin: typeof AppInMainViewPlugin;
  }>;
}
