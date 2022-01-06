import React, { useCallback, useState } from "react";

import { Lock, Instance } from "../internal";
import { Toolbar } from "./Toolbar";
import { RedoUndo } from "./RedoUndo";
import { ZoomControl } from "./ZoomControl";
import { PageControl } from "./PageControl";

export interface RootProps {
  instance: Instance;
}

export function Root({ instance: app }: RootProps) {
  const [mux] = useState(() => new Lock());

  const useWhiteboard = useCallback(
    (container: HTMLDivElement | null) =>
      mux.schedule(
        container ? () => app.mount(container) : () => app.unmount()
      ),
    [app, mux]
  );

  const {
    Toolbar: toolbar = true,
    RedoUndo: redo_undo = true,
    ZoomControl: zoom_control = true,
    PageControl: page_control = true,
  } = app.config.layout || {};

  const props = {
    room: app.room,
    manager: app.manager,
    i18n: app.i18n,
  };

  return (
    <Instance.Context.Provider value={app}>
      <div className="fastboard-root">
        {!app.room && <div className="fastboard-loading">Loading&hellip;</div>}
        <div className="fastboard-view" ref={useWhiteboard} />
        {toolbar && (
          <div className="fastboard-left">
            <Toolbar {...props} />
          </div>
        )}
        {(redo_undo || zoom_control) && (
          <div className="fastboard-bottom-left">
            {redo_undo && <RedoUndo {...props} />}
            {zoom_control && <ZoomControl {...props} />}
          </div>
        )}
        {page_control && (
          <div className="fastboard-bottom-right">
            <PageControl {...props} />
          </div>
        )}
      </div>
    </Instance.Context.Provider>
  );
}
