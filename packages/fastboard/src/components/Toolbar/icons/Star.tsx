import type { IconProps } from "../../../types";

import { getStroke } from "../../../theme";

export const Star = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={stroke}
        d="m12 3.523 1.993 5.734 6.07.123-4.838 3.668 1.758 5.81L12 15.391l-4.983 3.467 1.758-5.81L3.938 9.38l6.069-.123L12 3.523Z"
      />
    </svg>
  );
};
