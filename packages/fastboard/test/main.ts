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
    uuid: import.meta.env.VITE_ROOM_UUID || "a95b07b09b5711efacd4a7a764beb2c4",
    useNativeClipboard: true,
    floatBar: {
      colors: [
        // [224, 32, 32],
        // [247, 181, 0],
        // [109, 212, 0],
        // [50, 197, 255],
        // [0, 145, 255],
        // [98, 54, 255],
        // [182, 32, 224],
        [109, 114, 120],
      ]
    },
    roomToken:
      import.meta.env.VITE_ROOM_TOKEN ||
      "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNzMwODg1MDI3OTA2Jm5vbmNlPWE5NzIxMjIwLTliNTctMTFlZi05NmE5LWFiMzg4NjE4OThhZiZyb2xlPTEmc2lnPTBlMjYwYjdkNmNhOGVlN2QzYTdhNjRjMzkyMzZmNWNlMzk4M2U1M2JlZWE5ZmQ0YmY4OTk3NGUyNDdhNTk4MzkmdXVpZD1hOTViMDdiMDliNTcxMWVmYWNkNGE3YTc2NGJlYjJjNA",
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
        // colors: [
        //   // [224, 32, 32],
        //   // [247, 181, 0],
        //   // [109, 212, 0],
        //   [50, 197, 255],
        //   [0, 145, 255],
        //   [98, 54, 255],
        //   [182, 32, 224],
        //   [109, 114, 120],
        // ]
      },
    },
  });
});

resizable(root, {
  defaultSize: { width: 400, height: 300 },
  offsetX: -30,
  offsetY: -30,
});
