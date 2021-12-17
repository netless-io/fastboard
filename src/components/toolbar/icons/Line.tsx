import React from "react";
import type { IconProps } from "../../../types";
import { getStroke } from "./index";

export const Line = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-168.000000, -161.000000)"
          fill={stroke}
          fillRule="nonzero"
        >
          <g transform="translate(96.000000, 153.000000)">
            <g transform="translate(72.000000, 8.000000)">
              <polygon points="18.0104076 5.28248558 18.7175144 5.98959236 5.98959236 18.7175144 5.28248558 18.0104076"></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
