import { is_browser } from "./misc";

const injected = new Set<string>();

export function inject_style(id: string, css: string) {
  if (is_browser && !injected.has(id)) {
    const style = document.createElement("style");
    const node = document.createTextNode(css);
    style.appendChild(node);
    document.head.appendChild(style);
    injected.add(id);
  }
}
