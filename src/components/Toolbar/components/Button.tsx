import clsx from "clsx";
import React, { useContext, type PropsWithChildren } from "react";
import Tippy from "@tippyjs/react";

import { ToolbarContext } from "../Toolbar";

interface ButtonProps {
  content: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

const RightOffset = [0, 18] as [number, number];

export function Button({
  content,
  disabled,
  active,
  onClick,
  interactive = true,
  children,
}: PropsWithChildren<ButtonProps>) {
  const { writable, theme } = useContext(ToolbarContext);

  return (
    <Tippy
      content={content}
      interactive={interactive}
      theme={theme}
      disabled={!writable || disabled}
      placement="right"
      offset={RightOffset}
      duration={500}
    >
      <button
        className={clsx("fastboard-toolbar-btn", theme, { active })}
        onClick={onClick}
        disabled={!writable || disabled}
      >
        {children}
      </button>
    </Tippy>
  );
}
