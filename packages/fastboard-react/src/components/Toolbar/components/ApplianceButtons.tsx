import type { HotKey } from "white-web-sdk";

import React, { useCallback, useContext } from "react";
import { ApplianceNames } from "white-web-sdk";

import { useTranslation } from "../../../i18n";
import { Icon } from "../../../icons";
import { defaultHotKeys } from "../../../internal";
import { useFastboardApp } from "../../hooks";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { Button } from "./Button";

export function renderToolTip(text: string | undefined, hotkey?: HotKey) {
  if (!(typeof hotkey === "string")) return text;
  return (
    <span className="fastboard-toolbar-tooltip">
      <span>{text}</span>
      <span className="fastboard-toolbar-hotkey">{hotkey.toUpperCase()}</span>
    </span>
  );
}

export function ClickerButton() {
  const app = useFastboardApp();
  const { t } = useTranslation();
  const { theme, icons, writable, setAppliance, memberState } = useContext(ToolbarContext);

  const changeAppliance = useCallback(() => setAppliance(ApplianceNames.clicker), [setAppliance]);

  const shortcut = app.hotKeys?.changeToClick;
  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.clicker;
  const disabled = !writable;

  return (
    <Button content={renderToolTip(t("clicker"), shortcut)} onClick={changeAppliance} active={active}>
      <Icon
        fallback={<Icons.Clicker theme={theme} active={active} />}
        src={disabled ? icons?.clickerIconDisable : icons?.clickerIcon}
        alt="[clicker]"
      />
    </Button>
  );
}

export function SelectorButton() {
  const app = useFastboardApp();
  const { t } = useTranslation();
  const { theme, icons, writable, setAppliance, memberState } = useContext(ToolbarContext);

  const changeAppliance = useCallback(() => setAppliance(ApplianceNames.selector), [setAppliance]);

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.selector;
  const disabled = !writable;
  const shortcut = (app.hotKeys || defaultHotKeys).changeToSelector;

  return (
    <Button content={renderToolTip(t("selector"), shortcut)} onClick={changeAppliance} active={active}>
      <Icon
        fallback={<Icons.Selector theme={theme} active={active} />}
        src={disabled ? icons?.selectorIconDisable : icons?.selectorIcon}
        alt="[selector]"
      />
    </Button>
  );
}

export function EraserButton() {
  const app = useFastboardApp();
  const { t } = useTranslation();
  const { theme, icons, writable, setAppliance, memberState } = useContext(ToolbarContext);

  const changeAppliance = useCallback(() => setAppliance(ApplianceNames.eraser), [setAppliance]);

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.eraser;
  const disabled = !writable;
  const shortcut = (app?.hotKeys || defaultHotKeys).changeToEraser;

  return (
    <Button content={renderToolTip(t("eraser"), shortcut)} onClick={changeAppliance} active={active}>
      <Icon
        fallback={<Icons.Eraser theme={theme} active={active} />}
        src={disabled ? icons?.eraserIconDisable : icons?.eraserIcon}
        alt="[eraser]"
      />
    </Button>
  );
}

export function CleanButton() {
  const { t } = useTranslation();
  const { theme, icons, writable, cleanCurrentScene } = useContext(ToolbarContext);

  const disabled = !writable;

  return (
    <Button content={t("clean")} onClick={cleanCurrentScene}>
      <Icon
        fallback={<Icons.Clean theme={theme} />}
        src={disabled ? icons?.cleanIconDisable : icons?.cleanIcon}
        alt="[clean]"
      />
    </Button>
  );
}
