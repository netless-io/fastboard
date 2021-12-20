import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Rectangle = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path fill="none" stroke={stroke} d="M5.5 5.5h13v13h-13z" />
    </svg>
  );
};
