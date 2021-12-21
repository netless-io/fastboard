import type { PropsWithChildren } from "react";

import React from "react";
import Tippy from "@tippyjs/react";

interface ButtonProps {
  content: string;
  disabled?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

const RightOffset = [0, 18] as [number, number];

export function Button({
  content,
  disabled,
  onClick,
  interactive = true,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <Tippy
      content={content}
      interactive={interactive}
      disabled={disabled}
      placement="right"
      offset={RightOffset}
      duration={500}
    >
      <button
        className="fastboard-toolbar-btn"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </Tippy>
  );
}
