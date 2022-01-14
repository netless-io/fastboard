import type { IconProps } from "../types";

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
        <path d="M10 14H6v-4" />
        <path d="m6 14 .788-.9A7.005 7.005 0 0 1 18 14h0" />
      </g>
    </svg>
  );
}
