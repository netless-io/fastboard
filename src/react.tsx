import type { WhiteboardApp } from "./index";

import React, { forwardRef, useEffect, useRef } from "react";
import { useLastValue } from "./internal/hooks";

// https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
function useCombinedRefs<T>(...refs: React.Ref<T>[]) {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    for (const ref of refs) {
      if (!ref) continue;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        (ref as typeof targetRef).current = targetRef.current;
      }
    }
  }, [refs]);

  return targetRef;
}

/**
 * @example
 * let app = await createWhiteboardApp(config)
 * <Fastboard app={app} />
 * await app.dispose()
 */
export const Fastboard = forwardRef<
  HTMLDivElement,
  { app?: WhiteboardApp | null } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
>(({ app, ...restProps }, outerRef) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useCombinedRefs(outerRef, innerRef);
  const previous = useLastValue(app);

  useEffect(() => {
    if (previous && previous !== app) {
      previous.bindElement(null);
    }
    if (app) {
      app.bindElement(ref.current);
    }
  }, [app, previous, ref]);

  return <div className="fastboard" {...restProps} ref={ref} />;
});
