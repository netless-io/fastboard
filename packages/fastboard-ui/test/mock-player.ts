import type { FastboardPlayer, PlayerPhase, PlayerSeekingResult } from "@netless/fastboard-core";
import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";

export interface MockPlayer {
  canplay: Writable<boolean>;
  currentTime: Writable<number>;
  phase: Writable<PlayerPhase>;
  ready: Writable<boolean>;
  speed: Writable<number>;
}

export function mockPlayer(): [player: FastboardPlayer, mock: MockPlayer] {
  const canplay = writable(false);
  const currentTime = writable(0);
  const duration = writable(0);
  const phase = writable<PlayerPhase>("waitingFirstFrame" as PlayerPhase.WaitingFirstFrame);
  const ready = writable(false);
  const playbackRate = writable(1);

  let timer = 0;

  const player = {
    manager: {
      setPrefersColorScheme(scheme) {
        console.log("setPrefersColorScheme", scheme);
      },
    },
    bindContainer(el) {
      el.style.cssText = "display: flex; align-items: center; justify-content: center;";
      el.textContent = "whiteboard container";
    },
    canplay: { subscribe: canplay.subscribe },
    player: {
      phase: "waitingFirstFrame" as any,
    },
    currentTime,
    duration: { subscribe: duration.subscribe },
    phase: { subscribe: phase.subscribe as any },
    playbackRate,
    play() {
      phase.set("playing" as PlayerPhase.Playing);
      replay();
    },
    pause() {
      clearInterval(timer);
      timer = 0;
      phase.set("pause" as PlayerPhase.Pause);
    },
    seek(t) {
      console.log("seek", t);
      currentTime.set(t);
      return Promise.resolve("success" as PlayerSeekingResult);
    },
    setPlaybackRate(s) {
      console.log("set speed", s);
      playbackRate.set(s);
    },
  };

  phase.subscribe(value => {
    (player.player as any).phase = value;
  });

  playbackRate.subscribe(() => {
    if (timer) replay();
  });

  setTimeout(() => {
    duration.set((12 * 60 + 34) * 1000);
    canplay.set(true);
    phase.set("pause" as PlayerPhase.Pause);
  }, 1000);

  return [player as unknown as FastboardPlayer, { canplay, currentTime, phase, ready, speed: playbackRate }];

  function replay() {
    clearInterval(timer);
    timer = setInterval(() => {
      currentTime.update(e => {
        e += 500;
        if (e > get(duration)) {
          clearInterval(timer);
          timer = 0;
          phase.set("pause" as PlayerPhase.Pause);
          return 0;
        }
        return e;
      });
    }, 500 / get(playbackRate));
  }
}
