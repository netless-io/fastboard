import { WindowManager, type RegisterParams } from "@netless/window-manager";

export const register = WindowManager.register.bind(WindowManager);

export interface AppsConfig {
  [kind: string]: Omit<RegisterParams, "kind">;
}

const DefaultApps: AppsConfig = {
  Monaco: {
    src: "https://netless-app.oss-cn-hangzhou.aliyuncs.com/@netless/app-monaco/0.1.14-beta.1/dist/main.iife.js",
  },
  Countdown: {
    src: "https://netless-app.oss-cn-hangzhou.aliyuncs.com/@netless/app-countdown/0.0.2-alpha.1/dist/main.iife.min.js",
  },
  GeoGebra: {
    src: "https://netless-app.oss-cn-hangzhou.aliyuncs.com/@netless/app-geogebra/0.0.4/dist/main.iife.js",
    appOptions: {
      HTML5Codebase: "https://flat-storage-cn-hz.whiteboard.agora.io/GeoGebra/HTML5/5.0/web3d",
    },
  },
  EmbeddedPage: {
    src: "https://netless-app.oss-cn-hangzhou.aliyuncs.com/@netless/app-embedded-page/0.1.1/dist/main.iife.js",
  },
  Plyr: {
    src: "https://netless-app.oss-cn-hangzhou.aliyuncs.com/@netless/app-plyr/0.1.3/dist/main.iife.js",
  },
};

for (const kind in DefaultApps) {
  if (Object.prototype.hasOwnProperty.call(DefaultApps, kind)) {
    const options = DefaultApps[kind];
    WindowManager.register({ kind, ...options });
  }
}

declare let __NAME__: string, __VERSION__: string;

export const version = __VERSION__;

if (typeof window !== "undefined") {
  let str = (window as { __netlessUA?: string }).__netlessUA || "";
  str += ` ${__NAME__}@${version} `;
  (window as { __netlessUA?: string }).__netlessUA = str;
}
