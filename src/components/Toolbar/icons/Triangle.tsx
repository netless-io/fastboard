import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Triangle = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={stroke}
        d="M12 6.008 19.138 18.5H4.862L12 6.008Z"
      />
    </svg>
  );
};
