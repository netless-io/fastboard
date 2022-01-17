import { useCallback } from "react";

import { clamp } from "../../internal";
import { useFastboardApp, useFastboardValue } from "../hooks";

export const ScalePoints: readonly number[] = [
  0.10737418240000011, 0.13421772800000012, 0.16777216000000014, 0.20971520000000016, 0.26214400000000015,
  0.3276800000000002, 0.4096000000000002, 0.5120000000000001, 0.6400000000000001, 0.8, 1, 1.26,
  1.5876000000000001, 2.000376, 2.5204737600000002, 3.1757969376000004, 4.001504141376, 5.041895218133761,
  6.352787974848539, 8.00451284830916, 10,
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
    if (prev <= scale && scale <= next) return ScalePoints[clamp(i + delta, 0, last)];
  }
  return 1;
}

export function useZoomControl() {
  const app = useFastboardApp();
  const scale = useFastboardValue(app.camera).scale || 1;

  const resetCamera = useCallback(() => {
    app.moveCamera({ scale: 1, centerX: 0, centerY: 0 });
  }, [app]);

  const zoomIn = useCallback(() => {
    app.moveCamera({
      scale: nextScale(scale, 1),
      centerX: 0,
      centerY: 0,
    });
  }, [app, scale]);

  const zoomOut = useCallback(() => {
    app.moveCamera({
      scale: nextScale(scale, -1),
      centerX: 0,
      centerY: 0,
    });
  }, [app, scale]);

  return { scale, resetCamera, zoomIn, zoomOut };
}
