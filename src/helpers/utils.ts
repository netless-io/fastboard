import { default as origClassNames, Argument } from "classnames";

export const isServer = typeof document === "undefined";

export function injectStyle(styleText: string) {
  if (isServer) return undefined;
  var styleElement = document.createElement("style");
  var textNode = document.createTextNode(styleText);
  styleElement.appendChild(textNode);
  return document.head.appendChild(styleElement);
}

export function classNames(...args: Argument[]) {
  return "agora-whiteboard-" + origClassNames(...args);
}
