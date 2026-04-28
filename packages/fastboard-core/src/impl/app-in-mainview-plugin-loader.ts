import type { AppInMainViewPlugin } from "@netless/app-in-mainview-plugin";

export async function loadAppInMainViewPluginModule(): Promise<{
  AppInMainViewPlugin: typeof AppInMainViewPlugin;
}> {
  return import("@netless/app-in-mainview-plugin");
}
