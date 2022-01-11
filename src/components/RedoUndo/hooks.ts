import type { WindowManager, Room } from "@netless/window-manager";
import { useCallback, useEffect, useState } from "react";

export function useRedoUndo(
  room?: Room | null,
  manager?: WindowManager | null
) {
  const [undoSteps, setUndoSteps] = useState(0);
  const [redoSteps, setRedoSteps] = useState(0);

  useEffect(() => {
    if (manager) {
      manager.mainView.callbacks.on("onCanUndoStepsUpdate", setUndoSteps);
      manager.mainView.callbacks.on("onCanRedoStepsUpdate", setRedoSteps);

      return () => {
        manager.mainView.callbacks.off("onCanUndoStepsUpdate", setUndoSteps);
        manager.mainView.callbacks.off("onCanRedoStepsUpdate", setRedoSteps);
      };
    }

    if (room) {
      room.callbacks.on("onCanUndoStepsUpdate", setUndoSteps);
      room.callbacks.on("onCanRedoStepsUpdate", setRedoSteps);

      return () => {
        room.callbacks.off("onCanUndoStepsUpdate", setUndoSteps);
        room.callbacks.off("onCanRedoStepsUpdate", setRedoSteps);
      };
    }
  }, [room, manager]);

  const undo = useCallback(() => {
    if (manager) {
      manager.mainView.undo();
    } else if (room) {
      room.undo();
    }
  }, [manager, room]);

  const redo = useCallback(() => {
    if (manager) {
      manager.mainView.redo();
    } else if (room) {
      room.redo();
    }
  }, [manager, room]);

  return { redoSteps, undoSteps, redo, undo };
}
