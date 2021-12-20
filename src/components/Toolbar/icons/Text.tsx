import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Text = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill={stroke}
        d="M18.5 5.5V8h-1V6.5H13v11h2v1H9v-1h2v-11H6.5V8h-1V5.5h13Z"
      />
    </svg>
  );
};
