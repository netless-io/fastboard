import type { ApplianceMultiPlugin } from "@netless/appliance-plugin";

export async function loadApplianceMultiPluginModule(): Promise<{
  ApplianceMultiPlugin: typeof ApplianceMultiPlugin;
}> {
  return import("@netless/appliance-plugin");
}
