import { useEffect } from "react";

export const isServer = typeof window === "undefined" || typeof window.document === "undefined";

function injectStyle(style: string) {
  if (!isServer) {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = style;
    return document.head.appendChild(styleElement);
  }
}

export function useStyle(style: string) {
  useEffect(() => {
    const element = injectStyle(style);
    return () => {
      if (element) {
        document.head.removeChild(element);
      }
    };
  }, [style]);
}
