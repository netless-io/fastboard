import type { HotKeys, JoinRoomParams, RoomCallbacks, WhiteWebSdkConfiguration } from "white-web-sdk";
import type { MountParams } from "@netless/window-manager";

import { DefaultHotKeys, WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";

import "./register-apps";
import { FastboardApp } from "./core";

export type { FastboardReadable, FastboardWritable } from "./value";

export type { FastboardApp };

export interface FastboardOptions {
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState">;
  joinRoom: Omit<JoinRoomParams, "useMultiViews" | "disableNewPencil" | "disableMagixEventDispatchLimit"> & {
    callbacks?: Partial<RoomCallbacks>;
  };
  managerConfig?: Omit<MountParams, "room">;
}

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

function ensureWindowManager(joinRoom: JoinRoomParams) {
  if (!joinRoom.invisiblePlugins || !joinRoom.invisiblePlugins.includes(WindowManager)) {
    joinRoom.invisiblePlugins = [...(joinRoom.invisiblePlugins || []), WindowManager];
  }
  return joinRoom;
}
