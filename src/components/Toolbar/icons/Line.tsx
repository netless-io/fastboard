import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Line = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path fill={stroke} d="m18.01 5.282.708.708L5.99 18.718l-.708-.708z" />
    </svg>
  );
};
