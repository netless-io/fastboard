import type { CommonProps, GenericIcon } from "../../typings";

import Tippy from "@tippyjs/react";
import clsx from "clsx";
import React from "react";

import { useTranslation } from "../../i18n";
import { Icon } from "../../icons";
import { Minus } from "../../icons/Minus";
import { Plus } from "../../icons/Plus";
import { Reset } from "../../icons/Reset";
import { TopOffset } from "../../theme";
import { useTheme, useWritable } from "../hooks";
import { useZoomControl } from "./hooks";

export const name = "fastboard-zoom-control";

export type ZoomControlProps = CommonProps & GenericIcon<"reset" | "minus" | "plus">;

export function ZoomControl({
  theme,
  resetIcon,
  resetIconDisable,
  minusIcon,
  minusIconDisable,
  plusIcon,
  plusIconDisable,
}: ZoomControlProps) {
  theme = useTheme(theme);
  const { t } = useTranslation();

  const writable = useWritable();
  const { scale, resetCamera, zoomIn, zoomOut } = useZoomControl();

  const disabled = !writable;

  return (
    <div className={clsx(name, theme)}>
      {/* <span className={clsx(`${name}-cut-line`, theme)} /> */}
      <Tippy
        className="fastboard-tip"
        content={t("zoomOut")}
        theme={theme}
        disabled={disabled}
        placement="top"
        delay={[1000, 400]}
        duration={300}
        offset={TopOffset}
      >
        <button className={clsx(`${name}-btn`, "minus", theme)} disabled={disabled} onClick={zoomOut}>
          <Icon
            fallback={<Minus theme={theme} />}
            src={disabled ? minusIconDisable : minusIcon}
            alt="[minus]"
          />
        </button>
      </Tippy>
      <span className={clsx(`${name}-text`, theme)}>
        <span className={clsx(`${name}-scale`, theme)}>{Math.ceil(scale * 100)}</span>
        <span className={clsx(`${name}-percent`, theme)}>%</span>
      </span>
      <Tippy
        className="fastboard-tip"
        content={t("zoomIn")}
        theme={theme}
        disabled={disabled}
        placement="top"
        delay={[1000, 400]}
        duration={300}
        offset={TopOffset}
      >
        <button className={clsx(`${name}-btn`, "plus", theme)} disabled={disabled} onClick={zoomIn}>
          <Icon fallback={<Plus theme={theme} />} src={disabled ? plusIconDisable : plusIcon} alt="[plus]" />
        </button>
      </Tippy>
      <Tippy
        className="fastboard-tip"
        content={t("reset")}
        theme={theme}
        disabled={disabled}
        placement="top"
        delay={[1000, 400]}
        duration={300}
        offset={TopOffset}
      >
        <button className={clsx(`${name}-btn`, "reset", theme)} disabled={disabled} onClick={resetCamera}>
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
