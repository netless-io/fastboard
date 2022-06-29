import type { MountParams, NetlessApp } from "@netless/window-manager";
import type {
  Player,
  PlayerCallbacks,
  PlayerPhase as PlayerPhaseEnum,
  PlayerSeekingResult,
  PlayerState,
  ReplayRoomParams,
  WhiteWebSdkConfiguration,
} from "white-web-sdk";
import type { SyncedStore } from "@netless/synced-store";
import type { Disposable, Readable, Writable } from "../utils";

import { WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";
import { SyncedStorePlugin } from "@netless/synced-store";
import { readable, writable } from "../utils";
import { ensure_official_plugins, is_store } from "../internal";
import { register } from "../behaviors";

type PlayerPhase = `${PlayerPhaseEnum}`;

export type { PlayerPhase, PlayerSeekingResult, PlayerState };

export class FastboardPlayer<TEventData = any> {
  private _disposers: (() => void)[] = [];

  private _destroyed = false;
  private _assertNotDestroyed() {
    if (this._destroyed) throw new Error("FastboardApp has been destroyed");
  }

  private _addPlayerListener<K extends keyof PlayerCallbacks>(name: K, listener: PlayerCallbacks[K]) {
    this._assertNotDestroyed();
    this.player.callbacks.on(name, listener);
    return () => this.player.callbacks.off(name, listener);
  }

  /**
   * Player current time in milliseconds.
   */
  readonly currentTime: Writable<number>;

  /**
   * Player state, like "is it playing?".
   */
  readonly phase: Readable<PlayerPhase>;

  /**
   * Will become true after buffering.
   */
  readonly canplay: Readable<boolean>;

  private _setPlaybackRate!: (value: number) => void;
  /**
   * Playback speed, default `1`.
   */
  readonly playbackRate: Writable<number>;

  /**
   * Playback duration in milliseconds.
   */
  readonly duration: Readable<number>;

  /**
   * Get state of room at that time, like "who was in the room?".
   */
  readonly state: Readable<PlayerState>;

  constructor(
    readonly sdk: WhiteWebSdk,
    readonly player: Player,
    readonly manager: WindowManager,
    readonly syncedStore: SyncedStore<TEventData>
  ) {
    this.currentTime = writable(
      this.player.progressTime,
      set => this._addPlayerListener("onProgressTimeChanged", set),
      this.player.seekToProgressTime.bind(this.player)
    );
    this.phase = readable(this.player.phase, set => this._addPlayerListener("onPhaseChanged", set));
    this.canplay = readable(this.player.isPlayable, set =>
      this._addPlayerListener("onIsPlayableChanged", set)
    );
    this.playbackRate = writable(
      this.player.playbackSpeed,
      set => {
        this._setPlaybackRate = set;
      },
      value => this._setPlaybackRate((this.player.playbackSpeed = value))
    );
    this.duration = readable(this.player.timeDuration);
    this.state = readable(this.player.state, set =>
      this._addPlayerListener("onPlayerStateChanged", () => set(this.player.state))
    );
    Object.getOwnPropertyNames(this).forEach(key => {
      const prop = (this as any)[key];
      if (is_store(prop)) this._disposers.push((prop as Disposable).dispose.bind(prop));
    });
  }

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

  /**
   * Destroy fastboard player.
   */
  destroy() {
    this._destroyed = true;
    this.manager.destroy();
    this.player.callbacks.off();
  }

  /**
   * Seek to some time in milliseconds.
   */
  seek(timestamp: number) {
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
   * Set playback speed, a shortcut for `speed.set(x)`.
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

/**
 * Create a FastboardPlayer instance.
 * @example
 * let player = await replayFastboard({
 *   sdkConfig: {
 *     appIdentifier: import.meta.env.VITE_APPID,
 *     region: 'cn-hz',
 *   },
 *   replayRoom: {
 *     room: "room uuid",
 *     roomToken: "NETLESSROOM_...",
 *     beginTimestamp: 1646619090394,
 *     duration: 70448,
 *   },
 * })
 */
export async function replayFastboard<TEventData = any>({
  sdkConfig,
  replayRoom: { callbacks, ...replayRoomParams },
  managerConfig,
  netlessApps,
}: FastboardReplayOptions) {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  if (netlessApps) {
    netlessApps.forEach(app => {
      register({ kind: app.kind, src: app });
    });
  }

  const player = await sdk.replayRoom(
    {
      ...ensure_official_plugins(replayRoomParams),
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
