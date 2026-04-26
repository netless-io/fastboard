import {
  InvisiblePlugin,
  RoomPhase,
  autorun,
  isPlayer,
  isRoom,
  toJS,
} from "white-web-sdk";
import type { ApplianceMultiPlugin } from "@netless/appliance-plugin";

export async function loadApplianceMultiPluginModule(): Promise<{
  ApplianceMultiPlugin: typeof ApplianceMultiPlugin;
}> {
  const { loadAppliancePluginBridge } = await import(
    "@netless/appliance-plugin/bridge"
  );
  return loadAppliancePluginBridge({
    toJS,
    autorun,
    isRoom,
    isPlayer,
    InvisiblePlugin,
    RoomPhase,
  }) as Promise<{ ApplianceMultiPlugin: typeof ApplianceMultiPlugin }>;
}
