// This is a simple mimic of svelte/store.
export type Subscriber<T> = (value: T) => void;
export type Unsubscriber = () => void;
export type Updater<T> = (value: T) => T;
export type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;

export interface Readable<T> {
  readonly value: T;
  subscribe(this: void, run: Subscriber<T>): Unsubscriber;
  reaction(this: void, run: Subscriber<T>): Unsubscriber;
  dispose(value?: T): void;
}

export interface Writable<T> extends Readable<T> {
  set(this: void, value: T): void;
  update(this: void, updater: Updater<T>): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

function safe_not_equal(a: unknown, b: unknown) {
  return a != a ? b == b : a !== b || (a && typeof a === "object") || typeof a === "function";
}

export function readable<T>(value: T, start: StartStopNotifier<T> = noop): Readable<T> {
  let stop: Unsubscriber | undefined;
  const subscribers = new Set<Subscriber<T>>();
  function set(new_value: T) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        for (const run of subscribers) {
          run(value);
        }
      }
    }
  }
  function subscribe(run: Subscriber<T>) {
    subscribers.add(run);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(run);
      if (subscribers.size === 0) {
        stop && stop();
        stop = undefined;
      }
    };
  }
  function reaction(run: Subscriber<T>) {
    subscribers.add(run);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    return () => {
      subscribers.delete(run);
      if (subscribers.size === 0) {
        stop && stop();
        stop = undefined;
      }
    };
  }
  function dispose(new_value?: T) {
    if (new_value !== undefined) {
      set(new_value);
    }
    subscribers.clear();
    stop && stop();
    stop = undefined;
  }
  return {
    get value() {
      if (subscribers.size === 0) {
        stop = start(set) || noop;
        stop();
        stop = undefined;
      }
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
      set(fn(internal.value));
    },
    dispose: internal.dispose,
  };
}
