import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Circle = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-136.000000, -161.000000)" stroke={stroke}>
          <g transform="translate(96.000000, 153.000000)">
            <g transform="translate(40.000000, 8.000000)">
              <rect x="4.5" y="4.5" width="15" height="15" rx="7.5"></rect>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
