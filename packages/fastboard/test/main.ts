import { resizable } from "../../fastboard-ui/test/resizable";

import { SlideApp, addSlideHooks, apps, createFastboard, createUI, genUID, register } from "../src";
import "./style.scss";

import fullWorkerString from "@netless/appliance-plugin/dist/fullWorker.js?raw";
import subWorkerString from "@netless/appliance-plugin/dist/subWorker.js?raw";
const fullWorkerBlob = new Blob([fullWorkerString], { type: "text/javascript" });
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], { type: "text/javascript" });
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

const root = document.getElementById("app") as HTMLDivElement;

register({
  kind: "Slide",
  src: SlideApp,
  addHooks: addSlideHooks,
  appOptions: {
    enableScale: true,
    minFPS: 10,
    maxFPS: 20,
    resolution: 1,
    maxResolutionLevel: 2,
    skipActionWhenFrozen: true,
    antialias: false,
  },
});

apps.push({
  icon: "https://api.iconify.design/mdi:file-powerpoint-box.svg?color=%237f7f7f",
  kind: "Slide",
  label: "Slide",
  onClick(app) {
    let taskId: string;
    let url: string | undefined;
    if (app.room.region === "cn-hz") {
      taskId = "82d16c40b15745f0b5fad096ac721773";
    } else {
      taskId = "1bd92aa00e28413c8668cffdbc97116f";
      url = "https://convertcdn-sg.netless.link/dynamicConvert";
    }
    app.insertDocs({
      fileType: "pptx",
      scenePath: `/pptx/${taskId}`,
      taskId,
      title: "a.pptx",
      url,
    });
  },
});

// Presentation is built into Window Manager, so only add its toolbar entry.
apps.push({
  icon: "https://api.iconify.design/mdi:file-word-box.svg?color=%237f7f7f",
  kind: "Presentation",
  label: "Presentation",
  async onClick(app) {
    const appId = await app.insertDocs(
      {
        fileType: "pdf",
        scenePath: `/presentation/${Date.now()}`,
        title: "a.pdf",
        scenes: [
          {
            name: "a.pdf - 1",
            ppt: {
              width: 714,
              height: 1010,
              src: "https://convertcdn.netless.link/staticConvert/18140800fe8a11eb8cb787b1c376634e/1.png",
            },
          },
          {
            name: "a.pdf - 2",
            ppt: {
              width: 714,
              height: 1010,
              src: "https://convertcdn.netless.link/staticConvert/18140800fe8a11eb8cb787b1c376634e/2.png",
            },
          },
        ],
      },
      { staticRenderer: "presentation" }
    );
    console.info("[fastboard-demo] static document opened", {
      appId,
      kind: appId ? app.manager.queryOne(appId)?.kind : undefined,
    });
  },
});

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
    uuid: import.meta.env.VITE_ROOM_UUID || "17914650ebb511f099da218d71db282b",
    // floatBar: {
    //   colors: [
    //       [224, 32, 32],
    //       [247, 181, 0],
    //       [109, 212, 0],
    //       [50, 197, 255],
    //       [0, 145, 255],
    //       [98, 54, 255],
    //       [182, 32, 224],
    //       [109, 114, 120],
    //   ]
    // },
    roomToken:
      import.meta.env.VITE_ROOM_TOKEN ||
      "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNzY3ODY4NzQ2NzQwJm5vbmNlPTE3YWU2YjQwLWViYjUtMTFmMC05NmE5LWFiMzg4NjE4OThhZiZyb2xlPTEmc2lnPTY0MzI5OTgzOTU5M2JhNjcwMGFhNDEwODQzZDBkYzZlMWYyNjVkOTQzMzE4YWVhZGI4YzY2ZTAyNjZlZmI1MzQmdXVpZD0xNzkxNDY1MGViYjUxMWYwOTlkYTIxOGQ3MWRiMjgyYg",
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
  // enableAppInMainViewPlugin: false,
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
