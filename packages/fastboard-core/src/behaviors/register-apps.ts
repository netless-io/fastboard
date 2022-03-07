import type { RegisterParams } from "@netless/window-manager";
import { WindowManager } from "@netless/window-manager";

export interface AppsConfig {
  [kind: string]: Omit<RegisterParams, "kind">;
}

export const DefaultApps: AppsConfig = {
  Monaco: {
    src: "https://netless-app.oss-cn-hangzhou.aliyuncs.com/@netless/app-monaco/0.1.12/dist/main.iife.js",
  },
  Countdown: {
    src: "https://netless-app.oss-cn-hangzhou.aliyuncs.com/@netless/app-countdown/0.0.2/dist/main.iife.js",
  },
  GeoGebra: {
    src: "https://netless-app.oss-cn-hangzhou.aliyuncs.com/@netless/app-geogebra/0.0.4/dist/main.iife.js",
    appOptions: {
      HTML5Codebase: "https://flat-storage-cn-hz.whiteboard.agora.io/GeoGebra/HTML5/5.0/web3d",
    },
  },
  EmbeddedPage: {
    src: "https://cdn.jsdelivr.net/npm/@netless/app-embedded-page@0.1.1/dist/main.iife.js",
  },
  Player: {
    name: "NetlessAppMediaPlayer",
    src: "https://cdn.jsdelivr.net/npm/@netless/app-media-player@0.1.1/dist/main.iife.js",
  },
};

export function registerApps(config: AppsConfig) {
  for (const kind in config) {
    if (Object.prototype.hasOwnProperty.call(config, kind)) {
      const options = config[kind];
      WindowManager.register({ kind, ...options });
    }
  }
}
