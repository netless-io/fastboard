import type { IconProps } from "../../../types";

import Tippy from "@tippyjs/react";
import React, { useContext } from "react";
import type { ShapeType } from "white-web-sdk";
import { ApplianceNames } from "white-web-sdk";

import { capitalize } from "../../../helpers";
import { ApplianceShapes, PanelRightOffset, Shapes, ShapesMap } from "../const";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { Button } from "./Button";
import { CutLine } from "./CutLine";
import { Slider } from "./Slider";
import { ColorBox } from "./ColorBox";

const ShapeTypes = new Set([...ApplianceShapes, ...Shapes]);

export function ShapesButton() {
  const { theme, memberState } = useContext(ToolbarContext);

  const appliance = memberState?.currentApplianceName;
  const shape = memberState?.shapeType;

  const key = (
    appliance === ApplianceNames.shape ? shape : appliance
  ) as keyof typeof ShapesMap;

  const active = ShapeTypes.has(key);

  const CurrentIcon = ShapesMap[key] || Icons.Rectangle;

  return (
    <Tippy
      content={renderShapesButtonContent()}
      theme={theme}
      placement="right-start"
      trigger="click"
      offset={PanelRightOffset}
      arrow={false}
      interactive
    >
      <Button content="Shape" active={active}>
        <CurrentIcon theme={theme} active={active} />
        <span className="fastboard-toolbar-triangle" />
      </Button>
    </Tippy>
  );
}

function renderShapesButtonContent() {
  return (
    <div className="fastboard-toolbar-panel">
      <ShapesBox />
      <CutLine />
      <Slider />
      <CutLine />
      <ColorBox />
    </div>
  );
}

export function ShapesBox() {
  return (
    <div className="fastboard-toolbar-shapes">
      {ApplianceShapes.map(Appliance => (
        <ApplianceShapeButton
          key={Appliance}
          content={capitalize(Appliance)}
          Appliance={Appliance}
          Icon={ShapesMap[Appliance]}
        />
      ))}
      {Shapes.map(shape => (
        <ShapeShapeButton
          key={shape}
          content={capitalize(shape)}
          shape={shape}
          Icon={ShapesMap[shape]}
        />
      ))}
    </div>
  );
}

interface ApplianceShapeButtonProps {
  content: string;
  Appliance: ApplianceNames;
  Icon: React.ComponentType<IconProps>;
}

function ApplianceShapeButton({
  content,
  Appliance,
  Icon,
}: ApplianceShapeButtonProps) {
  const { theme, writable, setAppliance, memberState } =
    useContext(ToolbarContext);

  const current = memberState?.currentApplianceName;
  const disabled = !writable;

  return (
    <Button
      content={content}
      disabled={disabled}
      placement="top"
      onClick={() => setAppliance(Appliance)}
    >
      <Icon theme={theme} active={current === Appliance} />
    </Button>
  );
}

interface ShapeShapeButtonProps {
  content: string;
  shape: ShapeType;
  Icon: React.ComponentType<IconProps>;
}

function ShapeShapeButton({ content, shape, Icon }: ShapeShapeButtonProps) {
  const { theme, writable, setAppliance, memberState } =
    useContext(ToolbarContext);

  const appliance = memberState?.currentApplianceName;
  const current = appliance === ApplianceNames.shape && memberState?.shapeType;
  const disabled = !writable;

  return (
    <Button
      content={content}
      disabled={disabled}
      placement="top"
      onClick={() => setAppliance(ApplianceNames.shape, shape)}
    >
      <Icon theme={theme} active={current === shape} />
    </Button>
  );
}
