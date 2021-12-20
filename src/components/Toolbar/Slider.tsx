import Slider from "rc-slider";
import React, { useContext, useState } from "react";
import { themes } from "../../theme";
import { ToolbarContext } from "./Toolbar";

export interface ToolbarSliderProps {
  strokeWidth: number;
  setStrokeWidth?: (value: number) => void;
}

export function ToolbarSlider(props: ToolbarSliderProps) {
  const { theme } = useContext(ToolbarContext);
  const [value] = useState(props.strokeWidth);
  const config = themes[theme];
  return (
    <Slider
      className="pencil-slider slider"
      trackStyle={{
        background: config.activeColor,
      }}
      handleStyle={{
        border: `1px solid ${config.activeColor}`,
      }}
      value={value}
      onChange={props.setStrokeWidth}
    />
  );
}
