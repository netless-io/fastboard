import type { HotKeys, JoinRoomParams, RoomCallbacks, WhiteWebSdkConfiguration } from "white-web-sdk";
import type { MountParams } from "@netless/window-manager";

import { DefaultHotKeys, WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";

import "./behaviors/register-apps";
import { FastboardApp } from "./core";
import { ensureWindowManager } from "./utils";

export type { FastboardReadable, FastboardWritable } from "./value";

export type { FastboardApp };

export interface FastboardOptions {
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState">;
  joinRoom: Omit<JoinRoomParams, "useMultiViews" | "disableNewPencil" | "disableMagixEventDispatchLimit"> & {
    callbacks?: Partial<RoomCallbacks>;
  };
  managerConfig?: Omit<MountParams, "room">;
}

/**
 * Create a FastboardApp instance.
 * @example
 * let app = await createFastboard({
 *   sdkConfig: {
 *     appIdentifier: import.meta.env.VITE_APPID,
 *   },
 *   joinRoom: {
 *     uid: unique_id,
 *     uuid: import.meta.env.VITE_ROOM_UUID,
 *     roomToken: import.meta.env.VITE_ROOM_TOKEN,
 *   },
 * })
 */
export async function createFastboard({
  sdkConfig,
  joinRoom: { callbacks, ...joinRoomParams },
  managerConfig,
}: FastboardOptions) {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  const hotKeys: Partial<HotKeys> = {
    ...DefaultHotKeys,
    changeToSelector: "s",
    changeToLaserPointer: "z",
    changeToPencil: "p",
    changeToRectangle: "r",
    changeToEllipse: "c",
    changeToEraser: "e",
    changeToText: "t",
    changeToStraight: "l",
    changeToArrow: "a",
    changeToHand: "h",
  };

  const room = await sdk.joinRoom(
    {
      floatBar: true,
      hotKeys,
      ...ensureWindowManager(joinRoomParams),
      useMultiViews: true,
      disableNewPencil: false,
      disableMagixEventDispatchLimit: true,
    },
    callbacks
  );

  const manager = await WindowManager.mount({
    cursor: true,
    ...managerConfig,
    room,
  });

  return new FastboardApp(sdk, room, manager, hotKeys);
}
