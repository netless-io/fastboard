import type { ApplianceNames, Color, MemberState, ShapeType } from "white-web-sdk";

import { useCallback } from "react";

import { noop } from "../../internal";
import { useFastboardApp, useFastboardValue, useWritable } from "../hooks";

export interface ToolbarHook {
  readonly writable: boolean;
  readonly memberState: MemberState | undefined;
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

  const cleanCurrentScene = useCallback(() => {
    app.cleanCurrentScene();
  }, [app]);

  const setAppliance = useCallback(
    (appliance: ApplianceNames, shape?: ShapeType) => {
      app.setAppliance(appliance, shape);
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
    cleanCurrentScene,
    setAppliance,
    setStrokeWidth,
    setStrokeColor,
  };
}

export const EmptyToolbarHook: ToolbarHook = {
  writable: false,
  memberState: undefined,
  cleanCurrentScene: noop,
  setAppliance: noop,
  setStrokeWidth: noop,
  setStrokeColor: noop,
};
