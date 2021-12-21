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
    <Button content="Clicker" onClick={changeAppliance} active={active}>
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
    <Button content="Selector" onClick={changeAppliance} active={active}>
      <Icon
        fallback={<Icons.Selector theme={theme} active={active} />}
        src={disabled ? icons?.selectorIconDisable : icons?.selectorIcon}
        alt="[selector]"
      />
    </Button>
  );
}
