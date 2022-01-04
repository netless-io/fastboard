import type { PartialDeep } from "type-fest";
import type {
  Player,
  PlayerCallbacks,
  PlayerSeekingResult,
} from "white-web-sdk";

import { PlayerPhase } from "white-web-sdk";
import { MockCallbacks } from "./callbacks";
import { log } from "./helpers";

export class MockPlayer implements PartialDeep<Player> {
  callbacks = new MockCallbacks<PlayerCallbacks>();

  phase = PlayerPhase.WaitingFirstFrame;
  progressTime = 0;
  timeDuration = 100 * 1000;

  //#region PlayerControl
  setPhase(phase: PlayerPhase) {
    log("(player.setPhase)", phase);
    this.phase = phase;
    this.callbacks.emit("onPhaseChanged", this.phase);
  }

  private targetTime = 0;
  private bufferingTimer = 0;
  private bufferingResolve?: (result: PlayerSeekingResult) => void;
  private bufferingPromise?: Promise<PlayerSeekingResult>;

  async seekToProgressTime(time: number) {
    log("[player.seekToProgressTime]", time);
    this.phase = PlayerPhase.Buffering;
    this.callbacks.emit("onPhaseChanged", this.phase);
    this.targetTime = time;
    if (!this.bufferingPromise) {
      this.bufferingPromise = new Promise<PlayerSeekingResult>(resolve => {
        this.bufferingResolve = result => {
          this.bufferingResolve = this.bufferingPromise = undefined;
          this.progressTime = this.targetTime;
          log("(player.onProgressTimeChanged)", this.progressTime);
          this.callbacks.emit("onProgressTimeChanged", this.progressTime);
          this.phase = PlayerPhase.Playing;
          this.callbacks.emit("onPhaseChanged", this.phase);
          resolve(result);
        };
      });
    }
    clearTimeout(this.bufferingTimer);
    this.bufferingTimer = setTimeout(() => {
      this.bufferingResolve?.("success" as PlayerSeekingResult.Success);
    }, 500);
    return this.bufferingPromise;
  }

  private timer = 0;

  play() {
    log("[player.play]");
    this.phase = PlayerPhase.Playing;
    this.callbacks.emit("onPhaseChanged", this.phase);
    this.replay();
  }

  private replay() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.progressTime < this.timeDuration) {
        if (this.phase === PlayerPhase.Playing) {
          this.progressTime += 100;
          log("(player.onProgressTimeChanged)", this.progressTime);
          this.callbacks.emit("onProgressTimeChanged", this.progressTime);
        }
      } else {
        clearInterval(this.timer);
        this.phase = PlayerPhase.Ended;
        this.callbacks.emit("onPhaseChanged", this.phase);
      }
    }, 100 / this.playbackSpeed);
  }

  pause() {
    log("[player.pause]");
    this.phase = PlayerPhase.Pause;
    this.callbacks.emit("onPhaseChanged", this.phase);
    clearInterval(this.timer);
  }

  private _playbackSpeed = 1;
  get playbackSpeed() {
    return this._playbackSpeed;
  }
  set playbackSpeed(value) {
    this._playbackSpeed = value;
    if (this.phase === PlayerPhase.Playing) this.replay();
  }
  //#endregion
}
