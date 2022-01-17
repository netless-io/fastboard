import { useCallback } from "react";
import { useFastboardApp, useFastboardValue } from "../hooks";

export function useRedoUndo() {
  const app = useFastboardApp();
  const undoSteps = useFastboardValue(app.canUndoSteps);
  const redoSteps = useFastboardValue(app.canRedoSteps);

  const undo = useCallback(() => {
    app.undo();
  }, [app]);

  const redo = useCallback(() => {
    app.redo();
  }, [app]);

  return { redoSteps, undoSteps, redo, undo };
}
