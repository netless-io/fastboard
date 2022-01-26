import { WindowManager } from "@netless/window-manager";
import AppSlide from "@netless/app-slide";

WindowManager.register({
  kind: "Slide",
  appOptions: {
    // turn on to show debug controller
    debug: false,
  },
  src: AppSlide,
});
