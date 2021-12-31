import type { WhiteboardApp } from "./WhiteboardApp";
import type { FastBoardConfig } from "./index";

import { useEffect, useRef, useState } from "react";
import { createWhiteboardApp } from "./index";

// make sure to get the same symbol
const SECRET_DEV_KEY = Symbol.for("fastboard working state");

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
  ref: (div: HTMLDivElement | null) => void
] & {
  readonly app: WhiteboardApp | null;
  readonly ref: (div: HTMLDivElement | null) => void;
} {
  const [app, setApp] = useState<WhiteboardApp | null>(null);
  const [currentTarget, ref] = useState<HTMLDivElement | null>(null);

  interface WorkingState {
    app: WhiteboardApp | undefined;
    type: "creating" | "disposing" | undefined;
    next: HTMLDivElement | null | undefined;
    renderCount: number;
  }

  const working = useRef<WorkingState>({
    app: undefined,
    type: undefined,
    next: undefined,
    renderCount: 0,
  });

  useEffect(() => {
    // == HOT RELOAD ==
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exist = (window as any)[SECRET_DEV_KEY];
      if (exist) {
        working.current = exist;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any)[SECRET_DEV_KEY] = working.current;
      }
    }

    if (working.current.type) {
      working.current.next = currentTarget;
      return;
    }

    if (currentTarget) {
      if (working.current.renderCount > 0) {
        console.warn(
          "[WhiteboardApp] You have called `useFastboard()` twice with different config or target, this is normally wrong."
        );
      }
      working.current.renderCount++;
    }

    (async () => {
      let target: WorkingState["next"] = currentTarget;

      do {
        if (target) {
          working.current.type = "creating";
          if (working.current.app) {
            await working.current.app.dispose();
          }
          working.current.app = await createWhiteboardApp({
            ...config,
            target: target,
          });
          setApp(working.current.app);
        } else if (target === null) {
          working.current.type = "disposing";
          if (working.current.app) {
            await working.current.app.dispose();
            working.current.app = undefined;
          }
          setApp(null);
        }
        working.current.type = undefined;

        target = working.current.next;
        working.current.next = undefined;
      } while (target !== undefined);
    })();
  }, [config, currentTarget]);

  return Object.assign([app, ref] as const, { app, ref });
}
