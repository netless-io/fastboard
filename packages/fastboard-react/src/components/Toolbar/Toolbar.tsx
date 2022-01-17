import type { CommonProps, GenericIcon, Theme } from "../../typings";
import type { ToolbarHook } from "./hooks";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useCallback, useEffect, useState } from "react";

import collapsePNG from "./components/assets/collapsed.png";
import expandPNG from "./components/assets/expanded.png";

import { Icon } from "../../icons";
import { useTheme } from "../hooks";
import { Mask } from "./components/Mask";
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

export const Toolbar = ({ theme, icons }: ToolbarProps) => {
  theme = useTheme(theme);

  const hook = useToolbar();
  const [expanded, setExpanded] = useState(true);
  const [toolbar, toolbarRef] = useState<HTMLDivElement | null>(null);
  const [onHover, setOnHover] = useState(false);
  const [delayedOnHover, setDelayedOnHover] = useState(false);
  const [pointEvents, setPointEvents] = useState(true);
  const disabled = !hook.writable;

  const toggle = useCallback(() => {
    setExpanded(e => !e);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedOnHover(onHover);
    }, 400);
    return () => clearTimeout(timer);
  }, [onHover]);

  return (
    <ToolbarContext.Provider value={{ theme, icons, ...hook }}>
      <AnimatePresence>
        {expanded ? (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
            key="toolbar"
            ref={toolbarRef}
            className={clsx(name, theme)}
            onPointerEnter={() => {
              expanded && setOnHover(true);
            }}
            onMouseLeave={() => setOnHover(false)}
            exit={{ x: -100, transition: { duration: 0.5 } }}
            onAnimationStart={() => setPointEvents(false)}
            onAnimationComplete={() => setPointEvents(true)}
            style={{ pointerEvents: pointEvents ? "auto" : "none" }}
          >
            <Content />
            {expanded && (onHover || delayedOnHover) && (
              <Mask toolbar={toolbar}>
                <div onClick={toggle}>
                  <img draggable={false} className={clsx(`${name}-mask-btn`, theme)} src={collapsePNG} />
                </div>
              </Mask>
            )}
          </motion.div>
        ) : (
          <motion.div
            className={clsx(`${name}-expand-btn`, theme)}
            key="expand"
            onClick={toggle}
            initial={{ x: -100 }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
          >
            {!expanded && (
              <Icon
                fallback={
                  <img draggable={false} src={expandPNG} className={clsx(`${name}-mask-btn`, theme)} />
                }
                src={disabled ? icons?.expandIconDisable : icons?.expandIcon}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </ToolbarContext.Provider>
  );
};
