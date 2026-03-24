import { resizable } from "@netless/fastboard-ui/test/resizable";

import { createFastboard, createUI, genUID, register, apps } from "@netless/fastboard-full";
import "./style.scss";

import fullWorkerString from "@netless/appliance-plugin/dist/fullWorker.js?raw";
import subWorkerString from "@netless/appliance-plugin/dist/subWorker.js?raw";
const fullWorkerBlob = new Blob([fullWorkerString], { type: "text/javascript" });
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], { type: "text/javascript" });
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

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
        prefix: " https://white-cover.oss-cn-hangzhou.aliyuncs.com/flat/",
        taskId: "e349fe51afb3493c893243789b467d6b",
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
    uuid: import.meta.env.VITE_ROOM_UUID || "cbc67f00169f11f0826bfd782d7d3846",
    roomToken:
      import.meta.env.VITE_ROOM_TOKEN ||
      "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNzc0NDA5NzQ0MzE0Jm5vbmNlPThhMGNkMWEwLTI3MzItMTFmMS1iYzM4LWQ3Yjg5YzgwZTNlMSZyb2xlPTEmc2lnPWUzZDFkM2EyNTdhYjcxZGVmYTI5ODcxNWRmYmUzZDk5ZWRjNmE2ZjgyOGM3YWQzNjk2OGI3OThhNGY0YzgzOGImdXVpZD1jYmM2N2YwMDE2OWYxMWYwODI2YmZkNzgyZDdkMzg0Ng",
  },
  managerConfig: {
    cursor: true,
    useBoxesStatus: true,
  },
  enableAppliancePlugin: {
    cdn: {
      fullWorkerUrl,
      subWorkerUrl,
    },
    extras: {
      strokeWidth: {
        min: 1,
        max: 32,
      },
    },
  },
}).then(app => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).app = app;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ui = ((window as any).ui = createUI(app));

  ui.mount(root, {
    config: {
      toolbar: {
        items: ["clicker", "selector", "pencil", "text", "shapes", "eraser", "clear", "laserPointer"],
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
