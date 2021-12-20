import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Text = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-57.000000, -204.000000)"
          fill={stroke}
          fillRule="nonzero"
        >
          <g transform="translate(49.000000, 68.000000)">
            <g transform="translate(8.000000, 136.000000)">
              <path d="M18.5,5.5 L18.5,8 L17.5,8 L17.5,6.5 L13,6.5 L13,17.5 L15,17.5 L15,18.5 L9,18.5 L9,17.5 L11,17.5 L11,6.5 L6.5,6.5 L6.5,8 L5.5,8 L5.5,5.5 L18.5,5.5 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
