import Tippy from "@tippyjs/react";
import clsx from "clsx";
import React, { useCallback } from "react";
import { useContext } from "react";
import type { Color } from "white-web-sdk";
import { ApplianceNames } from "white-web-sdk";

import { Icon } from "../../../icons";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { CutLine } from "./CutLine";
import { Slider } from "./Slider";

const PanelRightOffset = [55, 15] as [number, number];

export function PencilButton() {
  const { theme, icons, writable, setAppliance, memberState } =
    useContext(ToolbarContext);

  const changeAppliance = useCallback(() => {
    setAppliance(ApplianceNames.pencil);
  }, [setAppliance]);

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.pencil;
  const disabled = !writable;

  return (
    <Tippy
      content={renderPencilButtonContent()}
      theme={theme}
      placement="right"
      trigger="click"
      offset={PanelRightOffset}
      arrow={false}
      interactive
    >
      <button
        className={clsx("fastboard-toolbar-btn", theme, { active })}
        disabled={!writable || disabled}
        onClick={changeAppliance}
      >
        <Icon
          fallback={<Icons.Pencil theme={theme} active={active} />}
          src={disabled ? icons?.pencilIconDisable : icons?.pencilIcon}
          alt="[pencil]"
        />
      </button>
    </Tippy>
  );
}

function renderPencilButtonContent() {
  return (
    <div className="fastboard-toolbar-panel">
      <Slider />
      <CutLine />
      <ColorBox />
    </div>
  );
}

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

function ColorBox() {
  const { theme, memberState, setStrokeColor, writable } =
    useContext(ToolbarContext);

  const strokeColor = memberState?.strokeColor;
  const disabled = !writable;

  return (
    <div className="fastboard-toolbar-color-box">
      {colorKeys.map((color: string) => (
        <div key={color} className="fastboard-toolbar-color-item">
          <div
            className={clsx(
              "fastboard-toolbar-color-border",
              { active: strokeColor === colors[color] },
              theme
            )}
          >
            <button
              className={clsx("fastboard-toolbar-color-btn")}
              style={{ background: color }}
              disabled={disabled}
              onClick={() => setStrokeColor(colors[color])}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
