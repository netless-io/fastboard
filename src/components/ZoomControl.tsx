import type { RoomState } from "white-web-sdk";
import type { CommonProps, GenericIcon } from "../types";

import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import Tippy from "@tippyjs/react";

import { clamp } from "../helpers";
import { TopOffset } from "../theme";
import { Icon } from "../icons";
import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { Reset } from "../icons/Reset";

export const name = "fastboard-zoom-control";

export const ScalePoints: readonly number[] = [
  0.10737418240000011, 0.13421772800000012, 0.16777216000000014,
  0.20971520000000016, 0.26214400000000015, 0.3276800000000002,
  0.4096000000000002, 0.5120000000000001, 0.6400000000000001, 0.8, 1, 1.26,
  1.5876000000000001, 2.000376, 2.5204737600000002, 3.1757969376000004,
  4.001504141376, 5.041895218133761, 6.352787974848539, 8.00451284830916, 10,
];

function nextScale(scale: number, delta: 1 | -1) {
  const { length } = ScalePoints;
  const last = length - 1;
  if (scale < ScalePoints[0]) return ScalePoints[0];
  if (scale > ScalePoints[last]) return ScalePoints[last];
  for (let i = 0; i < length; ++i) {
    const curr = ScalePoints[i];
    const prev = i === 0 ? -Infinity : (ScalePoints[i - 1] + curr) / 2;
    const next = i === last ? Infinity : (ScalePoints[i + 1] + curr) / 2;
    if (prev <= scale && scale <= next)
      return ScalePoints[clamp(i + delta, 0, last)];
  }
  return 1;
}

export type ZoomControlProps = CommonProps &
  GenericIcon<"reset" | "minus" | "plus">;

export function ZoomControl({
  room,
  manager,
  theme = "light",
  resetIcon,
  resetIconDisable,
  minusIcon,
  minusIconDisable,
  plusIcon,
  plusIconDisable,
}: ZoomControlProps) {
  const [writable, setWritable] = useState(false);
  const [scale, setScale] = useState(1);

  const resetCamera = useCallback(() => {
    if (room?.isWritable) {
      if (manager) {
        manager.mainView.moveCamera({ scale: 1, centerX: 0, centerY: 0 });
      } else {
        const { scenes, index } = room.state.sceneState;
        if (scenes[index].ppt) {
          room.scalePptToFit();
        } else {
          room.moveCamera({ scale: 1, centerX: 0, centerY: 0 });
        }
      }
    }
  }, [room, manager]);

  const zoomIn = useCallback(() => {
    if (room?.isWritable) {
      if (manager) {
        manager.mainView.moveCamera({
          scale: nextScale(scale, 1),
          centerX: 0,
          centerY: 0,
        });
      } else {
        room.moveCamera({
          scale: nextScale(scale, 1),
          centerX: 0,
          centerY: 0,
        });
      }
    }
  }, [room, manager, scale]);

  const zoomOut = useCallback(() => {
    if (room?.isWritable) {
      if (manager) {
        manager.mainView.moveCamera({
          scale: nextScale(scale, -1),
          centerX: 0,
          centerY: 0,
        });
      } else {
        room.moveCamera({
          scale: nextScale(scale, -1),
          centerX: 0,
          centerY: 0,
        });
      }
    }
  }, [room, manager, scale]);

  useEffect(() => {
    if (room) {
      setWritable(room.isWritable);
      setScale(room.state.cameraState.scale);
    }

    if (manager) {
      setScale(manager.mainView.camera.scale);
    }

    const onRoomStateChanged = (modifyState: Partial<RoomState>) => {
      if (modifyState.cameraState) {
        setScale(modifyState.cameraState.scale);
      }
    };

    const onCameraUpdated = ({ scale }: { scale: number }) => setScale(scale);

    if (room) {
      room.callbacks.on("onEnableWriteNowChanged", setWritable);
      if (manager) {
        manager.mainView.callbacks.on("onCameraUpdated", onCameraUpdated);
      } else {
        room.callbacks.on("onRoomStateChanged", onRoomStateChanged);
      }
    }

    return () => {
      if (room) {
        room.callbacks.off("onEnableWriteNowChanged", setWritable);
        room.callbacks.off("onRoomStateChanged", onRoomStateChanged);
        manager?.mainView.callbacks.off("onCameraUpdated", onCameraUpdated);
      }
    };
  }, [room, manager]);

  const disabled = !writable;

  return (
    <div className={clsx(name, theme)}>
      {/* <span className={clsx(`${name}-cut-line`, theme)} /> */}
      <Tippy
        content="Zoom Out"
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={500}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "minus", theme)}
          disabled={disabled}
          onClick={zoomOut}
        >
          <Icon
            fallback={<Minus theme={theme} />}
            src={disabled ? minusIconDisable : minusIcon}
            alt="[minus]"
          />
        </button>
      </Tippy>
      <span className={clsx(`${name}-scale`, theme)}>
        {Math.ceil(scale * 100)}
      </span>
      <span className={clsx(`${name}-percent`, theme)}>%</span>
      <Tippy
        content="Zoom In"
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={500}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "plus", theme)}
          disabled={disabled}
          onClick={zoomIn}
        >
          <Icon
            fallback={<Plus theme={theme} />}
            src={disabled ? plusIconDisable : plusIcon}
            alt="[plus]"
          />
        </button>
      </Tippy>
      <Tippy
        content="Reset"
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={500}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "reset", theme)}
          disabled={disabled}
          onClick={resetCamera}
        >
          <Icon
            fallback={<Reset theme={theme} />}
            src={disabled ? resetIconDisable : resetIcon}
            alt="[reset]"
          />
        </button>
      </Tippy>
    </div>
  );
}
