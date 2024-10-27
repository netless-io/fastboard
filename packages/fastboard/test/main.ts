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
    uuid: import.meta.env.VITE_ROOM_UUID || "c9c69a70934411ef8adaab211229a356",
    useNativeClipboard: true,
    floatBar: {
      colors: [
        // [224, 32, 32],
        // [247, 181, 0],
        // [109, 212, 0],
        [50, 197, 255],
        [0, 145, 255],
        [98, 54, 255],
        [182, 32, 224],
        [109, 114, 120],
      ]
    },
    roomToken:
      import.meta.env.VITE_ROOM_TOKEN ||
      "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNzI5OTk3MzEyNTk1Jm5vbmNlPWM5ZTM0YTMwLTkzNDQtMTFlZi05NmE5LWFiMzg4NjE4OThhZiZyb2xlPTEmc2lnPTY5ZDBjOTZmMDhiYWY5ZTZmOTcxZjhhZjNiNjRiMDUzZGQwNjdiYzkxYzRhMDJiNDEzYjdjMjllYjI5NTMyOWQmdXVpZD1jOWM2OWE3MDkzNDQxMWVmOGFkYWFiMjExMjI5YTM1Ng",
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
