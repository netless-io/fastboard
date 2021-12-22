import type { CommonProps, GenericIcon } from "../types";

import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import Tippy from "@tippyjs/react";

import { Icon } from "../icons";
import { Undo } from "../icons/Undo";
import { Redo } from "../icons/Redo";
import { TopOffset } from "../theme";

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
  const [writable, setWritable] = useState(false);
  const [undoSteps, setUndoSteps] = useState(0);
  const [redoSteps, setRedoSteps] = useState(0);

  useEffect(() => {
    if (room) {
      setWritable(room.isWritable);
      room.isWritable && (room.disableSerialization = false);
      room.callbacks.on("onEnableWriteNowChanged", setWritable);
      room.callbacks.on("onCanUndoStepsUpdate", setUndoSteps);
      room.callbacks.on("onCanRedoStepsUpdate", setRedoSteps);
      return () => {
        room.callbacks.off("onEnableWriteNowChanged", setWritable);
        room.callbacks.off("onCanUndoStepsUpdate", setUndoSteps);
        room.callbacks.off("onCanRedoStepsUpdate", setRedoSteps);
      };
    }
  }, [room]);

  const disabled = !writable;

  return (
    <div className={clsx(name, theme)}>
      <Tippy
        content="Undo"
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={500}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "undo", theme)}
          disabled={disabled || undoSteps === 0}
          onClick={useCallback(() => room && room.undo(), [room])}
        >
          <Icon
            fallback={<Undo theme={theme} />}
            src={undoSteps === 0 ? undoIconDisable : undoIcon}
            alt="[undo]"
          />
        </button>
      </Tippy>
      <Tippy
        content="Redo"
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={500}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "redo", theme)}
          disabled={disabled || redoSteps === 0}
          onClick={useCallback(() => room && room.redo(), [room])}
        >
          <Icon
            fallback={<Redo theme={theme} />}
            src={redoSteps === 0 ? redoIconDisable : redoIcon}
            alt="[redo]"
          />
        </button>
      </Tippy>
    </div>
  );
}
