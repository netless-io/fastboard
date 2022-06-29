import type { Disposer, Readable, StartStopNotifier, Writable } from "./store";
import type {
  MountParams,
  NetlessApp,
  Player,
  PlayerCallbacks,
  PlayerPhase,
  PlayerSeekingResult,
  PlayerState,
  ReplayRoomParams,
  SyncedStore,
  WhiteWebSdkConfiguration,
} from "./typings";

import { WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";

import { addPlayerListener, ensureOfficialPlugins } from "./helpers";
import { createVal } from "./store";
import { SyncedStorePlugin } from "@netless/synced-store";
import { ensureNetlessUA } from "./behaviors/netless-ua";

// The inheritance is for simplifying the code, so that we can use
// `prop = f(this.player)` directly in its child class.
class FastboardPlayerStruct<TEventData extends Record<string, any> = any> {
  // Intensionally not class-field to prevent `__publicField` usage.
  protected declare _disposers: Disposer[];
  protected declare _destroyed: boolean;
  protected _assertNotDestroyed() {
    if (this._destroyed) {
      throw new Error("FastboardPlayer has been destroyed");
    }
  }
  protected _flushAllDisposers() {
    this._disposers.forEach(disposer => disposer());
    this._disposers = [];
  }

  constructor(
    readonly sdk: WhiteWebSdk,
    readonly player: Player,
    readonly manager: WindowManager,
    readonly syncedStore: SyncedStore<TEventData>
  ) {
    this._disposers = [];
    this._destroyed = false;
  }

  /** @internal */
  protected _val<T>(init: T, start: StartStopNotifier<T>): Readable<T>;
  /** @internal */
  protected _val<T>(init: T, start: StartStopNotifier<T>, setter: (value: T) => void): Writable<T>;
  protected _val<T>(init: T, start: StartStopNotifier<T>, setter?: (value: T) => void) {
    const val = createVal(init, start, setter as (value: T) => void);
    this._disposers.push(val.dispose.bind(val));
    return val;
  }
}

export class FastboardPlayer<
  TEventData extends Record<string, any> = any
> extends FastboardPlayerStruct<TEventData> {
  constructor(
    sdk: WhiteWebSdk,
    player: Player,
    manager: WindowManager,
    syncedStore: SyncedStore<TEventData>
  ) {
    super(sdk, player, manager, syncedStore);

    // Guard `app.destroy()` so that network errors won't break fastboard.
    this._disposers.push(
      addPlayerListener(this.player, "onStoppedWithError", error => {
        console.warn("FastboardPlayer was stopped with error.");
        console.error(error);
      })
    );
  }

  /**
   * Disconnect from whiteboard room.
   */
  async destroy(): Promise<void> {
    if (this._destroyed) return;
    this._destroyed = true;
    this._flushAllDisposers();
    this.manager.destroy();
    this.player.callbacks.off();
  }

  /**
   * Render this app to some DOM.
   */
  bindContainer(container: HTMLElement) {
    this._assertNotDestroyed();
    this.manager.bindContainer(container);
  }

  /**
   * Player current time in milliseconds.
   */
  readonly currentTime = this._val(
    this.player.progressTime,
    set => addPlayerListener(this.player, "onProgressTimeChanged", set),
    time => this.player.seekToProgressTime(time)
  );

  /**
   * Player state, like "is it playing?".
   */
  readonly phase = this._val<PlayerPhase>(this.player.phase, set =>
    addPlayerListener(this.player, "onPhaseChanged", set)
  );

  /**
   * Will become true after buffering.
   */
  readonly canplay = this._val(this.player.isPlayable, set =>
    addPlayerListener(this.player, "onIsPlayableChanged", set)
  );

  /** @internal */
  private _setPlaybackRate!: (value: number) => void;
  /**
   * Playback speed, default `1`.
   */
  readonly playbackRate = this._val(
    this.player.playbackSpeed,
    set => {
      this._setPlaybackRate = set;
    },
    speed => this._setPlaybackRate((this.player.playbackSpeed = speed))
  );

  /**
   * Playback duration in milliseconds.
   */
  readonly duration = this._val(this.player.timeDuration, _set => {});

  /**
   * Get state of room at current time.
   */
  readonly state = this._val<PlayerState>(this.player.state, set =>
    addPlayerListener(this.player, "onPlayerStateChanged", () => set(this.player.state))
  );

  /**
   * Seek to some time in milliseconds.
   */
  seek(timestamp: number): Promise<PlayerSeekingResult> {
    this._assertNotDestroyed();
    return this.player.seekToProgressTime(timestamp);
  }

  /**
   * Change player state to playing.
   */
  play() {
    this.player.play();
  }

  /**
   * Change player state to paused.
   */
  pause() {
    this._assertNotDestroyed();
    this.player.pause();
  }

  /**
   * Change player state to stopped.
   */
  stop() {
    this._assertNotDestroyed();
    this.player.stop();
  }

  /**
   * Set playback speed, the same as `player.playbackRate.set(x)`.
   */
  setPlaybackRate(value: number) {
    this._assertNotDestroyed();
    this.playbackRate.set(value);
  }
}

export interface FastboardReplayOptions {
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState"> & {
    region: NonNullable<WhiteWebSdkConfiguration["region"]>;
  };
  replayRoom: Omit<ReplayRoomParams, "useMultiViews"> & {
    callbacks?: Partial<PlayerCallbacks>;
  };
  managerConfig?: Omit<MountParams, "room">;
  netlessApps?: NetlessApp[];
}

export async function replayFastboardCore<TEventData extends Record<string, any> = any>({
  sdkConfig,
  replayRoom: { callbacks, ...replayRoomParams },
  managerConfig,
  netlessApps,
}: FastboardReplayOptions) {
  ensureNetlessUA();

  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  if (netlessApps) {
    netlessApps.forEach(app => WindowManager.register({ kind: app.kind, src: app }));
  }

  const player = await sdk.replayRoom(
    {
      ...ensureOfficialPlugins(replayRoomParams),
      useMultiViews: true,
    },
    callbacks
  );

  const syncedStore = await SyncedStorePlugin.init<TEventData>(player);

  const managerPromise = WindowManager.mount({
    cursor: true,
    ...managerConfig,
    room: player,
  });

  player.play();
  const manager = await managerPromise;
  player.pause();
  await player.seekToProgressTime(0);

  return new FastboardPlayer<TEventData>(sdk, player, manager, syncedStore);
}
