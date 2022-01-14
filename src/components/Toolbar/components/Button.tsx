import type { ComponentChildren, VNode } from "preact";
import type { Placement } from "tippy.js";

import clsx from "clsx";

import { forwardRef } from "preact/compat";
import { useContext } from "preact/hooks";
import { RightOffset } from "../../../theme";
import { Tippy } from "../../Tippy";
import { ToolbarContext } from "../Toolbar";

interface ButtonProps {
  content?: string | VNode;
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
        content={<span>{content}</span>}
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
