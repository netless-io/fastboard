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
        <path d="M14 14h4v-4" />
        <path d="m18 14-.788-.9A7.005 7.005 0 0 0 6 14h0" />
      </g>
    </svg>
  );
}
