import { resizable } from "@netless/fastboard-ui/test/resizable";

import { createFastboard, createUI, genUID, register, apps } from "../src";
import "./style.scss";

const root = document.getElementById("app") as HTMLDivElement;
apps.push({
  icon: "https://api.iconify.design/mdi:file-pdf.svg?color=%237f7f7f",
  kind: "PDFjs",
  label: "PDF.js",
  async onClick(app) {
    app.manager.addApp({
      kind: "PDFjs",
      options: {
        title: "PDFjs",
        scenePath: `/pdfjs/${Math.random().toString(36).slice(2)}`,
      },
      attributes: {
        prefix: " https://white-cover.oss-cn-hangzhou.aliyuncs.com/flat/", // ! Required.
        taskId: "e349fe51afb3493c893243789b467d6b", // ! Required.
      },
    });
  },
});
register({
  kind: "PDFjs",
  src: "https://cdn.jsdelivr.net/npm/@netless/app-pdfjs@0.1.4",
  name: "NetlessAppPDFjs",
  appOptions: {
    pdfjsLib: "https://cdn.jsdelivr.net/npm/pdfjs-dist@latest/build/pdf.min.mjs",
    workerSrc: "https://cdn.jsdelivr.net/npm/pdfjs-dist@latest/build/pdf.worker.min.mjs",
  },
});
createFastboard({
  sdkConfig: {
    appIdentifier: import.meta.env.VITE_APPID || "123456789/123456789",
    region: "cn-hz",
  },
  joinRoom: {
    uid: genUID(),
    uuid: import.meta.env.VITE_ROOM_UUID || "1bfe7360a23d11ef844c9de7e0348444",
    floatBar: true,
    roomToken:
      import.meta.env.VITE_ROOM_TOKEN ||
      "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNzMxNjQzMjgyMDQyJm5vbmNlPTFjMjEzZGEwLWEyM2QtMTFlZi05NmE5LWFiMzg4NjE4OThhZiZyb2xlPTEmc2lnPWM2MzYwMDU5MGRkOTY4NmJkYzEwMzYxNWEwYTJhODY1OWY1ZjFjNjZmNTRkY2FiMzVkMzE5YzQ4ZTk5YmIzOTYmdXVpZD0xYmZlNzM2MGEyM2QxMWVmODQ0YzlkZTdlMDM0ODQ0NA",
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
