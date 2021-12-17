import React from "react";
import type { IconProps } from "../../../types";
import { getStroke } from "./index";

export const Clicker = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-57.000000, -108.000000)">
          <g transform="translate(49.000000, 68.000000)">
            <g transform="translate(8.000000, 40.000000)">
              <rect x="0" y="0" width="24" height="24" />
              <path
                d="M7,5.07179677 L17.330127,12.9641016 L12.451,13.5127968 L15.6830127,19.1112159 L14.8169873,19.6112159 L11.584,14.0137968 L8.66987298,17.9641016 L7,5.07179677 Z"
                fill={stroke}
                fillRule="nonzero"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
