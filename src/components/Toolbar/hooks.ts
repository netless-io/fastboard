import type {
  ApplianceNames,
  Color,
  MemberState,
  Room,
  RoomState,
  ShapeType,
} from "white-web-sdk";

import { useCallback, useEffect, useState } from "react";

export function useWritable(room?: Room) {
  const [value, setValue] = useState(room?.isWritable || false);

  useEffect(() => {
    if (room) {
      room.callbacks.on("onEnableWriteNowChanged", setValue);
      return () => room.callbacks.off("onEnableWriteNowChanged", setValue);
    }
  }, [room]);

  return value;
}

export function useRoomState(room?: Room) {
  const [memberState, setMemberState] = useState<MemberState | undefined>(
    room?.state.memberState
  );

  useEffect(() => {
    if (room) {
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

export function useToolbar(room?: Room): ToolbarHook {
  const writable = useWritable(room);
  const { memberState } = useRoomState(room);

  const cleanCurrentScene = useCallback(() => {
    if (room?.isWritable) {
      room.cleanCurrentScene();
    }
  }, [room]);

  const setAppliance = useCallback(
    (appliance: ApplianceNames, shape?: ShapeType) => {
      if (room?.isWritable) {
        room.setMemberState({
          currentApplianceName: appliance,
          shapeType: shape,
        });
      }
    },
    [room]
  );

  const setStrokeWidth = useCallback(
    (strokeWidth: number) => {
      if (room?.isWritable) {
        room.setMemberState({ strokeWidth });
      }
    },
    [room]
  );

  const setStrokeColor = useCallback(
    (strokeColor: Color) => {
      if (room?.isWritable) {
        room.setMemberState({ strokeColor });
      }
    },
    [room]
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
