import type { RegisterParams } from "@netless/window-manager";
import { WindowManager } from "@netless/window-manager";
import SlideApp, { SlideViewer, addHooks, previewSlide, refrigerator } from "@netless/app-slide";

export type {
  AppOptions as SlideOptions,
  Attributes as SlideAttributes,
  SlideState,
} from "@netless/app-slide";
export { refrigerator, previewSlide, SlideApp, addHooks as addSlideHooks, SlideViewer };

export interface AppsConfig {
  [kind: string]: Omit<RegisterParams, "kind">;
}

const DefaultApps: AppsConfig = {};

WindowManager.register({
  kind: "Slide",
  appOptions: { debug: false },
  src: SlideApp,
  addHooks,
});

for (const kind in DefaultApps) {
  if (Object.prototype.hasOwnProperty.call(DefaultApps, kind)) {
    const options = DefaultApps[kind];
    WindowManager.register({ kind, ...options });
  }
}

export const register = WindowManager.register.bind(WindowManager);

declare let __NAME__: string, __VERSION__: string;

export const version = __VERSION__;

if (typeof window !== "undefined") {
  let str = (window as { __netlessUA?: string }).__netlessUA || "";
  str += ` ${__NAME__}@${version} `;
  (window as { __netlessUA?: string }).__netlessUA = str;
}
