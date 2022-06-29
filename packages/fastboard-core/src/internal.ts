import type { Camera, JoinRoomParams, ReplayRoomParams } from "white-web-sdk";
import type { PublicEvent } from "@netless/window-manager";

import { WindowManager } from "@netless/window-manager";
import { SyncedStorePlugin } from "@netless/synced-store";
import type { FastboardApp } from "./impl";
import type { Readable } from "./utils";

export function is_object(x: unknown): x is object {
  return typeof x === "object" && x !== null;
}

export function is_store(x: unknown): x is Readable<unknown> {
  return is_object(x) && "subscribe" in x && "dispose" in x;
}

export function ensure_official_plugins<T extends JoinRoomParams | ReplayRoomParams>(joinRoom: T): T {
  const plugins = new Set(joinRoom.invisiblePlugins || []);
  plugins.add(WindowManager);
  plugins.add(SyncedStorePlugin);
  joinRoom.invisiblePlugins = [...plugins];
  return joinRoom;
}

export function transform_app_status(status: PublicEvent["loadApp"]["status"]) {
  return status === "start" ? "loading" : status === "failed" ? "failed" : "idle";
}

export function normalize_camera(
  baseCamera:
    | {
        id: string;
        centerX: number | null;
        centerY: number | null;
        scale: number;
      }
    | undefined
): Camera {
  return {
    centerX: baseCamera?.centerX ?? 0,
    centerY: baseCamera?.centerY ?? 0,
    scale: baseCamera?.scale ?? 1,
  };
}

export class SyncRealCamera {
  timer = 0;
  baseScale = 0;

  set: ((camera: Camera) => void) | null = null;

  constructor(readonly app: FastboardApp) {}

  reset() {
    this.baseScale = 0;

    cancelAnimationFrame(this.timer);
  }

  start(baseScale: number) {
    this.baseScale = baseScale;
    this.update();
  }

  update = () => {
    if (this.baseScale === 0) return;
    this.timer = requestAnimationFrame(this.update);

    const baseCamera = this.app.manager.baseCamera;
    const current = this.app.manager.mainView.camera.scale;
    const ratio = current / this.baseScale;

    if (this.set && baseCamera)
      this.set({ ...normalize_camera(baseCamera), scale: baseCamera.scale * ratio });
  };
}
