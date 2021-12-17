import React from "react";
import type { IconProps } from "../../../types";
import { getStroke } from "./index";

export const Diamond = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-136.000000, -193.000000)" stroke={stroke}>
          <g transform="translate(96.000000, 153.000000)">
            <g transform="translate(40.000000, 40.000000)">
              <rect
                transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) "
                x="6.5"
                y="6.5"
                width="11"
                height="11"
              ></rect>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
