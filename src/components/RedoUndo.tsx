import type { CommonProps, GenericIcon } from "../types";

import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "../icons";
import { Undo } from "../icons/Undo";
import { Redo } from "../icons/Redo";

export const name = "fastboard-redo-undo";

export type RedoUndoProps = CommonProps & GenericIcon<"undo" | "redo">;

export function RedoUndo({
  room,
  theme = "light",
  undoIcon,
  undoIconDisable,
  redoIcon,
  redoIconDisable,
}: RedoUndoProps) {
  const [undoSteps, setUndoSteps] = useState(0);
  const [redoSteps, setRedoSteps] = useState(0);

  useEffect(() => {
    if (room) {
      room.isWritable && (room.disableSerialization = false);
      room.callbacks.on("onCanUndoStepsUpdate", setUndoSteps);
      room.callbacks.on("onCanRedoStepsUpdate", setRedoSteps);
      return () => {
        room.callbacks.off("onCanUndoStepsUpdate", setUndoSteps);
        room.callbacks.off("onCanRedoStepsUpdate", setRedoSteps);
      };
    }
  }, [room]);

  return (
    <div className={clsx(name, theme)}>
      <button
        className={clsx(`${name}-btn`, "undo", theme)}
        disabled={undoSteps === 0}
        onClick={useCallback(() => room && room.undo(), [room])}
      >
        <Icon
          theme={theme}
          Fallback={Undo}
          src={undoSteps === 0 ? undoIconDisable : undoIcon}
          alt="[undo]"
        />
      </button>
      <button
        className={clsx(`${name}-btn`, "redo", theme)}
        disabled={redoSteps === 0}
        onClick={useCallback(() => room && room.redo(), [room])}
      >
        <Icon
          theme={theme}
          Fallback={Redo}
          src={redoSteps === 0 ? redoIconDisable : redoIcon}
          alt="[redo]"
        />
      </button>
    </div>
  );
}
