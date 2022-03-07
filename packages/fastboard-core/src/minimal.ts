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

import type { AppsConfig } from "./behaviors/register-apps";

import { DefaultApps, registerApps } from "./behaviors/register-apps";
import { ensureWindowManager } from "./helpers/utils";
import { FastboardApp } from "./impl/app";
import { FastboardPlayer } from "./impl/player";

export type { FastboardReadable, FastboardWritable } from "./helpers/value";

export type { AppsStatus, InsertDocsDynamic, InsertDocsParams, InsertDocsStatic } from "./impl/app";

export type { AppsConfig, FastboardApp, FastboardPlayer };
export { DefaultApps, registerApps };

export interface FastboardOptions {
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState"> & { region: string };
  joinRoom: Omit<JoinRoomParams, "useMultiViews" | "disableNewPencil" | "disableMagixEventDispatchLimit"> & {
    callbacks?: Partial<RoomCallbacks>;
  };
  managerConfig?: Omit<MountParams, "room">;
  appsConfig?: AppsConfig;
}

/**
 * Create a FastboardApp instance.
 * @example
 * let app = await createFastboard({
 *   sdkConfig: {
 *     appIdentifier: import.meta.env.VITE_APPID,
 *     region: "ch-hz",
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
  appsConfig = DefaultApps,
}: FastboardOptions) {
  registerApps(appsConfig);

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
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState"> & { region: string };
  replayRoom: Omit<ReplayRoomParams, "useMultiViews"> & {
    callbacks?: Partial<PlayerCallbacks>;
  };
  managerConfig?: Omit<MountParams, "room">;
  appsConfig?: AppsConfig;
}

/**
 * Create a FastboardPlayer instance.
 * @example
 * let app = await replayFastboard({
 *   sdkConfig: {
 *     appIdentifier: import.meta.env.VITE_APPID,
 *     region: "ch-hz",
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
  appsConfig = DefaultApps,
}: FastboardReplayOptions) {
  registerApps(appsConfig);

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

  const managerPromise = WindowManager.mount({
    cursor: true,
    ...managerConfig,
    room: player as Displayer as Room,
  });

  player.play();
  const manager = await managerPromise;
  player.pause();

  return new FastboardPlayer(sdk, player, manager);
}
