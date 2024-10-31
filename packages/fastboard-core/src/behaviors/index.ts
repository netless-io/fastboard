import { WindowManager } from "@netless/window-manager";
import SlideApp, { apps, addHooks, previewSlide } from "@netless/app-slide";

export type {
  AppOptions as SlideOptions,
  AppResult as SlideController,
  PreviewParams,
  SlidePreviewer,
} from "@netless/app-slide";
export { previewSlide, SlideApp, addHooks as addSlideHooks, apps as slideApps };

WindowManager.register({
  kind: "Slide",
  appOptions: { debug: false },
  src: SlideApp as any,
  addHooks,
});
