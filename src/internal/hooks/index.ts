import { useEffect } from "react";
import { injectStyle } from "../../helpers/utils";

export function useStyleLoader(cssText: string) {
  useEffect(() => {
    const styleElement = injectStyle(cssText);
    return () => {
      styleElement && document.head.removeChild(styleElement);
    };
    // cssText will never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
