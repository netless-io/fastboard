import type {
  AppOptions as NetlessAppSlideAppOptions,
  Attributes as NetlessAppSlideAttributes,
  SlideState,
  SlideViewerOptions,
} from "@netless/app-slide";
import type { RegisterParams } from "@netless/window-manager";

import { WindowManager } from "@netless/window-manager";

import NetlessAppSlide, { addHooks, previewSlide, Slide, SlideViewer } from "@netless/app-slide";

export { Slide, SlideViewer, previewSlide };
export type { NetlessAppSlideAttributes, SlideState, SlideViewerOptions };

export function registerSlide() {
  if (WindowManager.registered.has(NetlessAppSlide.kind)) return;
  WindowManager.register({
    kind: NetlessAppSlide.kind,
    appOptions: { debug: false } as NetlessAppSlideAppOptions,
    src: NetlessAppSlide,
    addHooks,
  });
}

const DefaultApps: {
  [kind: string]: Omit<RegisterParams, "kind">;
} = {};

export function registerDefaultApps() {
  Object.keys(DefaultApps).forEach(kind => {
    if (WindowManager.registered.has(kind)) return;
    WindowManager.register({ kind, ...DefaultApps[kind] });
  });
}
