import type { Player } from "white-web-sdk";
import type { Inputs } from "preact/hooks";

import { useCallback, useEffect, useState } from "preact/hooks";
import { PlayerPhase } from "white-web-sdk";
import { useLastValue } from "../../internal/hooks";

const EMPTY_ARRAY: Inputs = [];

function useForceUpdate() {
  const [, forceUpdate_] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(() => forceUpdate_({}), EMPTY_ARRAY);
}

export function usePlayerControl(player?: Player | null) {
  const togglePlay = useCallback(() => {
    if (player) {
      switch (player.phase) {
        case PlayerPhase.WaitingFirstFrame:
        case PlayerPhase.Pause:
        case PlayerPhase.Ended: {
          player.play();
          break;
        }
        case PlayerPhase.Playing: {
          player.pause();
          break;
        }
      }
    }
  }, [player]);

  const seekToProgressTime = useCallback(
    (time: number) => {
      if (player) {
        player.seekToProgressTime(time);
      }
    },
    [player]
  );

  const lastPlayer = useLastValue(player);

  const forceUpdate = useForceUpdate();

  const setSpeed = useCallback(
    (speed: number) => {
      if (player) {
        player.playbackSpeed = speed;
        forceUpdate();
      }
    },
    [forceUpdate, player]
  );

  useEffect(() => {
    if (!lastPlayer && player) {
      forceUpdate();
    }
  }, [forceUpdate, lastPlayer, player]);

  useEffect(() => {
    if (player) {
      player.callbacks.on("onPhaseChanged", forceUpdate);
      player.callbacks.on("onProgressTimeChanged", forceUpdate);
      return () => {
        player.callbacks.off("onPhaseChanged", forceUpdate);
        player.callbacks.off("onProgressTimeChanged", forceUpdate);
      };
    }
  }, [forceUpdate, player]);

  const phase = player ? player.phase : PlayerPhase.WaitingFirstFrame;
  const currentTime = player ? player.progressTime : 0;
  const totalTime = player ? player.timeDuration : 0;
  const speed = player ? player.playbackSpeed : 1;

  return {
    phase,
    currentTime,
    totalTime,
    speed,
    setSpeed,
    togglePlay,
    seekToProgressTime,
  };
}
