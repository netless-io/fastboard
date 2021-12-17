import clsx from "clsx";
import React, { type MemoExoticComponent } from "react";
import { ApplianceNames, ShapeType } from "white-web-sdk";
import { Button } from "./Button";
import { createContext, useEffect, useState } from "react";
import { Icon } from "../../icons";
import { Icons } from "./icons";
import { Line } from "./Line";
import { ToolbarContent } from "./ToolbarContent";
import type { CommonProps, GenericIcon, IconProps, Theme } from "../../types";
import type { Color, Room } from "white-web-sdk";
import type { WindowManager } from "@netless/window-manager";

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

const ShapeTypes: string[] = Object.values(ShapeType);

const createMethods = (room?: Room | null, manager?: WindowManager | null) => {
  return {
    cleanCurrentScene: () => room?.cleanCurrentScene(),
    setAppliance: (appliance: ToolName | undefined) => {
      if (!appliance) return;
      console.log("setAppliance", appliance);
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
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => setExpanded(!expanded);
  const [activeTool, setActiveTool] = useState(ApplianceNames.pencil);

  const methods = createMethods(props.room, props.manager);

  useEffect(() => {
    methods.setAppliance(activeTool);
  }, [activeTool, methods]);

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
      <div className={clsx(name, props.theme)} style={{ left, top }}>
        <div className="button" onClick={toggleExpand}>
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
            <Line theme={"dark"} />
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
