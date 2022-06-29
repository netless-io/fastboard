import { SyncedStorePlugin } from "@netless/synced-store";
import { WindowManager } from "@netless/window-manager";

import type {
  JoinRoomParams,
  Player,
  PlayerCallbacks,
  PublicEvent,
  ReplayRoomParams,
  Room,
  RoomCallbacks,
  View,
  ViewCallbacks,
} from "./typings";

export function addRoomListener<K extends keyof RoomCallbacks>(
  room: Room,
  name: K,
  listener: RoomCallbacks[K]
): () => void {
  room.callbacks.on(name, listener);
  return () => room.callbacks.off(name, listener);
}

export function addPlayerListener<K extends keyof PlayerCallbacks>(
  player: Player,
  name: K,
  listener: PlayerCallbacks[K]
): () => void {
  player.callbacks.on(name, listener);
  return () => player.callbacks.off(name, listener);
}

export function addViewListener<K extends keyof ViewCallbacks>(
  view: View,
  name: K,
  listener: ViewCallbacks[K]
): () => void {
  view.callbacks.on(name, listener);
  return () => view.callbacks.off(name, listener);
}

export function addManagerListener<K extends keyof PublicEvent>(
  manager: WindowManager,
  name: K,
  listener: (value: PublicEvent[K]) => void
): () => void {
  return manager.emitter.on(name, listener);
}

export function ensureOfficialPlugins<T extends JoinRoomParams | ReplayRoomParams>(joinRoom: T): T {
  const plugins = new Set(joinRoom.invisiblePlugins || []);
  plugins.add(WindowManager);
  plugins.add(SyncedStorePlugin);
  joinRoom.invisiblePlugins = Array.from(plugins);
  return joinRoom;
}

/**
 * Register Netless App
 * ```js
 * register({ kind: App.kind, src: App })
 * ```
 */
export const register = /* @__PURE__ */ WindowManager.register.bind(WindowManager);
