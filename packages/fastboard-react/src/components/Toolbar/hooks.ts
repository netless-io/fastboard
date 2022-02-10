import type { ApplianceNames, Color, MemberState, ShapeType } from "white-web-sdk";

import { useCallback, useState } from "react";

import { noop } from "../../internal";
import { useFastboardApp, useFastboardValue, useWritable } from "../hooks";
import { ShapesMap } from "./const";

export type UnifiedShape = keyof typeof ShapesMap;

export interface ToolbarHook {
  readonly writable: boolean;
  readonly memberState: MemberState | undefined;
  readonly lastShape: UnifiedShape;
  cleanCurrentScene(): void;
  setAppliance(appliance: ApplianceNames, shape?: ShapeType): void;
  setStrokeWidth(width: number): void;
  setStrokeColor(color: Color): void;
}

export function useRoomState() {
  return useFastboardValue(useFastboardApp().memberState);
}

export function useToolbar(): ToolbarHook {
  const app = useFastboardApp();
  const writable = useWritable();
  const memberState = useRoomState();
  const [lastShape, setLastShape] = useState<UnifiedShape>("rectangle" as ApplianceNames.rectangle);

  const cleanCurrentScene = useCallback(() => {
    app.cleanCurrentScene();
  }, [app]);

  const setAppliance = useCallback(
    (appliance: ApplianceNames, shape?: ShapeType) => {
      app.setAppliance(appliance, shape);
      if (shape) {
        setLastShape(shape);
      } else if (appliance in ShapesMap) {
        setLastShape(appliance as UnifiedShape);
      }
    },
    [app]
  );

  const setStrokeWidth = useCallback(
    (strokeWidth: number) => {
      app.setStrokeWidth(strokeWidth);
    },
    [app]
  );

  const setStrokeColor = useCallback(
    (strokeColor: Color) => {
      app.setStrokeColor(strokeColor);
    },
    [app]
  );

  return {
    writable,
    memberState,
    lastShape,
    cleanCurrentScene,
    setAppliance,
    setStrokeWidth,
    setStrokeColor,
  };
}

export const EmptyToolbarHook: ToolbarHook = {
  writable: false,
  memberState: undefined,
  lastShape: "rectangle" as ApplianceNames.rectangle,
  cleanCurrentScene: noop,
  setAppliance: noop,
  setStrokeWidth: noop,
  setStrokeColor: noop,
};
