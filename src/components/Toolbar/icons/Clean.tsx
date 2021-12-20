import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Clean = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill={stroke}
        d="M9.754 11.99c0 1.856-.711 3.62-1.96 4.951l-.151.155h1.403l.855-.853h.707l.853.853h2.635l.094-.064a6.237 6.237 0 0 0 2.559-4.781l.005-.26h1a7.237 7.237 0 0 1-2.994 5.862l-.229.16-.277.083h-3l-.353-.146-.647-.647-.646.647-.354.146h-3l-.286-.91.214-.148a6.237 6.237 0 0 0 2.567-4.787l.005-.26h1Zm4.772-6.502v2l.35.039a2.98 2.98 0 0 1 2.644 2.78l.006.181h-8a2.98 2.98 0 0 1 2.65-2.961l.35-.039v-2h2Z"
      />
    </svg>
  );
};
