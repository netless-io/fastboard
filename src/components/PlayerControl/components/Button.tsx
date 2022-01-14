import type { ComponentChildren, VNode } from "preact";
import type { Placement } from "tippy.js";
import type { Theme } from "../../../types";

import clsx from "clsx";

import { forwardRef } from "preact/compat";
import { TopOffset } from "../../../theme";
import { Tippy } from "../../Tippy";

interface ButtonProps {
  theme: Theme;
  content?: VNode;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  interactive?: boolean;
  placement?: Placement;
  children: ComponentChildren;
}

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
        delay={[1000, 400]}
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
