export type Subscriber<T> = (value: T) => void;
export type Updater<T> = (value: T) => T;
export type Disposer = () => void;
export type StartStopNotifier<T> = (set: Subscriber<T>) => Disposer | void;

export interface Readable<T> {
  readonly value: T;
  readonly subs: Set<Subscriber<T>>;
  subscribe(this: Readable<T>, run: Subscriber<T>): Disposer;
  reaction(this: Readable<T>, run: Subscriber<T>): Disposer;
  dispose(this: Readable<T>): void;
}

export interface Writable<T> extends Readable<T> {
  set(this: Writable<T>, value: T): void;
  update(this: Writable<T>, updater: Updater<T>): void;
}

function is_function(x: unknown): x is () => void {
  return typeof x === "function";
}

function safe_not_equal(a: unknown, b: unknown): boolean {
  return a != a ? b == b : a !== b || ((a as boolean) && typeof a === "object") || typeof a === "function";
}

// This is not svelte/store.
class Val<T> implements Writable<T> {
  declare value: T;
  declare readonly subs: Set<Subscriber<T>>;
  constructor(value: T) {
    this.value = value;
    this.subs = new Set();
  }
  subscribe(run: Subscriber<T>): Disposer {
    this.subs.add(run);
    run(this.value);
    return () => this.subs.delete(run);
  }
  reaction(run: Subscriber<T>): Disposer {
    this.subs.add(run);
    return () => this.subs.delete(run);
  }
  set(value: T) {
    if (safe_not_equal(this.value, value)) {
      this.value = value;
      this.subs.forEach(sub => sub(value));
    }
  }
  update(updater: Updater<T>) {
    this.set(updater(this.value));
  }
  dispose() {
    this.subs.clear();
  }
}

/**
 * ```js
 * const mediaQuery = matchMedia("(prefers-color-scheme: dark)")
 * const isDark = createVal(mediaQuery.matches, set => {
 *   const update = () => set(mediaQuery.matches)
 *   mediaQuery.addEventListener("change", update)
 *   return () => mediaQuery.removeEventListener("change", update)
 * });
 * ```
 */
export function createVal<T>(init: T, start: StartStopNotifier<T>): Readable<T>;
export function createVal<T>(init: T, start: StartStopNotifier<T>, setter: (value: T) => void): Writable<T>;
export function createVal<T>(init: T, start: StartStopNotifier<T>, setter?: ((value: T) => void) | null) {
  const val = new Val(init);
  const stop = start(val.set.bind(val));
  if (stop && is_function(stop)) {
    val.dispose = function dispose() {
      this.subs.clear();
      stop();
    };
  }
  if (setter) {
    val.set = setter;
  }
  return val;
}
