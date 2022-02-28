import type { IconProps } from "../typings";

import React from "react";
import { themes } from "../theme";

export function Undo({ theme = "light", active }: IconProps) {
  const config = themes[theme];
  const stroke = active ? config.activeColor : config.color;

  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M5 9.625h10v-1.25H5v1.25ZM18.375 13v6h1.25v-6h-1.25ZM15 9.625A3.375 3.375 0 0 1 18.375 13h1.25A4.625 4.625 0 0 0 15 8.375v1.25Z"
        fill={stroke}
      />
      <path d="M9 5 5 9l4 4" stroke={stroke} strokeLinejoin="round" strokeWidth="1.25" />
    </svg>
  );
}
