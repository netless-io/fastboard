import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Arrow = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-200.000000, -161.000000)"
          fill={stroke}
          fillRule="nonzero"
        >
          <g transform="translate(96.000000, 153.000000)">
            <g transform="translate(104.000000, 8.000000)">
              <path d="M19,5 L19,11 L16.3534856,8.354 L5.98959236,18.7175144 L5.28248558,18.0104076 L15.6454856,7.646 L13,5 L19,5 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
