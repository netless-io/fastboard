export function applyStyles(css: string) {
  const el = document.createElement("style");
  el.appendChild(document.createTextNode(css));
  document.head.appendChild(el);
  return el;
}
