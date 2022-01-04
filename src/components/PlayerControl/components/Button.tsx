import type { Placement } from "tippy.js";

import clsx from "clsx";
import React, { forwardRef, type PropsWithChildren } from "react";
import Tippy from "@tippyjs/react";

import { Theme } from "../../../types";
import { TopOffset } from "../../../theme";

type ButtonProps = PropsWithChildren<{
  theme: Theme;
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
      theme,
      content,
      disabled,
      active,
      onClick,
      interactive,
      placement = "top",
      children,
    } = props;

    return (
      <Tippy
        className="fastboard-tip"
        content={content}
        interactive={interactive}
        theme={theme}
        disabled={disabled}
        placement={placement}
        offset={TopOffset}
        duration={300}
      >
        <button
          ref={ref}
          className={clsx("fastboard-player-control-btn", theme, { active })}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      </Tippy>
    );
  }
);
