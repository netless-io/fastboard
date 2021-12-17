import React, { useCallback } from "react";

import style from "./style.scss?inline";

import { useStyle } from "./hooks";
import { mountWhiteboard } from "./internal";
import { useWhiteboardApp } from "./WhiteboardApp";
import { RedoUndo, Toolbar } from ".";
import { ZoomControl } from "./components/ZoomControl";

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (app as any)._resolveReady(essentials);
      }
    },
    [app]
  );

  return (
    <div className="agora-whiteboard-root">
      <div className="agora-whiteboard-view" ref={useWhiteboard} />
      <div className="fastboard-bottom-left">
        <RedoUndo room={app.room} manager={app.manager} />
        <ZoomControl room={app.room} manager={app.manager} />
      </div>
      <Toolbar
        room={app.room}
        manager={app.manager}
        left={20}
        top={200}
        theme={"light"}
      />
    </div>
  );
}
