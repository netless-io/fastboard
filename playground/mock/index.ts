import type { PartialDeep } from "type-fest";
import type { MemberState, Room, SceneDefinition } from "white-web-sdk";
import { ApplianceNames } from "white-web-sdk";
import { MockCallbacks } from "./callbacks";
import { log } from "./helpers";

class MockRoom implements PartialDeep<Room> {
  callbacks = new MockCallbacks();
  isWritable = true;

  setWritable(writable: boolean) {
    this.isWritable = writable;
    this.callbacks.emit("onEnableWriteNowChanged", this.isWritable);
    return Promise.resolve();
  }

  //#region RedoUndo
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

  //#region PageControl
  state = {
    sceneState: {
      index: 0,
      scenes: [{}],
      scenePath: "/init",
    },
    cameraState: {
      scale: 1,
    },
    memberState: {
      currentApplianceName: ApplianceNames.pencil,
      strokeColor: [255, 0, 0],
      strokeWidth: 15,
      textSize: 18,
      bold: false,
      italic: false,
      underline: false,
      lineThrough: false,
    },
  };
  putScenes(path: string, scenes: SceneDefinition[], index?: number) {
    log("[room.putScenes]", path, scenes, index);
    index ??= this.state.sceneState.scenes.length;
    this.state.sceneState.scenes.splice(index, 0, ...scenes);
    this.callbacks.emit("onRoomStateChanged", {
      sceneState: this.state.sceneState,
    });
  }
  pptPreviousStep() {
    log("[room.pptPreviousStep]", this.state.sceneState.index);
    if (this.state.sceneState.index > 0) {
      this.state.sceneState.index--;
      this.callbacks.emit("onRoomStateChanged", {
        sceneState: this.state.sceneState,
      });
    }
  }
  pptNextStep() {
    log("[room.pptNextStep]", this.state.sceneState.index);
    if (this.state.sceneState.index + 1 < this.state.sceneState.scenes.length) {
      this.state.sceneState.index++;
      this.callbacks.emit("onRoomStateChanged", {
        sceneState: this.state.sceneState,
      });
    }
  }
  //#endregion

  //#region ZoomControl
  moveCamera({ scale }: { scale: number }) {
    log("[room.moveCamera]", scale);
    this.state.cameraState.scale = scale;
    this.callbacks.emit("onRoomStateChanged", {
      cameraState: this.state.cameraState,
    });
  }
  //#endregion

  //#region Toolbar
  setMemberState(diff: Partial<MemberState>) {
    log("[room.setMemberState]", JSON.stringify(diff));
    this.state.memberState = { ...this.state.memberState, ...diff };
    this.callbacks.emit("onRoomStateChanged", {
      memberState: this.state.memberState,
    });
    return this.state.memberState;
  }
  cleanCurrentScene() {
    log("[room.cleanCurrentScene]");
  }
  //#endregion
}

export const room = new MockRoom();
