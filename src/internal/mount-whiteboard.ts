import type { MountParams } from "@netless/window-manager";
import type {
  JoinRoomParams,
  RoomCallbacks,
  WhiteWebSdkConfiguration,
} from "white-web-sdk";
import type { Essentials, Language } from "./instance";

import { WindowManager } from "@netless/window-manager";
import { DefaultHotKeys, WhiteWebSdk } from "white-web-sdk";
import { createI18n } from "../i18n";

export type SdkConfig = Omit<
  WhiteWebSdkConfiguration,
  "useMobXState" | "disableNewPencil" | "disableMagixEventDispatchLimit"
>;
export type JoinRoom = Omit<
  JoinRoomParams,
  "useMultiViews" | "disableMagixEventDispatchLimit"
> & { callbacks?: Partial<RoomCallbacks> };
export type ManagerConfig = Omit<MountParams, "room">;

function ensureWindowManager(joinRoom: JoinRoom) {
  if (
    !joinRoom.invisiblePlugins ||
    !joinRoom.invisiblePlugins.includes(WindowManager)
  ) {
    joinRoom.invisiblePlugins = [
      ...(joinRoom.invisiblePlugins || []),
      WindowManager,
    ];
  }
}

export const defaultHotKeys = {
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

export async function mountWhiteboard(
  sdkConfig: SdkConfig,
  joinRoom: JoinRoom,
  managerConfig: ManagerConfig,
  language?: Language
): Promise<Essentials> {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  ensureWindowManager(joinRoom);
  joinRoom = { ...joinRoom };
  const callbacks = joinRoom.callbacks;
  delete joinRoom.callbacks;
  const joinRoomParams: JoinRoomParams = {
    floatBar: true,
    hotKeys: {
      ...DefaultHotKeys,
      ...defaultHotKeys,
    },
    ...joinRoom,
    useMultiViews: true,
    disableNewPencil: false,
    disableMagixEventDispatchLimit: true,
  };
  const room = await sdk.joinRoom(joinRoomParams, callbacks);

  const manager = await WindowManager.mount({
    cursor: true,
    debug: import.meta.env.DEV,
    ...managerConfig,
    room,
  });

  const i18n = await createI18n({ language });

  if (import.meta.env.DEV) {
    Object.assign(window, { sdk, room, manager });
  }

  return { sdk, room, manager, i18n };
}
