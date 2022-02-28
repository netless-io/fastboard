import type { IconProps } from "../typings";

import React from "react";
import { themes } from "../theme";

export function WhiteboardAdd({ theme = "light", active }: IconProps) {
  const config = themes[theme];
  const stroke = active ? config.activeColor : config.color;

  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 20h16M4 6h16" stroke={stroke} strokeLinejoin="round" strokeWidth="1.25" />
      <rect
        height="10"
        rx="1"
        stroke={stroke}
        strokeLinejoin="round"
        strokeWidth="1.25"
        width="14"
        x="5"
        y="8"
      />
      <path d="M12 4v2m-3 7h6m-3-3v6" stroke={stroke} strokeLinejoin="round" strokeWidth="1.25" />
    </svg>
  );
}
