import type { IconProps } from "../../../typings";

import React from "react";
import { getStroke } from "../../../theme";

export const Diamond = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path fill="none" stroke={stroke} d="M4.222 12 12 4.222 19.778 12 12 19.778z" />
    </svg>
  );
};
