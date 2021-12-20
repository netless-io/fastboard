import type { MemoExoticComponent } from "react";
import type { IconProps, Theme } from "../../types";
import type { ContentProps } from "./ToolbarContent";
import type { ToolName } from "./Toolbar";

import Tippy from "@tippyjs/react";
import React, { useContext } from "react";
import { ApplianceNames, ShapeType } from "white-web-sdk";
import { Icons } from "./icons";
import { ToolbarSlider } from "./Slider";
import { ShapesMap, ToolbarContext } from "./Toolbar";
import { ColorBox } from "./ToolbarContent";
import clsx from "clsx";

type ActiveShapeType = {
  currentApplianceName: ToolName | undefined;
  setApplianceShape?: (shape: ToolName | undefined) => void;
};

export function ShapesButton(props: ContentProps) {
  const { theme, methods, currentApplianceName } = useContext(ToolbarContext);
  const { activeTool, setActiveTool } = props;

  return (
    <Tippy
      content={ShapesContent({
        currentApplianceName,
        setApplianceShape: methods?.setAppliance,
      })}
      theme={theme}
      placement="right"
      trigger="click"
      offset={[85, 15]}
      arrow={false}
      interactive
      animation
    >
      <button
        className="button"
        onClick={() => setActiveTool(ApplianceNames.rectangle)}
      >
        {renderIcon(currentApplianceName, {
          theme,
          active: activeTool === ApplianceNames.rectangle,
        })}
        <span className="triangle" />
      </button>
    </Tippy>
  );
}

const renderIcon = (name: ToolName | undefined, props: IconProps) => {
  if (name) {
    const CurrentIcon = ShapesMap[name];
    return CurrentIcon && <CurrentIcon {...props} />;
  } else {
    return ShapesMap.rectangle && <ShapesMap.rectangle {...props} />;
  }
};

const ShapesContent = (props: ActiveShapeType) => {
  const { theme } = useContext(ToolbarContext);
  const { currentApplianceName, setApplianceShape } = props;
  const defaultProps = { theme, currentApplianceName, setApplianceShape };
  return (
    <div className="shapes-wrapper">
      <div className="shapes-container">
        {createShapeButton({
          ...defaultProps,
          name: "rectangle",
          content: "Rectangle",
          Icon: Icons.Rectangle,
        })}
        {createShapeButton({
          ...defaultProps,
          name: ApplianceNames.ellipse,
          content: "Circle",
          Icon: Icons.Circle,
        })}
        {createShapeButton({
          ...defaultProps,
          name: ApplianceNames.straight,
          content: "Line",
          Icon: Icons.Line,
        })}
        {createShapeButton({
          ...defaultProps,
          name: ApplianceNames.arrow,
          content: "Arrow",
          Icon: Icons.Arrow,
        })}
        {createShapeButton({
          ...defaultProps,
          name: ShapeType.Pentagram,
          content: "Star",
          Icon: Icons.Star,
        })}
        {createShapeButton({
          ...defaultProps,
          name: ShapeType.Rhombus,
          content: "Diamond",
          Icon: Icons.Diamond,
        })}
        {createShapeButton({
          ...defaultProps,
          name: ShapeType.SpeechBalloon,
          content: "SpeechBalloon",
          Icon: Icons.SpeechBalloon,
        })}
        {createShapeButton({
          ...defaultProps,
          name: ShapeType.Triangle,
          content: "Triangle",
          Icon: Icons.Triangle,
        })}
      </div>
      <div className={clsx("line", theme)}></div>
      <ToolbarSlider strokeWidth={15} setStrokeWidth={v => console.log(v)} />
      <div className={clsx("line", theme)}></div>
      <div className="color-box">{ColorBox()}</div>
    </div>
  );
};

type CreateShapeButtonProps = {
  content: string;
  name: ToolName;
  theme: Theme;
  Icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
} & ActiveShapeType;

const createShapeButton = (props: CreateShapeButtonProps) => {
  const {
    content,
    name,
    Icon,
    currentApplianceName,
    theme,
    setApplianceShape,
  } = props;
  return (
    <Tippy content={content} placement="auto">
      <button
        className="button"
        key={content}
        onClick={() => setApplianceShape && setApplianceShape(name)}
      >
        <Icon theme={theme} active={currentApplianceName === name} />
      </button>
    </Tippy>
  );
};
