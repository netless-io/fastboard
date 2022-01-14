import type { IconProps } from "../../../types";

import { getStroke } from "../../../theme";

export const Selector = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill={stroke}
        d="m12 12 8 2.667-3.556 1.777L14.667 20 12 12Zm3-8v7.5h-1V5H5v9h6.5v1H4V4h11Z"
      />
    </svg>
  );
};
