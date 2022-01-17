import type { IconProps } from "../typings";

import React from "react";
import { themes } from "../theme";

export function Reset({ theme = "light", active }: IconProps) {
  const config = themes[theme];
  const stroke = active ? config.activeColor : config.color;

  return (
    <svg viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd" transform="translate(-176 -684)">
        <path stroke={stroke} strokeLinejoin="round" d="M188 688v4m0 8v4m8-8h-4m-8 0h-4" />
        <circle cx="188" cy="696" r="6" stroke={stroke} />
        <circle cx="188" cy="696" r="1" fill={stroke} />
      </g>
    </svg>
  );
}
