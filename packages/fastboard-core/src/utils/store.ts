export type Subscriber<T> = (value: T) => void;
export type Unsubscriber = () => void;
export type Updater<T> = (value: T) => T;
export type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;

export interface Disposable {
  dispose(): void;
}

export interface Readable<T> extends Disposable {
  readonly value: T;
  subscribe(this: void, run: Subscriber<T>): Unsubscriber;
  reaction(this: void, run: Subscriber<T>): Unsubscriber;
}

export interface Writable<T> extends Readable<T> {
  set(this: void, value: T): void;
  update(this: void, updater: Updater<T>): void;
}

function noop() {}

function safe_not_equal(a: unknown, b: unknown) {
  return a != a ? b == b : a !== b || (a && typeof a === "object") || typeof a === "function";
}

export function readable<T>(value: T, start: StartStopNotifier<T> = noop): Readable<T> {
  const subscribers = new Set<Subscriber<T>>();
  function set(new_value: T) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      for (const run of subscribers) run(value);
    }
  }
  const dispose = start(set) || noop;
  function subscribe(run: Subscriber<T>) {
    subscribers.add(run);
    run(value);
    return () => {
      subscribers.delete(run);
    };
  }
  function reaction(run: Subscriber<T>) {
    subscribers.add(run);
    return () => {
      subscribers.delete(run);
    };
  }
  return {
    get value() {
      return value;
    },
    subscribe,
    reaction,
    dispose,
  };
}

export function writable<T>(value: T, start: StartStopNotifier<T> = noop, set: Subscriber<T>): Writable<T> {
  const internal = readable(value, start);
  return {
    get value() {
      return internal.value;
    },
    subscribe: internal.subscribe,
    reaction: internal.reaction,
    set,
    update(fn: Updater<T>) {
      set(fn(value));
    },
    dispose: internal.dispose,
  };
}
