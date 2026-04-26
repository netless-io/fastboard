declare module "@fastboard-internal/appliance-plugin-loader" {
  export function loadApplianceMultiPluginModule(): Promise<{
    ApplianceMultiPlugin: typeof import("@netless/appliance-plugin").ApplianceMultiPlugin;
  }>;
}

declare module "@netless/appliance-plugin/bridge" {
  export interface WhiteWebSdkBridgeRuntime {
    toJS: typeof import("white-web-sdk").toJS;
    autorun: typeof import("white-web-sdk").autorun;
    isRoom: typeof import("white-web-sdk").isRoom;
    isPlayer: typeof import("white-web-sdk").isPlayer;
    InvisiblePlugin: typeof import("white-web-sdk").InvisiblePlugin;
    RoomPhase: typeof import("white-web-sdk").RoomPhase;
  }

  export function loadAppliancePluginBridge(
    runtime: WhiteWebSdkBridgeRuntime,
  ): Promise<{
    ApplianceMultiPlugin: typeof import("@netless/appliance-plugin").ApplianceMultiPlugin;
  }>;
}
