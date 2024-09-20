import { resizable } from "@netless/fastboard-ui/test/resizable";

import { createFastboard, createUI, genUID } from "../src";
import "./style.scss";

const root = document.getElementById("app") as HTMLDivElement;
createFastboard({
  sdkConfig: {
    appIdentifier: import.meta.env.VITE_APPID || "123456789/123456789",
    region: "cn-hz",
  },
  joinRoom: {
    uid: genUID(),
    uuid: import.meta.env.VITE_ROOM_UUID || "b0c80aa0770011ef83863d0682a6c9bd",
    roomToken:
      import.meta.env.VITE_ROOM_TOKEN ||
      "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNzI2ODg5NDMyMzc3Jm5vbmNlPWIwZWM4MjkwLTc3MDAtMTFlZi05NmE5LWFiMzg4NjE4OThhZiZyb2xlPTEmc2lnPTMzZGU0MDQ2ZDg5YzNkNDliOTFkMGQwZDYwOTY3MWIzYzU5NWQzN2IxNTFiZDhkM2Y2ZjYwYjFmODUwMWYxODQmdXVpZD1iMGM4MGFhMDc3MDAxMWVmODM4NjNkMDY4MmE2YzliZA",
  },
  managerConfig: {
    cursor: true,
  },
  enableAppliancePlugin: true,
}).then(app => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).app = app;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ui = ((window as any).ui = createUI(app));

  ui.mount(root, {
    config: {
      toolbar: {
        items: ["clicker", "selector", "pencil", "text", "shapes", "eraser", "clear"],
        collapsed: true,
      },
    },
  });
});

resizable(root, {
  defaultSize: { width: 400, height: 300 },
  offsetX: -30,
  offsetY: -30,
});
