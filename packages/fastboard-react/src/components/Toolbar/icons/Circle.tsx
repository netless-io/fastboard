import type { IconProps } from "../../../typings";

import React from "react";
import { getStroke } from "../../../theme";

export const Circle = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <rect width="15" height="15" x="4.5" y="4.5" fill="none" stroke={stroke} rx="7.5" />
    </svg>
  );
};
