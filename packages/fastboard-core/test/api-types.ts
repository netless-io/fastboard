import type { FastboardApp, FastboardOptions, ViewCallbacks } from "../src/impl/FastboardApp";
import { addViewListener } from "../src/helpers/listen";

// Compile against the installed official API types, including callback argument inference.
export function checkAPI(app: FastboardApp, options: FastboardOptions) {
  options.managerConfig = {
    forceMaximized: true,
    lazySetupInMaximizedMode: true,
    maxCachedAppsInMaximizedMode: 2,
  };
  options.appliancePluginAdaptor = {
    callbacks: {
      onInitLoadingChange: info => {
        console.log(info.phase);
      },
    },
  };
  app.setAppliance("shape", "polygon");
  app.setMemberState({ vertices: 6 });
  app.dispatchDocsEvent("jumpToPage", { target: "mainView", page: 1 });
  return addViewListener(app.manager.mainView, "onCameraUpdated", camera => {
    const scale: Parameters<ViewCallbacks["onCameraUpdated"]>[0]["scale"] = camera.scale;
    console.log(scale);
  });
}
