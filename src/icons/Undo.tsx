import type { IconProps } from "../types";

import React from "react";
import { themes } from "../theme";

export function Undo({ theme = "light", active }: IconProps) {
  const config = themes[theme];
  const stroke = active ? config.activeColor : config.color;

  return (
    <svg viewBox="0 0 24 24">
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m11 14-2-2-2-2 2-2 2-2" />
        <path d="M7 10h8a2 2 0 0 1 2 2v6h0" />
      </g>
    </svg>
  );
}
