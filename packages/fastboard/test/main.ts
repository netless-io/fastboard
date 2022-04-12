import { resizable } from "@netless/fastboard-ui/test/resizable";

import { createFastboard, mount, genUID } from "../src";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).app = app;
  mount(app, root);
});

resizable(root, {
  defaultSize: { width: 400, height: 300 },
  offsetX: -30,
  offsetY: -30,
});
