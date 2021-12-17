import React, { useEffect } from "react";
import Tippy from "@tippyjs/react";
import { ColorBox } from "./ToolbarContent";
import { Icons } from "./icons";
import { ShapesMap, ToolbarContext, type ToolName } from "./Toolbar";
import { ToolbarSlider } from "./Slider";
import { useContext, useState } from "react";
import type { MemoExoticComponent } from "react";
import type { ContentProps } from "./ToolbarContent";
import type { IconProps, Theme } from "../../types";
import { ApplianceNames, ShapeType } from "white-web-sdk";

export const ShapesButton = (props: ContentProps) => {
  const { theme, methods } = useContext(ToolbarContext);
  const { activeTool, setActiveTool } = props;
  const [activeShape, setActiveShape] = useState<ToolName>(
    ApplianceNames.rectangle
  );

  useEffect(() => {
    methods?.setAppliance(activeShape);
    console.log("activeShape", activeShape);
  }, [activeShape, methods]);

  return (
    <Tippy
      content={ShapesContent({
        activeShape,
        setActiveShape,
      })}
      theme={theme}
      placement="right"
      trigger="click"
      offset={[85, 15]}
      arrow={false}
      interactive={true}
      animation={true}
    >
      <button
        className="button"
        onClick={() => setActiveTool(ApplianceNames.rectangle)}
      >
        {renderIcon(activeShape, {
          theme,
          active: activeTool === ApplianceNames.rectangle,
        })}
        <span className="triangle"></span>
      </button>
    </Tippy>
  );
};

const renderIcon = (name: ToolName, props: IconProps) => {
  const CurrentIcon = ShapesMap[name];
  return CurrentIcon && <CurrentIcon {...props} />;
};

type RenderShapesContentProps = {
  activeShape: string;
  setActiveShape: React.Dispatch<React.SetStateAction<ToolName>>;
};

const ShapesContent = (props: RenderShapesContentProps) => {
  const { theme } = useContext(ToolbarContext);
  const { activeShape, setActiveShape } = props;
  const defaultProps = { theme, activeShape, setActiveShape };
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
      <div className="line"></div>
      <ToolbarSlider strokeWidth={15} setStrokeWidth={v => console.log(v)} />
      <div className="line"></div>
      <div className="color-box">{ColorBox()}</div>
    </div>
  );
};

type CreateShapeButtonProps = {
  content: string;
  name: ToolName;
  theme: Theme;
  Icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  activeShape: string;
  setActiveShape: React.Dispatch<React.SetStateAction<ToolName>>;
};

const createShapeButton = (props: CreateShapeButtonProps) => {
  const { content, name, Icon, activeShape, setActiveShape, theme } = props;
  return (
    <Tippy content={content} placement="auto">
      <button
        className="button"
        key={content}
        onClick={() => setActiveShape(name)}
      >
        <Icon theme={theme} active={activeShape === name} />
      </button>
    </Tippy>
  );
};
