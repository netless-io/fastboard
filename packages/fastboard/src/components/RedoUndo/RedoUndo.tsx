import type { CommonProps, GenericIcon } from "../../types";

import clsx from "clsx";

import { Icon } from "../../icons";
import { Redo } from "../../icons/Redo";
import { Undo } from "../../icons/Undo";
import { TopOffset } from "../../theme";
import { useWritable } from "../hooks";
import { Tippy } from "../Tippy";
import { useRedoUndo } from "./hooks";

export const name = "fastboard-redo-undo";

export type RedoUndoProps = CommonProps & GenericIcon<"undo" | "redo">;

export function RedoUndo({
  room,
  manager,
  theme = "light",
  undoIcon,
  undoIconDisable,
  redoIcon,
  redoIconDisable,
  i18n,
}: RedoUndoProps) {
  const writable = useWritable(room);
  const { redoSteps, undoSteps, redo, undo } = useRedoUndo(room, manager);

  const disabled = !writable;

  return (
    <div className={clsx(name, theme)}>
      <Tippy
        className="fastboard-tip"
        content={i18n?.t("undo")}
        theme={theme}
        disabled={disabled}
        placement="top"
        delay={[1000, 400]}
        duration={300}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "undo", theme)}
          disabled={disabled || undoSteps === 0}
          onClick={undo}
        >
          <Icon
            fallback={<Undo theme={theme} />}
            src={undoSteps === 0 ? undoIconDisable : undoIcon}
            alt="[undo]"
          />
        </button>
      </Tippy>
      <Tippy
        className="fastboard-tip"
        content={i18n?.t("redo")}
        theme={theme}
        disabled={disabled}
        placement="top"
        delay={[1000, 400]}
        duration={300}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "redo", theme)}
          disabled={disabled || redoSteps === 0}
          onClick={redo}
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
