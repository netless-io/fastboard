import type { IconProps } from "../../../types";

import { getStroke } from "../../../theme";

export const Play = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path d="M8 5.14v14l11-7l-11-7z" fill={stroke}></path>
    </svg>
  );
};
