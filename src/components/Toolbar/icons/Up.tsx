import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Up = (props: IconProps) => {
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
        <g
          transform="translate(-56.000000, -77.000000)"
          stroke={stroke}
          strokeWidth="1.25"
        >
          <g transform="translate(68.000000, 89.000000) scale(1, -1) rotate(-90.000000) translate(-68.000000, -89.000000) translate(56.000000, 77.000000)">
            <polyline
              transform="translate(9.000000, 12.000000) rotate(-360.000000) translate(-9.000000, -12.000000) "
              points="11 16 9 14 7 12 9 10 11 8"
            ></polyline>
            <polyline
              transform="translate(15.000000, 12.000000) rotate(-360.000000) translate(-15.000000, -12.000000) "
              points="17 16 15 14 13 12 15 10 17 8"
            ></polyline>
          </g>
        </g>
      </g>
    </svg>
  );
};
