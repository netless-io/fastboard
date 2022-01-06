import type { WhiteboardApp, WhiteboardAppConfig } from "./WhiteboardApp";

import { useEffect, useState } from "react";
import { createWhiteboardApp } from "./index";

export type FastBoardConfig = WhiteboardAppConfig;

/**
 * @example
 * const [app, ref] = useFastboard({ sdkConfig, joinRoom })
 * if (app) {
 *   app.insertDocs({...})
 * }
 * return <div style={{ width: '100%', height: '100%' }} ref={ref} />
 */
export function useFastboard(config: FastBoardConfig): readonly [
  app: WhiteboardApp | null,
  ref: (div: HTMLDivElement | null) => void,
  collectorRef: (div: HTMLDivElement | null) => void
] & {
  readonly app: WhiteboardApp | null;
  readonly ref: (div: HTMLDivElement | null) => void;
  readonly collectorRef: (div: HTMLDivElement | null) => void;
} {
  const [app, setApp] = useState<WhiteboardApp | null>(null);
  const [currentTarget, ref] = useState<HTMLDivElement | null>(null);
  const [collector, collectorRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    const promise = createWhiteboardApp(config).then(app => {
      if (isMounted) setApp(app);
    });
    return () => {
      isMounted = false;
      promise.then(() => app?.dispose());
    };
    // ignore config and app change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (app) {
      app.bindElement(currentTarget, collector);
    }
  }, [app, collector, currentTarget]);

  return Object.assign([app, ref, collectorRef] as const, {
    app,
    ref,
    collectorRef,
  });
}
