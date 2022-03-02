import clsx from "clsx";
import Tippy from "@tippyjs/react";
import React, { useContext } from "react";

import vscodePNG from "./assets/vscode.png";
import geogebraPNG from "./assets/geogebra.png";
import countdownPNG from "./assets/countdown.png";

import { Icon } from "../../../icons";
import { RightOffset } from "../../../theme";
import { Icons } from "../icons";
import { ToolbarContext } from "../Toolbar";
import { Button } from "./Button";
import { useFastboardApp } from "../../hooks";
import { Loading } from "../icons/Loading";

export interface AppsButtonProps {
  content?: React.ReactNode;
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

function renderAppsButtonContent(content?: React.ReactNode) {
  return (
    <div className="fastboard-toolbar-panel apps">
      <div className="fastboard-toolbar-apps">{content || <DefaultApps />}</div>
    </div>
  );
}

function DefaultApps() {
  const app = useFastboardApp();
  const { appsStatus } = useContext(ToolbarContext);

  return (
    <>
      <AppIcon
        title="Code Editor"
        src={vscodePNG}
        alt="[code editor]"
        appStatus={appsStatus["Monaco"]}
        onClick={app?.insertCodeEditor.bind(app)}
      />
      <AppIcon
        title="GeoGebra"
        src={geogebraPNG}
        alt="[geogebra]"
        appStatus={appsStatus["GeoGebra"]}
        onClick={app?.insertGeoGebra.bind(app)}
      />
      <AppIcon
        title="Countdown"
        src={countdownPNG}
        alt="[countdown]"
        appStatus={appsStatus["Countdown"]}
        onClick={app?.insertCountdown.bind(app)}
      />
    </>
  );
}

interface AppIconProps {
  title: string;
  src: string;
  alt: string;
  appStatus?: {
    status: "idle" | "loading" | "failed";
    reason?: string | undefined;
  };
  onClick?: () => void;
}

function AppIcon({ title, src, alt, appStatus, onClick }: AppIconProps) {
  const { theme } = useContext(ToolbarContext);
  const { status = "idle", reason } = appStatus || {};
  const loading = status === "loading";
  const failed = status === "failed";
  const unifiedTitle = loading ? "loading" : failed ? reason : title;

  return (
    <div className="fastboard-toolbar-app-icon-wrapper">
      <span
        className={clsx("fastboard-toolbar-app-icon", {
          "fastboard-toolbar-app-is-loading": loading,
          "fastboard-toolbar-app-is-failed": failed,
        })}
      >
        <Button disabled={failed || loading} placement="top" content={unifiedTitle} onClick={onClick}>
          <img src={src} alt={alt} title={unifiedTitle} />
        </Button>
        <span className="fastboard-toolbar-app-icon-text">{title}</span>
      </span>
      {loading && (
        <span className="fastboard-toolbar-app-icon-mask">
          <Loading theme={theme} />
        </span>
      )}
    </div>
  );
}
