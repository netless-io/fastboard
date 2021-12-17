import React from "react";
import type { IconProps } from "../../../types";
import { getStroke } from "./index";

export const Rectangle = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-36.000000, -268.000000)" stroke={stroke}>
          <g transform="translate(28.000000, 68.000000)">
            <g transform="translate(8.000000, 200.000000)">
              <rect x="5.5" y="5.5" width="13" height="13"></rect>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
