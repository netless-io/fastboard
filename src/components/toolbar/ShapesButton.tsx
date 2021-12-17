import React, { useEffect } from "react";
import Tippy from "@tippyjs/react";
import { ColorBox } from "./ToolbarContent";
import { Icons } from "./icons";
import { ToolbarContext } from "./Toolbar";
import { ToolbarSlider } from "./Slider";
import { useContext, useState } from "react";
import type { MemoExoticComponent } from "react";
import type { ContentProps } from "./ToolbarContent";
import type { IconProps, Theme } from "../../types";
import { ApplianceNames } from "white-web-sdk";

const ShapesMap: {
  [key: string]: MemoExoticComponent<(props: IconProps) => JSX.Element>;
} = {
  Rectangle: Icons.Rectangle,
  Circle: Icons.Circle,
  Line: Icons.Line,
  Arrow: Icons.Arrow,
  Star: Icons.Star,
  Diamond: Icons.Diamond,
  Triangle: Icons.Triangle,
  SpeechBalloon: Icons.SpeechBalloon,
};

export const ShapesButton = (props: ContentProps) => {
  const { theme } = useContext(ToolbarContext);
  const { activeTool, setActiveTool } = props;
  const [activeShape, setActiveShape] = useState("Rectangle");

  useEffect(() => {
    console.log("activeShape", activeShape);
  }, [activeShape]);

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

const renderIcon = (name: string, props: IconProps) => {
  const CurrentIcon = ShapesMap[name];
  return CurrentIcon && <CurrentIcon {...props} />;
};

type RenderShapesContentProps = {
  activeShape: string;
  setActiveShape: React.Dispatch<React.SetStateAction<string>>;
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
          name: "Rectangle",
          content: "Rectangle",
          Icon: Icons.Rectangle,
        })}
        {createShapeButton({
          ...defaultProps,
          name: "Circle",
          content: "Circle",
          Icon: Icons.Circle,
        })}
        {createShapeButton({
          ...defaultProps,
          name: "Line",
          content: "Line",
          Icon: Icons.Line,
        })}
        {createShapeButton({
          ...defaultProps,
          name: "Arrow",
          content: "Arrow",
          Icon: Icons.Arrow,
        })}
        {createShapeButton({
          ...defaultProps,
          name: "Star",
          content: "Star",
          Icon: Icons.Star,
        })}
        {createShapeButton({
          ...defaultProps,
          name: "Diamond",
          content: "Diamond",
          Icon: Icons.Diamond,
        })}
        {createShapeButton({
          ...defaultProps,
          name: "SpeechBalloon",
          content: "SpeechBalloon",
          Icon: Icons.SpeechBalloon,
        })}
        {createShapeButton({
          ...defaultProps,
          name: "Triangle",
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
  name: string;
  theme: Theme;
  Icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  activeShape: string;
  setActiveShape: React.Dispatch<React.SetStateAction<string>>;
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
