import Tippy from "@tippyjs/react";
import React, { useCallback } from "react";
import { useContext } from "react";
import { ApplianceNames } from "white-web-sdk";

import { defaultHotKeys, useInstance } from "../../../internal";
import { Icon } from "../../../icons";
import { RightOffset } from "../../../theme";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { Button } from "./Button";
import { ColorBox } from "./ColorBox";
import { renderToolTip } from "./ApplianceButtons";

export function TextButton() {
  const app = useInstance();

  const { theme, icons, writable, setAppliance, memberState } =
    useContext(ToolbarContext);

  const changeAppliance = useCallback(() => {
    setAppliance(ApplianceNames.text);
  }, [setAppliance]);

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.text;
  const disabled = !writable;
  const shortcut = (app?.config.joinRoom.hotKeys || defaultHotKeys)
    .changeToText;

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
        <Button
          content={renderToolTip("Text", shortcut)}
          active={active}
          onClick={changeAppliance}
        >
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
    <div className="fastboard-toolbar-panel">
      <ColorBox />
    </div>
  );
}
