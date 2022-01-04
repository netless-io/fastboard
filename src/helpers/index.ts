export function applyStyles(css: string) {
  const el = document.createElement("style");
  el.appendChild(document.createTextNode(css));
  document.head.appendChild(el);
  return el;
}

export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export function isEqualArray<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every((e, i) => e === b[i]);
}
