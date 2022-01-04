export function noop() {
  return;
}

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

export type TaskFn = () => Promise<void> | void;

export class Lock {
  running = false;
  private nextFn: TaskFn | null = null;
  schedule(fn: TaskFn) {
    if (this.running) {
      this.nextFn = fn;
    } else {
      this.running = true;
      Promise.resolve(fn()).then(this.step);
    }
  }
  private step = () => {
    if (this.nextFn) {
      const fn = this.nextFn;
      this.nextFn = null;
      Promise.resolve(fn()).then(this.step);
    } else {
      this.running = false;
    }
  };
}
