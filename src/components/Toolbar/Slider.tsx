import React from "react";
import Slider from "rc-slider/lib/Slider";
import { themes } from "../../theme";
import { ToolbarContext } from "./Toolbar";
import { useContext } from "react";
import { useState } from "react";

export type ToolbarSlideProps = {
  setStrokeWidth: (value: number) => void;
  strokeWidth: number;
};

export const ToolbarSlider = (props: ToolbarSlideProps) => {
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
      onChange={v => props.setStrokeWidth(v)}
    />
  );
};
