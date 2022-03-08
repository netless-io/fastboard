import type { JoinRoomParams, ReplayRoomParams } from "white-web-sdk";
import type { PublicEvent } from "@netless/window-manager";
import { WindowManager } from "@netless/window-manager";

export function ensure_window_manager<T extends JoinRoomParams | ReplayRoomParams>(joinRoom: T): T {
  if (!joinRoom.invisiblePlugins || !joinRoom.invisiblePlugins.includes(WindowManager)) {
    joinRoom.invisiblePlugins = [...(joinRoom.invisiblePlugins || []), WindowManager];
  }
  return joinRoom;
}

export function transform_app_status(status: PublicEvent["loadApp"]["status"]) {
  return status === "start" ? "loading" : status === "failed" ? "failed" : "idle";
}
