import type { ComponentChildren, VNode } from "preact";
import { useContext } from "preact/hooks";

import countdownPNG from "./assets/countdown.png";
import geogebraPNG from "./assets/geogebra.png";
import vscodePNG from "./assets/vscode.png";

import { Icon } from "../../../icons";
import { useInstance } from "../../../internal";
import { RightOffset } from "../../../theme";
import { Tippy } from "../../Tippy";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { Button } from "./Button";

export interface AppsButtonProps {
  content?: string | VNode | false;
  onClick?: () => void;
}

export function AppsButton({ content, onClick }: AppsButtonProps) {
  const { theme, icons, writable } = useContext(ToolbarContext);

  const disabled = !writable;

  const button = (
    <Button content="Apps" onClick={onClick}>
      <Icon
        fallback={<Icons.Apps theme={theme} />}
        src={disabled ? icons?.appsIconDisable : icons?.appsIcon}
        alt="[apps]"
      />
    </Button>
  );

  return content === false ? (
    button
  ) : (
    <span className="fastboard-toolbar-btn-interactive">
      <Tippy
        className="fastboard-tip"
        content={renderAppsButtonContent(content)}
        theme={theme}
        placement="right-end"
        trigger="click"
        offset={RightOffset}
        arrow={false}
        interactive
      >
        {button}
      </Tippy>
    </span>
  );
}

function renderAppsButtonContent(content?: ComponentChildren) {
  return (
    <div className="fastboard-toolbar-panel apps">
      <div className="fastboard-toolbar-apps">{content || <DefaultApps />}</div>
    </div>
  );
}

function DefaultApps() {
  const app = useInstance();

  return (
    <>
      <AppIcon
        title="Code Editor"
        src={vscodePNG}
        alt="[code editor]"
        onClick={app?.insertCodeEditor.bind(app)}
      />
      <AppIcon
        title="GeoGebra"
        src={geogebraPNG}
        alt="[geogebra]"
        onClick={app?.insertGeoGebra.bind(app)}
      />
      <AppIcon
        title="Countdown"
        src={countdownPNG}
        alt="[countdown]"
        onClick={app?.insertCountdown.bind(app)}
      />
    </>
  );
}

interface AppIconProps {
  title: string;
  src: string;
  alt: string;
  onClick?: () => void;
}

function AppIcon({ title, src, alt, onClick }: AppIconProps) {
  return (
    <span className="fastboard-toolbar-app-icon">
      <Button placement="top" content={title} onClick={onClick}>
        <img src={src} alt={alt} title={title} />
      </Button>
      <span className="fastboard-toolbar-app-icon-text">{title}</span>
    </span>
  );
}
