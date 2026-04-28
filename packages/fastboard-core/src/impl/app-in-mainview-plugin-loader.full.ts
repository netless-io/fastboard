import { InvisiblePlugin, autorun, isRoom, toJS } from "white-web-sdk";
import type { AppInMainViewPlugin } from "@netless/app-in-mainview-plugin";

export async function loadAppInMainViewPluginModule(): Promise<{
  AppInMainViewPlugin: typeof AppInMainViewPlugin;
}> {
  const { loadAppInMainViewPluginBridge } = await import(
    "@netless/app-in-mainview-plugin/bridge"
  );
  return loadAppInMainViewPluginBridge({
    toJS,
    autorun,
    isRoom,
    InvisiblePlugin,
  }) as Promise<{
    AppInMainViewPlugin: typeof AppInMainViewPlugin;
  }>;
}
