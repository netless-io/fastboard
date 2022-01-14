import { useCallback, useState } from "preact/hooks";

import { Lock, Instance } from "../internal";
import { Toolbar } from "./Toolbar";
import { RedoUndo } from "./RedoUndo";
import { ZoomControl } from "./ZoomControl";
import { PageControl } from "./PageControl";
import { useHideControls } from "./hooks";

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

  const hideControls = useHideControls(app.manager);
  const showControls = !hideControls;

  const props = {
    room: app.room,
    manager: app.manager,
    i18n: app.i18n,
  };

  const {
    Toolbar: toolbar = showControls || hideControls === "toolbar-only",
    RedoUndo: redo_undo = showControls,
    ZoomControl: zoom_control = showControls,
    PageControl: page_control = showControls,
  } = app.config.layout || {};

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
