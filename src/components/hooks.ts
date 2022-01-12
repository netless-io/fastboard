import type { Room, WindowManager } from "@netless/window-manager";
import { BuiltinApps } from "@netless/window-manager";
import { useEffect, useState } from "react";

export function useWritable(room?: Room | null) {
  const [writable, setWritable] = useState(false);

  useEffect(() => {
    if (room) {
      setWritable(room.isWritable);
      room.isWritable && (room.disableSerialization = false);

      const updateWritable = () => setWritable(room.isWritable);
      room.callbacks.on("onEnableWriteNowChanged", updateWritable);

      return () => {
        room.callbacks.off("onEnableWriteNowChanged", updateWritable);
      };
    }
  }, [room]);

  return writable;
}

export type BoxState = "normal" | "minimized" | "maximized";

export function useBoxState(manager?: WindowManager | null) {
  const [boxState, setBoxState] = useState<BoxState | undefined>();

  useEffect(() => {
    if (manager) {
      setBoxState(manager.boxState);

      manager.emitter.on("boxStateChange", setBoxState);

      return () => {
        manager.emitter.off("boxStateChange", setBoxState);
      };
    }
  }, [manager]);

  return boxState;
}

export function useFocusedApp(manager?: WindowManager | null) {
  const [focused, setFocused] = useState<string | undefined>();

  useEffect(() => {
    if (manager) {
      setFocused(manager.focused);

      manager.emitter.on("focusedChange", setFocused);

      return () => {
        manager.emitter.off("focusedChange", setFocused);
      };
    }
  }, [manager]);

  return focused;
}

export function useMaximized(manager?: WindowManager | null) {
  return useBoxState(manager) === "maximized";
}

export function useHideControls(manager?: WindowManager | null) {
  const maximized = useMaximized(manager);
  const focusedApp = useFocusedApp(manager);

  if (maximized) {
    if (Object.values(BuiltinApps).some(kind => focusedApp?.includes(kind))) {
      return "toolbar-only";
    } else {
      return true;
    }
  }

  return false;
}
