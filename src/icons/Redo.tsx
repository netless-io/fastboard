import type { IconProps } from "../types";

import React from "react";
import { themes } from "../theme";

export function Redo({ theme = "light", active }: IconProps) {
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
        <path d="m13 14 2-2 2-2-2-2-2-2" />
        <path d="M17 10H9a2 2 0 0 0-2 2v6h0" />
      </g>
    </svg>
  );
}
