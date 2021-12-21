import type { MemoExoticComponent } from "react";
import type { IconProps, Theme } from "../../types";
import type { ContentProps } from "./ToolbarContent";
import type { ToolName } from "./Toolbar";

import Tippy from "@tippyjs/react";
import React, { useContext } from "react";
import { ApplianceNames, ShapeType } from "white-web-sdk";
import { Icons } from "./icons";
import { Slider } from "./components/Slider";
import { ShapesMap, ToolbarContext } from "./Toolbar";
import { ColorBox } from "./ToolbarContent";
import clsx from "clsx";

export const ShapeTypes: string[] = Object.values(ShapeType);
export const ShapeAppliances: ToolName[] = [
  "rectangle",
  "ellipse",
  "straight",
  "arrow",
];
export const Shapes = new Set([...ShapeTypes, ...ShapeAppliances]);

type ActiveShapeType = {
  activeTool?: ToolName | undefined;
  setActiveTool?: (shape: ToolName) => void;
};

export function renderShapesButton(props: ContentProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme, currentApplianceName } = useContext(ToolbarContext);
  const { activeTool, setActiveTool } = props;

  const icon = Shapes.has(activeTool) ? activeTool : ApplianceNames.rectangle;
  const active =
    ShapeAppliances.includes(currentApplianceName as ToolName) ||
    currentApplianceName === ApplianceNames.shape;

  return (
    <Tippy
      content={renderShapesContent({ activeTool, setActiveTool })}
      theme={theme}
      placement="right"
      trigger="click"
      offset={[85, 15]}
      arrow={false}
      interactive
      animation
    >
      <button className="button">
        {renderIcon(icon, { theme, active })}
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

const renderShapesContent = (props: ActiveShapeType) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme, methods } = useContext(ToolbarContext);
  const { activeTool, setActiveTool } = props;
  const defaultProps = { theme, activeTool, setActiveTool };
  return (
    <div className="shapes-wrapper">
      <div className="shapes-container">
        {createShapeButton({
          ...defaultProps,
          name: ApplianceNames.rectangle,
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
      <div className={clsx("line", theme)} />
      {methods && (
        <Slider strokeWidth={15} setStrokeWidth={methods.setStrokeWidth} />
      )}
      <div className={clsx("line", theme)} />
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
  const { content, name, Icon, theme, activeTool, setActiveTool } = props;
  return (
    <Tippy content={content} placement="auto">
      <button
        className="button"
        key={content}
        onClick={() => setActiveTool && setActiveTool(name)}
      >
        <Icon theme={theme} active={activeTool === name} />
      </button>
    </Tippy>
  );
};
