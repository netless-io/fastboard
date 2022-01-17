import type { IconProps } from "../../../typings";

import React from "react";
import { getStroke } from "../../../theme";

export const Loading = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z" fill={stroke}></path>
    </svg>
  );
};
