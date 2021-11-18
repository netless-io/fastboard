import type { JoinRoomParams, WhiteWebSdkConfiguration } from "white-web-sdk";
import type { MountParams } from "@netless/window-manager";

import { WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";

export type JoinRoom = Omit<JoinRoomParams, "useMultiViews" | "disableMagixEventDispatchLimit">;

export type WhiteWindowSDKConfiguration = Omit<WhiteWebSdkConfiguration, "useMobXState">;

export interface MountWhiteboardParams {
  sdkConfig: WhiteWindowSDKConfiguration;
  joinRoom: JoinRoom;
  managerConfig?: Omit<MountParams, "room" | "container">;
}

export async function mountWhiteboard(
  { sdkConfig, joinRoom, managerConfig = { cursor: true } }: MountWhiteboardParams,
  container: HTMLDivElement
) {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    appIdentifier: sdkConfig.appIdentifier,
    useMobXState: true,
  });

  const room = await sdk.joinRoom({
    ...joinRoom,
    invisiblePlugins: [WindowManager],
    useMultiViews: true,
    disableMagixEventDispatchLimit: true,
  });

  const manager = await WindowManager.mount({
    ...managerConfig,
    room,
    container,
    debug: import.meta.env.DEV,
  });

  return { sdk, room, manager };
}
