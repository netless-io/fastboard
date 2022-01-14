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
// WindowManager.register({
//   kind: "Countdown",
//   src: async () => {
//     const app = await import("@netless/app-countdown");
//     return app.default ?? app;
//   },
// });
// WindowManager.register({
//   kind: "GeoGebra",
//   src: async () => {
//     const app = await import("@netless/app-geogebra");
//     return app.default ?? app;
//   },
//   appOptions: {
//     HTML5Codebase:
//       "https://flat-storage-cn-hz.whiteboard.agora.io/GeoGebra/HTML5/5.0/web3d",
//   },
// });
