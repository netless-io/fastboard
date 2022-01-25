import type { Player, PlayerCallbacks, PlayerState, ViewCallbacks, WhiteWebSdk } from "white-web-sdk";
import type { PublicEvent, WindowManager } from "@netless/window-manager";
import type { FastboardDisposer, FastboardInternalValue } from "../helpers/value";

import { createValue } from "../helpers/value";

class FastboardPlayerBase {
  public constructor(readonly sdk: WhiteWebSdk, readonly player: Player, readonly manager: WindowManager) {}

  protected readonly _disposers: FastboardDisposer[] = [];
  protected _destroyed = false;
  protected _assertNotDestroyed() {
    if (this._destroyed) {
      throw new Error("[FastboardPlayer] Can not call any method on destroyed FastboardPlayer.");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected createValue: typeof createValue = (...args: [any, any]): any => {
    const value = createValue(...args);
    this._disposers.push((value as FastboardInternalValue<unknown>).dispose);
    return value;
  };

  protected _addPlayerListener<K extends keyof PlayerCallbacks, T = PlayerCallbacks[K]>(
    name: K,
    listener: T
  ) {
    this._assertNotDestroyed();
    this.player.callbacks.on(name, listener);
    return () => this.player.callbacks.off(name, listener);
  }

  protected _addManagerListener<K extends keyof PublicEvent>(name: K, set: (value: PublicEvent[K]) => void) {
    this._assertNotDestroyed();
    this.manager.emitter.on(name, set);
    return () => this.manager.emitter.off(name, set);
  }

  protected _addMainViewListener<K extends keyof ViewCallbacks, T = ViewCallbacks[K]>(name: K, listener: T) {
    this._assertNotDestroyed();
    this.manager.mainView.callbacks.on(name, listener);
    return () => this.manager.mainView.callbacks.off(name, listener);
  }

  public destroy() {
    this._disposers.forEach(dispose => dispose());
    this._disposers.length = 0;
    this._destroyed = true;
    this.manager.destroy();
    this.player.callbacks.off();
  }
}

export class FastboardPlayer extends FastboardPlayerBase {
  /**
   * Render this player to some DOM.
   */
  bindContainer(container: HTMLElement) {
    this._assertNotDestroyed();
    this.manager.bindContainer(container);
  }

  /**
   * Move window-manager's collector to some place.
   */
  bindCollector(container: HTMLElement) {
    this._assertNotDestroyed();
    this.manager.bindCollectorContainer(container);
  }

  readonly currentTime = this.createValue(
    this.player.progressTime,
    set => this._addPlayerListener("onProgressTimeChanged", set),
    this.player.seekToProgressTime.bind(this.player)
  );

  readonly phase = this.createValue(this.player.phase, set => this._addPlayerListener("onPhaseChanged", set));

  readonly canplay = this.createValue(this.player.isPlayable, set =>
    this._addPlayerListener("onIsPlayableChanged", set)
  );

  private _setSpeed!: (value: number) => void;
  readonly speed = this.createValue(
    this.player.playbackSpeed,
    set => {
      this._setSpeed = set;
    },
    value => {
      this.player.playbackSpeed = value;
      this._setSpeed(value);
    }
  );

  readonly state = this.createValue<PlayerState | null>(null, set => {
    const update = () => set(this.player.state);
    const dispose1 = this._addPlayerListener("onLoadFirstFrame", update);
    const dispose2 = this._addPlayerListener("onPlayerStateChanged", update);
    return () => (dispose1(), dispose2());
  });

  seek(timestamp: number) {
    this._assertNotDestroyed();
    return this.player.seekToProgressTime(timestamp);
  }

  play() {
    this._assertNotDestroyed();
    this.player.play();
  }

  pause() {
    this._assertNotDestroyed();
    this.player.pause();
  }

  stop() {
    this._assertNotDestroyed();
    this.player.stop();
  }
}
