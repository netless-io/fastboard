import { WindowManager } from "@netless/window-manager";

WindowManager.register({
  kind: "Slide",
  appOptions: {
    // turn on to show debug controller
    debug: false,
  },
  src: async () => {
    const app = await import("@netless/app-slide");
    return app.default ?? app;
  },
});

WindowManager.register({
  kind: "Monaco",
  src: "https://cdn.jsdelivr.net/npm/@netless/app-monaco@latest/dist/main.iife.js",
});

WindowManager.register({
  kind: "Countdown",
  src: "https://cdn.jsdelivr.net/npm/@netless/app-countdown@latest/dist/main.iife.js",
});

WindowManager.register({
  kind: "GeoGebra",
  src: "https://cdn.jsdelivr.net/npm/@netless/app-geogebra@latest/dist/main.iife.js",
  appOptions: {
    HTML5Codebase: "https://flat-storage-cn-hz.whiteboard.agora.io/GeoGebra/HTML5/5.0/web3d",
  },
});
