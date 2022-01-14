import type { Placement } from "tippy.js";

import clsx from "clsx";
import React, { forwardRef, useContext, type PropsWithChildren } from "react";
import Tippy from "@tippyjs/react";

import { RightOffset } from "../../../theme";
import { ToolbarContext } from "../Toolbar";

type ButtonProps = PropsWithChildren<{
  content: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  interactive?: boolean;
  placement?: Placement;
}>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      content,
      disabled,
      active,
      onClick,
      interactive,
      placement = "right",
      children,
    } = props;
    const { writable, theme } = useContext(ToolbarContext);

    return (
      <Tippy
        className="fastboard-tip"
        content={content}
        interactive={interactive}
        theme={theme}
        disabled={disabled || !writable}
        placement={placement}
        offset={placement.includes("right") ? RightOffset : undefined}
        delay={[1000, 400]}
        duration={300}
      >
        <button
          ref={ref}
          className={clsx("fastboard-toolbar-btn", theme, { active })}
          onClick={onClick}
          disabled={disabled || !writable}
        >
          {children}
        </button>
      </Tippy>
    );
  }
);
