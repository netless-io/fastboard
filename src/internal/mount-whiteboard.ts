import { WindowManager } from "@netless/window-manager";
import { WhiteWebSdk } from "white-web-sdk";
import { WhiteboardProps } from "../components/Whiteboard";

export async function mountWhiteboard(
  { sdkConfig, joinRoom, managerConfig = { cursor: true } }: WhiteboardProps,
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
