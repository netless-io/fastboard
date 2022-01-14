import { useCallback, useContext } from "preact/hooks";
import { ApplianceNames } from "white-web-sdk";

import { defaultHotKeys, useInstance } from "../../../internal";
import { Icon } from "../../../icons";
import { RightOffset } from "../../../theme";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { Button } from "./Button";
import { ColorBox } from "./ColorBox";
import { CutLine } from "./CutLine";
import { Slider } from "./Slider";
import { renderToolTip } from "./ApplianceButtons";
import { Tippy } from "../../Tippy";

export function PencilButton() {
  const app = useInstance();

  const { theme, icons, writable, setAppliance, memberState, i18n } =
    useContext(ToolbarContext);

  const changeAppliance = useCallback(() => {
    setAppliance(ApplianceNames.pencil);
  }, [setAppliance]);

  const appliance = memberState?.currentApplianceName;
  const active = appliance === ApplianceNames.pencil;
  const disabled = !writable;
  const shortcut = (app?.config.joinRoom.hotKeys || defaultHotKeys)
    .changeToPencil;

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
        <Button
          content={renderToolTip(i18n?.t("pencil"), shortcut)}
          active={active}
          onClick={changeAppliance}
        >
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
