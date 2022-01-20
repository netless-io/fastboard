import type { PublicEvent, Room, WindowManager } from "@netless/window-manager";
import type { HotKeys, WhiteWebSdk } from "white-web-sdk";
import type { FastboardDisposer, FastboardInternalValue } from "./value";

import { createValue } from "./value";

export class FastboardAppBase {
  public constructor(
    readonly sdk: WhiteWebSdk,
    readonly room: Room,
    readonly manager: WindowManager,
    readonly hotKeys: Partial<HotKeys>
  ) {}

  protected readonly _disposers: FastboardDisposer[] = [];
  protected _destroyed = false;
  protected _assertNotDestroyed() {
    if (this._destroyed) {
      throw new Error("[FastboardApp] Can not call any method on destroyed FastboardApp.");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected createValue: typeof createValue = (...args: [any, any]): any => {
    const value = createValue(...args);
    this._disposers.push((value as FastboardInternalValue<unknown>).dispose);
    return value;
  };

  protected _addRoomListener<T = unknown>(name: string, listener: T) {
    this._assertNotDestroyed();
    this.room.callbacks.on(name, listener);
    return () => this.room.callbacks.off(name, listener);
  }

  protected _addManagerListener<K extends keyof PublicEvent>(name: K, set: (value: PublicEvent[K]) => void) {
    this._assertNotDestroyed();
    this.manager.emitter.on(name, set);
    return () => this.manager.emitter.off(name, set);
  }

  protected _addMainViewListener<T = unknown>(name: string, listener: T) {
    this._assertNotDestroyed();
    this.manager.mainView.callbacks.on(name, listener);
    return () => this.manager.mainView.callbacks.off(name, listener);
  }

  public destroy() {
    this._disposers.forEach(dispose => dispose());
    this._disposers.length = 0;
    this._destroyed = true;
    this.manager.destroy();
    return this.room.disconnect();
  }
}
