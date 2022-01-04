import type { Player } from "white-web-sdk";
import type { CommonProps, GenericIcon } from "../../types";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import RcSlider from "rc-slider";
import { PlayerPhase } from "white-web-sdk";
import { usePlayer } from "./hooks";
import { Icon } from "../../icons";
import { themes, TopOffset } from "../../theme";
import { Icons } from "./icons";
import Tippy from "@tippyjs/react";
import { Button } from "./components/Button";

export type PlayerControlProps = {
  autoHide?: boolean;
  player?: Player;
} & Omit<CommonProps, "room"> &
  GenericIcon<"play" | "pause" | "loading">;

export const name = "fastboard-player-control";

export function PlayerControl({
  autoHide = false,
  player: player_,
  theme = "light",
  i18n,
  ...icons
}: PlayerControlProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const player = usePlayer(player_);

  useEffect(() => {
    setCurrentTime(player.currentTime);
  }, [player.currentTime]);

  useEffect(() => {
    if (player.currentTime !== currentTime) {
      player.seekToProgressTime(currentTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  const isLoading =
    player.phase === PlayerPhase.WaitingFirstFrame ||
    player.phase === PlayerPhase.Buffering;
  const isPlaying = player.phase === PlayerPhase.Playing;

  const { activeColor } = themes[theme];

  return (
    <div className={clsx(name, theme, { "auto-hide": autoHide })}>
      <button
        className={clsx(
          `${name}-btn`,
          isLoading ? "loading" : isPlaying ? "pause" : "play",
          theme
        )}
        disabled={isLoading}
        onClick={player.togglePlay}
      >
        <Icon
          fallback={
            isLoading ? (
              <Icons.Loading theme={theme} />
            ) : isPlaying ? (
              <Icons.Pause theme={theme} />
            ) : (
              <Icons.Play theme={theme} />
            )
          }
          src={
            isLoading
              ? icons.loadingIcon
              : isPlaying
              ? icons.pauseIcon
              : icons.playIcon
          }
          alt={isLoading ? "[loading]" : isPlaying ? "[pause]" : "[play]"}
        />
      </button>
      <span className={clsx(`${name}-slider`, { loading: isLoading }, theme)}>
        <RcSlider
          disabled={isLoading}
          trackStyle={{ background: activeColor }}
          handleStyle={{ border: `1px solid ${activeColor}` }}
          value={currentTime}
          onChange={setCurrentTime}
          min={0}
          max={player.totalTime}
          step={100}
        />
      </span>
      <span className={clsx(`${name}-current`, theme)}>
        {renderTime(player.currentTime)}
      </span>
      <span className={clsx(`${name}-slash`, theme)}>/</span>
      <span className={clsx(`${name}-total`, theme)}>
        {renderTime(player.totalTime)}
      </span>
      <span className={`${name}-btn-interactive`}>
        <Tippy
          className="fastboard-tip"
          content={renderSpeeds(player)}
          theme={theme}
          placement="top-end"
          trigger="click"
          offset={TopOffset}
          arrow={false}
          interactive
        >
          <Button content={i18n?.t("speed")} theme={theme} disabled={isLoading}>
            <span className={clsx(`${name}-speed-text`, theme)}>
              {player.speed}x
            </span>
          </Button>
        </Tippy>
      </span>
    </div>
  );
}

function renderTime(ms: number) {
  let seconds = ms / 1000;
  let minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds) % 60;

  return (
    `${String(minutes).padStart(2, "0")}` +
    `:${String(seconds).padStart(2, "0")}`
  );
}

const Speeds = [2.0, 1.5, 1.25, 1.0, 0.75, 0.5];

function renderSpeeds({
  speed: current,
  setSpeed,
}: {
  speed: number;
  setSpeed: (speed: number) => void;
}) {
  return (
    <div className={clsx(`${name}-panel`, "speed")}>
      {Speeds.map(speed => (
        <button
          className={clsx(`${name}-btn`, "speed", {
            active: speed === current,
          })}
          key={speed}
          onClick={() => setSpeed(speed)}
        >
          {speed}x
        </button>
      ))}
    </div>
  );
}
