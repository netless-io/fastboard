import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Collapse = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinejoin="round"
      >
        <g transform="translate(-68.000000, -76.000000)" stroke={stroke}>
          <g transform="translate(60.000000, 68.000000)">
            <g transform="translate(20.000000, 20.000000) scale(-1, 1) rotate(90.000000) translate(-20.000000, -20.000000) translate(8.000000, 8.000000)">
              <g transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) ">
                <polyline points="16 10 18 12 16 14" />
                <line x1="6" y1="6" x2="18" y2="6" />
                <line x1="6" y1="18" x2="18" y2="18" />
                <line x1="6" y1="14" x2="14" y2="14" />
                <line x1="6" y1="10" x2="14" y2="10" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
