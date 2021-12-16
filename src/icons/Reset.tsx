import type { IconProps } from "../types";

import React from "react";
import { themes } from "../theme";

export function Reset({ theme = "light", active }: IconProps) {
  const config = themes[theme];
  const stroke = active ? config.activeColor : config.color;

  return (
    <svg viewBox="0 0 24 24">
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        transform="translate(-88 -152)"
      >
        <circle cx="100" cy="164" r="1" fill={stroke} />
        <circle
          cx="100"
          cy="164"
          r="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M100 158v2m0 8v2m6-6h-2m-8 0h-2"
        />
      </g>
    </svg>
  );
}
