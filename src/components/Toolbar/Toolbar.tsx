import type { MemoExoticComponent } from "react";
import type { Color, Room, RoomState, ShapeType } from "white-web-sdk";
import type { WindowManager } from "@netless/window-manager";
import type { CommonProps, GenericIcon, IconProps, Theme } from "../../types";

import clsx from "clsx";
import React, { createContext, useEffect, useState } from "react";
import { ApplianceNames } from "white-web-sdk";
import { Icon } from "../../icons";
import { Button } from "./Button";
import { Icons } from "./icons";
import { ToolbarContent } from "./ToolbarContent";
import { ShapeTypes } from "./ShapesButton";

export type ToolbarProps = CommonProps & {
  left?: number;
  top?: number;
  icons?: GenericIcon<
    | "clicker"
    | "selector"
    | "pencil"
    | "eraser"
    | "clean"
    | "expand"
    | "collapse"
    | "up"
    | "down"
    | "text"
  >;
};

export type ToolName = `${ApplianceNames}` | `${ShapeType}`;

export const ShapesMap: Partial<{
  [key in ToolName]: MemoExoticComponent<(props: IconProps) => JSX.Element>;
}> = {
  rectangle: Icons.Rectangle,
  ellipse: Icons.Circle,
  straight: Icons.Line,
  arrow: Icons.Arrow,
  pentagram: Icons.Star,
  rhombus: Icons.Diamond,
  triangle: Icons.Triangle,
  speechBalloon: Icons.SpeechBalloon,
};

const defaultTheme: Theme = "light";

type ContextType = {
  theme: Theme;
  icons?: ToolbarProps["icons"];
  methods?: ReturnType<typeof createMethods>;
  currentApplianceName?: ApplianceNames;
};

const defaultContext: ContextType = {
  theme: defaultTheme,
};

const createMethods = (room?: Room | null, _manager?: WindowManager | null) => {
  return {
    cleanCurrentScene: () => room?.cleanCurrentScene(),
    setAppliance: (appliance: ToolName | undefined) => {
      if (!appliance) return;
      if (ShapeTypes.includes(appliance)) {
        room?.setMemberState({
          currentApplianceName: ApplianceNames.shape,
          shapeType: appliance as ShapeType,
        });
      } else {
        room?.setMemberState({
          currentApplianceName: appliance as ApplianceNames,
        });
      }
    },
    setStrokeWidth: (width: number) => {
      room?.setMemberState({ strokeWidth: width });
    },
    setStrokeColor: (color: Color) => {
      room?.setMemberState({ strokeColor: color });
    },
  };
};

export const ToolbarContext = createContext<ContextType>(defaultContext);

export const name = "fastboard-toolbar";

export const Toolbar = (props: ToolbarProps) => {
  const theme = props.theme || defaultTheme;
  const left = props.left || 15;
  const top = props.top || 20;
  const icons = props.icons;
  const [, forceUpdate] = useState({});
  const [expanded, setExpanded] = useState(true);
  const [activeTool, setActiveTool] = useState<ToolName>(ApplianceNames.pencil);
  const methods = React.useMemo(
    () => createMethods(props.room, props.manager),
    [props.room, props.manager]
  );

  useEffect(() => {
    methods.setAppliance(activeTool);
  }, [activeTool, methods]);

  useEffect(() => {
    const onRoomStateChanged = (modifyState: Partial<RoomState>) => {
      if (modifyState.memberState) {
        forceUpdate({});
      }
    };
    if (props.room) {
      props.room.callbacks.on("onRoomStateChanged", onRoomStateChanged);
    }
    return () => {
      if (props.room) {
        props.room.callbacks.off("onRoomStateChanged", onRoomStateChanged);
      }
    };
  }, [props.room]);

  return (
    <ToolbarContext.Provider
      value={{
        theme,
        icons,
        methods,
        currentApplianceName:
          props.room?.state.memberState.currentApplianceName,
      }}
    >
      <div className={clsx(name, theme)} style={{ left, top }}>
        <div className="button" onClick={() => setExpanded(!expanded)}>
          {expanded
            ? createCollapseOrExpandButton({
                theme,
                icons,
                content: "Collapse",
                SvgIcon: Icons.Collapse,
              })
            : createCollapseOrExpandButton({
                theme,
                icons,
                content: "Expand",
                SvgIcon: Icons.Expand,
              })}
        </div>
        {expanded ? (
          <>
            <div className={clsx("line", theme)} />
            <ToolbarContent
              theme={theme}
              setActiveTool={setActiveTool}
              activeTool={activeTool}
            />
          </>
        ) : null}
      </div>
    </ToolbarContext.Provider>
  );
};

type CreateButtonProps = {
  theme: Theme;
  icons: ToolbarProps["icons"];
  content: string;
  SvgIcon: React.MemoExoticComponent<(props: IconProps) => JSX.Element>;
};

const createCollapseOrExpandButton = (props: CreateButtonProps) => {
  return (
    <Button content={props.content}>
      <Icon
        fallback={<props.SvgIcon theme={props.theme} active={false} />}
        src={props.icons?.collapseIcon}
      />
    </Button>
  );
};
