import Tippy from "@tippyjs/react";
import React, { useCallback, useContext } from "react";
import { ApplianceNames } from "white-web-sdk";

import { useTranslation } from "../../../i18n";
import { Icon } from "../../../icons";
import { defaultHotKeys } from "../../../internal";
import { RightOffset } from "../../../theme";
import { useFastboardApp } from "../../hooks";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { renderToolTip } from "./ApplianceButtons";
import { Button } from "./Button";
import { ColorBox } from "./ColorBox";

export function TextButton() {
  const app = useFastboardApp();
  const { t } = useTranslation();

  const { theme, icons, writable, setAppliance, memberState } = useContext(ToolbarContext);

  const changeAppliance = useCallback(() => {
    setAppliance(ApplianceNames.text);
  }, [setAppliance]);

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.text;
  const disabled = !writable;
  const shortcut = (app?.hotKeys || defaultHotKeys).changeToText;

  return (
    <span className="fastboard-toolbar-btn-interactive">
      <Tippy
        className="fastboard-tip"
        content={renderTextButtonContent()}
        theme={theme}
        placement="right-start"
        trigger="click"
        offset={RightOffset}
        arrow={false}
        interactive
      >
        <Button content={renderToolTip(t("text"), shortcut)} active={active} onClick={changeAppliance}>
          <Icon
            fallback={<Icons.Text theme={theme} active={active} />}
            src={disabled ? icons?.textIconDisable : icons?.textIcon}
            alt="[text]"
          />
          <span className="fastboard-toolbar-triangle" />
        </Button>
      </Tippy>
    </span>
  );
}

function renderTextButtonContent() {
  return (
    <div className="fastboard-toolbar-panel text">
      <ColorBox />
    </div>
  );
}
