import type { IconProps } from "../typings";

import React from "react";
import { themes } from "../theme";

export function ChevronRight({ theme = "light", active }: IconProps) {
  const config = themes[theme];
  const stroke = active ? config.activeColor : config.color;

  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10 16 2-2 2-2-2-2-2-2"
      />
    </svg>
  );
}
