import type {
  Displayer,
  HotKeys,
  JoinRoomParams,
  PlayerCallbacks,
  ReplayRoomParams,
  Room,
  RoomCallbacks,
  WhiteWebSdkConfiguration,
} from "white-web-sdk";
import type { MountParams } from "@netless/window-manager";

import { contentModeScale, DefaultHotKeys, WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";

import "./behaviors/register-apps";
import { ensureWindowManager } from "./helpers/utils";
import { FastboardApp } from "./impl/app";
import { FastboardPlayer } from "./impl/player";

export type { FastboardReadable, FastboardWritable } from "./helpers/value";

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

  manager.mainView.setCameraBound({
    minContentMode: contentModeScale(0.3),
    maxContentMode: contentModeScale(3),
  });

  return new FastboardApp(sdk, room, manager, hotKeys);
}

export interface FastboardReplayOptions {
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState">;
  replayRoom: Omit<ReplayRoomParams, "useMultiViews"> & {
    callbacks?: Partial<PlayerCallbacks>;
  };
  managerConfig?: Omit<MountParams, "room">;
}

/**
 * Create a FastboardPlayer instance.
 * @example
 * let app = await replayFastboard({
 *   sdkConfig: {
 *     appIdentifier: import.meta.env.VITE_APPID,
 *   },
 *   replayRoom: {
 *     uid: unique_id,
 *     uuid: import.meta.env.VITE_ROOM_UUID,
 *     roomToken: import.meta.env.VITE_ROOM_TOKEN,
 *   },
 * })
 */
export async function replayFastboard({
  sdkConfig,
  replayRoom: { callbacks, ...replayRoomParams },
  managerConfig,
}: FastboardReplayOptions) {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  const player = await sdk.replayRoom(
    {
      ...ensureWindowManager(replayRoomParams),
      useMultiViews: true,
    },
    callbacks
  );

  const manager = await WindowManager.mount({
    cursor: true,
    ...managerConfig,
    room: player as Displayer as Room,
  });

  return new FastboardPlayer(sdk, player, manager);
}
