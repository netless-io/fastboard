import type {
  ApplianceNames,
  Color,
  MemberState,
  Room,
  RoomState,
  ShapeType,
} from "white-web-sdk";
import type { WindowManager } from "@netless/window-manager";
import { useCallback, useEffect, useState } from "preact/hooks";

import { noop } from "../../internal";
import { useWritable } from "../hooks";

export function useRoomState(room?: Room | null) {
  const [memberState, setMemberState] = useState<MemberState | undefined>(
    undefined
  );

  useEffect(() => {
    if (room) {
      setMemberState(room.state.memberState);
      const onRoomStateChanged = (diff: Partial<RoomState>) => {
        if (diff.memberState) setMemberState(diff.memberState);
      };
      room.callbacks.on("onRoomStateChanged", onRoomStateChanged);
      return () => room.callbacks.off("onRoomStateChanged", onRoomStateChanged);
    }
  }, [room]);

  return { memberState };
}

export interface ToolbarHook {
  readonly writable: boolean;
  readonly memberState: MemberState | undefined;
  cleanCurrentScene(): void;
  setAppliance(appliance: ApplianceNames, shape?: ShapeType): void;
  setStrokeWidth(width: number): void;
  setStrokeColor(color: Color): void;
}

export function useToolbar(
  room?: Room | null,
  manager?: WindowManager | null
): ToolbarHook {
  const writable = useWritable(room);
  const { memberState } = useRoomState(room);

  const cleanCurrentScene = useCallback(() => {
    if (manager) {
      manager.mainView.cleanCurrentScene();
    } else if (room) {
      room.cleanCurrentScene();
    }
  }, [manager, room]);

  const setAppliance = useCallback(
    (appliance: ApplianceNames, shape?: ShapeType) => {
      const memberState = {
        currentApplianceName: appliance,
        shapeType: shape,
      };
      if (manager) {
        manager.mainView.setMemberState(memberState);
      } else if (room) {
        room.setMemberState(memberState);
      }
    },
    [manager, room]
  );

  const setStrokeWidth = useCallback(
    (strokeWidth: number) => {
      if (manager) {
        manager.mainView.setMemberState({ strokeWidth });
      } else if (room) {
        room.setMemberState({ strokeWidth });
      }
    },
    [manager, room]
  );

  const setStrokeColor = useCallback(
    (strokeColor: Color) => {
      if (manager) {
        manager.mainView.setMemberState({ strokeColor });
      } else if (room) {
        room.setMemberState({ strokeColor });
      }
    },
    [manager, room]
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
