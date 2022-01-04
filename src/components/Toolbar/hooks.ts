import type {
  ApplianceNames,
  Color,
  MemberState,
  Room,
  RoomState,
  ShapeType,
} from "white-web-sdk";

import { useCallback, useEffect, useState } from "react";
import { noop } from "../../internal";

export function useWritable(room?: Room | null) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (room) {
      const setWritable = () => setValue(room.isWritable);
      setWritable();
      room.callbacks.on("onEnableWriteNowChanged", setWritable);
      return () => room.callbacks.off("onEnableWriteNowChanged", setWritable);
    }
  }, [room]);

  return value;
}

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

export function useToolbar(room?: Room | null): ToolbarHook {
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

export const EmptyToolbarHook: ToolbarHook = {
  writable: false,
  memberState: undefined,
  cleanCurrentScene: noop,
  setAppliance: noop,
  setStrokeWidth: noop,
  setStrokeColor: noop,
};
