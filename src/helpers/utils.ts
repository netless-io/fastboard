import type { Argument } from "classnames";

import origClassNames from "classnames";

export const isServer = typeof document === "undefined";

export function injectStyle(styleText: string) {
  if (isServer) return undefined;
  const styleElement = document.createElement("style");
  const textNode = document.createTextNode(styleText);
  styleElement.appendChild(textNode);
  return document.head.appendChild(styleElement);
}

export function classNames(...args: Argument[]) {
  return "agora-whiteboard-" + origClassNames(...args);
}
