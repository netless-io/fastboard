import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Triangle = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-200.000000, -193.000000)" stroke={stroke}>
          <g transform="translate(96.000000, 153.000000)">
            <g transform="translate(104.000000, 40.000000)">
              <path d="M12,6.00778222 L19.1384102,18.5 L4.86158984,18.5 L12,6.00778222 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
