import type { MountParams } from "@netless/window-manager";
import type { JoinRoomParams, Room, WhiteWebSdkConfiguration } from "white-web-sdk";

import { WindowManager } from "@netless/window-manager";
import { DefaultHotKeys, WhiteWebSdk } from "white-web-sdk";

export type SdkConfig = Omit<WhiteWebSdkConfiguration, "useMobXState">;
export type JoinRoom = Omit<JoinRoomParams, "useMultiViews" | "disableMagixEventDispatchLimit">;
export type ManagerConfig = Omit<MountParams, "room">;

export interface MountWhiteboardResult {
  sdk: WhiteWebSdk;
  room: Room;
  manager: WindowManager;
}

export async function mountWhiteboard(
  sdkConfig: SdkConfig,
  joinRoom: JoinRoom,
  managerConfig: ManagerConfig
): Promise<MountWhiteboardResult> {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  joinRoom.invisiblePlugins = [...(joinRoom.invisiblePlugins || []), WindowManager];
  const room = await sdk.joinRoom({
    floatBar: true,
    disableNewPencil: false,
    disableMagixEventDispatchLimit: true,
    hotKeys: {
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
    },
    ...joinRoom,
    useMultiViews: true,
  });

  const manager = await WindowManager.mount({
    cursor: true,
    debug: import.meta.env.DEV,
    ...managerConfig,
    room,
  });

  if (import.meta.env.DEV) {
    Object.assign(window, { sdk, room, manager });
  }

  return { sdk, room, manager };
}
