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
import { CutLine } from "./CutLine";
import { Slider } from "./Slider";

export function PencilButton() {
  const app = useFastboardApp();
  const { t } = useTranslation();

  const { theme, icons, writable, setAppliance, memberState } = useContext(ToolbarContext);

  const changeAppliance = useCallback(() => {
    setAppliance(ApplianceNames.pencil);
  }, [setAppliance]);

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.pencil;
  const disabled = !writable;
  const shortcut = (app?.hotKeys || defaultHotKeys).changeToPencil;

  return (
    <span className="fastboard-toolbar-btn-interactive">
      <Tippy
        className="fastboard-tip"
        content={renderPencilButtonContent()}
        theme={theme}
        placement="right-start"
        trigger="click"
        offset={RightOffset}
        arrow={false}
        interactive
      >
        <Button content={renderToolTip(t("pencil"), shortcut)} active={active} onClick={changeAppliance}>
          <Icon
            fallback={<Icons.Pencil theme={theme} active={active} />}
            src={disabled ? icons?.pencilIconDisable : icons?.pencilIcon}
            alt="[pencil]"
          />
          <span className="fastboard-toolbar-triangle" />
        </Button>
      </Tippy>
    </span>
  );
}

function renderPencilButtonContent() {
  return (
    <div className="fastboard-toolbar-panel pencil">
      <Slider />
      <CutLine />
      <ColorBox />
    </div>
  );
}
