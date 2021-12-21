import type { Placement } from "tippy.js";

import clsx from "clsx";
import React, { forwardRef, useContext, type PropsWithChildren } from "react";
import Tippy from "@tippyjs/react";

import { ToolbarContext } from "../Toolbar";

interface ButtonProps {
  content: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  interactive?: boolean;
  placement?: Placement;
}

const RightOffset = [0, 18] as [number, number];

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(function Button(props, ref) {
  const {
    content,
    disabled,
    active,
    onClick,
    interactive = true,
    placement = "right",
    children,
  } = props;
  const { writable, theme } = useContext(ToolbarContext);

  return (
    <Tippy
      content={content}
      interactive={interactive}
      theme={theme}
      disabled={!writable || disabled}
      placement={placement}
      offset={placement === "right" ? RightOffset : undefined}
      duration={500}
    >
      <button
        ref={ref}
        className={clsx("fastboard-toolbar-btn", theme, { active })}
        onClick={onClick}
        disabled={!writable || disabled}
      >
        {children}
      </button>
    </Tippy>
  );
});
