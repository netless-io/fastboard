import type { CommonProps, GenericIcon, Theme } from "../../types";

import clsx from "clsx";
import React, { createContext, useCallback, useState } from "react";

import { Icon } from "../../icons";
import { Icons } from "./icons";
import { Button } from "./components/Button";
import { CutLine } from "./components/CutLine";
import { EmptyToolbarHook, useToolbar, type ToolbarHook } from "./hooks";
import { Content } from "./Content";

export type ToolbarProps = CommonProps & {
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

type ToolbarContextType = ToolbarHook & {
  theme: Theme;
  icons?: ToolbarProps["icons"];
};

export const ToolbarContext = createContext<ToolbarContextType>({
  theme: "light",
  ...EmptyToolbarHook,
});

export const name = "fastboard-toolbar";

export const Toolbar = ({ theme = "light", icons, room }: ToolbarProps) => {
  const [expanded, setExpanded] = useState(true);
  const hook = useToolbar(room);
  const toggle = useCallback(() => setExpanded(e => !e), []);

  const disabled = !hook.writable;

  return (
    <ToolbarContext.Provider value={{ theme, icons, ...hook }}>
      <div className={clsx(name, theme)}>
        {expanded ? (
          <Button content="Collapse" onClick={toggle} disabled={disabled}>
            <Icon
              fallback={<Icons.Collapse theme={theme} />}
              src={disabled ? icons?.collapseIconDisable : icons?.collapseIcon}
            />
          </Button>
        ) : (
          <Button content="Expand" onClick={toggle} disabled={disabled}>
            <Icon
              fallback={<Icons.Expand theme={theme} />}
              src={disabled ? icons?.expandIconDisable : icons?.expandIcon}
            />
          </Button>
        )}
        {expanded && (
          <>
            <CutLine />
            <Content />
          </>
        )}
      </div>
    </ToolbarContext.Provider>
  );
};
