import type { JoinRoomParams, WhiteWebSdkConfiguration } from "white-web-sdk";
import type { MountParams } from "@netless/window-manager";

import { DefaultHotKeys, WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";

export interface MountWhiteboardParams {
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState">;
  joinRoom: Omit<JoinRoomParams, "useMultiViews" | "disableMagixEventDispatchLimit">;
  managerConfig?: Omit<MountParams, "room" | "container">;
}

export async function mountWhiteboard(
  { sdkConfig, joinRoom, managerConfig }: MountWhiteboardParams,
  container: HTMLDivElement
) {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

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
    invisiblePlugins: [WindowManager],
    useMultiViews: true,
  });

  const manager = await WindowManager.mount({
    cursor: true,
    ...managerConfig,
    room,
    container,
    debug: import.meta.env.DEV,
  });

  return { sdk, room, manager };
}
