import type { CommonProps, GenericIcon, Theme } from "../../typings";
import type { ToolbarHook } from "./hooks";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useState } from "react";

import expandPNG from "./components/assets/expanded.png";

import { Icon } from "../../icons";
import { useTheme } from "../hooks";
import { Content } from "./Content";
import { EmptyToolbarHook, useToolbar } from "./hooks";

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
    | "apps"
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

export function Toolbar({ theme, icons }: ToolbarProps) {
  theme = useTheme(theme);

  const hook = useToolbar();
  const [expanded, setExpanded] = useState(true);
  const [pointerEvents, setPointerEvents] = useState<"auto" | "none">("auto");
  const disabled = !hook.writable;

  return (
    <ToolbarContext.Provider value={{ theme, icons, ...hook }}>
      <AnimatePresence>
        {expanded ? (
          <motion.div
            key="toolbar"
            className={clsx(name, theme)}
            initial={{ x: -100 }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
            exit={{ x: -100, transition: { duration: 0.5 } }}
            onAnimationStart={() => setPointerEvents("none")}
            onAnimationComplete={() => setPointerEvents("auto")}
            style={{ pointerEvents }}
          >
            <Content onCollapse={() => setExpanded(false)} />
          </motion.div>
        ) : (
          <motion.div
            className={clsx(`${name}-expand-btn`, theme)}
            key="expand"
            onClick={() => setExpanded(true)}
            initial={{ x: -100 }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
          >
            <Icon
              fallback={<img draggable={false} src={expandPNG} className={clsx(`${name}-mask-btn`, theme)} />}
              src={disabled ? icons?.expandIconDisable : icons?.expandIcon}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ToolbarContext.Provider>
  );
}
