import type { CommonProps, GenericIcon } from "../../types";

import clsx from "clsx";
import React from "react";
import Tippy from "@tippyjs/react";

import { TopOffset } from "../../theme";
import { Icon } from "../../icons";
import { Minus } from "../../icons/Minus";
import { Plus } from "../../icons/Plus";
import { Reset } from "../../icons/Reset";
import { useWritable } from "../hooks";
import { useZoomControl } from "./hooks";

export const name = "fastboard-zoom-control";

export type ZoomControlProps = CommonProps &
  GenericIcon<"reset" | "minus" | "plus">;

export function ZoomControl({
  room,
  manager,
  theme = "light",
  resetIcon,
  resetIconDisable,
  minusIcon,
  minusIconDisable,
  plusIcon,
  plusIconDisable,
  i18n,
}: ZoomControlProps) {
  const writable = useWritable(room);
  const { scale, resetCamera, zoomIn, zoomOut } = useZoomControl(room, manager);

  const disabled = !writable;

  return (
    <div className={clsx(name, theme)}>
      {/* <span className={clsx(`${name}-cut-line`, theme)} /> */}
      <Tippy
        className="fastboard-tip"
        content={i18n?.t("zoomOut")}
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={300}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "minus", theme)}
          disabled={disabled}
          onClick={zoomOut}
        >
          <Icon
            fallback={<Minus theme={theme} />}
            src={disabled ? minusIconDisable : minusIcon}
            alt="[minus]"
          />
        </button>
      </Tippy>
      <span className={clsx(`${name}-scale`, theme)}>
        {Math.ceil(scale * 100)}
      </span>
      <span className={clsx(`${name}-percent`, theme)}>%</span>
      <Tippy
        className="fastboard-tip"
        content={i18n?.t("zoomIn")}
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={300}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "plus", theme)}
          disabled={disabled}
          onClick={zoomIn}
        >
          <Icon
            fallback={<Plus theme={theme} />}
            src={disabled ? plusIconDisable : plusIcon}
            alt="[plus]"
          />
        </button>
      </Tippy>
      <Tippy
        className="fastboard-tip"
        content={i18n?.t("reset")}
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={300}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "reset", theme)}
          disabled={disabled}
          onClick={resetCamera}
        >
          <Icon
            fallback={<Reset theme={theme} />}
            src={disabled ? resetIconDisable : resetIcon}
            alt="[reset]"
          />
        </button>
      </Tippy>
    </div>
  );
}
