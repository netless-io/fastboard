import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Clicker = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g fill="none">
        <path d="M0 0h24v24H0z" />
        <path
          fill={stroke}
          d="m7 5.072 10.33 7.892-4.879.549 3.232 5.598-.866.5-3.233-5.597-2.914 3.95L7 5.072Z"
        />
      </g>
    </svg>
  );
};
