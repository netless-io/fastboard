import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "../../../theme";

export const Arrow = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill={stroke}
        d="M19 5v6l-2.647-2.646L5.99 18.718l-.708-.708L15.645 7.646 13 5h6Z"
      />
    </svg>
  );
};
