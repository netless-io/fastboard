import type { WhiteboardApp } from "./index";

import React, { useEffect, useRef } from "react";
import { useLastValue } from "./internal/hooks";

/**
 * @example
 * let app = await createWhiteboardApp(config)
 * <Fastboard app={app} />
 * await app.dispose()
 */
export function Fastboard({ app }: { app?: WhiteboardApp | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const previous = useLastValue(app);

  useEffect(() => {
    if (previous && previous !== app) {
      previous.bindElement(null);
    }
    if (app) {
      app.bindElement(ref.current);
    }
  }, [app, previous]);

  return <div className="fastboard" ref={ref} />;
}
