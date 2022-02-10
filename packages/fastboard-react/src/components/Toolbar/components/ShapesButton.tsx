import type { ShapeType } from "white-web-sdk";
import type { IconProps } from "../../../typings";

import Tippy from "@tippyjs/react";
import React, { useContext } from "react";
import { ApplianceNames } from "white-web-sdk";

import { useTranslation } from "../../../i18n";
import { RightOffset } from "../../../theme";
import { ApplianceShapes, Shapes, ShapesMap } from "../const";
import { ToolbarContext } from "../Toolbar";
import { Button } from "./Button";
import { ColorBox } from "./ColorBox";
import { CutLine } from "./CutLine";
import { Slider } from "./Slider";

const ShapeTypes = new Set([...ApplianceShapes, ...Shapes]);

export function ShapesButton() {
  const { t } = useTranslation();
  const { theme, memberState, lastShape } = useContext(ToolbarContext);

  const appliance = memberState?.currentApplianceName;
  const shape = memberState?.shapeType;

  const key = (appliance === ApplianceNames.shape ? shape : appliance) as keyof typeof ShapesMap;

  const active = ShapeTypes.has(key);

  const CurrentIcon = ShapesMap[lastShape];

  return (
    <span className="fastboard-toolbar-btn-interactive">
      <Tippy
        className="fastboard-tip"
        content={renderShapesButtonContent()}
        theme={theme}
        placement="right-start"
        trigger="click"
        offset={RightOffset}
        arrow={false}
        interactive
      >
        <Button content={t("shape")} active={active}>
          <CurrentIcon theme={theme} active={active} />
          <span className="fastboard-toolbar-triangle" />
        </Button>
      </Tippy>
    </span>
  );
}

function renderShapesButtonContent() {
  return (
    <div className="fastboard-toolbar-panel shapes">
      <ShapesBox />
      <CutLine />
      <Slider />
      <CutLine />
      <ColorBox />
    </div>
  );
}

export function ShapesBox() {
  const { t } = useTranslation();

  return (
    <div className="fastboard-toolbar-shapes">
      {ApplianceShapes.map(Appliance => (
        <ApplianceShapeButton
          key={Appliance}
          content={t(Appliance)}
          Appliance={Appliance}
          Icon={ShapesMap[Appliance]}
        />
      ))}
      {Shapes.map(shape => (
        <ShapeShapeButton key={shape} content={t(shape)} shape={shape} Icon={ShapesMap[shape]} />
      ))}
    </div>
  );
}

interface ApplianceShapeButtonProps {
  content?: string;
  Appliance: ApplianceNames;
  Icon: React.ComponentType<IconProps>;
}

function ApplianceShapeButton({ content, Appliance, Icon }: ApplianceShapeButtonProps) {
  const { theme, writable, setAppliance, memberState } = useContext(ToolbarContext);

  const current = memberState?.currentApplianceName;
  const disabled = !writable;

  return (
    <Button content={content} disabled={disabled} placement="top" onClick={() => setAppliance(Appliance)}>
      <Icon theme={theme} active={current === Appliance} />
    </Button>
  );
}

interface ShapeShapeButtonProps {
  content?: string;
  shape: ShapeType;
  Icon: React.ComponentType<IconProps>;
}

function ShapeShapeButton({ content, shape, Icon }: ShapeShapeButtonProps) {
  const { theme, writable, setAppliance, memberState } = useContext(ToolbarContext);

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
