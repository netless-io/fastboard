import type { IconProps } from "../../../typings";

import React from "react";
import { getStroke } from "../../../theme";

export const Up = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path fill="none" stroke={stroke} d="m16 11-2-2-2-2-2 2-2 2m8 6-2-2-2-2-2 2-2 2" />
    </svg>
  );
};
