import type { JoinRoomParams, ReplayRoomParams } from "white-web-sdk";
import type { PublicEvent } from "@netless/window-manager";
import { WindowManager } from "@netless/window-manager";
import { SyncedStorePlugin } from "@netless/synced-store";

export function ensure_official_plugins<T extends JoinRoomParams | ReplayRoomParams>(joinRoom: T): T {
  const plugins = new Set(joinRoom.invisiblePlugins || []);
  plugins.add(WindowManager as any);
  plugins.add(SyncedStorePlugin);
  joinRoom.invisiblePlugins = [...plugins];
  return joinRoom;
}

export function transform_app_status(status: PublicEvent["loadApp"]["status"]) {
  return status === "start" ? "loading" : status === "failed" ? "failed" : "idle";
}
