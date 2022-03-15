import type { MountParams, PublicEvent } from "@netless/window-manager";
import type {
  Player,
  PlayerPhase as PlayerPhaseEnum,
  PlayerCallbacks,
  PlayerState,
  PlayerSeekingResult,
  ReplayRoomParams,
  ViewCallbacks,
  WhiteWebSdkConfiguration,
} from "white-web-sdk";

import { WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";
import { readable, writable } from "../utils";
import { ensure_window_manager } from "../internal";

class FastboardPlayerBase {
  public constructor(readonly sdk: WhiteWebSdk, readonly player: Player, readonly manager: WindowManager) {}

  protected _destroyed = false;
  protected _assertNotDestroyed() {
    if (this._destroyed) {
      throw new Error("FastboardApp has been destroyed");
    }
  }

  protected _addPlayerListener<K extends keyof PlayerCallbacks>(name: K, listener: PlayerCallbacks[K]) {
    this._assertNotDestroyed();
    this.player.callbacks.on(name, listener);
    return () => this.player.callbacks.off(name, listener);
  }

  protected _addManagerListener<K extends keyof PublicEvent>(
    name: K,
    listener: (value: PublicEvent[K]) => void
  ) {
    this._assertNotDestroyed();
    this.manager.emitter.on(name, listener);
    return () => this.manager.emitter.off(name, listener);
  }

  protected _addMainViewListener<K extends keyof ViewCallbacks>(name: K, listener: ViewCallbacks[K]) {
    this._assertNotDestroyed();
    this.manager.mainView.callbacks.on(name, listener);
    return () => this.manager.mainView.callbacks.off(name, listener);
  }

  public destroy() {
    this._destroyed = true;
    this.manager.destroy();
    return this.player.callbacks.off();
  }
}

type PlayerPhase = `${PlayerPhaseEnum}`;

export type { PlayerPhase, PlayerSeekingResult };

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

  readonly currentTime = writable(
    this.player.progressTime,
    set => this._addPlayerListener("onProgressTimeChanged", set),
    this.player.seekToProgressTime.bind(this.player)
  );

  readonly phase = readable<PlayerPhase>(this.player.phase, set =>
    this._addPlayerListener("onPhaseChanged", set)
  );

  readonly canplay = readable(this.player.isPlayable, set =>
    this._addPlayerListener("onIsPlayableChanged", set)
  );

  private _setSpeed!: (value: number) => void;
  readonly speed = writable(
    this.player.playbackSpeed,
    set => {
      this._setSpeed = set;
    },
    value => {
      this.player.playbackSpeed = value;
      this._setSpeed(value);
    }
  );

  readonly duration = readable(this.player.timeDuration);

  readonly state = readable<PlayerState | null>(null, set =>
    this._addPlayerListener("onPlayerStateChanged", () => set(this.player.state))
  );

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

  setSpeed(value: number) {
    this._assertNotDestroyed();
    this.speed.set(value);
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
}

/**
 * Create a FastboardApp instance.
 * @example
 * let player = await replayFastboard({
 *   sdkConfig: {
 *     appIdentifier: import.meta.env.VITE_APPID,
 *     region: 'cn-hz',
 *   },
 *   replayRoom: {
 *     uid: unique_id,
 *     uuid: import.meta.env.VITE_ROOM_UUID,
 *     roomToken: import.meta.env.VITE_ROOM_TOKEN,
 *   },
 * })
 */
export async function replayFastboard({
  sdkConfig,
  replayRoom: { callbacks, ...replayRoomParams },
  managerConfig,
}: FastboardReplayOptions) {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  const player = await sdk.replayRoom(
    {
      ...ensure_window_manager(replayRoomParams),
      useMultiViews: true,
    },
    callbacks
  );

  const managerPromise = WindowManager.mount({
    cursor: true,
    ...managerConfig,
    room: player,
  });

  player.play();
  const manager = await managerPromise;
  player.pause();
  await player.seekToProgressTime(0);

  return new FastboardPlayer(sdk, player, manager);
}
