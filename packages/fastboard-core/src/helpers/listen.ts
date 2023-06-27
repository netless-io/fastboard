import type { PublicEvent, WindowManager } from "@netless/window-manager";
import type { Player, PlayerCallbacks, Room, RoomCallbacks, View, ViewCallbacks } from "white-web-sdk";

export function addRoomListener<K extends keyof RoomCallbacks>(
  room: Room,
  name: K,
  listener: RoomCallbacks[K]
) {
  room.callbacks.on(name, listener);
  return () => room.callbacks.off(name, listener);
}

export function addPlayerListener<K extends keyof PlayerCallbacks>(
  player: Player,
  name: K,
  listener: PlayerCallbacks[K]
) {
  player.callbacks.on(name, listener);
  return () => player.callbacks.off(name, listener);
}

export function addViewListener<K extends keyof ViewCallbacks>(
  view: View,
  name: K,
  listener: (value: ViewCallbacks[K]) => void
) {
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
