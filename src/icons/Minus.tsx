import type { IconProps } from "../types";

import { themes } from "../theme";

export function Minus({ theme = "light", active }: IconProps) {
  const config = themes[theme];
  const stroke = active ? config.activeColor : config.color;

  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 12h10"
      />
    </svg>
  );
}
