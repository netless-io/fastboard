import type { IconProps } from "../../../typings";

import React from "react";
import { getStroke } from "../../../theme";

export const Pause = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path d="M14 19h4V5h-4M6 19h4V5H6v14z" fill={stroke}></path>
    </svg>
  );
};
