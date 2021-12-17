import React from "react";
import type { IconProps } from "../../../types";
import { getStroke } from "./index";

export const Star = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-104.000000, -193.000000)" stroke={stroke}>
          <g transform="translate(96.000000, 153.000000)">
            <g transform="translate(8.000000, 40.000000)">
              <path d="M12,3.5228586 L13.9930955,9.25673942 L20.0622406,9.38041924 L15.2248962,13.0478323 L16.9827387,18.8581515 L12,15.3908566 L7.0172613,18.8581515 L8.77510377,13.0478323 L3.93775943,9.38041924 L10.0069045,9.25673942 L12,3.5228586 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
