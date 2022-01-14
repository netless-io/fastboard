import type { IconProps } from "../../../types";

import { getStroke } from "../../../theme";

export const Down = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={stroke}
        d="m16 13-2 2-2 2-2-2-2-2m8-6-2 2-2 2-2-2-2-2"
      />
    </svg>
  );
};
