import React, { useCallback, useContext } from "react";
import { PageControl } from "..";
import { Instance } from "../internal";
import { RedoUndo } from "./RedoUndo";
import { Toolbar } from "./Toolbar";
import { ZoomControl } from "./ZoomControl";

export interface RootProps {
  instance: Instance;
}

export default function Root({ instance: app }: RootProps) {
  const useWhiteboard = useCallback(
    (container: HTMLDivElement | null) =>
      container ? app.mount(container) : app.unmount(),
    [app]
  );

  return (
    <Instance.Context.Provider value={app}>
      <div className="fastboard-root">
        <div className="fastboard-view" ref={useWhiteboard} />
        <div className="fastboard-bottom-left">
          <RedoUndo room={app.room} manager={app.manager} />
          <ZoomControl room={app.room} manager={app.manager} />
        </div>
        <div className="fastboard-bottom-right">
          <PageControl room={app.room} manager={app.manager} />
        </div>
        <Toolbar room={app.room} manager={app.manager} />
      </div>
    </Instance.Context.Provider>
  );
}

export function useInstance() {
  const app = useContext(Instance.Context);
  if (!app) {
    throw new Error("useInstance must be used within a WhiteboardApp");
  }
  return app;
}
