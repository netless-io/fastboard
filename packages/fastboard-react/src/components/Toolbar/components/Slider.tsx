import clsx from "clsx";
import RcSlider from "rc-slider";
import React, { useContext } from "react";

import { themes } from "../../../theme";
import { ToolbarContext } from "../Toolbar";

export function Slider() {
  const { theme, writable, memberState, setStrokeWidth } = useContext(ToolbarContext);
  const { activeColor } = themes[theme];

  const strokeWidth = memberState?.strokeWidth || 0;

  return (
    <RcSlider
      disabled={!writable}
      className={clsx("fastboard-toolbar-slider", theme)}
      trackStyle={{ background: activeColor }}
      handleStyle={{ border: `1px solid ${activeColor}` }}
      value={strokeWidth}
      onChange={setStrokeWidth}
      min={1}
      max={32}
    />
  );
}
