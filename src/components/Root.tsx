import React, { useCallback, useState } from "react";

import { Lock } from "../internal/helpers";
import { Instance } from "../internal";
import { Toolbar } from "./Toolbar";
import { RedoUndo } from "./RedoUndo";
import { ZoomControl } from "./ZoomControl";
import { PageControl } from "./PageControl";

export interface RootProps {
  instance: Instance;
}

export default function Root({ instance: app }: RootProps) {
  const [mux] = useState(() => new Lock());

  const useWhiteboard = useCallback(
    (container: HTMLDivElement | null) =>
      mux.schedule(
        container ? () => app.mount(container) : () => app.unmount()
      ),
    [app, mux]
  );

  return (
    <Instance.Context.Provider value={app}>
      <div className="fastboard-root">
        {!app.room && <div className="fastboard-loading">Loading&hellip;</div>}
        <div className="fastboard-view" ref={useWhiteboard} />
        <div className="fastboard-left">
          <Toolbar room={app.room} manager={app.manager} i18n={app.i18n} />
        </div>
        <div className="fastboard-bottom-left">
          <RedoUndo room={app.room} manager={app.manager} i18n={app.i18n} />
          <ZoomControl room={app.room} manager={app.manager} i18n={app.i18n} />
        </div>
        <div className="fastboard-bottom-right">
          <PageControl room={app.room} manager={app.manager} i18n={app.i18n} />
        </div>
      </div>
    </Instance.Context.Provider>
  );
}
