import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "../../../theme";

export const Collapse = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={stroke}
        d="m8 10-2 2 2 2m10-8H6m12 12H6m12-4h-8m8-4h-8"
      />
    </svg>
  );
};
