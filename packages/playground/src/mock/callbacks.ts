/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Callbacks, RoomCallbacks } from "white-web-sdk";
import { log } from "./helpers";

type ValueOf<KV, K> = K extends keyof KV ? KV[K] : never;

export class MockCallbacks<T extends Record<string, any> = RoomCallbacks>
  implements Callbacks<T>
{
  private listeners: Record<string, Set<(...args: any[]) => void>> = {};

  private of(name: string) {
    return (this.listeners[name] ||= new Set());
  }

  emit(e: keyof T, ...args: any[]) {
    this.of(e as string).forEach(f => f(...args));
  }

  on<K extends string>(e: K, f: ValueOf<T, K>): void {
    log("[on]", e);
    this.of(e).add(f);
  }

  once<K extends string>(e: K, f: ValueOf<T, K>): void {
    const wrapper = (...args: any[]) => {
      (f as any)(...args);
      this.of(e).delete(wrapper);
    };
    this.of(e).add(wrapper);
  }

  off<K extends string>(e?: K, f?: ValueOf<T, K>): void {
    log("[off]", e);
    if (e) {
      if (f) {
        const set = this.of(e);
        set.delete(f);
      } else {
        delete this.listeners[e];
      }
    } else {
      this.listeners = {};
    }
  }

  forwardTo<NAME extends string>(_name: NAME, _toCallbacks: Callbacks<T>) {
    throw new Error("Method not implemented.");
  }
}
