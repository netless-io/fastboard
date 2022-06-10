import { resizable } from "@netless/fastboard-ui/test/resizable";

import { createFastboard, createUI, genUID } from "../src";
import "./style.scss";

const root = document.getElementById("app") as HTMLDivElement;

createFastboard({
  sdkConfig: {
    appIdentifier: import.meta.env.VITE_APPID,
    region: "cn-hz",
  },
  joinRoom: {
    uid: genUID(),
    uuid: import.meta.env.VITE_ROOM_UUID,
    roomToken: import.meta.env.VITE_ROOM_TOKEN,
  },
  managerConfig: {
    cursor: true,
  },
}).then(app => {
  (window as any).app = app;
  (window as any).ui = createUI(app, root);
});

resizable(root, {
  defaultSize: { width: 400, height: 300 },
  offsetX: -30,
  offsetY: -30,
});
