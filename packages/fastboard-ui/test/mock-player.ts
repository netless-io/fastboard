/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FastboardPlayer, PlayerPhase, PlayerSeekingResult } from "@netless/fastboard-core";
import type { Writable } from "svelte/store";
import type { PartialDeep } from "type-fest";
import { get, writable } from "svelte/store";

export interface MockPlayer {
  canplay: Writable<boolean>;
  currentTime: Writable<number>;
  phase: Writable<PlayerPhase>;
  speed: Writable<number>;
}

export function mockPlayer(): [player: FastboardPlayer, mock: MockPlayer] {
  const canplay = writable(false);
  const currentTime = writable(0);
  const duration = writable(0);
  const phase = writable<PlayerPhase>("waitingFirstFrame");
  const speed = writable(1);

  let timer = 0;

  const player: PartialDeep<FastboardPlayer> = {
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
    playbackRate: speed,
    play() {
      phase.set("playing");
      replay();
    },
    pause() {
      clearInterval(timer);
      timer = 0;
      phase.set("pause");
    },
    seek(t) {
      console.log("seek", t);
      currentTime.set(t);
      return Promise.resolve("success" as PlayerSeekingResult);
    },
    setPlaybackRate(s) {
      console.log("set speed", s);
      speed.set(s);
    },
  };

  phase.subscribe(value => {
    (player.player as any).phase = value;
  });

  speed.subscribe(() => {
    if (timer) {
      replay();
    }
  });

  setTimeout(() => {
    duration.set((12 * 60 + 34) * 1000);
    canplay.set(true);
    phase.set("pause");
  }, 1000);

  return [player as FastboardPlayer, { canplay, currentTime, phase, speed }];

  function replay() {
    clearInterval(timer);
    timer = setInterval(
      () => {
        currentTime.update(e => {
          e += 500;
          if (e > get(duration)) {
            clearInterval(timer);
            timer = 0;
            phase.set("pause");
            return 0;
          }
          return e;
        });
      },
      500 / get(speed)
    );
  }
}
