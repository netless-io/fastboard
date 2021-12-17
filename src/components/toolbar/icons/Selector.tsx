import React from "react";
import type { IconProps } from "../../../types";
import { getStroke } from "./index";

export const Selector = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-36.000000, -140.000000)"
          fill={stroke}
          fillRule="nonzero"
        >
          <g transform="translate(28.000000, 68.000000)">
            <g transform="translate(8.000000, 72.000000)">
              <path d="M12,12 L20,14.6666667 L16.4444444,16.4444444 L14.6666667,20 L12,12 Z M15,4 L15,11.5 L14,11.5 L14,5 L5,5 L5,14 L11.5,14 L11.5,15 L4,15 L4,4 L15,4 Z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
