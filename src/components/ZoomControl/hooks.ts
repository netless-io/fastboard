import type { Room, RoomState } from "white-web-sdk";
import type { WindowManager } from "@netless/window-manager";
import { useCallback, useEffect, useState } from "react";
import { clamp } from "../../internal";

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

export function useZoomControl(
  room?: Room | null,
  manager?: WindowManager | null
) {
  const [scale, setScale] = useState(1);

  const resetCamera = useCallback(() => {
    if (manager) {
      manager.mainView.moveCamera({ scale: 1, centerX: 0, centerY: 0 });
    } else if (room) {
      const { scenes, index } = room.state.sceneState;
      if (scenes[index].ppt) {
        room.scalePptToFit();
      } else {
        room.moveCamera({ scale: 1, centerX: 0, centerY: 0 });
      }
    }
  }, [room, manager]);

  const zoomIn = useCallback(() => {
    if (manager) {
      manager.mainView.moveCamera({
        scale: nextScale(scale, 1),
        centerX: 0,
        centerY: 0,
      });
    } else if (room) {
      room.moveCamera({
        scale: nextScale(scale, 1),
        centerX: 0,
        centerY: 0,
      });
    }
  }, [room, manager, scale]);

  const zoomOut = useCallback(() => {
    if (manager) {
      manager.mainView.moveCamera({
        scale: nextScale(scale, -1),
        centerX: 0,
        centerY: 0,
      });
    } else if (room) {
      room.moveCamera({
        scale: nextScale(scale, -1),
        centerX: 0,
        centerY: 0,
      });
    }
  }, [room, manager, scale]);

  useEffect(() => {
    if (manager) {
      setScale(manager.mainView.camera.scale);

      const onCameraUpdated = ({ scale }: { scale: number }) => setScale(scale);

      manager.mainView.callbacks.on("onCameraUpdated", onCameraUpdated);

      return () => {
        manager.mainView.callbacks.off("onCameraUpdated", onCameraUpdated);
      };
    }

    if (room) {
      setScale(room.state.cameraState.scale);

      const onRoomStateChanged = (modifyState: Partial<RoomState>) => {
        if (modifyState.cameraState) {
          setScale(modifyState.cameraState.scale);
        }
      };

      room.callbacks.on("onRoomStateChanged", onRoomStateChanged);

      return () => {
        room.callbacks.off("onRoomStateChanged", onRoomStateChanged);
      };
    }
  }, [room, manager]);

  return { scale, resetCamera, zoomIn, zoomOut };
}
