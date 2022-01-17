import type { CommonProps, GenericIcon } from "../../typings";

import Tippy from "@tippyjs/react";
import clsx from "clsx";
import React from "react";

import { useTranslation } from "../../i18n";
import { Icon } from "../../icons";
import { Redo } from "../../icons/Redo";
import { Undo } from "../../icons/Undo";
import { TopOffset } from "../../theme";
import { useTheme, useWritable } from "../hooks";
import { useRedoUndo } from "./hooks";

export const name = "fastboard-redo-undo";

export type RedoUndoProps = CommonProps & GenericIcon<"undo" | "redo">;

export function RedoUndo({ theme, undoIcon, undoIconDisable, redoIcon, redoIconDisable }: RedoUndoProps) {
  theme = useTheme(theme);
  const { t } = useTranslation();

  const writable = useWritable();
  const { redoSteps, undoSteps, redo, undo } = useRedoUndo();

  const disabled = !writable;

  return (
    <div className={clsx(name, theme)}>
      <Tippy
        className="fastboard-tip"
        content={t("undo")}
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
        content={t("redo")}
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
