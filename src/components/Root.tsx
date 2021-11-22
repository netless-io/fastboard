import React, { useCallback } from "react";

import style from "./style.scss?inline";

import { useStyle } from "../hooks";
import { mountWhiteboard } from "../internal";
import { useWhiteboardApp } from "../WhiteboardApp";

export default function Root() {
  useStyle(style);
  const app = useWhiteboardApp();

  const useWhiteboard = useCallback(
    async (container: HTMLDivElement | null) => {
      if (container) {
        const { sdkConfig, joinRoom, managerConfig } = app.config;
        const essentials = await mountWhiteboard(sdkConfig, joinRoom, {
          ...managerConfig,
          container,
        });
        // `_resolveReady` is marked private
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (app as any)._resolveReady(essentials);
      }
    },
    [app]
  );

  return (
    <div className="agora-whiteboard-root">
      <div className="agora-whiteboard-view" ref={useWhiteboard} />
    </div>
  );
}
