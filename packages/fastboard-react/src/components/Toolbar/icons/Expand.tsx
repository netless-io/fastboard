import type { IconProps } from "../../../typings";

import React from "react";
import { getStroke } from "../../../theme";

export const Expand = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path fill="none" stroke={stroke} d="m16 10 2 2-2 2M6 6h12M6 18h12M6 14h8m-8-4h8" />
    </svg>
  );
};
