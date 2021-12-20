import type { PropsWithChildren, ReactEventHandler } from "react";

import React from "react";
import Tippy from "@tippyjs/react";

type ButtonProps = PropsWithChildren<{
  content: string;
  onClick?: ReactEventHandler;
  interactive?: boolean;
}>;

export const Button = ({
  children,
  content,
  onClick,
  interactive,
}: ButtonProps) => {
  return (
    <Tippy
      content={content}
      placement="right"
      interactive={interactive === undefined ? true : interactive}
      offset={[0, 18]}
      duration={500}
    >
      <div className={"button"} onClick={onClick}>
        {children}
      </div>
    </Tippy>
  );
};
