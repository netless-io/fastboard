export function applyStyles(css: string) {
  const el = document.createElement("style");
  el.appendChild(document.createTextNode(css));
  document.head.appendChild(el);
  return el;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
