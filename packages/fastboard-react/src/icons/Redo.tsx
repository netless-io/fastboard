import type { IconProps } from "../typings";

import React from "react";
import { themes } from "../theme";

export function Redo({ theme = "light", active }: IconProps) {
  const config = themes[theme];
  const stroke = active ? config.activeColor : config.color;

  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M19 9.625H9v-1.25h10v1.25ZM5.625 13v6h-1.25v-6h1.25ZM9 9.625A3.375 3.375 0 0 0 5.625 13h-1.25A4.625 4.625 0 0 1 9 8.375v1.25Z"
        fill={stroke}
      />
      <path d="m15 5 4 4-4 4" stroke={stroke} strokeLinejoin="round" strokeWidth="1.25" />
    </svg>
  );
}
