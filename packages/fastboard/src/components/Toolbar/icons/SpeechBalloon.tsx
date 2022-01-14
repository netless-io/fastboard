import type { IconProps } from "../../../types";

import { getStroke } from "../../../theme";

export const SpeechBalloon = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={stroke}
        d="M17 4.5c.414 0 .79.168 1.06.44.272.27.44.646.44 1.06v9c0 .414-.168.79-.44 1.06a1.49 1.49 0 0 1-1.06.44h-4.207l-2.715 2.715-1.81-2.715H7a1.49 1.49 0 0 1-1.06-.44A1.495 1.495 0 0 1 5.5 15V6c0-.414.168-.79.44-1.06A1.49 1.49 0 0 1 7 4.5Z"
      />
    </svg>
  );
};
