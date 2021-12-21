import RcSlider from "rc-slider";
import React, { useContext } from "react";

import { themes } from "../../../theme";
import { ToolbarContext } from "../Toolbar";

interface SliderProps {
  strokeWidth: number;
  setStrokeWidth: (value: number) => void;
}

export function Slider(props: SliderProps) {
  const { theme } = useContext(ToolbarContext);
  const { activeColor } = themes[theme];
  return (
    <RcSlider
      className="pencil-slider slider"
      trackStyle={{ background: activeColor }}
      handleStyle={{ border: `1px solid ${activeColor}` }}
      value={props.strokeWidth}
      onChange={props.setStrokeWidth}
    />
  );
}
