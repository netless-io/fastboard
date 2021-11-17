import { WindowManager } from "@netless/window-manager";
import { DeviceType, WhiteWebSdk } from "white-web-sdk";
import { WhiteboardProps } from "../components/Whiteboard";

export async function mountWhiteboard(
  { appIdentifier, joinRoom }: WhiteboardProps,
  container: HTMLDivElement
) {
  const sdk = new WhiteWebSdk({
    appIdentifier,
    deviceType: DeviceType.Surface,
    useMobXState: true,
  });
  const room = await sdk.joinRoom({
    ...joinRoom,
    invisiblePlugins: [WindowManager],
    disableNewPencil: false,
    useMultiViews: true,
  });
  const manager = await WindowManager.mount({
    room,
    container,
    cursor: true,
    debug: import.meta.env.DEV,
  });
  return { sdk, room, manager };
}
