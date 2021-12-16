/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Callbacks, RoomCallbacks } from "white-web-sdk";
import { log } from "./helpers";

type Vof<KV, K> = K extends keyof KV ? KV[K] : never;
export class MockCallbacks implements Callbacks<RoomCallbacks> {
  private listeners: Record<string, Set<(...args: any[]) => void>> = {};
  private of(name: string) {
    return (this.listeners[name] ||= new Set());
  }

  emit<K extends keyof RoomCallbacks>(e: K, ...args: any[]) {
    this.of(e).forEach(f => f(...args));
  }

  on<K extends string>(e: K, f: Vof<RoomCallbacks, K>): void {
    log("[on]", e);
    this.of(e).add(f);
  }

  once<K extends string>(e: K, f: Vof<RoomCallbacks, K>): void {
    const wrapper = (...args: any[]) => {
      (f as any)(...args);
      this.of(e).delete(wrapper);
    };
    this.of(e).add(wrapper);
  }

  off<K extends string>(e?: K, f?: Vof<RoomCallbacks, K>): void {
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

  forwardTo<NAME extends string>(
    _name: NAME,
    _toCallbacks: Callbacks<RoomCallbacks>
  ) {
    throw new Error("Method not implemented.");
  }
}
