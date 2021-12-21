import type { PropsWithChildren } from "react";

import React from "react";
import Tippy from "@tippyjs/react";

interface ButtonProps {
  content: string;
  onClick?: () => void;
  interactive?: boolean;
}

const RightOffset = [0, 18] as [number, number];

export function Button({
  content,
  onClick,
  interactive = true,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <Tippy
      content={content}
      placement="right"
      interactive={interactive}
      offset={RightOffset}
      duration={500}
    >
      <button className="button" onClick={onClick}>
        {children}
      </button>
    </Tippy>
  );
}
