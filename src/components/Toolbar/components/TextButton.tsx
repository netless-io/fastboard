import Tippy from "@tippyjs/react";
import React, { useCallback } from "react";
import { useContext } from "react";
import { ApplianceNames } from "white-web-sdk";

import { Icon } from "../../../icons";
import { RightOffset } from "../../../theme";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { Button } from "./Button";
import { ColorBox } from "./ColorBox";

export function TextButton() {
  const { theme, icons, writable, setAppliance, memberState } =
    useContext(ToolbarContext);

  const changeAppliance = useCallback(() => {
    setAppliance(ApplianceNames.text);
  }, [setAppliance]);

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.text;
  const disabled = !writable;

  return (
    <span className="fastboard-toolbar-btn-interactive">
      <Tippy
        content={renderTextButtonContent()}
        theme={theme}
        placement="right-start"
        trigger="click"
        offset={RightOffset}
        arrow={false}
        interactive
      >
        <Button content="Text" active={active} onClick={changeAppliance}>
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
