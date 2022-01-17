import type { Color } from "white-web-sdk";

import clsx from "clsx";
import React, { useContext } from "react";

import { isEqualArray } from "../../../internal";
import { ToolbarContext } from "../Toolbar";

const colors: Record<string, Color> = {
  "#E02020": [224, 32, 32],
  "#F7B500": [247, 181, 0],
  "#6DD400": [109, 212, 0],
  "#32C5FF": [50, 197, 255],
  "#0091FF": [0, 145, 255],
  "#6236FF": [98, 54, 255],
  "#B620E0": [182, 32, 224],
  "#6D7278": [109, 114, 120],
};

const colorKeys = Object.keys(colors);

export function ColorBox() {
  const { theme, memberState, setStrokeColor, writable } = useContext(ToolbarContext);

  const strokeColor = memberState?.strokeColor;
  const disabled = !writable;

  return (
    <div className={clsx("fastboard-toolbar-color-box", theme)}>
      {colorKeys.map((key: string) => (
        <div
          key={key}
          className={clsx("fastboard-toolbar-color-item", theme)}
          onClick={() => setStrokeColor(colors[key])}
        >
          <div
            className={clsx("fastboard-toolbar-color-border", theme, {
              active: strokeColor && isEqualArray(strokeColor, colors[key]),
            })}
          >
            <button
              className={clsx("fastboard-toolbar-color-btn")}
              style={{ background: key }}
              disabled={disabled}
              onClick={ev => {
                ev.stopPropagation();
                setStrokeColor(colors[key]);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
