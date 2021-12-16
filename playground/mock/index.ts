import type { PartialDeep } from "type-fest";
import type { Room } from "white-web-sdk";
import { MockCallbacks } from "./callbacks";
import { log } from "./helpers";

class MockRoom implements PartialDeep<Room> {
  callbacks = new MockCallbacks();

  //#region RedoUndo
  isWritable = true;
  disableSerialization = false;

  undoStack = { undoSteps: 0, redoSteps: 0 };

  commit() {
    log("(room.commit)", this.undoStack);
    this.undoStack.undoSteps++;
    this.callbacks.emit("onCanUndoStepsUpdate", this.undoStack.undoSteps);
    this.undoStack.redoSteps = 0;
    this.callbacks.emit("onCanRedoStepsUpdate", this.undoStack.redoSteps);
  }
  undo() {
    log("[room.undo]", this.undoStack);
    if (this.undoStack.undoSteps > 0) {
      this.undoStack.undoSteps--;
      this.callbacks.emit("onCanUndoStepsUpdate", this.undoStack.undoSteps);
      this.undoStack.redoSteps++;
      this.callbacks.emit("onCanRedoStepsUpdate", this.undoStack.redoSteps);
    }
    return this.undoStack.undoSteps;
  }
  redo() {
    log("[room.redo]", this.undoStack);
    if (this.undoStack.redoSteps > 0) {
      this.undoStack.redoSteps--;
      this.callbacks.emit("onCanRedoStepsUpdate", this.undoStack.redoSteps);
      this.undoStack.undoSteps++;
      this.callbacks.emit("onCanUndoStepsUpdate", this.undoStack.undoSteps);
    }
    return this.undoStack.undoSteps;
  }
  //#endregion
}

export const room = new MockRoom();
