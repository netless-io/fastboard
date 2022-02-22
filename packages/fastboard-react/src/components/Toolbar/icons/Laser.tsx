import type { IconProps } from "../../../typings";

import React from "react";
import { getStroke } from "../../../theme";

export const Laser = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <circle cx="12" cy="12" r="2" fill={stroke} />
        <path
          stroke={stroke}
          stroke-linecap="square"
          stroke-linejoin="round"
          d="M12 4v2m0 12v2m8-8h-2M6 12H4m13.657 5.657-1.414-1.414M7.757 7.757 6.343 6.343m0 11.314 1.414-1.414m8.486-8.486 1.414-1.414"
        />
      </g>
    </svg>
  );
};
