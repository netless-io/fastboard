import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "../../../theme";

export const Eraser = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill={stroke}
        d="m14.333 5.183.165.007c.494.037.978.245 1.356.623l2.333 2.333a2.15 2.15 0 0 1 0 3.04l-5.833 5.834a3.8 3.8 0 0 1-5.374 0l-1.167-1.166a2.15 2.15 0 0 1 0-3.04l7-7c.42-.42.97-.63 1.52-.63ZM11.52 8.52l-4.999 5a1.15 1.15 0 0 0 0 1.626l1.167 1.167a2.8 2.8 0 0 0 3.96 0l3.832-3.833-3.96-3.96Z"
      />
    </svg>
  );
};
