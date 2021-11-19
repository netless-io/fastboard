import { useCallback, useEffect, useState } from "react";

import { injectStyle } from "../../helpers/utils";

export const EMPTY_ARRAY: never[] = [];

export function useStyleLoader(cssText: string) {
  useEffect(() => {
    const styleElement = injectStyle(cssText);
    return () => {
      styleElement && document.head.removeChild(styleElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, EMPTY_ARRAY);
}

export function useForceUpdate() {
  const [, setState] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(() => setState([]), EMPTY_ARRAY);
}
