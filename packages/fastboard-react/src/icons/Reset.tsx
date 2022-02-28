import type { IconProps } from "../typings";

import React from "react";
import { themes } from "../theme";

export function Reset({ theme = "light", active }: IconProps) {
  const config = themes[theme];
  const stroke = active ? config.activeColor : config.color;

  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" fill={stroke} r="2" />
      <path d="M12 3v4m0 10v4m9-9h-4M7 12H3" stroke={stroke} strokeLinejoin="round" strokeWidth="1.25" />
      <circle cx="12" cy="12" r="7" stroke={stroke} strokeLinejoin="round" strokeWidth="1.25" />
    </svg>
  );
}
