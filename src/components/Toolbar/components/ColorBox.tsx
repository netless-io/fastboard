import type { Color } from "white-web-sdk";

import clsx from "clsx";
import React from "react";
import { useContext } from "react";
import { isEqualArray } from "../../../helpers";
import { ToolbarContext } from "../Toolbar";

const colors: Record<string, Color> = {
  white: [255, 255, 255],
  black: [0, 0, 0],
  red: [255, 0, 0],
  blue: [0, 0, 255],
  green: [0, 255, 0],
  yellow: [255, 255, 0],
  orange: [255, 255, 127],
  purple: [255, 0, 255],
};

const colorKeys = Object.keys(colors);

export function ColorBox() {
  const { theme, memberState, setStrokeColor, writable } =
    useContext(ToolbarContext);

  const strokeColor = memberState?.strokeColor;
  const disabled = !writable;

  return (
    <div className="fastboard-toolbar-color-box">
      {colorKeys.map((key: string) => (
        <div key={key} className="fastboard-toolbar-color-item">
          <div
            className={clsx("fastboard-toolbar-color-border", theme, {
              active: strokeColor && isEqualArray(strokeColor, colors[key]),
            })}
          >
            <button
              className={clsx("fastboard-toolbar-color-btn")}
              style={{ background: key }}
              disabled={disabled}
              onClick={() => setStrokeColor(colors[key])}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
