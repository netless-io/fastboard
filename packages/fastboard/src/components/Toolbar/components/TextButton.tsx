import { useCallback, useContext } from "preact/hooks";
import { ApplianceNames } from "white-web-sdk";

import { Icon } from "../../../icons";
import { defaultHotKeys, useInstance } from "../../../internal";
import { RightOffset } from "../../../theme";
import { Tippy } from "../../Tippy";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { renderToolTip } from "./ApplianceButtons";
import { Button } from "./Button";
import { ColorBox } from "./ColorBox";

export function TextButton() {
  const app = useInstance();

  const { theme, icons, writable, setAppliance, memberState, i18n } =
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
          content={renderToolTip(i18n?.t("text"), shortcut)}
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
    <div className="fastboard-toolbar-panel text">
      <ColorBox />
    </div>
  );
}
