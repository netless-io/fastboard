import React, { useCallback, useContext } from "react";
import { ApplianceNames } from "white-web-sdk";

import { Icon } from "../../../icons";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { Button } from "./Button";

export function ClickerButton() {
  const { theme, icons, writable, setAppliance, memberState } =
    useContext(ToolbarContext);

  const changeAppliance = useCallback(
    () => setAppliance(ApplianceNames.clicker),
    [setAppliance]
  );

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.clicker;
  const disabled = !writable;

  return (
    <Button
      content="Clicker"
      interactive={false}
      onClick={changeAppliance}
      active={active}
    >
      <Icon
        fallback={<Icons.Clicker theme={theme} active={active} />}
        src={disabled ? icons?.clickerIconDisable : icons?.clickerIcon}
        alt="[clicker]"
      />
    </Button>
  );
}

export function SelectorButton() {
  const { theme, icons, writable, setAppliance, memberState } =
    useContext(ToolbarContext);

  const changeAppliance = useCallback(
    () => setAppliance(ApplianceNames.selector),
    [setAppliance]
  );

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.selector;
  const disabled = !writable;

  return (
    <Button
      content="Selector"
      interactive={false}
      onClick={changeAppliance}
      active={active}
    >
      <Icon
        fallback={<Icons.Selector theme={theme} active={active} />}
        src={disabled ? icons?.selectorIconDisable : icons?.selectorIcon}
        alt="[selector]"
      />
    </Button>
  );
}

export function EraserButton() {
  const { theme, icons, writable, setAppliance, memberState } =
    useContext(ToolbarContext);

  const changeAppliance = useCallback(
    () => setAppliance(ApplianceNames.eraser),
    [setAppliance]
  );

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.eraser;
  const disabled = !writable;

  return (
    <Button
      content="Eraser"
      interactive={false}
      onClick={changeAppliance}
      active={active}
    >
      <Icon
        fallback={<Icons.Eraser theme={theme} active={active} />}
        src={disabled ? icons?.eraserIconDisable : icons?.eraserIcon}
        alt="[eraser]"
      />
    </Button>
  );
}

export function CleanButton() {
  const { theme, icons, writable, cleanCurrentScene } =
    useContext(ToolbarContext);

  const disabled = !writable;

  return (
    <Button content="Clean" interactive={false} onClick={cleanCurrentScene}>
      <Icon
        fallback={<Icons.Clean theme={theme} />}
        src={disabled ? icons?.cleanIconDisable : icons?.cleanIcon}
        alt="[clean]"
      />
    </Button>
  );
}

export interface AppsButtonProps {
  onClick?: () => void;
}

export function AppsButton({ onClick }: AppsButtonProps) {
  const { theme, icons, writable } = useContext(ToolbarContext);

  const disabled = !writable;

  return (
    <Button content="Apps" interactive={false} onClick={onClick}>
      <Icon
        fallback={<Icons.Apps theme={theme} />}
        src={disabled ? icons?.appsIconDisable : icons?.appsIcon}
        alt="[apps]"
      />
    </Button>
  );
}
