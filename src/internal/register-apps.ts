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
